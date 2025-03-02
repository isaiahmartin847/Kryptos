package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/labstack/echo/v4"
)

func (h *Handler) GetStockByTicker(c echo.Context) error {
	ctx := c.Request().Context()

	// add more starlization like making these all caps
	ticker := strings.ToUpper(strings.TrimSpace(c.QueryParam("ticker")))

	// Make sure ticker is in the right format
	if ticker == "" || len(ticker) > 5 {
		logger.Error("Invalid ticker format", "ticker", ticker)
		return c.JSON(http.StatusBadRequest, models.Error{
			Code:    http.StatusBadRequest,
			Message: "Invalid ticker format. Ticker must be between 1-5 characters.",
		})
	}

	stock, err := h.StockService.GetByTicker(ctx, ticker)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: fmt.Sprintf("Unable to query the ticker with %v ticker", ticker),
		})
	}

	response := models.ApiResponse[models.Stock]{
		Status: "success",
		Data: models.Data[models.Stock]{
			Items: []models.Stock{*stock},
			Meta:  models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusOK, response)

}
