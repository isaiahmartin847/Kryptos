package repositories

import "github.com/isaiahmartin847/Reg-Maps/internal/models"

type SessionRepository struct {
	*Repository
}

// Update constructor name to match
func NewSessionRepository(repo *Repository) *SessionRepository {
	return &SessionRepository{Repository: repo}
}

func (r *Repository) CreateSession(session *models.Session) (*models.Session, error) {
	if err := r.DB.Create(session).Error; err != nil {
		return nil, err
	}

	return session, nil
}
