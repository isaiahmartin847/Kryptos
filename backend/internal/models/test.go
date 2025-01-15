package models

import (
	"time"
)

type Test struct {
	ID            int64     `gorm:"primary_key;autoIncrement"`       // matches SERIAL type
	TestValue     bool      `gorm:"column:test"`                     // BOOLEAN column
	AutoTimestamp time.Time `gorm:"column:auto_timestamp;default:CURRENT_TIMESTAMP"` // TIMESTAMP column with default value
}

// TableName specifies the custom table name for the Test model
func (Test) TableName() string {
	return "test" // The name of the table in the DB
}