import { SessionPostBody, SessionResponse } from "@/types/session";
import Stripe from "stripe";

const baseAPI = "http://localhost:8080";

if (!baseAPI) {
  throw new Error("Unable to load API url");
}

export const createPaymentIntent = async (
  price: number
): Promise<Stripe.PaymentIntent> => {
  const response = await fetch(`${baseAPI}/payment-intent`, {
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
  const response = await fetch(`${baseAPI}/session/create`, {
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
