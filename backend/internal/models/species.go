package models

type Species struct {
	ID           uint `gorm:"primaryKey"`
	Name         string
	StateID      uint
	State        State         `gorm:"foreignKey:StateID"`
	HuntingUnits []HuntingUnit `gorm:"foreignKey:SpeciesID"` // Note: Changed from HuntingUnit to HuntingUnits
}

type SpeciesResponse struct {
	ID   uint `gorm:"primaryKey"`
	Name string
}

func (Species) TableName() string {
	return "species"
}

func (SpeciesResponse) TableName() string {
	return "species"
}
