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

func (r *SessionRepository) Create(session *models.Session) (*models.Session, error) {
	if err := r.db.Omit("User", "State", "Species", "HuntingUnit").Create(session).Error; err != nil {
		return nil, err
	}

	return session, nil
}

func (r *SessionRepository) Get() ([]models.Session, error) {
	var sessions []models.Session

	result := r.db.Omit("User", "State", "Species", "HuntingUnit").Find(&sessions)
	if result.Error != nil {
		return nil, result.Error
	}

	return sessions, nil
}

func (r *SessionRepository) GetById(userID string) ([]models.Session, error) {
	var sessions []models.Session

	result := r.db.Omit("User", "State", "Species", "HuntingUnit").Find(&sessions, "user_id = ?", userID)
	if result.Error != nil {
		return nil, result.Error
	}

	return sessions, nil
}
