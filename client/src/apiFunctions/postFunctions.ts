import Stripe from "stripe";

const createPaymentIntent = async (
  price: number
): Promise<Stripe.PaymentIntent> => {
  const response = await fetch("http://localhost:8080/payment-intent", {
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

export default createPaymentIntent;
