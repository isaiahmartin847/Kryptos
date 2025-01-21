package models

type HuntingUnit struct {
	ID        uint   `gorm:"primaryKey;autoIncrement"`
	Name      string `gorm:"not null"`
	SpeciesID uint   `gorm:"not null; index"` // Change from string to uint

	Species Species `gorm:"foreignKey:SpeciesID;references:ID"`
}

func (HuntingUnit) TableName() string {
	return "hunting_units"
}
