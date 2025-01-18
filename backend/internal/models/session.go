package models

import "time"

type Session struct {
	ID            uint      `gorm:"primaryKey;autoIncrement"`
	UserID        string    `gorm:"not null;index"`
	StateID       string    `gorm:"not null;index"`
	SpeciesID     string    `gorm:"not null;index"`
	HuntingUnitID string    `gorm:"not null;index"`
	CreatedAt     time.Time `gorm:"autoCreateTime"`

	// Foreign Key relationships
	User        User        `gorm:"foreignKey:UserID;references:ID"`
	State       State       `gorm:"foreignKey:StateID;references:ID"`
	Species     Species     `gorm:"foreignKey:SpeciesID;references:ID"`
	HuntingUnit HuntingUnit `gorm:"foreignKey:HuntingUnitID;references:ID"`
}

func (Session) TableName() string {
	return "sessions"
}
