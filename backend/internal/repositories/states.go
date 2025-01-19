package repositories

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type StateRepository struct {
	db *gorm.DB
}

func NewStateRepository(db *gorm.DB) *StateRepository {
	return &StateRepository{
		db: db,
	}
}

func (r *StateRepository) GetAll() ([]models.State, error) {
	var states []models.State

	result := r.db.Find(&states)
	if result.Error != nil {
		return nil, result.Error
	}

	return states, nil
}
