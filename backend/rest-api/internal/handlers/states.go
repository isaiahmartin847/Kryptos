package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) AllStates(c echo.Context) error {
	ctx := c.Request().Context()

	states, err := h.StateService.GetAll(ctx)
	if err != nil {
		return c.JSON(http.StatusBadGateway, map[string]string{"error": err.Error()})
	}
	return c.JSON(http.StatusOK, states)
}
