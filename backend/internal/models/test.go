package models

import (
	"time"
)

type Test struct {
	ID            int64     `gorm:"primary_key;autoIncrement"`       
	TestValue     bool      `gorm:"column:test"`                
	AutoTimestamp time.Time `gorm:"column:auto_timestamp;default:CURRENT_TIMESTAMP"` 
}

// TableName specifies the custom table name for the Test model
func (Test) TableName() string {
	return "test" // The name of the table in the DB
}