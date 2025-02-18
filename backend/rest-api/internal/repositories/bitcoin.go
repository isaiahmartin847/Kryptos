package repositories

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"gorm.io/gorm"
)

type BitcoinRepository struct {
	db *gorm.DB
}

func NewBitcoinRepository(db *gorm.DB) *BitcoinRepository {
	return &BitcoinRepository{
		db: db,
	}
}

func (repo *BitcoinRepository) GetAll(ctx context.Context) ([]models.Bitcoin, error) {
	var bitcoin_prices []models.Bitcoin

	if err := repo.db.WithContext(ctx).Find(&bitcoin_prices).Error; err != nil {
		return nil, err
	}

	return bitcoin_prices, nil

}
