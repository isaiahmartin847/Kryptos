package models

type Stock struct {
	ID        uint    `gorm:"primary_key" json:"id"`
	Price     float64 `gorm:"type:numeric" json:"price"`
	MarketCap float64 `gorm:"type:numeric"   json:"marketCap"`
	Color     string  `gorm:"type:string"   json:"color"`
	Name      string  `gorm:"type:string"   json:"name"`
	Ticker    string  `gorm:"type:string"   json:"ticker"`
	IconType  string  `gorm:"type:string" json:"icon_type"`
}

func (Stock) TableName() string {
	return "stock"
}
