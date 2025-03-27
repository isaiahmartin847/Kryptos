import { Stock } from "./stocks";

interface Meta {
  version: string;
}

interface Data<T> {
  items: T[];
  item?: T;
  stock?: Stock;
  meta: Meta;
}

export interface ApiResponse<T> {
  status: string;
  data: Data<T>;
}

export interface ChartData {
  forecasted_price: number;
  daily_price: number;
  date: string;
}
