package models

type HuntingUnit struct {
	ID        uint   `gorm:"primaryKey;autoIncrement"`
	Name      string `gorm:"not null"`
	SpeciesID string `gorm:"not null; index"`

	Species Species `gorm:"foreignKey:SpeciesID;references:ID"`
}

func (HuntingUnit) TableName() string {
	return "hunting_units"
}
