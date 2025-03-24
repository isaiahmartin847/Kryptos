package handler

import (
	"net/http"
	"os"

	model "github.com/isaiahmartin847/Reg-Maps/internal/models"

	"github.com/labstack/echo/v4"
	"github.com/stripe/stripe-go/v75"
	"github.com/stripe/stripe-go/v75/paymentintent"
)

// TODO update this so you don't init a new stripe client every request
// TODO fix the problem with the strip key not being passed
func (h *Handler) Stripe_transaction(c echo.Context) error {
	transaction := &model.Stripe{}
	StripeAPIKey := os.Getenv("STRIPE_API_KEY")

	stripe.Key = StripeAPIKey

	if err := c.Bind(transaction); err != nil {
		return err
	}

	//	handles the case that the value is 0 or negative
	if transaction.Amount <= 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "Amount must be a positive number")
	}

	paymentIntent, err := paymentintent.New(&stripe.PaymentIntentParams{
		Amount:   stripe.Int64(transaction.Amount),
		Currency: stripe.String("usd"),
	})
	if err != nil {
		return echo.NewHTTPError(http.StatusInternalServerError, "Unable to create a payment intent")
	}

	return c.JSON(http.StatusCreated, paymentIntent)

}
