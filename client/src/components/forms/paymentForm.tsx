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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);

    // when the payment is success
    // try {
    //   const { error } = await stripe.confirmPayment({
    //     elements,
    //     confirmParams: {
    //       return_url: `${window.location.origin}/payment-success`,
    //     },
    //   });

    //   if (error) {
    //     setErrorMessage(
    //       error.message ?? "An error occurred while processing your payment."
    //     );
    //     setIsProcessing(false);
    //   }
    // } catch (err) {
    //   setErrorMessage("An unexpected error occurred. Please try again.");
    //   setIsProcessing(false);
    // }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6">
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
        className="w-full">
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
