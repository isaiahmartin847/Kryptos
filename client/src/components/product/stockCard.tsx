import React, { Suspense } from "react";
import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { MoveDown } from "lucide-react";

// Define supported icon libraries with correct paths
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
}: Props) => {
  const Icon = getIconComponent(iconName);

  return (
    <Card>
      <Link href={`/${ticker}`}>
        <CardContent className="cursor-pointer rounded-xl bg-primaryColor p-3 hover:bg-primaryColor/70">
          <div className="flex w-full items-center justify-between">
            {Icon ? (
              <div className="flex space-x-3">
                <Suspense
                  fallback={
                    <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
                  }
                >
                  <Icon size={24} color={color} className="text-xl" />
                </Suspense>
                <h1 className="font-semibold">{name}</h1>
              </div>
            ) : (
              <div className="h-6 w-6 animate-pulse rounded bg-gray-200" />
            )}
            <h1>
              <span className="font-semibold">Price</span>: $
              {formatNumber(price)}
            </h1>
            <h1>
              <span className="font-semibold">Market Cap</span>: $
              {formatNumber(marketCap)}
            </h1>
            <span className="text-red-500">
              <MoveDown color="red" />
              0.66%
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default StockCard;
