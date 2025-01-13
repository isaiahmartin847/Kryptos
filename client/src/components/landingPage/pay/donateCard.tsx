import { Card, CardHeader } from "@/components/ui/card";
import DonateProps from "@/types/props";

const DonateCard = ({ Price }: DonateProps) => {
  return (
    <Card className="w-[325] h-[400]">
      <CardHeader>
        <h1 className="text-2xl font-semibold">Donate</h1>
        <div>
          <h1 className="text-[32px] font-semibold">${Price}</h1>
          <p className="text-xs ">one time payment</p>
        </div>
      </CardHeader>
    </Card>
  );
};

export default DonateCard;
