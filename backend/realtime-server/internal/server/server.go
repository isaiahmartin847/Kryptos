package server

import (
	"github.com/isaiahmartin847/realtime-server/internal/handler"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// "github.com/isaiahmartin847/Reg-Maps/internal/websockets"

// "github.com/labstack/echo/v4"
// "github.com/labstack/echo/v4/middleware"

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
	s.echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))
}

func (s *Server) ConfigureRoutes() {
	s.echo.GET("/", s.handler.About)
}

func (s *Server) Start(addr string) error {
	return s.echo.Start(addr)
}
