package main

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/stripe" // Import the stripe package
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	handler := &stripe.Handler{}

	e.POST("/charge", handler.Stripe_transaction)

	// Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
