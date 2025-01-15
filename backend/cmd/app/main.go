package main

import (
	"fmt"
	"log"

	"github.com/isaiahmartin847/Reg-Maps/internal/config"
	models "github.com/isaiahmartin847/Reg-Maps/internal/models"
	handler "github.com/isaiahmartin847/Reg-Maps/internal/transport"

	"github.com/joho/godotenv"
	"github.com/labstack/echo/v4"
	"github.com/labstack/echo/v4/middleware"
)



func main() {
	// Load environment variables
	err := godotenv.Load(".env")
	if err != nil {
		log.Fatal("Unable to load dotenv")
	}

	config.ConnectDatabase()


	var tests []models.Test
	if err := config.DB.Find(&tests).Error; err != nil {
		log.Fatalf("Error retrieving data from database: %v", err)
	}

	fmt.Println("All records from the test table:")
	for _, test := range tests {
		fmt.Printf("ID: %d, Test: %v, Timestamp: %s\n", test.ID, test.TestValue, test.AutoTimestamp)
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
