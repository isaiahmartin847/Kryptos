package main

import (
	"fmt"
	"os"
	"os/signal"
	"syscall"
	"time"

	"worker-server/internal/ai"
	"worker-server/internal/db"
	"worker-server/internal/jobs"
	"worker-server/internal/repository"
	"worker-server/logger"

	"github.com/go-co-op/gocron"
)

func main() {

	logger.Setup()

	// err := godotenv.Load()
	// if err != nil {
	// 	logger.Fatal("Fatal unable to load .env file")
	// }

	// err := os.Chdir("../..")
	// if err != nil {
	// 	logger.Error("Error changing directory: %v", err)
	// }

	openaiKey := os.Getenv("OPENAI_KEY")
	if openaiKey == "" {
		logger.Fatal("Fatal OPENAI_KEY environment variable is required")
	}

	aiClient := ai.NewAIClient(openaiKey)
	if aiClient == nil {
		logger.Fatal("Fatal failed to initialize AI client")

	}

	database, err := db.ConnectDatabase()
	if err != nil {
		logger.Fatal("Fatal unable to connect to the DB")
	}

	// Repo instance
	repo := repository.NewRepository(database)

	// Jobs instance
	JobsInstance := jobs.NewJob(repo, aiClient)

	scheduler := gocron.NewScheduler(time.UTC)

	scheduler.Every(1).Day().Do(func() {
		JobsInstance.InsertNewDailyPrice(1)
		JobsInstance.InsertNewDailyPrice(2)
	})

	scheduler.Every(10).Second().Do(func() {
		logger.Debug("this is the every min")
		fmt.Println("this happens every minute")

	})

	scheduler.StartAsync()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	logger.Info("Worker server started. Press Ctrl+C to stop.")

	<-quit

	logger.Info("Shutting down worker server...")
	scheduler.Stop()
	logger.Info("Worker server stopped")
}
