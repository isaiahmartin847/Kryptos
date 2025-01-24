package models

// Original HuntingUnit model
type HuntingUnit struct {
	ID        uint `gorm:"primaryKey;autoIncrement"`
	Name      string
	SpeciesID uint
	Species   Species `gorm:"foreignKey:SpeciesID"`
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
	// Not strictly necessary since it won't be used directly for DB operations
	// But you can define it for clarity if needed
	return "hunting_units"
}
