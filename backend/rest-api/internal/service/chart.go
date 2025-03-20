package service

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	repository "github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/logger"
)

type BtcService struct {
	BitcoinRepo *repository.ChartRepository
}

func NewBtcService(bitcoinRepo *repository.ChartRepository) *BtcService {
	return &BtcService{BitcoinRepo: bitcoinRepo}
}

func (s *BtcService) GetChartData(ctx context.Context, ticker string) ([]models.ChartData, error) {

	chartData, err := s.BitcoinRepo.GetChartData(ctx, ticker)

	if err != nil {
		logger.Error("Unable to get the chart data on the service layer error: %v", err)
		return nil, err
	}

	return chartData, nil

}
