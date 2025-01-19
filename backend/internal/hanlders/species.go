package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetAllSpecies(c echo.Context) error {

	species, err := h.SpeciesService.GetAll()
	if err != nil {
		return c.JSON(http.StatusBadGateway, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusCreated, species)
}
