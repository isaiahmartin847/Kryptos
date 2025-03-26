package repositories

import (
	"context"
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"gorm.io/gorm"
)

type UserRepository struct {
	db *gorm.DB
}

func NewUserRepository(db *gorm.DB) *UserRepository {
	return &UserRepository{
		db: db,
	}
}

func (r *UserRepository) HasUserAcceptedTerms(ctx context.Context, userId string) (*models.UserTerms, error) {
	var user models.User

	// Query the users table and select only the AcceptedTerms field
	if err := r.db.WithContext(ctx).Where("id = ?", userId).First(&user).Error; err != nil {
		// handle error (e.g., if user not found)
		return nil, err
	}

	// Create the UserTerms object to return only the AcceptedTerms field
	userTerms := &models.UserTerms{
		AcceptedTerms: user.AcceptedTerms,
	}

	return userTerms, nil
}

func (r *UserRepository) Create(ctx context.Context, user *models.User) (*models.User, error) {
	if err := r.db.WithContext(ctx).Create(user).Error; err != nil {
		logger.Error("Error: failed to create the user in the database, userid: %v error: %v", user.ID, err)
		return nil, fmt.Errorf("failed to create a user %w", err)
	}
	return user, nil
}
