package repositories

import (
	"context"
	"errors"

	"log/slog"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"github.com/jackc/pgx/v5/pgconn"
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

func (repo *StockRepository) GetAllStocks(ctx context.Context, userId *string) ([]models.Stock, error) {
	var stocks []models.Stock

	query := repo.db.WithContext(ctx).
		Preload("DailyPrices", func(db *gorm.DB) *gorm.DB {
			// change this to the number of stocks
			return db.Order("date DESC").Limit(5)
		})

	if userId != nil {
		query = query.Preload("SavedStocks", "user_id = ?", *userId)
	}

	if err := query.Find(&stocks).Error; err != nil {
		logger.Error("Unable to query the stocks from the database")
		return nil, err
	}

	return stocks, nil
}

func (repo *StockRepository) GetSavedStocksWithUserId(ctx context.Context, userId string) ([]models.SavedStock, error) {
	var savedStocks []models.SavedStock

	if err := repo.db.WithContext(ctx).
		Preload("Stock").
		Preload("Stock.DailyPrices", func(db *gorm.DB) *gorm.DB {
			return db.Order("date DESC").Limit(1) // Only load the most recent price for each stock
		}).
		Where("user_id = ?", userId).
		Find(&savedStocks).Error; err != nil {
		logger.Error("Unable to query saved stocks with prices", "error", err, "userID", userId)
		return nil, err
	}

	return savedStocks, nil
}

// Insertion functions

func (repo *StockRepository) SaveStock(ctx context.Context, stock *models.SavedStock) error {
	if err := repo.db.WithContext(ctx).Create(stock).Error; err != nil {

		logger.Error("Unable to create saved stock",
			slog.String("error", err.Error()),
		)

		// return err
		if pgError, ok := err.(*pgconn.PgError); ok && pgError.Code == "23505" {
			// handle duplicate entry
			return errors.New("duplicate entry: There is already a saved stock with these values")
		} else {
			// handle other
			return err
		}

	}
	return nil
}

// Delete operation

func (repo *StockRepository) DeleteSavedStock(ctx context.Context, savedStockId int64) error {

	err := repo.db.WithContext(ctx).Where("id = ?", savedStockId).Delete(&models.SavedStock{}).Error

	if err != nil {
		logger.Error("Unable to delete the saved stock with id: %v", savedStockId)
		return err
	}

	return nil

}
