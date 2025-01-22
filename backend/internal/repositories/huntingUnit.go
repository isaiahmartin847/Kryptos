package repositories

import (
	"context"
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type HuntingUnitRepository struct {
	db *gorm.DB
}

func NewHuntingUnitRepository(db *gorm.DB) *HuntingUnitRepository {
	return &HuntingUnitRepository{
		db: db,
	}
}

func (r *HuntingUnitRepository) GetBySpeciesID(ctx context.Context, speciesID int64) ([]models.HuntingUnitResponse, error) {
	var units []models.HuntingUnitResponse

	result := r.db.WithContext(ctx).Select("id, name").
		Where("species_id = ?", speciesID).
		Order("name").
		Find(&units)

	if result.Error != nil {
		return nil, fmt.Errorf("unable to get species by ID: %d error: %w", speciesID, result.Error)
	}

	return units, nil
}
