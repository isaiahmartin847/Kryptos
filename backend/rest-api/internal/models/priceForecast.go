package models

import "time"

type PriceForecast struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	Price     uint      `gorm:"type:bigint" json:"price"`
	Date      time.Time `gorm:"type:date" json:"date"`
	CreatedAt time.Time `gorm:"type:timestamp" json:"created_at"`
	StockID   uint      `gorm:"type:bigint;index" json:"stock_id"`
	Stock     *Stock    `gorm:"foreignKey:StockID;references:ID" json:"-"`
}

func (PriceForecast) TableName() string {
	return "price_forecast"
}
