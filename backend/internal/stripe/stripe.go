package stripe

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

// Handler is a struct to hold any dependencies for the stripe package.
type Handler struct{}

// NewHandler initializes a new Handler for the stripe package.
func NewHandler() *Handler {
	return &Handler{}
}

// Hello is an endpoint handler that responds with "hello".
func (h *Handler) Hello(c echo.Context) error {
	return c.String(http.StatusOK, "this is the stripe key")
}

// RegisterRoutes registers the stripe-related routes with Echo.
func (h *Handler) RegisterRoutes(e *echo.Group) {
	e.GET("/hello", h.Hello)
}
