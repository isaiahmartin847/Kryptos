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

func (s *BtcService) GetAll(ctx context.Context) ([]models.Btc, error) {

	bitcoinPrice, err := s.BitcoinRepo.GetAll(ctx)
	if err != nil {
		logger.Error("Error: to fetch all the bitcoin prices %v", err)
		return nil, err
	}

	return bitcoinPrice, nil

}
