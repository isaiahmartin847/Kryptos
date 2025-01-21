package service

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type HuntingUnitService struct {
	HuntingUnitRepo *repositories.HuntingUnitRepository
}

func NewHuntingUnitService(huntingUnitRepo *repositories.HuntingUnitRepository) *HuntingUnitService {
	return &HuntingUnitService{HuntingUnitRepo: huntingUnitRepo}
}

func (s *HuntingUnitService) GetAllUnitsBySpecies(speciesID int64) ([]models.HuntingUnitResponse, error) {
	huntingUnits, err := s.HuntingUnitRepo.GetBySpeciesID(speciesID)

	if err != nil {
		return nil, err
	}

	return huntingUnits, nil
}
