import React, { Suspense, useMemo } from "react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { Bookmark, MoveDown, MoveUp } from "lucide-react";
import { useStocks } from "@/providers/stocksProvider";
import { MouseEvent } from "react";
import { SavedStock } from "@/types/stocks";

// Define supported icon libraries with correct paths
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const iconLibraries: Record<string, () => Promise<any>> = {
  si: () => import("react-icons/si"),
  fa: () => import("react-icons/fa"),
  bi: () => import("react-icons/bi"),
  md: () => import("react-icons/md"),
  ai: () => import("react-icons/ai"),
  ri: () => import("react-icons/ri"),
  tb: () => import("react-icons/tb"),
  fi: () => import("react-icons/fi"),
  gi: () => import("react-icons/gi"),
  wi: () => import("react-icons/wi"),
};

const getIconComponent = (
  iconName: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): React.LazyExoticComponent<React.ComponentType<any>> | null => {
  const prefixMatch = iconName.match(/^([A-Za-z]{1,2})/);
  const prefix = prefixMatch ? prefixMatch[1].toLowerCase() : "";

  if (!prefix || !iconLibraries[prefix]) {
    console.error(`Invalid icon prefix: ${iconName}`);
    return null;
  }

  return React.lazy(() =>
    iconLibraries[prefix]().then((module) => {
      const IconComponent = module[iconName];
      if (!IconComponent) {
        throw new Error(`Icon ${iconName} not found in module`);
      }
      return { default: IconComponent };
    }),
  );
};

interface Props {
  price: number;
  marketCap: number;
  iconName: string;
  color: string;
  name: string;
  ticker: string;
  percentageChange: number;
  isSaved: boolean;
  stockId: number;
  savedStock: SavedStock[] | undefined;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const StockCard = ({
  price,
  marketCap,
  iconName,
  color,
  name,
  ticker,
  isSaved,
  percentageChange,
  stockId,
  savedStock,
}: Props) => {
  const { mutateSaveStock, mutateRemoveSavedStock, isSaveStockPending } =
    useStocks();
  // const Icon = getIconComponent(iconName);

  const MemoizedIcon = useMemo(() => {
    const Icon = getIconComponent(iconName);

    const IconComponent = () => {
      return Icon ? (
        <Suspense
          fallback={
            <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
          }
        >
          <Icon size={24} color={color} className="text-xl" />
        </Suspense>
      ) : (
        <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
      );
    };

    return React.memo(IconComponent);
  }, [iconName, color]);

  const handleSave = (e: MouseEvent<HTMLButtonElement>) => {
    // the event prevent avoids the Link pushing you to the stock chart page
    e.preventDefault();
    if (!isSaved) {
      mutateSaveStock(stockId);
    } else {
      if (savedStock) {
        mutateRemoveSavedStock(savedStock[0].id);
      } else {
        console.log("no saved stock exist in the response.");
      }
    }
  };

  return (
    <Card>
      <Link href={`/chart/${ticker.toLowerCase()}`}>
        <CardContent className="cursor-pointer rounded-xl bg-primaryColor p-3 hover:bg-primaryColor/70">
          <div className="flex w-full items-center justify-between">
            <div className="flex w-32 space-x-3">
              <MemoizedIcon />
              <h1 className="font-semibold">{name}</h1>
            </div>

            <h1 className="w-48">
              <span className="font-semibold">Price</span>: $
              {formatNumber(price)}
            </h1>

            <h1 className="hidden w-[185px] lg:block">
              <span className="font-semibold">Market Cap</span>: $
              {formatNumber(marketCap)}
            </h1>

            {/* this is preset make it variable to if the stock is up or down  */}
            <span
              className={`${Boolean(percentageChange > 0) ? "text-green-500" : "text-red-500"} flex w-20`}
            >
              {Boolean(percentageChange > 0) ? (
                <MoveUp color="green" />
              ) : (
                <MoveDown color="red" />
              )}
              {percentageChange.toFixed(1)}%
            </span>

            <button onClick={handleSave} disabled={isSaveStockPending}>
              {!isSaved ? (
                <Bookmark size={23} />
              ) : (
                <Bookmark size={23} fill="white" />
              )}
            </button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default StockCard;
