package main

// to run this go to the root then run cmd: infisical run --path /rest -- air

import (
	"log"
	"os"

	"github.com/isaiahmartin847/Reg-Maps/config"
	"github.com/isaiahmartin847/Reg-Maps/internal/app"
	"github.com/isaiahmartin847/Reg-Maps/internal/server"
	"github.com/isaiahmartin847/Reg-Maps/logger"
)

func main() {

	logger.Setup()

	// Connect to the database
	db, err := config.ConnectDatabase()
	if err != nil {
		logger.Fatal("Fatal: unable to connect to the database %v", err)
	}

	// Initialize dependencies with error handling
	handler, err := app.InitializeDependencies(db)
	if err != nil {
		logger.Fatal("Fatal failed to init all the decencies. %v", err)
	}

	// Create and configure server
	srv := server.NewServer(handler)
	srv.ConfigureMiddleware()
	srv.ConfigureRoutes()

	port := os.Getenv("HOST_PORT")

	// Log server startup
	logger.Info("Server running on port: %v", port)

	// Start the server
	log.Fatal(srv.Start(os.Getenv("HOST_PORT")))
}
