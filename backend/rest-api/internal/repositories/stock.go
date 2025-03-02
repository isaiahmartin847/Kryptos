package repositories

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
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
		return models.Stock{}, err
	}

	return stock, nil
}
