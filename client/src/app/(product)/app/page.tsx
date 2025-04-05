"use client";

import { SkeletonStockCard } from "@/components/product/skeletonComponents";
import StockCard from "@/components/product/stockCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useStocks } from "@/providers/stocksProvider";
import { Stock } from "@/types/stocks";
import { XCircle } from "lucide-react";

const Main = () => {
  const { stocks, isStocksError, isStocksLoading, refetchStocks } = useStocks();

  return (
    <div className="flex h-[calc(100vh-75px)] justify-center">
      <Card className="mt-40 h-fit w-full md:w-3/4">
        <CardHeader className="border-b-2 border-neutral-400">
          <CardTitle>Charts</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 py-4">
          {!isStocksLoading ? (
            isStocksError ? (
              // Handle error state
              <div className="mx-4 mt-5 flex flex-col items-center justify-center space-y-1">
                <XCircle color="red" size={50} />

                <h1 className="text-lg font-semibold text-textColor">
                  Unable to fetch the stocks.
                </h1>
                <Button
                  onClick={refetchStocks}
                  className="w-fit"
                  variant={"secondary"}
                >
                  Retry
                </Button>
              </div>
            ) : (
              // Handle success state
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
                    isSaved={item.is_saved}
                    stockId={item.id}
                    savedStock={item.saved_stocks}
                    percentageChange={item.daily_prices[0].percent_change}
                  />
                );
              })
            )
          ) : (
            // Handle the loading state
            <div className="mx-4 mt-5 space-y-3">
              {Array(3)
                .fill(null)
                .map((_, index) => {
                  return <SkeletonStockCard key={index} />;
                })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Main;
