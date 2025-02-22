package repository

import (
	"worker-server/internal/models"
	"worker-server/logger"

	"gorm.io/gorm"
)

type DbRepository interface {
	// fetches
	GetLatestBtcPrice() (*models.BtcResponse, error)
	GetLastThirtyBtcData() ([]models.BtcPromptStruct, error)
	GetAllBtcPredictions() ([]models.BtcPrediction, error)

	// insertions
	InsertNewBtcData(response *models.BtcFetchResponse) error
	InsertNewBtcPredictionData(data *models.BtcPredictionData) error
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) DbRepository {
	return &repository{db: db}
}

func (r *repository) GetLatestBtcPrice() (*models.BtcResponse, error) {
	var latestBtcPrice models.BtcResponse
	if err := r.db.Order("date DESC").First(&latestBtcPrice).Error; err != nil {
		logger.Log.Fatalf("Unable to get the latest bitcoin data %v", err)
		return nil, err
	}
	return &latestBtcPrice, nil
}

func (r *repository) GetLastThirtyBtcData() ([]models.BtcPromptStruct, error) {
	var lastThirtyData []models.BtcPromptStruct
	if err := r.db.Order("date DESC").Limit(30).Find(&lastThirtyData).Error; err != nil {
		logger.Log.Fatalf("Unable to fetch the last thirty bitcoin data points %v", err)
		return nil, err
	}

	return lastThirtyData, nil
}

func (r *repository) GetAllBtcPredictions() ([]models.BtcPrediction, error) {
	var allBtcData []models.BtcPrediction
	if err := r.db.Find(&allBtcData).Error; err != nil {
		logger.Log.Fatalf("Unable to the prediction data %v", err)
		return nil, err
	}
	return allBtcData, nil

}

func (r *repository) InsertNewBtcPredictionData(data *models.BtcPredictionData) error {
	result := r.db.Create(&models.BtcPredictionData{
		Price: data.Price,
		Date:  data.Date,
	})
	return result.Error
}

func (r *repository) InsertNewBtcData(response *models.BtcFetchResponse) error {
	result := r.db.Create(&models.Btc{
		Price:     response.Price,
		MarketCap: response.MarketCap,
		Volume:    response.TotalVolume,
		Date:      response.TimeStamp,
	})
	return result.Error
}
