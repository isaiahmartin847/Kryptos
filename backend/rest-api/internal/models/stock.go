package models

type Stock struct {
	ID        uint    `gorm:"primary_key" json:"id"`
	Price     float64 `gorm:"type:numeric" json:"price"`
	MarketCap float64 `gorm:"type:numeric"   json:"marketCap"`
	Color     string
	Name      string
	Ticker    string
}

func (Stock) TableName() string {
	return "stock"
}
