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

func (r *HuntingUnitRepository) GetBySpeciesID(speciesID int64) ([]models.HuntingUnitResponse, error) {
	var units []models.HuntingUnitResponse

	result := r.db.Select("id, name").
		Where("species_id = ?", speciesID).
		Order("name").
		Find(&units)

	if result.Error != nil {
		return nil, result.Error
	}

	return units, nil
}
