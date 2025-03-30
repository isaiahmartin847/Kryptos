import { useState } from "react";
import {
  useStripe,
  useElements,
  PaymentElement,
} from "@stripe/react-stripe-js";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Loader2 } from "lucide-react";

const PaymentForm = () => {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // when the payment is success
    try {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        confirmParams: {},
        redirect: "if_required",
      });

      if (error) {
        setErrorMessage(
          error.message ?? "An error occurred while processing your payment.",
        );
        setIsProcessing(false);
      } else if (paymentIntent?.status === "succeeded") {
        // Handle successful payment
        setIsSuccess(true);
      }
    } catch (err) {
      setErrorMessage("An unexpected error occurred. Please try again.");
      console.log(err);
    } finally {
      setIsProcessing(false);
    }
  };

  return isSuccess ? (
    <div className="flex h-[400px] flex-col items-center">
      <h1 className="text-2xl font-semibold">Payment Success</h1>
      <p className="text-[13px]">Thank you for your support!</p>
    </div>
  ) : (
    <form onSubmit={handleSubmit} className="space-y-6">
      <PaymentElement />

      {errorMessage && (
        <Alert variant="destructive">
          <AlertDescription>{errorMessage}</AlertDescription>
        </Alert>
      )}

      <Button
        variant={"secondary"}
        type="submit"
        disabled={!stripe || isProcessing}
        className="w-full"
      >
        {isProcessing ? (
          <div className="flex items-center justify-center">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Processing...
          </div>
        ) : (
          "Pay Now"
        )}
      </Button>
    </form>
  );
};

export default PaymentForm;
