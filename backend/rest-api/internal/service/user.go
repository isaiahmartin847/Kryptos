package service

import (
	"context"
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	repository "github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/logger"
)

type UserService struct {
	UserRepo *repository.UserRepository
}

func NewUserService(userRepo *repository.UserRepository) *UserService {
	return &UserService{UserRepo: userRepo}
}

func (s *UserService) HasUserAcceptedTerms(ctx context.Context, userId string) (*models.UserTerms, error) {
	userTerms, err := s.UserRepo.HasUserAcceptedTerms(ctx, userId)

	if err != nil {
		return nil, err
	}

	return userTerms, nil
}

func (s *UserService) CreateUser(ctx context.Context, user *models.User) (*models.User, error) {

	if user.FirstName == "" || user.LastName == "" || user.Email == "" {
		return nil, fmt.Errorf("missing required fields")
	}

	createdUser, err := s.UserRepo.Create(ctx, user)
	if err != nil {
		logger.Error("Error: unable to create the user %v", err)
		return nil, err
	}

	return createdUser, nil
}
