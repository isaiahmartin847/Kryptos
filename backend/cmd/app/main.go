package main

import (
	"log"

	// "github.com/isaiahmartin847/Reg-Maps/internal/stripe" // Import the stripe package

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	// "github.com/stripe/stripe-go/v74"
)

func main() {

	err := godotenv.Load("../../.env") 
	if err != nil {
		log.Fatal("Unable to load dotenv")
	}

	// stripeAPIKey := os.Getenv("STRIPE_API_KEY")

	e := echo.New()

	// stripeClient := &stripe.Client{
	// 	APIKey: "your-secret-key",
	// }

	// handler := &stripe.Handler{}

	// e.POST("/payment-intent", handler.Stripe_transaction)

	// Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
