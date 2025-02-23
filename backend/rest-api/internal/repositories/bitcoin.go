package repositories

import (
	"context"

	"github.com/isaiahmartin847/Reg-Maps/internal/models"
	"github.com/isaiahmartin847/Reg-Maps/logger"
	"gorm.io/gorm"
)

type BtcRepository struct {
	db *gorm.DB
}

func NewBtcRepository(db *gorm.DB) *BtcRepository {
	return &BtcRepository{
		db: db,
	}
}

func (repo *BtcRepository) GetAll(ctx context.Context) ([]models.Btc, error) {
	var bitcoin_prices []models.Btc

	if err := repo.db.WithContext(ctx).Find(&bitcoin_prices).Error; err != nil {
		logger.Error("Error: unable to query the bitcoin prices, %v", err)
		return nil, err
	}

	return bitcoin_prices, nil

}
