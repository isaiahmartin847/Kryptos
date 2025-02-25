import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { SiBitcoinsv } from "react-icons/si";

interface Props {
  price: number;
  marketCap: number;
}

const formatNumber = (num: number) => {
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

const StockCard = ({ price, marketCap }: Props) => {
  return (
    <Card>
      <Link href={"/btc"}>
        <CardContent className="p-3 bg-primaryColor rounded-xl hover:bg-primaryColor/70 cursor-pointer">
          <div className="flex justify-between items-center w-full">
            <SiBitcoinsv
              color="#F7931A"
              size={30}
            />
            <h1>
              <span className="font-semibold">Price</span>: $
              {formatNumber(price)}
            </h1>
            <h1>
              <span className="font-semibold">Market Cap</span>: $
              {formatNumber(marketCap)}
            </h1>
            <span className="text-red-500">%-0.5</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default StockCard;
