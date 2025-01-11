package main

import (
	"log"

	handler "github.com/isaiahmartin847/Reg-Maps/internal/transport/stripe"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
)

func main() {

	err := godotenv.Load("../../.env") 
	if err != nil {
		log.Fatal("Unable to load dotenv")

		
	}
	

	e := echo.New()


	handler := &handler.Handler{}

	e.POST("/payment-intent", handler.Stripe_transaction)

	// // Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
