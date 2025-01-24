package main

import (
	"log"
	"os"

	"github.com/isaiahmartin847/realtime-server/config"
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

	_, err := config.ConnectDatabase()
	if err != nil {
		log.Fatal(err)
	}

}
