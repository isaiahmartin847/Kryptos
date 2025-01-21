package models

type Species struct {
	ID           uint `gorm:"primaryKey"`
	Name         string
	StateID      uint
	State        State         `gorm:"foreignKey:StateID"`
	HuntingUnits []HuntingUnit `gorm:"foreignKey:SpeciesID"` // Note: Changed from HuntingUnit to HuntingUnits
}

func (Species) TableName() string {
	return "species"
}
