import { Bitcoin, BitcoinChart } from "@/types/bitcoin";
import { ApiResponse } from "@/types/requestBody";
import { Stock } from "@/types/stocks";

const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const fetchBitcoin = async (): Promise<ApiResponse<Bitcoin>> => {
  const response = await fetch(`${apiUrl}/btc`);

  if (!response.ok) {
    console.error(response.status);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchBitcoinChart = async (): Promise<
  ApiResponse<BitcoinChart>
> => {
  const response = await fetch(`${apiUrl}/btc/chart`);

  if (!response.ok) {
    console.error(response.status);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchStockByTicker = async (
  ticker: string
): Promise<ApiResponse<Stock>> => {
  const response = await fetch(`${apiUrl}/stock?ticker=${ticker}`);

  if (!response.ok) {
    console.error(response.status);
    throw new Error("Network response was not ok");
  }

  return response.json();
};
