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
  iconName: string
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
    })
  );
};

interface Props {
  price: number;
  marketCap: number;
  iconName: string;
  color: string;
  name: string;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const StockCard = ({ price, marketCap, iconName, color, name }: Props) => {
  const Icon = getIconComponent(iconName);

  return (
    <Card>
      <Link href={`/${name}`}>
        <CardContent className="p-3 bg-primaryColor rounded-xl hover:bg-primaryColor/70 cursor-pointer">
          <div className="flex justify-between items-center w-full">
            {Icon ? (
              <Suspense
                fallback={
                  <div className="w-6 h-6 animate-pulse bg-gray-200 rounded" />
                }>
                <Icon
                  size={24}
                  color={color}
                  className="text-xl"
                />
              </Suspense>
            ) : (
              <div className="w-6 h-6 animate-pulse bg-gray-200 rounded" />
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
