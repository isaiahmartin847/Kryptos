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

const chartConfig = {
  price: {
    label: "price",
    color: "#2563eb",
  },
} satisfies ChartConfig;

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
      const tempData = data.data.items.map((obj) => {
        return {
          // Apply a scaling factor, e.g., 10, to exaggerate the price fluctuations
          price: obj.price * 10,
          date: new Date(obj.date).toLocaleDateString("en-US", {
            year: "2-digit",
            month: "short",
            day: "2-digit",
          }),
        };
      });

      console.log(tempData);
      setChartData(tempData);
    }
  }, [data]);

  if (isLoading || !data || isError) {
    return <div>loading..</div>;
  }

  return (
    <div className="flex justify-center items-center h-[calc(100%-75px)]">
      <Card className="w-full text-textColor xl:w-3/4">
        <CardHeader>
          <CardTitle>Bitcoin Price & Prediction</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartContainer config={chartConfig}>
            <LineChart data={chartData}>
              <CartesianGrid
                vertical={false}
                horizontal={true}
                stroke="#b8b8b8"
              />

              <XAxis
                stroke="#b8b8b8"
                style={{
                  fontSize: "12px",
                  fill: "white",
                }}
                dataKey="date"
                // tickLine={true}
                // axisLine={true}
                tickMargin={8}
                tickFormatter={formatDate}
              />
              <YAxis
                stroke="#b8b8b8"
                style={{
                  fontSize: "12px",
                  fill: "white",
                }}
                // tickLine={true}
                // axisLine={true}
                tickMargin={8}
                tickCount={10}
                domain={[
                  (dataMin: number | undefined) =>
                    dataMin ? dataMin * 0.95 : 0,
                  (dataMax: number | undefined) =>
                    dataMax ? dataMax * 1.05 : 100,
                ]}
              />
              <ChartTooltip
                cursor={true}
                content={<ChartTooltipContent />}
              />
              <Line
                dataKey="price"
                type="linear"
                strokeWidth={2}
                dot={false}
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
