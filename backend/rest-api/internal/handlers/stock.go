package handler

import (
	"fmt"
	"net/http"
	"strconv"
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

	// Declare userId as a pointer to a string
	var userId *string

	userIdQuery := c.QueryParam("userId")

	// If the userId query param is not empty, assign it to userId
	if userIdQuery != "" {

		prefix := strings.Split(userIdQuery, "_")

		if prefix[0] != "user" {
			logger.Error("User failed to pass in a correct user ID.")
			return c.JSON(http.StatusBadRequest, models.Error{
				Code:    http.StatusBadRequest,
				Message: "The user given was not correct.",
			})
		}

		userId = &userIdQuery
	}

	stocks, err := h.StockService.GetAllStocks(ctx, userId)
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

func (h *Handler) GetSavedStocks(c echo.Context) error {
	ctx := c.Request().Context()

	userId := c.QueryParam("userId")

	// TODO add in some query param checking before running the query

	savedStocks, err := h.StockService.GetSavedStocksWithUserId(ctx, userId)

	if err != nil {
		logger.Error("unable to get the saved stocks")

		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "Server was unable to get the saved stocks",
		})
	}

	response := models.ApiResponse[models.SavedStock]{
		Status: "success",
		Data: models.Data[models.SavedStock]{
			Items: savedStocks,
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
		return c.JSON(http.StatusBadRequest, models.Error{
			Code:    http.StatusBadRequest,
			Message: "Invalid request payload",
		})
	}

	err := h.StockService.SaveStock(ctx, &reqBody)

	if err != nil {
		logger.Error("Unable to save stock")

		return c.JSON(http.StatusInternalServerError, models.Error{
			Code: http.StatusInternalServerError,
			// TODO fix this error and add some more error handling
			Message: "Server was unable to save that stock to that user",
		})

	}

	response := models.ApiResponse[models.SavedStock]{
		Status: "success",
		Data: models.Data[models.SavedStock]{
			Item: &reqBody,
			Meta: models.Meta{Version: "1.0"},
		},
	}

	return c.JSON(http.StatusCreated, response)

}

// DELETE FUNCTIONS

func (h *Handler) DeleteSavedStock(c echo.Context) error {
	ctx := c.Request().Context()

	savedStockIdParam := c.Param("id")

	savedStockId, err := strconv.ParseInt(savedStockIdParam, 10, 64)

	if err != nil {
		return c.JSON(http.StatusBadRequest, models.Error{
			Code:    http.StatusBadRequest,
			Message: fmt.Sprintf("Invalid param: 'savedStockId' must be a integer. Error: %v", err),
		})
	}

	err = h.StockService.DeleteSavedStock(ctx, savedStockId)

	if err != nil {
		return c.JSON(http.StatusInternalServerError, models.Error{
			Code:    http.StatusInternalServerError,
			Message: "An unexpected internal server error occurred",
		})
	}

	return c.JSON(http.StatusOK, models.ApiMsgResponse{
		Status:  "success",
		Message: fmt.Sprintf("Saved stock with id %v has been deleted.", savedStockId),
	})

}
