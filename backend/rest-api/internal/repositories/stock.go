package repositories

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"gorm.io/gorm"
)

type StockRepository struct {
	db *gorm.DB
}

func NewStockRepository(db *gorm.DB) *StockRepository {
	return &StockRepository{
		db: db,
	}
}

func (repo *StockRepository) GetStockByTicker(ctx context.Context, ticker string) (models.Stock, error) {
	var stock models.Stock

	if err := repo.db.WithContext(ctx).Where(&models.Stock{Ticker: ticker}).First(&stock).Error; err != nil {
		logger.Error("Unable to query stock with ticker: %v", ticker)
		return models.Stock{}, err
	}

	return stock, nil
}

// func (repo *StockRepository) GetAllStocks(ctx context.Context) ([]models.Stock, error) {
// 	var stocks []models.Stock

// 	if err := repo.db.WithContext(ctx).Find(&stocks).Error; err != nil {
// 		logger.Error("Unable to query the stocks from the database")
// 		return nil, err
// 	}

// 	return stocks, nil
// }

func (repo *StockRepository) GetAllStocks(ctx context.Context) ([]models.Stock, error) {
	var stocks []models.Stock

	// Preload DailyPrices and order by the latest 'CreatedAt'
	if err := repo.db.WithContext(ctx).
		Preload("DailyPrices", func(db *gorm.DB) *gorm.DB {
			return db.Order("created_at desc").Limit(1)
		}).
		Find(&stocks).Error; err != nil {
		logger.Error("Unable to query the stocks from the database")
		return nil, err
	}

	return stocks, nil
}
