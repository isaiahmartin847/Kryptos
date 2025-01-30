package repositories

import (
	"context"
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type StateRepositoryInterface interface {
	Get(ctx context.Context) ([]models.State, error)
}

type StateRepository struct {
	db *gorm.DB
}

func NewStateRepository(db *gorm.DB) *StateRepository {
	return &StateRepository{
		db: db,
	}
}

func (r *StateRepository) Get(ctx context.Context) ([]models.State, error) {
	var states []models.State

	results := r.db.WithContext(ctx).Find(&states)
	if results.Error != nil {
		return nil, fmt.Errorf("failed to fetch the states %w", results.Error)
	}

	return states, nil
}

func (r *SessionRepository) CreateState(ctx context.Context, state *models.State) (*models.State, error) {
	if err := r.db.WithContext(ctx).
		Omit("User", "State", "Species", "HuntingUnit").
		Create(state).Error; err != nil {
		return nil, fmt.Errorf("failed to create session: %w", err)
	}

	return state, nil
}
