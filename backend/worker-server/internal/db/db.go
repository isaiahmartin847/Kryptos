package db

import (
	"fmt"
	"os"
	"worker-server/internal/models"
	"worker-server/logger"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDatabase() (*gorm.DB, error) {

	host := os.Getenv("POSTGRES_HOST")
	port := os.Getenv("POSTGRES_PORT")
	user := os.Getenv("POSTGRES_USER")
	name := os.Getenv("POSTGRES_DB")
	pass := os.Getenv("POSTGRES_PASSWORD")

	var err error
	// pass these in as envs
	dsn := fmt.Sprintf(
		"host=%s port=%s user=%s dbname=%s password=%s sslmode=disable connect_timeout=5",
		host, port, user, name, pass,
	)
	// Open the database connection
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %w", err)
	}

	logger.Info("Database connected")

	// Run migrations
	err = db.AutoMigrate(models.Stock{}, models.PriceForecast{}, models.DailyPrice{})
	if err != nil {
		return nil, fmt.Errorf("error running migrations: %w", err)
	}

	logger.Info("migration success")

	// Return the database connection
	return db, nil
}
