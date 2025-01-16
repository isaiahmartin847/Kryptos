package service

import (
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	repository "github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type UserService struct {
	UserRepo *repository.UserRepository
}

func NewUserService(userRepo *repository.UserRepository) *UserService {
	return &UserService{UserRepo: userRepo}
}

func (s *UserService) CreateUser(user *models.User) (*models.User, error) {

	if user.FirstName == "" || user.LastName == "" || user.Email == "" {
		return nil, fmt.Errorf("missing required fields")
	}

	createdUser, err := s.UserRepo.CreateUser(user)
	if err != nil {
		return nil, err
	}

	return createdUser, nil
}
