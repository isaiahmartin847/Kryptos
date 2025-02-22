package main

import (
	"log"
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

	openaiKey := os.Getenv("OPENAI_KEY")
	if openaiKey == "" {
		log.Fatal("OPENAI_KEY environment variable is required")
	}

	aiClient := ai.NewAIClient(openaiKey)
	if aiClient == nil {
		log.Fatal("Failed to initialize AI client")
	}

	database, err := db.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

	// Repo instance
	repo := repository.NewRepository(database)

	// Jobs instance
	JobsInstance := jobs.NewJob(repo, aiClient)

	prediction, err := repo.GetAllBtcPredictions()
	if err != nil {
		logger.Log.Fatalf("unable to get the data %v", err)
	}

	logger.Log.Printf("Predictions: %v", prediction)

	scheduler := gocron.NewScheduler(time.UTC)

	scheduler.Every(1).Day().Do(JobsInstance.InsertBitcoinPrice)
	// scheduler.Every(5).Minute().Do(repo.GetLastThirtyBtcData)

	scheduler.StartAsync()

	quit := make(chan os.Signal, 1)
	signal.Notify(quit, syscall.SIGINT, syscall.SIGTERM)

	logger.Log.Println("Worker server started. Press Ctrl+C to stop.")

	<-quit

	logger.Log.Println("Shutting down worker server...")
	scheduler.Stop()
	logger.Log.Println("Worker server stopped")
}

// this works
// func testInsertPredictionData(repo repository.UserRepository) {
// 	testvar := "97688.13"

// 	// pareses the string into a float
// 	floatVal, err := strconv.ParseFloat(testvar, 64)
// 	if err != nil {
// 		logger.Log.Fatal("convert string to float")
// 	}

// 	testData := models.BitcoinPredictionData{
// 		Price: floatVal,
// 		Date:  time.Now(),
// 	}

// 	err = repo.InsertNewBitcoinPredictionData(&testData)
// 	if err != nil {
// 		logger.Log.Fatalf("error happened while trying to insert data %v", err)
// 	}

// }
