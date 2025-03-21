import { Card, CardContent } from "../ui/card";

import { Skeleton } from "../ui/skeleton";

export const SkeletonStockCard = () => {
  return (
    <Card>
      <CardContent className="cursor-pointer rounded-xl bg-primaryColor p-3 hover:bg-primaryColor/70">
        <div className="flex w-full items-center justify-between">
          {/* <div className="h-6 w-6 animate-pulse rounded bg-gray-200" /> */}

          <div className="flex items-center space-x-3">
            <Skeleton className="h-7 w-7 rounded-full" />
            <Skeleton className="h-5 w-14 rounded-xl" />
          </div>

          <Skeleton className="h-6 w-36 rounded-xl" />
          <Skeleton className="h-6 w-72 rounded-xl" />
          <Skeleton className="h-6 w-16 rounded-xl" />
        </div>
      </CardContent>
    </Card>
  );
};
