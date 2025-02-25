package models

import "time"

type BtcChartData struct {
	PriceActual  float64   `json:"bitcoin"`
	PricePredict float64   `json:"prediction"`
	Date         time.Time `json:"date"`
}
