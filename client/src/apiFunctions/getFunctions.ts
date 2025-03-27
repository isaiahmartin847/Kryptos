import { Bitcoin } from "@/types/bitcoin";
import { TermsAndConditions } from "@/types/misc";
import { ApiResponse, ChartData } from "@/types/requestBody";
import { FetchHasAcceptedTerms } from "@/types/responses";
import { SavedStock, Stock } from "@/types/stocks";

const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const fetchBitcoin = async (): Promise<ApiResponse<Bitcoin>> => {
  const response = await fetch(`${apiUrl}/btc`);

  if (!response.ok) {
    console.error(response.status);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchChartData = async (
  ticker: string,
): Promise<ApiResponse<ChartData>> => {
  const response = await fetch(`${apiUrl}/chart?ticker=${ticker}`);

  if (!response.ok) {
    console.error(response.status);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchStockByTicker = async (
  ticker: string,
): Promise<ApiResponse<Stock>> => {
  const response = await fetch(`${apiUrl}/stock?ticker=${ticker}`);

  if (!response.ok) {
    console.error(response.status);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchStocks = async (
  userId: string,
): Promise<ApiResponse<Stock>> => {
  const response = await fetch(`${apiUrl}/stock?userId=${userId}`);

  if (!response.ok) {
    console.error("Unable to fetch the stocks", response.statusText);
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchSavedStocks = async (
  userId: string,
): Promise<ApiResponse<SavedStock>> => {
  const response = await fetch(`${apiUrl}/saved?userId=${userId}`);

  if (!response.ok) {
    console.error("Unable to fetch the saved stocks for this user");
    throw new Error("Network response was not ok");
  }

  return response.json();
};

export const fetchHasAcceptedTerms = async (
  userId: string,
): Promise<ApiResponse<FetchHasAcceptedTerms>> => {
  const response = await fetch(
    `${apiUrl}/user/terms/hasterms?userId=${userId}`,
  );

  if (!response.ok) {
    throw new Error(
      `Unable to fetch the stock data. Msg:${response.statusText}`,
    );
  }

  return response.json();
};

export const fetchTermsAndConditions = async (): Promise<
  ApiResponse<TermsAndConditions>
> => {
  const response = await fetch(`${apiUrl}/user/terms`);

  if (!response.ok) {
    throw new Error(
      `Unable to get the terms and service msg: ${response.statusText}`,
    );
  }

  return response.json();
};
