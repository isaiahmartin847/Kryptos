package models

import "time"

type BitcoinPrediction struct {
	ID        uint      `gorm:"primaryKey:autoIncrement" json:"id"`
	Price     float64   `gorm:"type:numeric" json:"price"`
	Date      time.Time `gorm:"type:timestamp" json:"date"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
}

type BitcoinPredictionData struct {
	Price float64   `gorm:"type:numeric"`
	Date  time.Time `gorm:"type:timestamp"`
}

func (BitcoinPredictionData) TableName() string {
	return "bitcoin_prediction"
}

func (BitcoinPrediction) TableName() string {
	return "bitcoin_prediction"
}
