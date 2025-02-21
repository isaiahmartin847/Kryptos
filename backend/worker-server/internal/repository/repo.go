package repository

import (
	"worker-server/internal/models"
	"worker-server/logger"

	"gorm.io/gorm"
)

type UserRepository interface {
	GetLatestBtcPrice() (*models.BitcoinResponse, error)
	InsertNewBitcoinData(response *models.BitcoinFetchResponse) error
	GetLastThirtyBtcData() ([]models.BitcoinPromptStruct, error)
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) UserRepository {
	return &repository{db: db}
}

func (r *repository) GetLatestBtcPrice() (*models.BitcoinResponse, error) {
	var latestBtcPrice models.BitcoinResponse
	if err := r.db.Order("date DESC").First(&latestBtcPrice).Error; err != nil {
		logger.Log.Fatalf("Unable to get the latest bitcoin data %v", err)
		return nil, err
	}
	return &latestBtcPrice, nil
}

func (r *repository) GetLastThirtyBtcData() ([]models.BitcoinPromptStruct, error) {
	var lastThirtyData []models.BitcoinPromptStruct
	if err := r.db.Order("date DESC").Limit(30).Find(&lastThirtyData).Error; err != nil {
		logger.Log.Fatalf("Unable to fetch the last thirty bitcoin data points %v", err)
		return nil, err
	}

	return lastThirtyData, nil
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
