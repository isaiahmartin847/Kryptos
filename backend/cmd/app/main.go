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

	// Initialize base repository
	baseRepo := &repositories.Repository{DB: config.DB}

	// Initialize specific repositories
	userRepo := repositories.NewUserRepository(baseRepo)
	sessionRepo := repositories.NewSessionRepository(baseRepo)

	// Initialize services
	userService := service.NewUserService(userRepo)
	sessionService := service.NewSessionService(sessionRepo)

	// Initialize handler
	handler := &handler.Handler{
		UserService:    userService,
		SessionService: sessionService,
	}

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
	e.POST("/create-session", handler.CreateSession)
	e.GET("/", handler.Details)

	// Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
