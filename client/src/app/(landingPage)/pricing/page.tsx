import DonateCard from "@/components/landingPage/pay/donateCard";
import { ReactQueryProvider } from "@/providers/reactQueryProvider";

const PricingPage = () => {
  return (
    <ReactQueryProvider>
      <div className="flex flex-col justify-center items-center text-center pb-20 md:pb-0">
        <h1 className="text-[30px] mt-8 md:text-[40px]">
          Subscriptions & pricing
        </h1>
        <p className="w-3/5">
          We currently free but we still do take donations if you feel like our
          service has helped you please donate.
        </p>
        {/* this is the group of cards */}
        <div className="flex justify-around flex-wrap w-full max-w-[1250px] gap-5 mt-12">
          <DonateCard price={5} />
          <DonateCard price={10} />
          <DonateCard price={20} />
        </div>
      </div>
    </ReactQueryProvider>
  );
};

export default PricingPage;
