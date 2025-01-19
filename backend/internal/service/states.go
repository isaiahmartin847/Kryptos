package service

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type StateService struct {
	StateRepo *repositories.StateRepository
}

func NewStateService(stateRepo *repositories.StateRepository) *StateService {
	return &StateService{StateRepo: stateRepo}
}

func (s *StateService) GetAll() ([]models.State, error) {

	states, err := s.StateRepo.GetAll()
	if err != nil {
		return nil, err
	}

	return states, nil
}
