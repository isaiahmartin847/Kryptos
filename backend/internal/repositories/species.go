package repositories

import (
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

func (r *SpeciesRepository) GetAll() ([]models.Species, error) {
	var species []models.Species

	result := r.db.Find(&species)
	if result.Error != nil {
		// log a error about the db
		return nil, result.Error
	}

	return species, nil
}

func (r *SpeciesRepository) GetALLByState(stateID int64) ([]models.Species, error) {
	var species []models.Species

	// Query for species where the state_id matches and optionally preload State data
	result := r.db.Where("state_id = ?", stateID).Preload("State").Find(&species)
	if result.Error != nil {
		return nil, result.Error
	}

	return species, nil
}
