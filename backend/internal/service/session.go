package service

import (
	"log"
	"time"

	"github.com/gofrs/uuid"
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type SessionService struct {
	SessionRepo *repositories.SessionRepository
}

func NewSessionService(sessionRepo *repositories.SessionRepository) *SessionService {
	return &SessionService{SessionRepo: sessionRepo}
}

func (s *SessionService) CreateSession(sessionPostBody *models.SessionPostBody) (*models.Session, error) {
	// handle all the checks and services
	sessionID, err := uuid.NewV4()
	if err != nil {
		// Handle error (e.g., log it or return an error response)
		log.Fatalf("Failed to generate UUID: %v", err)
	}

	// init the session
	session := models.Session{
		ID:            sessionID,
		UserID:        sessionPostBody.UserID,
		StateID:       sessionPostBody.StateID,
		SpeciesID:     sessionPostBody.SpeciesID,
		HuntingUnitID: sessionPostBody.HuntingUnitID,
		ExpiresAt:     time.Now().Add(10 * 24 * time.Hour),
	}

	createdSession, err := s.SessionRepo.Create(&session)
	if err != nil {
		return nil, err
	}

	return createdSession, nil
}

func (s *SessionService) GetSessions() ([]models.Session, error) {

	sessions, err := s.SessionRepo.Get()
	if err != nil {
		return nil, err
	}

	return sessions, nil
}

func (s *SessionService) GetByID(userID string) ([]models.Session, error) {

	sessions, err := s.SessionRepo.GetById(userID)
	if err != nil {
		return nil, err
	}

	return sessions, nil
}
