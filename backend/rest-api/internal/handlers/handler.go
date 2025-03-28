package handler

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
	"github.com/stripe/stripe-go/v75/client"
)

type Handler struct {
	UserService  *service.UserService
	ChartService *service.ChartService
	StockService *service.StockService
	StripeClient *client.API
}
