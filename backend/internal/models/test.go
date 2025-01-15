package models

import (
	"time"
)

type Test struct {
	ID            uint      `gorm:"primary_key"`       // auto-incrementing primary key
	TestValue     bool      `gorm:"column:test"`       // Boolean column
	AutoTimestamp time.Time `gorm:"column:auto_timestamp;default:CURRENT_TIMESTAMP"` // Timestamp column with default value
}


// TableName specifies the custom table name for the Test model
func (Test) TableName() string {
	return "test" // The name of the table in the DB
}