package models

import "github.com/gofrs/uuid"

// Original HuntingUnit model
type HuntingUnit struct {
	ID               uint `gorm:"primaryKey;autoIncrement"`
	Name             string
	SpeciesID        uint
	BaseRegulationID uuid.UUID
	Species          Species        `gorm:"foreignKey:SpeciesID"`
	BaseRegulation   BaseRegulation `gorm:"foreignKey:BaseRegulationID"`
}

// Separate model for the response with only ID and Name
type HuntingUnitResponse struct {
	ID   uint   `json:"ID"`
	Name string `json:"Name"`
}

// TableName overrides the default table name for HuntingUnit
func (HuntingUnit) TableName() string {
	return "hunting_units"
}

// TableName overrides the default table name for HuntingUnitResponse
func (HuntingUnitResponse) TableName() string {
	return "hunting_units"
}
