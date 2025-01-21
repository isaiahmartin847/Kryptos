package handler

import (
	"fmt"
	"net/http"
	"strconv"

	"github.com/labstack/echo/v4"
)

func (h *Handler) GetAllBySpeciesID(c echo.Context) error {
	queriedID := c.QueryParam("speciesID")

	speciesID, err := strconv.ParseInt(queriedID, 10, 64)
	if err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "The state ID you provided was not a true number",
		})
	}

	huntingUnits, err := h.HuntingUnitService.GetAllUnitsBySpecies(speciesID)
	if err != nil {
		fmt.Print(err)
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Unable to fetch the species with that state ID.",
		})
	}

	return c.JSON(http.StatusOK, huntingUnits)
}
