"use client";

import { Card, CardFooter, CardHeader } from "@/components/ui/card";

import DonateProps from "@/types/props";

const DonateCard = ({ Price }: DonateProps) => {
  return (
    <Card className="w-[325] h-[400]">
      <CardHeader>
        <h1 className="text-2xl font-semibold">Donate</h1>
        <div>
          <h1 className="text-[32px] font-semibold">${Price}</h1>
          <p className="text-xs ">one time payment</p>
        </div>
      </CardHeader>
      <CardHeader className="pt-0">
        <p>
          Our product is 100% free, but maintaining this service costs a lot of
          money. If you enjoy the service, please consider donating so we can
          keep our product running and continue adding more features.
        </p>
      </CardHeader>
      <CardFooter className="flex justify-center"></CardFooter>
    </Card>
  );
};

export default DonateCard;
