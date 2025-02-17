package service

import repository "github.com/isaiahmartin847/Reg-Maps/internal/repositories"

type BitcoinService struct {
	BitcoinRepo *repository.BitcoinRepository
}

func NewBitcoinService(bitcoinRepo *repository.BitcoinRepository) *BitcoinService {
	return &BitcoinService{BitcoinRepo: bitcoinRepo}
}
