package models

import "github.com/gofrs/uuid"

type SpecificRegulations struct {
	ID      uuid.UUID `gorm:"primaryKey;type:uuid;default:gen_random_uuid()"`
	Name    string    `gorm:"not null;index"`
	Bull    bool      `gorm:"not null;index"`
	Cow     bool      `gorm:"not null;index"`
	Limit   int       `gorm:"not null;index"`
	NoteOne string    `gorm:"index"` // Consider renaming based on the context (e.g., "AdditionalInfo")
	NoteTwo string    `gorm:"index"` // Consider renaming as well (e.g., "Comments")
}
