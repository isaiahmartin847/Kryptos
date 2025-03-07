package models

import "time"

type DailyPrice struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	Price     uint      `gorm:"type:bigint" json:"price"`
	Date      time.Time `gorm:"type:time" json:"date"`
	MarketCap uint      `gorm:"type:bigint" json:"market_cap"`
	CreatedAt uint      `gorm:"type:bigint" json:"created_at"`
	Volume    uint      `gorm:"type:bigint" json:"volume"`
	StockID   uint      `gorm:"type:bigint;index" json:"stock_id"`
	Stock     *Stock    `gorm:"foreignKey:StockID;references:ID" json:"-"`
}
