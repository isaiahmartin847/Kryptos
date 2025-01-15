package repositories

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)


type UserRepositories struct {
	db *gorm.DB
}


func (r *UserRepositories) GetAllUsers () ([]*models.User, error) {
	var users []*models.User

	if err := r.db.Find(&users).Error; err != nil {
		return nil, err 
	}

	return users, nil 

}