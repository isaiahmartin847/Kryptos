import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { formatDistanceToNow } from "date-fns"; // Import the function

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import Link from "next/link";

const SessionCard = ({
  HuntingUnit,
  Species,
  State,
  CreatedAt,
}: Pick<Session, "HuntingUnit" | "Species" | "State" | "CreatedAt">) => {
  const timeAgo = formatDistanceToNow(CreatedAt);

  return (
    <Card className="bg-primaryColor border-0 m-2">
      <CardHeader className="pb-0 text-center text-lg">
        {State}, Unit: {HuntingUnit}
      </CardHeader>
      <CardContent className="py-0 px-1">
        <Accordion
          type="single"
          collapsible>
          <AccordionItem value="item-1">
            <AccordionTrigger className="flex justify-around">
              More info
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-1 text-[16px]">
                <div className="border-b border-borderColor p-1">
                  State: {State}
                </div>
                <div className="border-b border-borderColor p-1">
                  Hunting Unit: {HuntingUnit}
                </div>
                <div className="border-b border-borderColor p-1">
                  Species: {Species}
                </div>
                <div className="border-b border-borderColor p-1">
                  Created {timeAgo}
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </CardContent>
      <CardFooter className="flex justify-center">
        <Link
          className="text-sm italic underline hover:text-primaryAccentColor"
          href={"#"}>
          return to session
        </Link>
      </CardFooter>
    </Card>
  );
};

export default SessionCard;
