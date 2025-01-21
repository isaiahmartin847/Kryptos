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

func (Session) TableName() string {
	return "sessions"
}

func (SessionPostBody) TableName() string {
	return "sessions"
}
