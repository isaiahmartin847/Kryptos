"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useQuery } from "@tanstack/react-query";
import { fetchBitcoin } from "@/apiFunctions/getFunctions";
import { useEffect, useState } from "react";

const chartConfig = {} satisfies ChartConfig;

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
  const [chartData, setChartData] = useState<any[]>([]);
  const { data, isLoading, isError } = useQuery({
    queryKey: ["bitcoinPrice"],
    queryFn: fetchBitcoin,
  });

  useEffect(() => {
    if (data) {
      const tempData = data.map((obj) => {
        return {
          price: obj.price.toFixed(1),
          date: new Date(obj.date).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "short",
            day: "2-digit",
          }),
        };
      });

      setChartData(tempData);
    }
  }, [data]);

  if (isLoading || !data || isError) {
    return <div>loading..</div>;
  }

  return (
    <Card className="w-1/2 bg-secondaryColor">
      <CardHeader className="text-textColor">
        <CardTitle>Bitcoin Price</CardTitle>
        <CardDescription>January</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            data={chartData}
            className="text-textColor"
            margin={{
              left: 12,
              right: 12,
            }}>
            <CartesianGrid
              vertical={false}
              strokeDasharray="3 3"
            />
            <XAxis
              className="bg-white"
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDate} // Use the formatDate function
              style={{
                fontSize: "12px",
                fill: "white",
              }}
            />
            <YAxis
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickCount={10}
              style={{
                fontSize: "12px",
                fill: "white",
              }}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent />}
            />
            <Line
              dataKey="price"
              type="linear"
              stroke="#33b5e5"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
