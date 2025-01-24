package main

import (
	"log"
	"os"

	"github.com/isaiahmartin847/realtime-server/config"
	"github.com/isaiahmartin847/realtime-server/internal/ai"
	"github.com/isaiahmartin847/realtime-server/internal/app"
	"github.com/isaiahmartin847/realtime-server/internal/server"
	"github.com/joho/godotenv"
)

func main() {
	if err := godotenv.Load(".env"); err != nil {
		log.Printf("Warning: .env file is not found")
	}

	openaiKey := os.Getenv("OPENAI_KEY")
	if openaiKey == "" {
		log.Fatal("OPENAI_KEY environment variable is required")
	}

	db, err := config.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	aiClient := ai.NewAIClient(openaiKey)
	if aiClient == nil {
		log.Fatal("Failed to initialize AI client")
	}

	handler, err := app.InitializeDependencies(db, aiClient)
	if err != nil {
		log.Fatal("Failed to initialize dependencies:", err)
	}

	srv := server.NewServer(handler)
	srv.ConfigureMiddleware()
	srv.ConfigureRoutes()

	log.Fatal(srv.Start(os.Getenv("HOST_PORT")))

}
