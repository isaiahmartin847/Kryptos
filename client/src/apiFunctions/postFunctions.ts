import { SessionPostBody, SessionResponse } from "@/types/session";
import Stripe from "stripe";

const apiUrl = process.env.NEXT_PUBLIC_REST_API_URL;

export const createPaymentIntent = async (
  price: number
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

export const createSession = async (
  sessionBody: SessionPostBody
): Promise<SessionResponse> => {
  const response = await fetch(`${apiUrl}/session`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(sessionBody),
  });

  if (!response.ok) {
    throw new Error(`Unable to create session ${response.status}`);
  }

  return response.json();
};
