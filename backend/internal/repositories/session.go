package repositories

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type SessionRepository struct {
	*Repository
}

func NewSessionRepository(db *gorm.DB) *SessionRepository {
	repo := NewRepository(db)
	return &SessionRepository{Repository: repo}
}

func (r *Repository) CreateSession(session *models.Session) (*models.Session, error) {
	if err := r.DB.Create(session).Error; err != nil {
		return nil, err
	}

	return session, nil
}
