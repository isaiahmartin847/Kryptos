package server

import (
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

// handler "github.com/isaiahmartin847/Reg-Maps/internal/handlers"
// "github.com/isaiahmartin847/Reg-Maps/internal/websockets"

// "github.com/labstack/echo/v4"
// "github.com/labstack/echo/v4/middleware"

type Server struct {
	echo *echo.Echo
	// handler *handler.Handler
}

func NewServer() *Server {
	return &Server{
		echo: echo.New(),
	}
}

func (s *Server) ConfigureMiddleware() {
	s.echo.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))
}
