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

// Sample data with desktop and mobile keys
const chartData = [
  { date: "2025-01-01", desktop: 45000, mobile: 44000 },
  { date: "2025-01-02", desktop: 45500, mobile: 44500 },
  { date: "2025-01-03", desktop: 45200, mobile: 44200 },
  { date: "2025-01-04", desktop: 46000, mobile: 45000 },
  { date: "2025-01-05", desktop: 46500, mobile: 44000 },
  { date: "2025-01-06", desktop: 46300, mobile: 46000 },
  { date: "2025-01-07", desktop: 46000, mobile: 45900 },
  { date: "2025-01-08", desktop: 46200, mobile: 46100 },
  { date: "2025-01-09", desktop: 46400, mobile: 46300 },
  { date: "2025-01-10", desktop: 46600, mobile: 46500 },
  { date: "2025-01-11", desktop: 46800, mobile: 46700 },
  { date: "2025-01-12", desktop: 47000, mobile: 46900 },
  { date: "2025-01-13", desktop: 47200, mobile: 47100 },
  { date: "2025-01-14", desktop: 47400, mobile: 47300 },
  { date: "2025-01-15", desktop: 47600, mobile: 47500 },
  { date: "2025-01-16", desktop: 47800, mobile: 47700 },
  { date: "2025-01-17", desktop: 48000, mobile: 47900 },
  { date: "2025-01-18", desktop: 48200, mobile: 48100 },
  { date: "2025-01-19", desktop: 48400, mobile: 48300 },
  { date: "2025-01-20", desktop: 48600, mobile: 48500 },
  { date: "2025-01-21", desktop: 48800, mobile: 48700 },
  { date: "2025-01-22", desktop: 49000, mobile: 48900 },
  { date: "2025-01-23", desktop: 49200, mobile: 49100 },
  { date: "2025-01-24", desktop: 49400, mobile: 49300 },
  { date: "2025-01-25", desktop: 49600, mobile: 49500 },
  { date: "2025-01-26", desktop: 49800, mobile: 49700 },
  { date: "2025-01-27", desktop: 50000, mobile: 49900 },
  { date: "2025-01-28", desktop: 50200, mobile: 50100 },
  { date: "2025-01-29", desktop: 50400, mobile: 50300 },
  { date: "2025-01-30", desktop: 50600, mobile: 50500 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "#33b5e5",
  },
  mobile: {
    label: "Mobile",
    color: "#ff5733",
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
              dataKey="desktop"
              type="linear"
              stroke="#33b5e5"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="linear"
              stroke="#ff5733"
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
