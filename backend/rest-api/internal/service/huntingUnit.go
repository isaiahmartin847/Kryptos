package service

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type HuntingUnitService struct {
	HuntingUnitRepo repositories.HuntingUnitRepositoryInterface
}

func NewHuntingUnitService(huntingUnitRepo repositories.HuntingUnitRepositoryInterface) *HuntingUnitService {
	return &HuntingUnitService{HuntingUnitRepo: huntingUnitRepo}
}

func (s *HuntingUnitService) GetAllUnitsBySpecies(ctx context.Context, speciesID int64) ([]models.HuntingUnitResponse, error) {
	huntingUnits, err := s.HuntingUnitRepo.GetBySpeciesID(ctx, speciesID)

	if err != nil {
		return nil, err
	}

	return huntingUnits, nil
}
