"use client";

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
import PaymentForm from "@/components/landingPage/forms/paymentForm";
import { Loader2 } from "lucide-react";
import { createPaymentIntent } from "@/apiFunctions/postFunctions";

const stripePublicKey = process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY_TEST;

if (!stripePublicKey) {
  throw new Error("Stripe public key is missing");
}

const StripePromise = loadStripe(stripePublicKey);

const DonateDialog = ({ price }: DonateProps) => {
  const [stripeOptions, setStripeOptions] = useState<any>({});

  const { mutate, isPending } = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      setStripeOptions({
        clientSecret: data.client_secret,
        appearance: {
          theme: "flat",
          variables: {
            colorBackground: "#1E1E1E",
            colorText: "#E0E0E0",
            colorInputBackground: "#1F1F1F",
            colorPrimary: "#E0E0E0",
          },
          rules: {
            ".Input": {
              padding: "12px",
              borderRadius: "4px",
            },
          },
        },
      });
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const handleOpenDialog = () => {
    mutate(price);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button onClick={handleOpenDialog} variant={"secondary"}>
          Donate ${price}
        </Button>
      </DialogTrigger>
      <DialogContent
        className="h-[700px] w-4/5 min-w-80"
        aria-describedby={undefined}
      >
        <DialogHeader className="h-fit">
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        {isPending ? (
          <div className="flex h-[100px] flex-col items-center">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            Processing...
          </div>
        ) : (
          stripeOptions?.clientSecret && (
            <Elements stripe={StripePromise} options={stripeOptions}>
              <PaymentForm />
            </Elements>
          )
        )}
      </DialogContent>
    </Dialog>
  );
};

export default DonateDialog;
