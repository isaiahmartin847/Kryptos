export interface Bitcoin {
  id: number;
  price: number;
  marketCap: number;
  volume: number;
  createdAt: string;
  date: string;
}

export interface BitcoinChart {
  bitcoin: number;
  prediction: number;
  date: string;
}
