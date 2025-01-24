package app

import (
	"fmt"

	"github.com/isaiahmartin847/realtime-server/internal/ai"
	"github.com/isaiahmartin847/realtime-server/internal/handler"
	"github.com/isaiahmartin847/realtime-server/internal/service"
	"github.com/isaiahmartin847/realtime-server/internal/websocket"

	"gorm.io/gorm"
)

func InitializeDependencies(db *gorm.DB, aiClient *ai.AIClient) (*handler.Handler, error) {
	if db == nil {
		return nil, fmt.Errorf("database is required")
	}

	if aiClient == nil {
		return nil, fmt.Errorf("AI client is required")
	}

	// Initialize repositories

	// Initialize services
	aiService := service.NewAIService(aiClient)

	// Initialize WebSocket hub
	wsHub := websocket.NewHub()
	go wsHub.Run()

	// Initialize services
	handler := &handler.Handler{
		AIService:    aiService,
		WebSocketHub: wsHub,
	}

	return handler, nil

}
