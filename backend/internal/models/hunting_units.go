package models

type HuntingUnit struct {
	ID        uint `gorm:"primaryKey"`
	Name      string
	SpeciesID uint
	Species   Species `gorm:"foreignKey:SpeciesID"`
}

func (HuntingUnit) TableName() string {
	return "hunting_units"
}
