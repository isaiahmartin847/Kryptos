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
	// change CORS to not let any url hit the end api
	s.echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{
			"http://192.168.1.247:3000",
			"https://kryptosai.pro",
			"https://app.kryptosai.pro",
			"http://app.localhost:3000",
			"http://localhost:3000",
		},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))
}

func (s *Server) ConfigureRoutes() {

	stockGroup := s.echo.Group("/stock")
	userGroup := s.echo.Group("/user")

	userGroup.GET("/terms", s.handler.GetTerm)
	userGroup.GET("/terms/has-terms", s.handler.HasUserAcceptedTerms)
	userGroup.POST("/terms", s.handler.CreateSignedTerm)

	stockGroup.GET("/", s.handler.GetAllStocks)
	stockGroup.GET("/:ticker", s.handler.GetStockByTicker)

	// General routes
	s.echo.POST("/user-created-payload", s.handler.UserWebhookPayload())
	s.echo.POST("/payment-intent", s.handler.Stripe_transaction)
	s.echo.POST("/stock/save", s.handler.SaveStock)

	s.echo.GET("/chart", s.handler.GetChartData)
	s.echo.GET("/stock", s.handler.GetAllStocks)
	s.echo.GET("/saved", s.handler.GetSavedStocks)
	s.echo.GET("/health", s.handler.HealthCheck)
	s.echo.DELETE("/saved/:id", s.handler.DeleteSavedStock)

}

func (s *Server) Start(addr string) error {
	return s.echo.Start(addr)
}
