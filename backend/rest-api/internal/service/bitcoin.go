package service

import (
	"context"
	"log"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	repository "github.com/isaiahmartin847/Reg-Maps/internal/repositories"
)

type BitcoinService struct {
	BitcoinRepo *repository.BitcoinRepository
}

func NewBitcoinService(bitcoinRepo *repository.BitcoinRepository) *BitcoinService {
	return &BitcoinService{BitcoinRepo: bitcoinRepo}
}

func (s *BitcoinService) GetAll(ctx context.Context) ([]models.Bitcoin, error) {

	bitcoinPrice, err := s.BitcoinRepo.GetAll(ctx)
	if err != nil {
		log.Printf("Error to fetch all the bitcoin prices %v", err)
		return nil, err
	}

	return bitcoinPrice, nil

}
