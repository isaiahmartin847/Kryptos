package models

import (
	"time"
)

type Btc struct {
	ID        uint      `gorm:"primaryKey;autoIncrement" json:"id"`
	Price     float64   `gorm:"type:numeric"   json:"price"`
	MarketCap float64   `gorm:"type:numeric"   json:"marketCap"`
	Volume    float64   `gorm:"type:numeric"   json:"volume"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
	Date      time.Time `gorm:"type:timestamp" json:"date"`
}

type BtcPromptStruct struct {
	Price     float64   `gorm:"type:numeric"   json:"price"`
	MarketCap float64   `gorm:"type:numeric"   json:"marketCap"`
	Volume    float64   `gorm:"type:numeric"   json:"volume"`
	Date      time.Time `gorm:"type:timestamp" json:"date"`
}

type BtcResponse struct {
	ID    uint      `gorm:"primary_key"    json:"id"`
	Price float64   `gorm:"type:numeric"   json:"price"`
	Date  time.Time `gorm:"type:timestamp" json:"date"`
}

type BtcFetchResponse struct {
	Price       float64
	MarketCap   float64
	TotalVolume float64
	TimeStamp   time.Time
}

func (Btc) TableName() string {
	return "bitcoin_price"
}

func (BtcResponse) TableName() string {
	return "bitcoin_price"
}

func (BtcPromptStruct) TableName() string {
	return "bitcoin_price"
}
