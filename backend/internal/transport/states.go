package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) AllStates(c echo.Context) error {
	states, err := h.StateService.GetAll()
	if err != nil {
		return c.JSON(http.StatusBadGateway, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, states)
}
