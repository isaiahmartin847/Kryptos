package models

type SavedStock struct {
	ID      uint   `gorm:"primary_key" json:"id"`
	StockID uint   `gorm:"type:bigint:index" json:"stock_id"`
	UserID  string `gorm:"type:text" json:"user_id"`

	Stock *Stock `gorm:"foreignKey:StockID:references:ID" json:"-"`
	User  *User  `gorm:"foreignKey:UserID:references:ID" json:"-"`
}

func (SavedStock) TableName() string {
	return "saved_stock"
}
