package handler

import (
	"github.com/isaiahmartin847/realtime-server/internal/service"
	"github.com/isaiahmartin847/realtime-server/internal/websocket"
)

type Handler struct {
	AIService    *service.AIService
	WebSocketHub *websocket.Hub
}
