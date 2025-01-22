package repositories

import (
	"context"
	"fmt"

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

func (r *StateRepository) GetAll(ctx context.Context) ([]models.State, error) {
	var states []models.State

	results := r.db.WithContext(ctx).Find(&states)
	if results.Error != nil {
		return nil, fmt.Errorf("failed to fetch the states %w", results.Error)
	}

	return states, nil
}
