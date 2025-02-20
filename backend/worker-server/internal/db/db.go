package db

import (
	"fmt"
	"os"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() (*gorm.DB, error) {

	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	user := os.Getenv("POSTGRES_USER")
	name := os.Getenv("POSTGRES_NAME")
	pass := os.Getenv("POSTGRES_PASS")

	var err error
	// pass these in as envs
	dsn := fmt.Sprintf("host=%s port=%s user=%s dbname=%s sslmode=disable password=%s", host, port, user, name, pass)

	// Open the database connection
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %w", err)
	}

	fmt.Println("Connected to the database successfully!")

	// Run migrations
	err = db.AutoMigrate()
	if err != nil {
		return nil, fmt.Errorf("error running migrations: %w", err)
	}

	fmt.Println("migration success")

	// Return the database connection
	return db, nil
}
