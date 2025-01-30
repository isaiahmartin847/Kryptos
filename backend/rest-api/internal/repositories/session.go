package repositories

import (
	"context"
	"errors"
	"fmt"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type SessionRepositoryInterface interface {
	Create(ctx context.Context, session *models.Session) (*models.Session, error)
	Get(ctx context.Context) ([]models.Session, error)
	GetById(ctx context.Context, userID string) ([]models.Session, error)
	DeleteByID(ctx context.Context, ID string) error
}

type SessionRepository struct {
	db *gorm.DB
}

func NewSessionRepository(db *gorm.DB) *SessionRepository {
	return &SessionRepository{
		db: db,
	}
}

func (r *SessionRepository) Create(ctx context.Context, session *models.Session) (*models.Session, error) {
	if err := r.db.WithContext(ctx).
		Omit("User", "State", "Species", "HuntingUnit").
		Create(session).Error; err != nil {
		return nil, fmt.Errorf("failed to create session: %w", err)
	}

	return session, nil
}

func (r *SessionRepository) Get(ctx context.Context) ([]models.Session, error) {
	var sessions []models.Session

	result := r.db.WithContext(ctx).
		Preload("State").
		Preload("Species").
		Preload("HuntingUnit").
		Find(&sessions)
	if result.Error != nil {
		return nil, fmt.Errorf("failed to fetch sessions: %w", result.Error)
	}

	return sessions, nil
}

func (r *SessionRepository) GetById(ctx context.Context, userID string) ([]models.Session, error) {
	var sessions []models.Session

	result := r.db.WithContext(ctx).
		Preload("State").
		Preload("Species").
		Preload("HuntingUnit").
		Find(&sessions, "user_id = ?", userID)
	if result.Error != nil {
		return nil, fmt.Errorf("failed to fetch sessions: %w", result.Error)
	}

	return sessions, nil
}

func (r *SessionRepository) DeleteByID(ctx context.Context, ID string) error {
	result := r.db.WithContext(ctx).Where("id = ?", ID).Delete(&models.Session{})
	if result.Error != nil {
		return fmt.Errorf("failed to delete session: %v", result.Error)
	}
	if result.RowsAffected == 0 {
		return errors.New("session not found")
	}
	return nil
}
