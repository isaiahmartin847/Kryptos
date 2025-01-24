package main

import (
	"log"
	"os"

	"github.com/isaiahmartin847/Reg-Maps/config"
	"github.com/isaiahmartin847/Reg-Maps/internal/ai"
	"github.com/isaiahmartin847/Reg-Maps/internal/app"
	"github.com/isaiahmartin847/Reg-Maps/internal/server"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("Warning: .env file not found, using environment variables")
	}

	// Validate required environment variables
	openaiKey := os.Getenv("OPENAI_KEY")
	if openaiKey == "" {
		log.Fatal("OPENAI_KEY environment variable is required")
	}

	// Connect to the database
	db, err := config.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	// Initialize AI client
	aiClient := ai.NewAIClient(openaiKey)
	if aiClient == nil {
		log.Fatal("Failed to initialize AI client")
	}

	// Initialize dependencies with error handling
	handler, err := app.InitializeDependencies(db, aiClient)
	if err != nil {
		log.Fatal("Failed to initialize dependencies:", err)
	}

	// Create and configure server
	srv := server.NewServer(handler)
	srv.ConfigureMiddleware()
	srv.ConfigureRoutes()

	// Log server startup
	log.Printf("Server starting on :8080")

	// Start the server
	if err := srv.Start(":8080"); err != nil {
		log.Fatal("Server failed to start:", err)
	}
}
