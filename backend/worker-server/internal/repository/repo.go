package repository

import "gorm.io/gorm"

type UserRepository interface {
	// Define methods you want to implement
	// Create(user *models.User) error
	// FindAll() ([]models.User, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) UserRepository {
	return &repository{db: db}
}
