package repositories

import (
	"context"
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type SpeciesRepository struct {
	db *gorm.DB
}

func NewSpeciesRepository(db *gorm.DB) *SpeciesRepository {
	return &SpeciesRepository{
		db: db,
	}
}

func (r *SpeciesRepository) GetAll(ctx context.Context) ([]models.Species, error) {
	var species []models.Species

	result := r.db.WithContext(ctx).Find(&species)
	if result.Error != nil {
		return nil, fmt.Errorf("failed to fetch the species %w", result.Error)
	}

	return species, nil
}

func (r *SpeciesRepository) GetALLByState(ctx context.Context, stateID int64) ([]models.SpeciesResponse, error) {
	var species []models.SpeciesResponse

	result := r.db.WithContext(ctx).Select("id, name").Where("state_id = ?", stateID).Order("name").Find(&species)

	if result.Error != nil {
		return nil, fmt.Errorf("failed to get the species with id: %d error: %w", stateID, result.Error)
	}

	return species, nil
}
