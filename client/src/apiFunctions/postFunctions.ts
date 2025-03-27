import { ApiResponse } from "@/types/requestBody";
import { MsgResponse } from "@/types/responses";
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
    const errorData = await response.json().catch(() => null);

    throw new Error(
      errorData?.message || errorData?.error || "Unable to Save stock",
    );
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

export const signTerms = async (
  userId: string,
  termsId: number,
): Promise<MsgResponse> => {
  const response = await fetch(`${apiUrl}/user/terms`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ terms_id: termsId, user_id: userId }),
  });

  if (!response) {
    throw new Error("Unable to agree to terms");
  }

  return response.json();
};
