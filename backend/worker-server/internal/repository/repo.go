package repository

import (
	"worker-server/internal/models"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetLatest() (*models.BitcoinResponse, error)
	InsertNewBitcoinData(response *models.BitcoinFetchResponse) error
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) UserRepository {
	return &repository{db: db}
}

func (r *repository) GetLatest() (*models.BitcoinResponse, error) {
	var latestBtcPrice models.BitcoinResponse
	if err := r.db.Order("date DESC").First(&latestBtcPrice).Error; err != nil {
		return nil, err
	}
	return &latestBtcPrice, nil
}

func (r *repository) InsertNewBitcoinData(response *models.BitcoinFetchResponse) error {
	result := r.db.Create(&models.Bitcoin{
		Price:     response.Price,
		MarketCap: response.MarketCap,
		Volume:    response.TotalVolume,
		Date:      response.TimeStamp,
	})
	return result.Error
}
