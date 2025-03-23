"use client";

// import { fetchStocks } from "@/apiFunctions/getFunctions";
import StockCard from "@/components/product/stockCard";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStocks } from "@/providers/stocksProvider";
import { Stock } from "@/types/stocks";
// import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Main = () => {
  const { stocks, isStocksError, isStocksLoading } = useStocks();

  useEffect(() => {
    if (stocks) {
      console.log(stocks);
    }
  }, [stocks]);

  return (
    <div className="flex h-[calc(100vh-75px)] justify-center">
      <Card className="mt-40 h-fit w-3/4">
        <CardHeader className="border-b-2 border-neutral-400">
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 py-4">
          {!isStocksLoading ? (
            stocks?.data.items.map((item: Stock) => {
              return (
                <StockCard
                  key={item.id}
                  marketCap={item.daily_prices[0].market_cap}
                  price={item.daily_prices[0].price}
                  color={item.color}
                  iconName={item.icon_type}
                  name={item.name}
                  ticker={item.ticker}
                  percentageChange={item.daily_prices[0].percent_change}
                />
              );
            })
          ) : isStocksError ? (
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
