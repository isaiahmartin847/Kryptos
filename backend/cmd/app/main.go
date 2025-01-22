package main

import (
	"log"

	"github.com/isaiahmartin847/Reg-Maps/config"
	"github.com/isaiahmartin847/Reg-Maps/internal/app"
	"github.com/isaiahmartin847/Reg-Maps/internal/server"
	"github.com/joho/godotenv"
)

func main() {
	// Load environment variables
	if err := godotenv.Load(".env"); err != nil {
		log.Fatal("Unable to load dotenv")
	}

	// Connect to the database
	db, err := config.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	// Initialize dependencies
	handler := app.InitializeDependencies(db)

	// Create and configure server
	srv := server.NewServer(handler)
	srv.ConfigureMiddleware()
	srv.ConfigureRoutes()

	// Start the server
	log.Fatal(srv.Start(":8080"))
}
