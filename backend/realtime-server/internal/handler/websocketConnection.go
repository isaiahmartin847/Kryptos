package handler

import (
	"github.com/isaiahmartin847/realtime-server/internal/websocket"
	"github.com/labstack/echo/v4"
)

func (h *Handler) WebSocketHandler(c echo.Context) error {
	websocket.ServeWs(h.WebSocketHub, h.AIService, c.Response(), c.Request())
	return nil
}
