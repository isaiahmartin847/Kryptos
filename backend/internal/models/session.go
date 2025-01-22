package models

import (
	"time"

	"github.com/gofrs/uuid"
)

type Session struct {
	ID            uuid.UUID `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID        string    `gorm:"not null;index"`
	StateID       uint      `gorm:"not null;index"` //change this back to uint
	SpeciesID     uint      `gorm:"not null;index"` //change this back to uint
	HuntingUnitID uint      `gorm:"not null;index"` //change this back to uint
	CreatedAt     time.Time `gorm:"not null;autoCreateTime"`
	ExpiresAt     time.Time `gorm:"not null"`

	// Foreign Key relationships
	User        User        `gorm:"foreignKey:UserID;references:ID"`
	State       State       `gorm:"foreignKey:StateID;references:ID"`
	Species     Species     `gorm:"foreignKey:SpeciesID;references:ID"`
	HuntingUnit HuntingUnit `gorm:"foreignKey:HuntingUnitID;references:ID"`
}

type SessionPostBody struct {
	UserID        string `gorm:"not null;index"`
	StateID       uint   `gorm:"not null;index"`
	SpeciesID     uint   `gorm:"not null;index"`
	HuntingUnitID uint   `gorm:"not null;index"`
}

type SessionResponse struct {
	ID            uuid.UUID `json:"id"`
	UserID        string    `json:"userId"`
	StateID       uint      `json:"stateId"`
	SpeciesID     uint      `json:"speciesId"`
	HuntingUnitID uint      `json:"huntingUnitId"`
	CreatedAt     time.Time `json:"createdAt"`
	ExpiresAt     time.Time `json:"expiresAt"`
}

// ToResponse converts a Session model to a SessionResponse
func (s *Session) ToResponse() *SessionResponse {
	return &SessionResponse{
		ID:            s.ID,
		UserID:        s.UserID,
		StateID:       s.StateID,
		SpeciesID:     s.SpeciesID,
		HuntingUnitID: s.HuntingUnitID,
		CreatedAt:     s.CreatedAt,
		ExpiresAt:     s.ExpiresAt,
	}
}

// ToResponseList converts a slice of Sessions to SessionResponses
func ToResponseList(sessions []Session) []SessionResponse {
	responses := make([]SessionResponse, len(sessions))
	for i, session := range sessions {
		responses[i] = *session.ToResponse()
	}
	return responses
}

func (Session) TableName() string {
	return "sessions"
}

func (SessionPostBody) TableName() string {
	return "sessions"
}
