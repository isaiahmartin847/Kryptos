package websockets

import (
	"context"
	"encoding/json"
	"log"
	"time"

	"github.com/gorilla/websocket"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
)

const (
	// Time allowed to write a message to the peer
	writeWait = 10 * time.Second

	// Time allowed to read the next pong message from the peer
	pongWait = 60 * time.Second

	// Send pings to peer with this period
	pingPeriod = (pongWait * 9) / 10

	// Maximum message size allowed from peer
	maxMessageSize = 512

	// Message types
	MessageTypeChat = "chat"
)

type Message struct {
	Type    string `json:"type"`
	Content string `json:"content"`
	Role    string `json:"role,omitempty"` // Add role field to distinguish between user/assistant
}

func NewMessage(msgType string, content string) []byte {
	msg := Message{
		Type:    msgType,
		Content: content,
		Role:    "assistant", // Messages created by the server are from the assistant
	}
	bytes, err := json.Marshal(msg)
	if err != nil {
		log.Printf("error marshaling message: %v", err)
		return nil
	}
	return bytes
}

type Client struct {
	hub       *Hub
	conn      *websocket.Conn
	send      chan []byte
	aiService *service.AIService
}

func (c *Client) readPump() {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("error: %v", err)
			}
			break
		}

		var msg Message
		if err := json.Unmarshal(message, &msg); err != nil {
			log.Printf("error parsing message: %v", err)
			continue
		}

		// Handle chat messages
		if msg.Type == MessageTypeChat {
			// Create context with timeout for AI response
			ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
			response, err := c.aiService.GenerateResponse(ctx, msg.Content)
			cancel()

			if err != nil {
				log.Printf("error generating response: %v", err)
				// Send error message back to the user
				errorMsg := NewMessage(MessageTypeChat, "Sorry, I encountered an error processing your message.")
				c.send <- errorMsg
				continue
			}

			// Send the AI response back
			responseMsg := NewMessage(MessageTypeChat, response)
			c.send <- responseMsg // Send directly to this client's send channel
		}
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case message, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}

			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(message)

			if err := w.Close(); err != nil {
				return
			}
		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if err := c.conn.WriteMessage(websocket.PingMessage, nil); err != nil {
				return
			}
		}
	}
}
