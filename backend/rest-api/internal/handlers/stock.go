package handler

import (
	"fmt"
	"net/http"
	"strings"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/labstack/echo/v4"
)

// GET HANDLER
func (h *Handler) GetStockByTicker(c echo.Context) error {
	ctx := c.Request().Context()

	// add more starlization like making these all caps
	ticker := strings.ToUpper(strings.TrimSpace(c.Param("ticker")))

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
			Items: []models.Stock{stock},
			Meta:  models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusOK, response)

}

func (h *Handler) GetAllStocks(c echo.Context) error {
	ctx := c.Request().Context()

	stocks, err := h.StockService.GetAllStocks(ctx)
	if err != nil {
		logger.Error("Unable to get the stocks")

		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Server was unable to get the stocks",
		})

	}

	response := models.ApiResponse[models.Stock]{
		Status: "success",
		Data: models.Data[models.Stock]{
			Items: stocks,
			Meta:  models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusOK, response)

}

// POST HANDLERS

func (h *Handler) SaveStock(c echo.Context) error {
	ctx := c.Request().Context()
	var reqBody models.SavedStock

	if err := c.Bind(&reqBody); err != nil {
		return c.JSON(http.StatusBadRequest, map[string]string{
			"error": "Invalid request payload",
		})
	}

	err := h.StockService.SaveStock(ctx, &reqBody)

	if err != nil {
		logger.Error("Unable to save stock")

		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Server was unable to save that stock to that user",
		})

	}

	response := models.ApiResponse[models.SavedStock]{
		Status: "success",
		Data: models.Data[models.SavedStock]{
			Item: reqBody,
			Meta: models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusCreated, response)

}
