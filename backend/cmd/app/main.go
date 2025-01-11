package main

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/stripe"
	"github.com/labstack/echo/v4"
)

func main() {
	e := echo.New()

	// Create a new group for Stripe routes
	stripeGroup := e.Group("/stripe")

	// Initialize the stripe handler and register its routes
	stripeHandler := stripe.NewHandler()
	stripeHandler.RegisterRoutes(stripeGroup)

	// Start the server
	e.Logger.Fatal(e.Start(":8080"))
}
