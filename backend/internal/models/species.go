package models

type Species struct {
	ID      uint   `gorm:"primaryKey;autoIncrement"`
	Name    string `gorm:"not null"`
	StateID string `gorm:"not null; index"`

	State State `gorm:"foreignKey:StateID;references:ID"`
}

func (Species) TableName() string {
	return "species"
}
