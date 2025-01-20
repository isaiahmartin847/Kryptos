package models

type Species struct {
	ID      uint   `gorm:"primaryKey;autoIncrement"`
	Name    string `gorm:"not null"`
	StateID int64  `gorm:"not null; index"` // Change from string to int64

	State State `gorm:"foreignKey:StateID;references:ID"`
}

func (Species) TableName() string {
	return "species"
}
