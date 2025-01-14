"use client";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import DonateProps from "@/types/props";

const stripePublicKey = process.env.STRIPE_PUBLIC_KEY_TEST;

if (!stripePublicKey) {
  throw new Error("Stripe public key is missing");
}

const StripePromise = loadStripe(stripePublicKey);

const DonateDialog = ({ Price }: DonateProps) => {
  const stripeOptions = {
    clientSecret: "put the payment intent here",
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"secondary"}>Donate ${Price}</Button>
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
