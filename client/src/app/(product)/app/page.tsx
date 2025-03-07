"use client";

import { fetchStocks } from "@/apiFunctions/getFunctions";
import StockCard from "@/components/product/stockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Stock } from "@/types/stocks";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Main = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["stocks"],
    queryFn: fetchStocks,
  });

  useEffect(() => {
    if (data) {
      console.log(data);
    }
  }, [data]);

  return (
    <div className="flex h-[calc(100vh-75px)] justify-center">
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
                  marketCap={item.daily_prices[0].market_cap}
                  price={item.daily_prices[0].price}
                  color={item.color}
                  iconName={item.icon_type}
                  name={item.name}
                  ticker={item.ticker}
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
