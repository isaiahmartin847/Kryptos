package models

import (
	"time"
)

type Btc struct {
	ID        uint      `gorm:"primary_key"    json:"id"`
	Price     float64   `gorm:"type:numeric"   json:"price"`
	MarketCap float64   `gorm:"type:numeric"   json:"marketCap"`
	Volume    float64   `gorm:"type:numeric"   json:"volume"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
	Date      time.Time `gorm:"type:timestamp" json:"date"`
}

type BtcData struct {
	Price float64   `gorm:"type:numeric"`
	Date  time.Time `gorm:"type:timestamp"`
}

func (BtcData) TableName() string {
	return "bitcoin_price"
}

func (Btc) TableName() string {
	return "bitcoin_price"
}
