package service

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type StateService struct {
	StateRepo *repositories.StateRepository
}

func NewStateService(stateRepo *repositories.StateRepository) *StateService {
	return &StateService{StateRepo: stateRepo}
}

func (s *StateService) GetAll(ctx context.Context) ([]models.State, error) {

	states, err := s.StateRepo.GetAll(ctx)
	if err != nil {
		return nil, err
	}

	return states, nil
}
