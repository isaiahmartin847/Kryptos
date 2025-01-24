package handler

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetAllSpecies(c echo.Context) error {
	ctx := c.Request().Context()

	species, err := h.SpeciesService.GetAll(ctx)
	if err != nil {
		return c.JSON(http.StatusBadGateway, map[string]string{"error": err.Error()})
	}

	return c.JSON(http.StatusOK, species)
}

func (h *Handler) GetAllByStateID(c echo.Context) error {
	ctx := c.Request().Context()
	queriedID := c.QueryParam("stateID")

	// convert the query param to a int64
	stateID, err := strconv.ParseInt(queriedID, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "The state ID you provided was not a true number",
		})
	}

	stateSpecies, err := h.SpeciesService.GetAllByState(ctx, stateID)
	if err != nil {
		fmt.Print(err)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Unable to fetch the species with that state ID.",
		})
	}

	return c.JSON(http.StatusOK, stateSpecies)
}
