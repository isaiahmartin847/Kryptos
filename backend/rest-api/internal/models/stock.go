package models

type Stock struct {
	ID          uint         `gorm:"primary_key" json:"id"`
	Color       string       `gorm:"type:string"   json:"color"`
	Name        string       `gorm:"type:string"   json:"name"`
	Ticker      string       `gorm:"type:string"   json:"ticker"`
	IconType    string       `gorm:"type:string" json:"icon_type"`
	DailyPrices []DailyPrice `gorm:"foreignKey:StockID" json:"daily_prices,omitempty"`
}
