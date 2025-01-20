package models

type State struct {
	ID               uint   `gorm:"primaryKey;autoIncrement"`
	FullName         string `gorm:"not null;"`
	NameAbbreviation string `gorm:"not null"`

	Species []Species `gorm:"foreignKey:StateID"`
}

func (State) TableName() string {
	return "states"
}
