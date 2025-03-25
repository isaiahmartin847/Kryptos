package models

import "time"

type SavedStock struct {
	ID        uint      `gorm:"primary_key" json:"id"`
	StockID   uint      `gorm:"type:bigint:index;uniqueIndex:idx_unique_user_stock,priority:2" json:"stock_id"`
	UserID    string    `gorm:"type:text;uniqueIndex:idx_unique_user_stock,priority:1" json:"user_id"`
	CreatedAt time.Time `gorm:"type:timestamp" json:"created_at"`

	Stock *Stock `gorm:"foreignKey=StockID;references=ID" json:"stock,omitempty"`
	User  *User  `gorm:"foreignKey=UserID;references=ID" json:"-"`
}

type SaveStockRequest struct {
	StockID uint   `json:"stock_id" validate:"required"`
	UserID  string `json:"user_id" validate:"required"`
}

func (SavedStock) TableName() string {
	return "saved_stock"
}
