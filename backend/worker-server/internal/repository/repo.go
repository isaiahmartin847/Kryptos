package repository

import (
	"worker-server/internal/models"
	"worker-server/logger"

	"gorm.io/gorm"
)

type DbRepository interface {
	// fetches
	GetLatestBtcPrice() (*models.BitcoinResponse, error)
	GetLastThirtyBtcData() ([]models.BitcoinPromptStruct, error)
	GetAllBtcPredictions() ([]models.BitcoinPrediction, error)

	// insertions
	InsertNewBitcoinData(response *models.BitcoinFetchResponse) error
	InsertNewBitcoinPredictionData(data *models.BitcoinPredictionData) error
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) DbRepository {
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

func (r *repository) GetAllBtcPredictions() ([]models.BitcoinPrediction, error) {
	var allBtcData []models.BitcoinPrediction
	if err := r.db.Find(&allBtcData).Error; err != nil {
		logger.Log.Fatalf("Unable to the prediction data %v", err)
		return nil, err
	}
	return allBtcData, nil

}

func (r *repository) InsertNewBitcoinPredictionData(data *models.BitcoinPredictionData) error {
	result := r.db.Create(&models.BitcoinPredictionData{
		Price: data.Price,
		Date:  data.Date,
	})
	return result.Error
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
