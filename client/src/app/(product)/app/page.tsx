"use client";

import { fetchStocks } from "@/apiFunctions/getFunctions";
import StockCard from "@/components/product/stockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stock } from "@/types/stocks";
import { useQueries, useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Main = () => {
  const { data, isLoading, isError, isSuccess } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="flex h-[calc(100vh-74px)] justify-center border-2">
      <Card className="mt-40 h-fit w-3/4">
        <CardHeader className="border-b-2 border-neutral-400">
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent className="py-4">
          {!isLoading ? (
            data?.data.items.map((item: Stock) => {
              return (
                <StockCard
                  key={item.id}
                  marketCap={item.marketCap}
                  price={item.price}
                  color={item.color}
                  // add the icon name in the db and schema
                  iconName="SiBitcoin"
                  name={item.ticker}
                />
              );
            })
          ) : isError ? (
            <div>Error</div>
          ) : (
            <div>Loading...</div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Main;
