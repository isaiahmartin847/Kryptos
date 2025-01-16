package service

import (
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type SessionService struct {
	SessionRepo *repositories.SessionRepository
}

func NewSessionService(sessionRepo *repositories.SessionRepository) *SessionService {
	return &SessionService{SessionRepo: sessionRepo}
}

func (s *SessionService) CreateSession(session *models.Session) (*models.Session, error) {
	// handle all the checks and services

	createdSession, err := s.SessionRepo.CreateSession(session)
	if err != nil {
		return nil, err
	}

	return createdSession, nil
}

func (s *SessionService) GetSessions() ([]models.Session, error) {

	sessions, err := s.SessionRepo.GetSessions()
	if err != nil {
		return nil, err
	}

	return sessions, nil
}
