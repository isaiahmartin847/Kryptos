import Link from "next/link";
import { Card, CardContent } from "../ui/card";
import { SiBitcoinsv } from "react-icons/si";

interface Props {
  price: number;
}

const StockCard = () => {
  return (
    <Card>
      <Link href={"/btc"}>
        <CardContent className=" p-3 bg-primaryColor rounded-xl hover:bg-primaryColor/70 cursor-pointer">
          <div className="flex justify-between items-center w-full">
            <SiBitcoinsv
              color="#F7931A"
              size={30}
            />
            <span>Price: 100,000.00</span>
            <span>Market Cap: 100,000,000</span>
            <span className="text-red-500">%-0.5</span>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default StockCard;
