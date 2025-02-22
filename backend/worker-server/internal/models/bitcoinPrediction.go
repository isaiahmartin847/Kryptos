package models

import "time"

type BtcPrediction struct {
	ID        uint      `gorm:"primaryKey:autoIncrement" json:"id"`
	Price     float64   `gorm:"type:numeric" json:"price"`
	Date      time.Time `gorm:"type:timestamp" json:"date"`
	CreatedAt time.Time `gorm:"autoCreateTime" json:"createdAt"`
}

type BtcPredictionData struct {
	Price float64   `gorm:"type:numeric"`
	Date  time.Time `gorm:"type:timestamp"`
}

func (BtcPredictionData) TableName() string {
	return "bitcoin_prediction"
}

func (BtcPrediction) TableName() string {
	return "bitcoin_prediction"
}
