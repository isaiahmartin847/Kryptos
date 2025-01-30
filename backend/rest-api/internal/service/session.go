package service

import (
	"context"
	"fmt"
	"time"

	"github.com/gofrs/uuid"
	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type SessionService struct {
	SessionRepo repositories.SessionRepositoryInterface
}

func NewSessionService(sessionRepo repositories.SessionRepositoryInterface) *SessionService {
	return &SessionService{SessionRepo: sessionRepo}
}

func (s *SessionService) CreateSession(ctx context.Context, sessionPostBody *models.SessionPostBody) (*models.Session, error) {
	sessionID, err := uuid.NewV4()
	if err != nil {
		return nil, fmt.Errorf("failed to generate UUID: %w", err)
	}

	session := models.Session{
		ID:            sessionID,
		UserID:        sessionPostBody.UserID,
		StateID:       sessionPostBody.StateID,
		SpeciesID:     sessionPostBody.SpeciesID,
		HuntingUnitID: sessionPostBody.HuntingUnitID,
		ExpiresAt:     time.Now().Add(10 * 24 * time.Hour),
	}

	createdSession, err := s.SessionRepo.Create(ctx, &session)
	if err != nil {
		return nil, err
	}

	return createdSession, nil
}

func (s *SessionService) GetSessions(ctx context.Context) ([]models.Session, error) {
	sessions, err := s.SessionRepo.Get(ctx)
	if err != nil {
		return nil, err
	}

	return sessions, nil
}

func (s *SessionService) GetByID(ctx context.Context, userID string) ([]models.Session, error) {
	sessions, err := s.SessionRepo.GetById(ctx, userID)
	if err != nil {
		return nil, err
	}

	return sessions, nil
}

func (s *SessionService) DeleteSession(ctx context.Context, ID string) error {
	return s.SessionRepo.DeleteByID(ctx, ID)
}
