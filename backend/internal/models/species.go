package models

type Species struct {
	ID      uint   `gorm:"primaryKey;autoIncrement"`
	Name    string `gorm:"not null"`
	StateID int64  `gorm:"not null; index"` // Keep as int64

	HuntingUnit []HuntingUnit `gorm:"foreignKey:StateID"`

	State State `gorm:"foreignKey:StateID;references:ID"`
}

func (Species) TableName() string {
	return "species"
}
