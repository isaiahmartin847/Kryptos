import { ApiResponse } from "@/types/requestBody";
import { SavedStock } from "@/types/stocks";
import Stripe from "stripe";

const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const saveStock = async (
  userId: string,
  stockId: number,
): Promise<ApiResponse<SavedStock>> => {
  const response = await fetch(`${apiUrl}/stock/save`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ stock_id: stockId, user_id: userId }),
  });

  if (!response.ok) {
    throw new Error("Unable to Save stock");
  }

  return response.json();
};

export const createPaymentIntent = async (
  price: number,
): Promise<Stripe.PaymentIntent> => {
  const response = await fetch(`${apiUrl}/payment-intent`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ amount: price * 100 }),
  });

  if (!response.ok) {
    throw new Error(`Unable to create payment intent`);
  }

  return response.json();
};
