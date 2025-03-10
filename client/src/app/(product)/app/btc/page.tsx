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
import { fetchBitcoin, fetchBitcoinChart } from "@/apiFunctions/getFunctions";
import { useEffect, useState } from "react";

const chartConfig = {
  bitcoin: {
    label: "bitcoin",
    color: "#2563eb", // Blue color
  },
  prediction: {
    label: "prediction",
    color: "#f77d25", // Orange color
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
    queryKey: ["bitcoinChart"],
    queryFn: fetchBitcoinChart,
  });

  useEffect(() => {
    if (data) {
      const tempData = data.data.items.map((obj) => {
        return {
          // Format to 2 decimal places
          bitcoin: parseFloat((obj.bitcoin * 10).toFixed(2)),
          prediction: parseFloat((obj.prediction * 10).toFixed(2)),
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
                stroke="#363636"
              />

              <XAxis
                stroke="#b8b8b8"
                style={{
                  fontSize: "12px",
                  fill: "white",
                }}
                dataKey="date"
                tickMargin={8}
                tickFormatter={formatDate}
              />
              <YAxis
                width={75} // Explicitly set width for the Y-axis
                stroke="#b8b8b8"
                style={{
                  fontSize: "12px",
                  fill: "white",
                }}
                tickMargin={1}
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
                dataKey="bitcoin"
                type="linear"
                strokeWidth={2}
                dot={false}
                stroke="#2563eb" // Explicitly set blue color
              />
              <Line
                dataKey="prediction"
                type="linear"
                strokeWidth={2}
                dot={false}
                stroke="#f77d25" // Explicitly set orange color
              />
            </LineChart>
          </ChartContainer>
        </CardContent>
      </Card>
    </div>
  );
}
