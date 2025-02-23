package handler

import (
	"net/http"

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

		return c.JSON(http.StatusBadRequest, Response{
			Message: "Unable to fetch the bitcoin prices",
			Status:  "error",
		})
	}

	return c.JSON(http.StatusOK, bitcoinPrices)

}
