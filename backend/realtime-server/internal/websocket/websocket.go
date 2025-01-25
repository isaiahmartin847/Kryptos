package websocket

import (
	"log"
	"net/http"
	"sync"

	"github.com/gorilla/websocket"
	"github.com/isaiahmartin847/realtime-server/internal/service"
)

const (
	// Max number of concurrent connections
	maxConnections = 1000

	// Connection timeouts
	// writeTimeout = 10 * time.Second
	// readTimeout  = 60 * time.Second
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
	// Check connection limit
	connectionsMutex.Lock()
	if activeConnections >= maxConnections {
		connectionsMutex.Unlock()
		http.Error(w, "Too many connections", http.StatusServiceUnavailable)
		return
	}
	activeConnections++
	connectionsMutex.Unlock()

	conn, err := upgrader.Upgrade(w, r, nil)
	if err != nil {
		connectionsMutex.Lock()
		activeConnections--
		connectionsMutex.Unlock()
		log.Printf("Error upgrading connection: %v", err)
		return
	}

	// Create new client and register with hub
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
