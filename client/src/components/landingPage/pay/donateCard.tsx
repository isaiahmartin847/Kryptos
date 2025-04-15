"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import DonateProps from "@/types/props";
import DonateDialog from "./donateDialog";

const DonateCard = ({ price }: DonateProps) => {
  return (
    <Card className="h-[400px] w-[325px]">
      <CardHeader>
        <h1 className="text-2xl font-semibold">Donate</h1>
        <div>
          <h1 className="text-[32px] font-semibold">${price}</h1>
          <p className="text-xs">one time payment</p>
        </div>
      </CardHeader>
      <CardHeader className="pt-0">
        <p>
          Our product is 100% free, but maintaining this service costs a lot of
          money. If you enjoy the service, please consider donating so we can
          keep our product running and continue adding more features.
        </p>
      </CardHeader>
      <CardFooter className="flex justify-center">
        <DonateDialog price={price} />
      </CardFooter>
    </Card>
  );
};

export default DonateCard;
