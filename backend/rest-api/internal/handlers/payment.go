package handler

import (
	"net/http"

	model "github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/stripe/stripe-go/v75"

	"github.com/labstack/echo/v4"
)

func (h *Handler) Stripe_transaction(c echo.Context) error {
	transaction := &model.Stripe{}

	if err := c.Bind(transaction); err != nil {
		return err
	}

	//	handles the case that the value is 0 or negative
	if transaction.Amount <= 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "Amount must be a positive number")
	}

	paymentIntent, err := h.StripeClient.PaymentIntents.New(&stripe.PaymentIntentParams{
		Amount:   stripe.Int64(transaction.Amount),
		Currency: stripe.String("usd"),
	})

	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to create a payment intent")
	}

	return c.JSON(http.StatusCreated, paymentIntent)

}
