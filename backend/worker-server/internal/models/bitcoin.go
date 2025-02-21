package models

import (
	"time"
)

type Bitcoin struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Price     float64   `gorm:"type:numeric"   json:"price"`
	MarketCap float64   `gorm:"type:numeric"   json:"marketCap"`
	Volume    float64   `gorm:"type:numeric"   json:"volume"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
	Date      time.Time `gorm:"type:timestamp" json:"date"`
}

type BitcoinPromptStruct struct {
	Price     float64   `gorm:"type:numeric"   json:"price"`
	MarketCap float64   `gorm:"type:numeric"   json:"marketCap"`
	Volume    float64   `gorm:"type:numeric"   json:"volume"`
	Date      time.Time `gorm:"type:timestamp" json:"date"`
}

type BitcoinResponse struct {
	ID    uint      `gorm:"primary_key"    json:"id"`
	Price float64   `gorm:"type:numeric"   json:"price"`
	Date  time.Time `gorm:"type:timestamp" json:"date"`
}

type BitcoinFetchResponse struct {
	Price       float64
	MarketCap   float64
	TotalVolume float64
	TimeStamp   time.Time
}

func (Bitcoin) TableName() string {
	return "bitcoin_price"
}

func (BitcoinResponse) TableName() string {
	return "bitcoin_price"
}

func (BitcoinPromptStruct) TableName() string {
	return "bitcoin_price"
}
