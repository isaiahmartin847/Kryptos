package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"worker-server/internal/db"
	"worker-server/internal/jobs"

	"github.com/go-co-op/gocron"
	"github.com/joho/godotenv"
)

func main() {

	err := os.Chdir("../..")
	if err != nil {
		log.Fatalf("Error changing directory: %v", err)
	}

	err = godotenv.Load()
	if err != nil {
		log.Fatalf("Error loading .env file: %v", err)
	}

	_, err = db.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	scheduler := gocron.NewScheduler(time.UTC)

	scheduler.Every(1).Minute().Do(jobs.TestJob)

	scheduler.StartAsync()

	scheduler.StartAsync()

	// Handle graceful shutdown
	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	log.Println("Worker server started. Press Ctrl+C to stop.")

	// Wait for interrupt signal
	<-quit

	log.Println("Shutting down worker server...")
	scheduler.Stop()
	log.Println("Worker server stopped")
}
