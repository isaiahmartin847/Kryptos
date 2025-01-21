package repositories

import (
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

func (r *HuntingUnitRepository) GetBySpeciesID(speciesID int64) ([]models.HuntingUnit, error) {
	var units []models.HuntingUnit

	result := r.db.Where("species_id = ?", speciesID).Preload("Species").Find(&units)
	if result.Error != nil {
		return nil, result.Error
	}

	return units, nil
}
