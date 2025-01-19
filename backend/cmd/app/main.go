package main

import (
	"log"

	"github.com/isaiahmartin847/Reg-Maps/internal/config"
	handler "github.com/isaiahmartin847/Reg-Maps/internal/hanlders"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/internal/service"

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
	db, err := config.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	// Initialize specific repositories
	userRepo := repositories.NewUserRepository(db)
	sessionRepo := repositories.NewSessionRepository(db)
	stateRepo := repositories.NewStateRepository(db)
	speciesRepo := repositories.NewSpeciesRepository(db)

	// Initialize services
	userService := service.NewUserService(userRepo)
	sessionService := service.NewSessionService(sessionRepo)
	stateService := service.NewStateService(stateRepo)
	speciesService := service.NewSpeciesService(speciesRepo)

	// Initialize handler
	// Note make sure you put the new service inside the handler struct
	handler := &handler.Handler{
		UserService:    userService,
		SessionService: sessionService,
		StateService:   stateService,
		SpeciesService: speciesService,
	}

	// Initialize Echo
	e := echo.New()

	sessionGroup := e.Group("/session")

	// Configure CORS
	e.Use(middleware.CORSWithConfig(middleware.CORSConfig{
		AllowOrigins: []string{"*"},
		AllowMethods: []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders: []string{"Content-Type", "Authorization"},
	}))

	// session group
	//get requests
	sessionGroup.GET("/all", handler.GetSessionsByID)
	// post requests
	sessionGroup.POST("/create", handler.CreateSession)

	// general groups
	e.POST("/user-created-payload", handler.UserWebhookPayload())
	e.POST("/payment-intent", handler.Stripe_transaction)
	e.GET("/", handler.Details)
	e.GET("/states", handler.AllStates)
	e.GET("/species", handler.GetAllSpecies)
	// Start the Echo server
	e.Logger.Fatal(e.Start(":8080"))
}
