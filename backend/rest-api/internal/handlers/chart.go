package handler

import (
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/labstack/echo/v4"
)

func (h *Handler) GetAllBtc(c echo.Context) error {
	ctx := c.Request().Context()

	bitcoinPrices, err := h.BtcService.GetAllBtc(ctx)

	if err != nil {
		logger.Error("Error: unable to fetch bitcoin prices %v", err)

		// Return JSON response with error
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Unable to fetch the bitcoin prices",
		})
	}

	response := models.ApiResponse[models.Btc]{
		Status: "success",
		Data: models.Data[models.Btc]{
			Items: bitcoinPrices,
			Meta:  models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusOK, response)

}

func (h *Handler) GetLatestPrediction(c echo.Context) error {
	ctx := c.Request().Context()

	prediction, err := h.BtcService.GetLatestPrediction(ctx)
	if err != nil {
		logger.Error("Unable to get the prediction, %v", err)
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Unable to fetch the latest btc prediction",
		})
	}

	return c.JSON(http.StatusOK, prediction)

}

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

	response := models.ApiResponse[models.ChartData]{
		Status: "success",
		Data: models.Data[models.ChartData]{
			Items: chartData,
			Meta:  models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusOK, response)

}
