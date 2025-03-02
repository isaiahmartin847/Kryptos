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

func (s *StockService) GetByTicker(ctx context.Context, ticker string) (*models.Stock, error) {

	stock, err := s.StockRepo.GetStockByTicker(ctx, ticker)
	if err != nil {
		logger.Error("Unable to get the stock with ticker: %v from the repo layer", ticker)
		return nil, err
	}

	return stock, nil
}
