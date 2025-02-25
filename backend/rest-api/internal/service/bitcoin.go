package service

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	repository "github.com/isaiahmartin847/Reg-Maps/internal/repositories"
	"github.com/isaiahmartin847/Reg-Maps/logger"
)

type BtcService struct {
	BitcoinRepo *repository.BtcRepository
}

func NewBtcService(bitcoinRepo *repository.BtcRepository) *BtcService {
	return &BtcService{BitcoinRepo: bitcoinRepo}
}

func (s *BtcService) GetAllBtc(ctx context.Context) ([]models.Btc, error) {

	bitcoinPrice, err := s.BitcoinRepo.GetAllBtc(ctx)
	if err != nil {
		logger.Error("Error: to fetch all the bitcoin prices %v", err)
		return nil, err
	}

	return bitcoinPrice, nil

}

func (s *BtcService) GetBtcChartData(ctx context.Context) ([]models.BtcChartData, error) {

	chartData, err := s.BitcoinRepo.GetBitcoinChartData(ctx)
	if err != nil {
		logger.Error("Unable to query the joined table of bitcoin prices and predictions, %v", err)
	}

	return chartData, nil
}

func (s *BtcService) GetLatestPrediction(ctx context.Context) (*models.BtcPrediction, error) {

	prediction, err := s.BitcoinRepo.GetLatestPrediction(ctx)
	if err != nil {
		logger.Error("Unable to query the bitcoin prediction data %v", err)
		return nil, err
	}

	return prediction, nil
}
