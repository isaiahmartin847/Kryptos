package main

import (
	"log"

	"github.com/isaiahmartin847/Reg-Maps/internal/config"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"
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

	// Connect to the database
	config.ConnectDatabase()

	// Initialize repository, service, and handler
	userRepo := &repositories.UserRepositories{DB: config.DB}
	userService := service.NewUserService(userRepo)
	handler := &handler.Handler{UserService: userService}
	

	// Initialize Echo
	e := echo.New()

	// Configure CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	// Define routes
	e.POST("/user-created-payload", handler.UserWebhookPayload())
	e.POST("/payment-intent", handler.Stripe_transaction)
	e.GET("/", handler.Details)

	// Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
