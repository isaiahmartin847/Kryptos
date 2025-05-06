"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchChartData } from "@/apiFunctions/getFunctions";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Skeleton } from "@/components/ui/skeleton";
import { CircleXIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

// Function to format the date as "Jan 1 25"
const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "2-digit",
  });
};

export default function DoubleChart() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [chartData, setChartData] = useState<any[]>([]);
  const param = useParams();
  const ticker = (param.ticker as string)?.toUpperCase() ?? "";

  const { data, isLoading, isError, refetch } = useQuery({
    queryKey: ["ChartData"],
    queryFn: () => fetchChartData(ticker.toUpperCase()),
    enabled: !!ticker,
  });

  const name = data?.data.stock?.name ?? "";

  const chartConfig = {
    stock: {
      label: name,
      color: "#2563eb",
    },
    forecast: {
      label: "forecast",
      color: "#f77d25",
    },
  } satisfies ChartConfig;

  useEffect(() => {
    if (data) {
      const chartData = data.data.items.map((obj) => {
        return {
          // Format to 2 decimal places
          [data?.data?.stock?.name || "stock"]: parseFloat(
            obj.daily_price.toFixed(0),
          ),
          forecast: parseFloat(obj.forecasted_price.toFixed(0)),
          date: new Date(obj.date).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "short",
            day: "2-digit",
          }),
        };
      });

      setChartData(chartData);
    }
  }, [data]);

  return (
    <div className="flex h-[calc(100%-75px)] items-center justify-center">
      {isLoading ? (
        // handle error
        <Card className="h-4/5 w-full text-textColor xl:w-3/4">
          <CardHeader>
            <CardTitle>
              <Skeleton className="h-6 w-60 rounded-[5px]" />
            </CardTitle>
          </CardHeader>
          <CardContent className="h-[650px]">
            <Skeleton className="w-4/3 h-[100%] rounded-xl" />
          </CardContent>
        </Card>
      ) : isError ? (
        // handle error
        <Card className="h-4/5 w-full text-textColor xl:w-3/4">
          <CardContent className="flex h-[650px] flex-col items-center justify-center space-y-3">
            <CircleXIcon size={70} color="red" />
            <h1 className="text-2xl">Unable to fetch chart Data.</h1>
            <Button
              variant={"outline"}
              className="rounded"
              onClick={() => {
                refetch();
              }}
            >
              Retry
            </Button>
          </CardContent>
        </Card>
      ) : (
        <Card className="w-full text-textColor xl:w-3/4">
          <CardHeader>
            <CardTitle>{data?.data.stock?.name} Price & Forecast</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer config={chartConfig}>
              <LineChart data={chartData}>
                <CartesianGrid
                  vertical={false}
                  horizontal={true}
                  stroke="#363636"
                />
                <XAxis
                  stroke="#b8b8b8"
                  style={{ fontSize: "12px", fill: "white" }}
                  dataKey="date"
                  tickMargin={8}
                  tickFormatter={formatDate}
                />
                <YAxis
                  width={75}
                  stroke="#b8b8b8"
                  style={{ fontSize: "12px", fill: "white" }}
                  tickMargin={1}
                  tickCount={10}
                  domain={[
                    (dataMin: number | undefined) =>
                      dataMin ? Number((dataMin * 0.95).toFixed(2)) : 0,
                    (dataMax: number | undefined) =>
                      dataMax ? Number((dataMax * 1.05).toFixed(2)) : 100,
                  ]}
                  tickFormatter={(value) => `$${value}`}
                />

                <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
                <Line
                  dataKey={data?.data?.stock?.name || "stock"}
                  type="linear"
                  strokeWidth={2}
                  dot={false}
                  stroke="#2563eb"
                />
                <Line
                  dataKey="forecast"
                  type="linear"
                  strokeWidth={2}
                  dot={false}
                  stroke="#f77d25"
                />
              </LineChart>
            </ChartContainer>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
