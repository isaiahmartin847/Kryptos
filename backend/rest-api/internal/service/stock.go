package service

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/logger"
)

type StockService struct {
	StockRepo *repositories.StockRepository
}

func NewStockService(stockRepo *repositories.StockRepository) *StockService {
	return &StockService{StockRepo: stockRepo}
}

// GET FUNCTIONS
func (s *StockService) GetByTicker(ctx context.Context, ticker string) (models.Stock, error) {
	// if s.StockRepo == nil {
	// return models.Stock{}, errors.New("StockRepository is not initialized")
	// }

	stock, err := s.StockRepo.GetStockByTicker(ctx, ticker)
	if err != nil {
		logger.Error("Unable to get the stock", "ticker", ticker, "error", err)
		return models.Stock{}, err
	}

	return stock, nil
}

func (s *StockService) GetAllStocks(ctx context.Context) ([]models.Stock, error) {

	stocks, err := s.StockRepo.GetAllStocks(ctx)
	if err != nil {
		return nil, err
	}

	return stocks, nil
}

func (s *StockService) GetSavedStocksWithUserId(ctx context.Context, userId string) ([]models.SavedStock, error) {

	savedStocks, err := s.StockRepo.GetSavedStocksWithUserId(ctx, userId)

	if err != nil {
		return nil, err
	}

	return savedStocks, nil

}

// POST FUNCTIONS

func (s *StockService) SaveStock(ctx context.Context, saveStockData *models.SavedStock) error {

	err := s.StockRepo.SaveStock(ctx, saveStockData)

	if err != nil {
		logger.Error("Unable to create the saved stock")
		return err
	}

	return nil

}
