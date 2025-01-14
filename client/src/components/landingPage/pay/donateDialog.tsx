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
import { useEffect, useState } from "react";

const stripePublicKey =
  "pk_test_51Pm0egLqplUDffhZq85VRxffA4T0tJF8SrMCi6q2pQ8NYiduY7IwNF7htGMhIRM81BmLlnREskpfypASFm5xnUsi00Bl550s7Z";

if (!stripePublicKey) {
  throw new Error("Stripe public key is missing");
}

const StripePromise = loadStripe(stripePublicKey);

const createPaymentIntent = async (price: number) => {
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
  const [clientSecret, setClientSecret] = useState<string | null>(null);

  const { mutate, data, isPending, isSuccess } = useMutation({
    mutationFn: createPaymentIntent,
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error creating user:", error);
    },
  });

  const handleOpenDialog = () => {
    mutate(Price);
  };

  const stripeOptions = {
    clientSecret: "put the payment intent here",
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
      <DialogContent className="w-[200vw] h-[700px]">
        <DialogHeader>
          <DialogTitle>Payment</DialogTitle>
        </DialogHeader>
        {/* I would put the element right here */}
        <div></div>
      </DialogContent>
    </Dialog>
  );
};

export default DonateDialog;
