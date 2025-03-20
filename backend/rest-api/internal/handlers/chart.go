package handler

import (
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/labstack/echo/v4"
)

func (h *Handler) GetChartData(c echo.Context) error {
	ctx := c.Request().Context()

	ticker := c.QueryParam("ticker")

	logger.Info("this is the ticker: %v", ticker)

	chartData, err := h.BtcService.GetChartData(ctx, ticker)
	if err != nil {
		logger.Error("Unable to get the join table of %v prices and forecast, %v", ticker, err)
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Unable to get the chart data",
		})
	}

	stock, err := h.StockService.GetByTicker(ctx, ticker)
	if err != nil {
		logger.Error("Unable to get the stock with the ticker provided")
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Unable to get the stock related to the ticker",
		})
	}

	response := models.ApiResponse[models.ChartData]{
		Status: "success",
		Data: models.Data[models.ChartData]{
			Items: chartData,
			Stock: &stock,
			Meta:  models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusOK, response)

}
