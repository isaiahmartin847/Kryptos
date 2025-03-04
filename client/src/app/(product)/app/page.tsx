"use client";

import StockCard from "@/components/product/stockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useQueries, useQuery } from "@tanstack/react-query";

const Main = () => {
  return (
    <div className="mt-20 flex items-center justify-center">
      <Card className="w-3/4">
        <CardHeader className="border-b-2 border-neutral-400">
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <StockCard
            marketCap={100000000}
            price={100000}
            color="#F7931A"
            iconName="SiBitcoin"
            name="btc"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Main;
