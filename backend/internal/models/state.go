package models

type State struct {
	ID               uint   `gorm:"primaryKey;autoIncrement"`
	FullName         string `gorm:"not null;"`
	NameAbbreviation string `gorm:"not null"`
}

func (State) TableName() string {
	return "states"
}
