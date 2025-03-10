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
