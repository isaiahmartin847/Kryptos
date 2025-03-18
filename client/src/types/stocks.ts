export interface Stock {
  id: number;
  price: number;
  marketCap: number;
  color: string;
  name: string;
  ticker: string;
  icon_type: string;
  daily_prices: DailyPrice[];
}

export interface DailyPrice {
  id: number;
  price: number;
  date: Date;
  market_cap: number;
  created_at: Date;
  volume: number;
  stock_id: number;
  percent_change: number;
}

export interface PriceForecast {
  id: number;
  price: number;
  date: Date;
  created_at: Date;
  sock_id: number;
}
