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

// GET
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

func (r *UserRepository) GetTerms(ctx context.Context) (*models.TermsAndConditions, error) {
	var terms models.TermsAndConditions

	if err := r.db.WithContext(ctx).Order("Created_at desc").First(&terms).Error; err != nil {
		logger.Error("Unable to get the latest terms and conditions")
		return nil, err
	}

	return &terms, nil

}

func (r *UserRepository) GetSignedTerm(ctx context.Context, userId string) (*models.SignedTerms, error) {
	var signedTerm models.SignedTerms

	if err := r.db.WithContext(ctx).Order("created_at desc").Where("user_id = ?", userId).First(&signedTerm).Error; err != nil {
		if err == gorm.ErrRecordNotFound {
			logger.Error("No record of this signed terms was found")
		}
		return nil, err
	}

	return &signedTerm, nil

}

// POST

func (r *UserRepository) Create(ctx context.Context, user *models.User) (*models.User, error) {
	if err := r.db.WithContext(ctx).Create(user).Error; err != nil {
		logger.Error("Error: failed to create the user in the database, userid: %v error: %v", user.ID, err)
		return nil, fmt.Errorf("failed to create a user %w", err)
	}
	return user, nil
}

func (r *UserRepository) CreateSignedTerm(ctx context.Context, signedTerm *models.SignedTerms) (*models.SignedTerms, error) {
	if err := r.db.WithContext(ctx).Create(signedTerm).Error; err != nil {
		logger.Error("failed to create a signed term with the user id of %v", signedTerm.UserID)
		return nil, err
	}

	return signedTerm, nil
}
