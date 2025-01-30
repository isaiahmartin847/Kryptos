package service

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type SpeciesService struct {
	SpeciesRepo repositories.SpeciesRepositoryInterface
}

func NewSpeciesService(speciesRepo repositories.SpeciesRepositoryInterface) *SpeciesService {
	return &SpeciesService{SpeciesRepo: speciesRepo}
}

func (s *SpeciesService) GetAll(ctx context.Context) ([]models.Species, error) {

	species, err := s.SpeciesRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	return species, nil
}

func (s *SpeciesService) GetAllByState(ctx context.Context, stateID int64) ([]models.SpeciesResponse, error) {
	species, err := s.SpeciesRepo.GetALLByState(ctx, stateID)

	if err != nil {
		return nil, err
	}

	return species, nil
}
