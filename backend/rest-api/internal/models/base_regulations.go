package models

import (
	"time"

	"github.com/gofrs/uuid"
)

package main


type BaseRegulations struct {
	ID              uuid.UUID     `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Name            string        `gorm:"not null;index"`
	Weapon          string        `gorm:"not null;index"`
	HunterOrange    bool          `gorm:"not null;index"`
	ShootingLight   int           `gorm:"column:shooting_light"`  // Store as an integer representing minutes
	StartDate       string        `gorm:"column:start_date;size:5"` // Stores in MM-DD format
	EndDate         string        `gorm:"column:end_date;size:5"`   // Stores in MM-DD format
	HarvestReport   string        `gorm:"not null;index"`
	PrivateLandRule string        `gorm:"not null;index"`
	BlmMap          string        `gorm:"not null;index"`
}

