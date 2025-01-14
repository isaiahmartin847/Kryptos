import DonateCard from "@/components/landingPage/pay/donateCard";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";

const PricingPage = () => {
  return (
    <ReactQueryProvider>
      <div className="flex flex-col justify-center text-center">
        <h1 className="text-[40px] mt-8">Subscriptions & pricing</h1>
        <p>
          We currently free but we still do take donations if you feel like our
          service has helped you please donate.
        </p>
        {/* this is the group of cards */}
        <div className="flex justify-center">
          <DonateCard Price={5} />
        </div>
      </div>
    </ReactQueryProvider>
  );
};

export default PricingPage;
