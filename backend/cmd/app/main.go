package main

import (
	"log"

	"github.com/isaiahmartin847/Reg-Maps/internal/stripe" // Import the stripe package
	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {

	err := godotenv.Load("../../.env") 
	if err != nil {
		log.Fatal("Unable to load dotenv")
	}
	// gets the stripe key 
	// key := os.Getenv("STRIPE_KEY")

	e := echo.New()

	handler := &stripe.Handler{}

	e.POST("/payment-intent", handler.Stripe_transaction)

	// Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
