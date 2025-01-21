package service

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type SpeciesService struct {
	SpeciesRepo *repositories.SpeciesRepository
}

func NewSpeciesService(speciesRepo *repositories.SpeciesRepository) *SpeciesService {
	return &SpeciesService{SpeciesRepo: speciesRepo}
}

func (s *SpeciesService) GetAll() ([]models.Species, error) {
	species, err := s.SpeciesRepo.GetAll()
	if err != nil {
		return nil, err
	}

	return species, nil
}

func (s *SpeciesService) GetAllByState(stateID int64) ([]models.SpeciesResponse, error) {
	species, err := s.SpeciesRepo.GetALLByState(stateID)

	if err != nil {
		return nil, err
	}

	return species, nil
}
