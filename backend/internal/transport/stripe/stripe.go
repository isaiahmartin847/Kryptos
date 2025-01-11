package handler

import (
	"log"
	"net/http"
	"os"

	model "github.com/isaiahmartin847/Reg-Maps/internal/models"

	"github.com/labstack/echo/v4"
	"github.com/stripe/stripe-go/v75"
	"github.com/stripe/stripe-go/v75/paymentintent"
)

type Handler struct {}



func (h *Handler) Stripe_transaction(c echo.Context) error {
	transaction := &model.Stripe{}
	StripeAPIKey := os.Getenv("STRIPE_API_KEY")

	stripe.Key = StripeAPIKey

	pi, err := paymentintent.New(&stripe.PaymentIntentParams{
		Amount:   stripe.Int64(2000),     // Amount in cents (e.g., $20.00)
		Currency: stripe.String("usd"),  // Currency (e.g., "usd")
	})
	if err != nil {
		log.Fatal("Error creating payment intent:", err)
	}




	if err := c.Bind(transaction); err != nil {
		return err
	}

//	handles the case that the value is 0 or negative
	if transaction.Amount <= 0 {
		return echo.NewHTTPError(http.StatusBadRequest, "Amount must be a positive number")
	}


	return c.JSON(http.StatusCreated, map[string]interface{}{
		"amount": transaction.Amount,
		"payment-intent": pi,
	})

}