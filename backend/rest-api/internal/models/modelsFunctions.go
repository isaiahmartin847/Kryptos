package models

func (Stock) TableName() string {
	return "stock"
}

func (DailyPrice) TableName() string {
	return "daily_price"
}

func (PriceForecast) TableName() string {
	return "price_forecast"
}
