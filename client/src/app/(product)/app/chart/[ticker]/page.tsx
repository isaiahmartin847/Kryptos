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

  const { data, isLoading, isError } = useQuery({
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
      const tempData = data.data.items.map((obj) => {
        return {
          // Format to 2 decimal places
          bitcoin: parseFloat((obj.daily_price * 10).toFixed(2)),
          forecast: parseFloat((obj.forecasted_price * 10).toFixed(2)),
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

  if (!ticker) {
    return <div>No ticker provided</div>;
  }

  if (isLoading || !data || isError) {
    return <div>loading..</div>;
  }

  return (
    <div className="flex h-[calc(100%-75px)] items-center justify-center">
      <Card className="w-full text-textColor xl:w-3/4">
        <CardHeader>
          <CardTitle>{data.data.stock?.name} Price & Forecast</CardTitle>
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
              <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
              <Line
                dataKey="bitcoin"
                type="linear"
                strokeWidth={2}
                dot={false}
                stroke="#2563eb" // Explicitly set blue color
              />
              <Line
                dataKey="forecast"
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
