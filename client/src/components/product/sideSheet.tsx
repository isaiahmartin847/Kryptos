import { BookmarkCheck, BookmarkX, PanelRightClose } from "lucide-react";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { useSavedStocks } from "@/providers/savedStocksProvider";
import { SkeletonStockCard } from "./skeletonComponents";
import StockCard from "./stockCard";

const SavedStockSideSheet = () => {
  const { isSavedStockError, isSavedStockLoading, savedStocksData } =
    useSavedStocks();

  // savedStocksData?.data.items.length === 0
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
          {isSavedStockError ? (
            // handle error
            <div className="p-4 text-center text-lg">
              Oops! Something went wrong while fetching your saved stocks.
            </div>
          ) : isSavedStockLoading ? (
            // handle loading
            <div className="mx-4 mt-5 space-y-3">
              {Array(5)
                .fill(null)
                .map((_, index) => {
                  return <SkeletonStockCard key={index} />;
                })}
            </div>
          ) : savedStocksData?.data.items.length === 0 ? (
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
              {savedStocksData?.data.items.map((item) => {
                return (
                  <StockCard
                    key={item.id}
                    color={item.stock.color}
                    iconName={item.stock.icon_type}
                    name={item.stock.name}
                    marketCap={item.stock.daily_prices[0].market_cap}
                    price={item.stock.daily_prices[0].price}
                    percentageChange={item.stock.daily_prices[0].percent_change}
                    ticker={item.stock.ticker}
                    stockId={item.stock.id}
                    isSaved={item.stock.is_saved}
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
