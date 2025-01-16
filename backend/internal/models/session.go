package models

import "time"

type Session struct {
	ID          uint      `gorm:"primary_key:autoIncrement"`
	State       string    `gorm:"not null"`
	Species     string    `gorm:"not null"`
	HuntingUnit string    `gorm:"not null"`
	CreatedAt   time.Time `gorm:"autoCreateTime"`
}
