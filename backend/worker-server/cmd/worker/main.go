package main

import (
	"log"
	"os"
	"os/signal"
	"syscall"
	"time"

	"worker-server/internal/db"
	"worker-server/internal/jobs"
	"worker-server/internal/repository"

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

	database, err := db.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	// Repo instance
	repo := repository.NewRepository(database)

	// Jobs instance
	JobsInstance := jobs.NewJob(repo)

	scheduler := gocron.NewScheduler(time.UTC)

	// scheduler.Every(1).Minute().Do(jobs.TestJob)
	// scheduler.Every(5).Minute().Do(jobs.GetBtcPrice)
	scheduler.Every(5).Minute().Do(JobsInstance.GetBtcPrice)

	scheduler.StartAsync()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	log.Println("Worker server started. Press Ctrl+C to stop.")

	<-quit

	log.Println("Shutting down worker server...")
	scheduler.Stop()
	log.Println("Worker server stopped")
}
