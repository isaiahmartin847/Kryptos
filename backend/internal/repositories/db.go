package repositories

import (
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

// Remove global DB variable

func ConnectDatabase() (*gorm.DB, error) {
	var err error
	dsn := "host=localhost port=5432 user=postgres dbname=postgres sslmode=disable password=Developer*1"

	// Open the database connection
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, fmt.Errorf("error connecting to the database: %w", err)
	}

	fmt.Println("Connected to the database successfully!")

	// Run migrations
	err = db.AutoMigrate(&models.User{}, &models.Session{}, &models.State{}, &models.Species{}, &models.HuntingUnit{})
	if err != nil {
		return nil, fmt.Errorf("error running migrations: %w", err)
	}

	fmt.Println("migration success")

	// Return the database connection
	return db, nil
}
