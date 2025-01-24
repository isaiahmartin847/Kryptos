package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) About(c echo.Context) error {
	return c.JSON(http.StatusCreated, "this is the real-time server for websockets for Hunt regs")
}
