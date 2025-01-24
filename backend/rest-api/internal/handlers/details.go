package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)




func (h *Handler) Details(c echo.Context) error { 
	return c.JSON(http.StatusCreated, "this is the hunt regs api")
}