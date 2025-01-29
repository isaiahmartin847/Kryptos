package models

import "github.com/gofrs/uuid"

type SpecificRegulation struct {
	ID      uuid.UUID `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Name    string    `gorm:"not null;index"`
	Bull    bool      `gorm:"not null;index"`
	Cow     bool      `gorm:"not null;index"`
	Limit   int       `gorm:"not null;index"`
	NoteOne string    `gorm:"index"`
	NoteTwo string    `gorm:"index"`
}

func (SpecificRegulation) TableName() string {
	return "species_regulations"
}
