package handler

import (
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/labstack/echo/v4"
)

type Response struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func (h *Handler) GetAllBtc(c echo.Context) error {
	ctx := c.Request().Context()

	bitcoinPrices, err := h.BtcService.GetAll(ctx)

	if err != nil {
		logger.Error("Error: unable to fetch bitcoin prices %v", err)

		// Return JSON response with error
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Unable to fetch the bitcoin prices",
		})
	}

	response := models.ApiResponse[models.Btc]{
		Status: "succuss",
		Data: models.Data[models.Btc]{
			Items: bitcoinPrices,
			Meta:  models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusOK, response)

}
