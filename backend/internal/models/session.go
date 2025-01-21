package models

import (
	"time"

	"github.com/gofrs/uuid"
)

type Session struct {
	ID            uuid.UUID `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	UserID        string    `gorm:"not null;index"`
	StateID       string    `gorm:"not null;index"`
	SpeciesID     string    `gorm:"not null;index"`
	HuntingUnitID string    `gorm:"not null;index"`
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
	StateID       string `gorm:"not null;index"`
	SpeciesID     string `gorm:"not null;index"`
	HuntingUnitID string `gorm:"not null;index"`
}

func (Session) TableName() string {
	return "sessions"
}

func (SessionPostBody) TableName() string {
	return "sessions"
}
