package repositories

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)


type UserRepositories struct {
    DB *gorm.DB
}

func (r *UserRepositories) CreateUser(user *models.User) (*models.User, error) {
    if err := r.DB.Create(user).Error; err != nil {
        return nil, err
    }
    return user, nil
}