import { Bitcoin } from "@/types/bitcoin";
import { ApiResponse } from "@/types/requestBody";

const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const fetchBitcoin = async (): Promise<ApiResponse<Bitcoin>> => {
  const response = await fetch(`${apiUrl}/btc`);

  if (!response.ok) {
    console.error(response.status);
    throw new Error("Network response was not ok");
  }

  return response.json();
};
