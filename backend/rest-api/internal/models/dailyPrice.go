package models

import "time"

type DailyPrice struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	Price     float64   `gorm:"type:numeric" json:"price"`
	Date      time.Time `gorm:"type:time" json:"date"`
	MarketCap float64   `gorm:"type:numeric" json:"market_cap"`
	CreatedAt uint      `gorm:"type:bigint" json:"created_at"`
	Volume    float64   `gorm:"type:numeric" json:"volume"`
	StockID   uint      `gorm:"type:bigint;index" json:"stock_id"`
	Stock     *Stock    `gorm:"foreignKey:StockID;references:ID" json:"-"`
}

func (DailyPrice) TableName() string {
	return "daily_price"
}
