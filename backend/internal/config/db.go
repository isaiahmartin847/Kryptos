package config

import (
	"fmt"
	"log"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DB *gorm.DB

func ConnectDatabase() {
	var err error
	dsn := "host=localhost port=5432 user=postgres dbname=postgres sslmode=disable password=Developer*1"

	DB, err = gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	fmt.Println("Connected to the database successfully!")

	err = DB.AutoMigrate(&models.Test{}, &models.User{})
	if err != nil {
		log.Fatal("Error running migrations: ", err)
	}

	fmt.Println("migration success")

}
