package repositories

import (
	"context"
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type HuntingUnitRepositoryInterface interface {
	GetBySpeciesID(ctx context.Context, speciesID int64) ([]models.HuntingUnitResponse, error)
	GetAllHuntingUnits(ctx context.Context) ([]models.HuntingUnit, error)
}

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

func (r *HuntingUnitRepository) GetAllHuntingUnits(ctx context.Context) ([]models.HuntingUnit, error) {
	var units []models.HuntingUnit

	//remove the "48d67ab9-2ff1-4ec7-bd3a-1bc97b93b709" to fix the issues
	result := r.db.WithContext(ctx).
		Preload("BaseRegulation").
		Where("base_regulation_id = ?", "48d67ab9-2ff1-4ec7-bd3a-1bc97b93b709").
		Find(&units)

	if result.Error != nil {
		return nil, fmt.Errorf("unable to get units %v", result.Error)
	}

	return units, nil
}
