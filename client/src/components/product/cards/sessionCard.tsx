import { Card, CardContent, CardHeader } from "@/components/ui/card";

const SessionCard = ({
  HuntingUnit,
  Species,
  State,
}: Pick<Session, "HuntingUnit" | "Species" | "State">) => {
  return (
    <Card className="border-2 m-2">
      <CardHeader>
        {State} Unit: {HuntingUnit}, {Species}
      </CardHeader>
    </Card>
  );
};

export default SessionCard;
