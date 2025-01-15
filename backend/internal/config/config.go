package config

import (
	"fmt"
	"log"

	"github.com/jinzhu/gorm"
	_ "github.com/jinzhu/gorm/dialects/postgres"
)

// Global variable to hold the database connection
var DB *gorm.DB

// ConnectDatabase connects to the PostgreSQL database
func ConnectDatabase() {
	var err error
	// Connection string to your PostgreSQL database (adjust as needed)
	dsn := "host=localhost port=5432 user=postgres dbname=postgres sslmode=disable password="

	// Attempt to connect to the database
	DB, err = gorm.Open("postgres", dsn)
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
	fmt.Println("Connected to the database successfully!")
}
