package repositories

import "gorm.io/gorm"

type BitcoinRepository struct {
	db *gorm.DB
}

func NewBitcoinRepository(db *gorm.DB) *BitcoinRepository {
	return &BitcoinRepository{
		db: db,
	}
}
