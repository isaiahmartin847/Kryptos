package websockets

import (
	"log"
	"net/http"
	"sync"
	"time"

	"github.com/gorilla/websocket"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
)

const (
	// Max number of concurrent connections
	maxConnections = 1000

	// Connection timeouts
	writeTimeout = 10 * time.Second
	readTimeout  = 60 * time.Second
)

var (
	upgrader = websocket.Upgrader{
		ReadBufferSize:  1024,
		WriteBufferSize: 1024,
		CheckOrigin: func(r *http.Request) bool {
			// In production, implement proper origin checking
			return true
		},
	}

	// Connection management
	activeConnections = 0
	connectionsMutex  sync.Mutex
)

func ServeWs(hub *Hub, aiService *service.AIService, w http.ResponseWriter, r *http.Request) {
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		log.Printf("Error upgrading connection: %v", err)
		return
	}

	client := &Client{
		hub:       hub,
		conn:      conn,
		send:      make(chan []byte, 256),
		aiService: aiService,
	}
	client.hub.register <- client

	// Start goroutines for pumping messages
	go client.writePump()
	go client.readPump()
}

func HandleWebSocket(w http.ResponseWriter, r *http.Request) {
	// Check connection limit
	connectionsMutex.Lock()
	if activeConnections >= maxConnections {
		connectionsMutex.Unlock()
		http.Error(w, "Too many connections", http.StatusServiceUnavailable)
		return
	}
	activeConnections++
	connectionsMutex.Unlock()

	// Upgrade connection
	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		connectionsMutex.Lock()
		activeConnections--
		connectionsMutex.Unlock()
		log.Printf("Error upgrading connection: %v\n", err)
		return
	}

	// Ensure connection is closed and counted properly
	defer func() {
		conn.Close()
		connectionsMutex.Lock()
		activeConnections--
		connectionsMutex.Unlock()
	}()

	// Configure timeouts
	conn.SetReadLimit(512) // 512 bytes max message size
	conn.SetReadDeadline(time.Now().Add(readTimeout))
	conn.SetPongHandler(func(string) error {
		conn.SetReadDeadline(time.Now().Add(readTimeout))
		return nil
	})

	for {
		// Read message with timeout
		messageType, message, err := conn.ReadMessage()
		if err != nil {
			if websocket.IsUnexpectedCloseError(err, websocket.CloseGoingAway, websocket.CloseAbnormalClosure) {
				log.Printf("Error reading message: %v\n", err)
			}
			break
		}

		// Log received message
		log.Printf("Received message: %s\n", message)

		// Write message with timeout
		conn.SetWriteDeadline(time.Now().Add(writeTimeout))
		err = conn.WriteMessage(messageType, message)
		if err != nil {
			log.Printf("Error writing message: %v\n", err)
			break
		}
	}
}
