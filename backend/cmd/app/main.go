package main

import (
	"log"

	handler "github.com/isaiahmartin847/Reg-Maps/internal/transport"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)

func main() {
	// Load environment variables
	err := godotenv.Load("../../.env")
	if err != nil {
		log.Fatal("Unable to load dotenv")
	}

	// Initialize Echo
	e := echo.New()

	// Configure CORS to allow everything
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"}, // Allow all origins
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	// Set up handlers
	handler := &handler.Handler{}
	e.POST("/payment-intent", handler.Stripe_transaction)

	// Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
