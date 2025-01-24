package server

import (
	handler "github.com/isaiahmartin847/Reg-Maps/internal/handlers"
	"github.com/isaiahmartin847/Reg-Maps/internal/websockets"

	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

type Server struct {
	echo    *echo.Echo
	handler *handler.Handler
}

func NewServer(h *handler.Handler) *Server {
	return &Server{
		echo:    echo.New(),
		handler: h,
	}
}

func (s *Server) ConfigureMiddleware() {
	// Configure CORS
	s.echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))
}

func (s *Server) ConfigureRoutes() {
	// Session routes
	sessionGroup := s.echo.Group("/session")
	sessionGroup.GET("/all", s.handler.GetSessionsByID)
	sessionGroup.POST("/create", s.handler.CreateSession)

	// General routes
	s.echo.POST("/user-created-payload", s.handler.UserWebhookPayload())
	s.echo.POST("/payment-intent", s.handler.Stripe_transaction)
	s.echo.GET("/", s.handler.Details)
	s.echo.GET("/states", s.handler.AllStates)
	s.echo.GET("/species", s.handler.GetAllByStateID)
	s.echo.GET("/hunting-units", s.handler.GetAllBySpeciesID)

	// WebSocket route
	s.echo.GET("/ws", func(c echo.Context) error {
		websockets.ServeWs(s.handler.WebSocketHub, s.handler.AIService, c.Response(), c.Request())
		return nil
	})
}

func (s *Server) Start(addr string) error {
	return s.echo.Start(addr)
}
