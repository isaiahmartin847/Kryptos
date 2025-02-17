package models

import (
	"time"
)

type Bitcoin struct {
	ID        uint      `gorm:"primary_key"`
	Price     float64   `gorm:"type:numeric"`
	MarketCap float64   `gorm:"type:numeric"`
	CreatedAt time.Time `gorm:"autoCreateTime"`
	Date      time.Time `gorm:"type:timestamp"`
}

func (Bitcoin) TableName() string {
	return "bitcoin_price"
}
