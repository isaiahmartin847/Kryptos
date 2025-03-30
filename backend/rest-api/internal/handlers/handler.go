package handler

import (
	"net/http"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
	"github.com/labstack/echo/v4"
	"github.com/stripe/stripe-go/v75/client"
)

type Handler struct {
	UserService  *service.UserService
	ChartService *service.ChartService
	StockService *service.StockService
	StripeClient *client.API
}

func (h *Handler) HealthCheck(c echo.Context) error {
	return c.JSON(http.StatusOK, models.ApiMsgResponse{
		Status:  "success",
		Message: "The server is up and running",
	})
}
