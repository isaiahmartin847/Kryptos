package repositories

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type SessionRepository struct {
	db *gorm.DB
}

func NewSessionRepository(db *gorm.DB) *SessionRepository {
	return &SessionRepository{
		db: db,
	}
}

func (r *SessionRepository) CreateSession(session *models.Session) (*models.Session, error) {
	if err := r.db.Create(session).Error; err != nil {
		return nil, err
	}

	return session, nil
}

func (r *SessionRepository) GetSessions() ([]models.Session, error) {
	var sessions []models.Session

	result := r.db.Find(&sessions)
	if result.Error != nil {
		return nil, result.Error
	}

	return sessions, nil

}
