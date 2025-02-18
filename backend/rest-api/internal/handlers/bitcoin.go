package handler

import (
	"net/http"

	"github.com/labstack/echo/v4"
)

type Response struct {
	Message string `json:"message"`
	Status  string `json:"status"`
}

func (h *Handler) GetAllBitcoin(c echo.Context) error {
	ctx := c.Request().Context()

	bitcoinPrices, err := h.BitcoinService.GetAll(ctx)

	if err != nil {
		return c.JSON(http.StatusBadRequest, Response{
			Message: "Unable to fetch the bitcoin prices",
			Status:  "error",
		})
	}

	return c.JSON(http.StatusOK, bitcoinPrices)

}
