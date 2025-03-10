package repository

import (
	"worker-server/internal/models"
	"worker-server/logger"

	"gorm.io/gorm"
)

type DbRepository interface {
	// fetches
	GetLatestPrice(stockID int64) (*models.DailyPrice, error)
	GetLastThirtyDaysPrices(stockID int64) ([]models.DailyPrice, error)
	GetAllStockForecast() ([]models.BtcPrediction, error)

	// insertions
	InsertNewStockData(response *models.BtcFetchResponse, stockID int64) error
	InsertNewStockForecast(data *models.BtcPredictionData) error
}

type repository struct {
	db *gorm.DB
}

func NewRepository(db *gorm.DB) DbRepository {
	return &repository{db: db}
}

func (r *repository) GetLatestPrice(stockID int64) (*models.DailyPrice, error) {
	var latestDbPrice models.DailyPrice

	if err := r.db.Order("date DESC").Where("stock_id = ?", stockID).First(&latestDbPrice).Error; err != nil {
		logger.Error("Error: unable to get the latest bitcoin data %v", err)
		return nil, err
	}
	return &latestDbPrice, nil
}

func (r *repository) GetLastThirtyDaysPrices(stockID int64) ([]models.DailyPrice, error) {
	var lastThirtyData []models.DailyPrice
	if err := r.db.Order("date DESC").Where("stock_id = ?", stockID).Limit(30).Find(&lastThirtyData).Error; err != nil {
		logger.Error("Error: unable to fetch the last thirty bitcoin data points %v", err)
		return nil, err
	}

	return lastThirtyData, nil
}

func (r *repository) GetAllStockForecast() ([]models.BtcPrediction, error) {
	var allBtcData []models.BtcPrediction
	if err := r.db.Find(&allBtcData).Error; err != nil {
		logger.Error("Error: unable to the prediction data %v", err)
		return nil, err
	}
	return allBtcData, nil

}

func (r *repository) InsertNewStockForecast(data *models.BtcPredictionData) error {
	result := r.db.Create(&models.BtcPredictionData{
		Price: data.Price,
		Date:  data.Date,
	})
	return result.Error
}

func (r *repository) InsertNewStockData(response *models.BtcFetchResponse, stockID int64) error {
	// result := r.db.Create(&models.Btc{
	// 	Price:     response.Price,
	// 	MarketCap: response.MarketCap,
	// 	Volume:    response.TotalVolume,
	// 	Date:      response.TimeStamp,
	// })

	result := r.db.Create(&models.DailyPrice{
		Price:     uint(response.Price),
		MarketCap: uint(response.MarketCap),
		Volume:    uint(response.TotalVolume),
		Date:      response.TimeStamp,
		StockID:   uint(stockID),
	})
	return result.Error
}
