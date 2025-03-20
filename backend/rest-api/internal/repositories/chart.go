package repositories

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"gorm.io/gorm"
)

type ChartRepository struct {
	db *gorm.DB
}

func NewChartRepository(db *gorm.DB) *ChartRepository {
	return &ChartRepository{
		db: db,
	}
}

func (repo *ChartRepository) GetChartData(ctx context.Context, ticker string) ([]models.ChartData, error) {
	var chartData []models.ChartData

	err := repo.db.WithContext(ctx).Table("daily_price").
		Joins("JOIN stock ON stock.id = daily_price.stock_id").
		Joins("JOIN price_forecast ON price_forecast.stock_id = stock.id AND DATE(price_forecast.date) = DATE(daily_price.date)").
		Where("stock.ticker = ?", ticker).
		Select("price_forecast.price AS forecasted_price, daily_price.price, daily_price.date").
		Order("daily_price.date ASC").
		Scan(&chartData).Error

	if err != nil {
		logger.Error("Unable to get the chart data of ticker: %v err: %v", ticker, err)
		return nil, err
	}

	return chartData, nil
}
