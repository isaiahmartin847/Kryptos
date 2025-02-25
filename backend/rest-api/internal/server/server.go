package server

import (
	handler "github.com/isaiahmartin847/Reg-Maps/internal/handlers"

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

	// General routes
	s.echo.POST("/user-created-payload", s.handler.UserWebhookPayload())
	s.echo.POST("/payment-intent", s.handler.Stripe_transaction)
	s.echo.GET("/btc", s.handler.GetAllBtc)
	s.echo.GET("/btc/chart", s.handler.GetChartData)
	s.echo.GET("/prediction", s.handler.GetLatestPrediction)
}

func (s *Server) Start(addr string) error {
	return s.echo.Start(addr)
}
