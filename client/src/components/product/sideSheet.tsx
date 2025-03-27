import { BookmarkCheck, BookmarkX, PanelRightClose } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";

import { SkeletonStockCard } from "./skeletonComponents";
import StockCard from "./stockCard";
import { useStocks } from "@/providers/stocksProvider";

const SavedStockSideSheet = () => {
  const { savedStocks, isStocksError, isStocksLoading } = useStocks();

  return (
    <Drawer direction="right">
      <DrawerTrigger asChild>
        <BookmarkCheck size={35} className="p-1 hover:cursor-pointer" />
      </DrawerTrigger>
      <DrawerContent className="left-auto right-0 h-full w-4/5 max-w-[850px]">
        <DrawerHeader className="border-b-2 border-neutral-400">
          <div className="flex w-full items-center justify-between">
            <DrawerTitle>Saved Stocks</DrawerTitle>
            <DrawerClose asChild>
              <PanelRightClose className="hover:cursor-pointer" />
            </DrawerClose>
          </div>
        </DrawerHeader>
        <div>
          {isStocksError ? (
            // handle error
            <div className="p-4 text-center text-lg">
              Oops! Something went wrong while fetching your saved stocks.
            </div>
          ) : isStocksLoading ? (
            // handle loading
            <div className="mx-4 mt-5 space-y-3">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  return <SkeletonStockCard key={index} />;
                })}
            </div>
          ) : savedStocks.length === 0 ? (
            // handle empty state
            <div className="flex flex-col items-center justify-center p-8 text-center">
              <BookmarkX size={48} className="mb-3 text-neutral-400" />
              <p className="text-lg font-medium">No saved stocks yet</p>
              <p className="mt-2 text-neutral-500">
                When you save stocks, they&apos;ll appear here for quick access.
              </p>
            </div>
          ) : (
            <div className="mx-4 mt-5 space-y-3">
              {savedStocks.map((item) => {
                return (
                  <StockCard
                    key={item.id}
                    color={item.color}
                    iconName={item.icon_type}
                    name={item.name}
                    marketCap={item.daily_prices[0].market_cap}
                    price={item.daily_prices[0].price}
                    percentageChange={item.daily_prices[0].percent_change}
                    ticker={item.ticker}
                    stockId={item.id}
                    isSaved={item.is_saved}
                    savedStock={item.saved_stocks}
                  />
                );
              })}
            </div>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default SavedStockSideSheet;
