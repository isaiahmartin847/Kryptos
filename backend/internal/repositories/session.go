package repositories

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type SessionRepositories struct {
	DB *gorm.DB
}

func (r *SessionRepositories) CreateSession(session *models.Session) (*models.Session, error) {
	if err := r.DB.Create(session).Error; err != nil {
		return nil, err
	}

	return session, nil
}
