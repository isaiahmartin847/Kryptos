package repositories

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"gorm.io/gorm"
)

type BtcRepository struct {
	db *gorm.DB
}

func NewBtcRepository(db *gorm.DB) *BtcRepository {
	return &BtcRepository{
		db: db,
	}
}

func (repo *BtcRepository) GetLatestPrediction(ctx context.Context) (*models.BtcPrediction, error) {
	var btc_predication models.BtcPrediction

	err := repo.db.WithContext(ctx).Order("created_at DESC").First(&btc_predication).Error
	if err != nil {
		logger.Error("Unable to get the latest bitcoin prediction, %v", err)
		return nil, err
	}

	return &btc_predication, nil

}

func (repo *BtcRepository) GetAllBtc(ctx context.Context) ([]models.Btc, error) {
	var bitcoin_prices []models.Btc

	if err := repo.db.WithContext(ctx).Find(&bitcoin_prices).Error; err != nil {
		logger.Error("Error: unable to query the bitcoin prices, %v", err)
		return nil, err
	}

	return bitcoin_prices, nil

}

func (repo *BtcRepository) GetBitcoinChartData(ctx context.Context) ([]models.BtcChartData, error) {
	var charData []models.BtcChartData

	err := repo.db.WithContext(ctx).
		Table("bitcoin_price bp").
		Select("bp.price AS price_actual, bp.date, bpred.price AS price_predict").
		Joins("JOIN bitcoin_prediction bpred ON DATE(bp.date) = DATE(bpred.date)").
		Find(&charData).Error

	if err != nil {
		logger.Error("Unable to join the bitcoin prices and the bitcoin prediction data, %v", err)
		return nil, err
	}

	return charData, nil
}
