package models

import "time"

type BtcChartData struct {
	PriceActual  float64   `json:"bitcoin"`
	PricePredict float64   `json:"prediction"`
	Date         time.Time `json:"date"`
}

type ChartData struct {
	ForecastedPrice float64   `json:"forecasted_price" gorm:"column:forecasted_price"`
	DailyPrice      float64   `json:"daily_price" gorm:"column:price"`
	Date            time.Time `json:"date" gorm:"column:date"`
}
