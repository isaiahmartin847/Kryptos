"use client";

import StockCard from "@/components/product/stockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Main = () => {
  return (
    <div className="flex justify-center items-center mt-20">
      <Card className="w-3/4">
        <CardHeader className="border-b-2 border-neutral-400">
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          <StockCard
            marketCap={100000000}
            price={100000}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default Main;
