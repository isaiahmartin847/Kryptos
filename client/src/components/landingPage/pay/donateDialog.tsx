"use client";

import { Stripe } from "stripe";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { useMutation } from "@tanstack/react-query";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DonateProps from "@/types/props";
import { useState } from "react";
import PaymentForm from "@/components/forms/paymentForm";

const stripePublicKey =
  "pk_test_51Pm0egLqplUDffhZq85VRxffA4T0tJF8SrMCi6q2pQ8NYiduY7IwNF7htGMhIRM81BmLlnREskpfypASFm5xnUsi00Bl550s7Z";

if (!stripePublicKey) {
  throw new Error("Stripe public key is missing");
}

const StripePromise = loadStripe(stripePublicKey);

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

const DonateDialog = ({ Price }: DonateProps) => {
  const [isDialogOpen, setIsDialogOpen] = useState<string | null>(null);

  const [stripeOptions, setStripeOptions] = useState<any>({});

  const { mutate, isPending, isSuccess } = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      console.log(data.client_secret);
      setStripeOptions({
        clientSecret: data.client_secret,
      });
      console.log(stripeOptions);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const handleOpenDialog = () => {
    mutate(Price);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          onClick={handleOpenDialog}
          variant={"secondary"}>
          Donate ${Price}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="w-4/5 h-[700px]"
        aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div>Loading...</div>
        ) : (
          stripeOptions?.clientSecret && ( // Render only when clientSecret is available
            <Elements
              stripe={StripePromise}
              options={stripeOptions}>
              <PaymentForm />
            </Elements>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonateDialog;
