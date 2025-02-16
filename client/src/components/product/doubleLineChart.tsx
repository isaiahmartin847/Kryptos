"use client";

import { TrendingUp } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
const chartData = [
  { month: "January", desktop: 1110, mobile: 1110 },
  { month: "February", desktop: 205, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
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

export default function DoubleChart() {
  return (
    <Card className="w-1/2 bg-secondaryColor">
      <CardHeader className="text-textColor">
        <CardTitle>Line Chart - Multiple</CardTitle>
        <CardDescription>January - June 2024</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <LineChart
            accessibilityLayer
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
              dataKey="month"
              tickLine={false}
              axisLine={true}
              tickMargin={8}
              tickFormatter={(value) => value.slice(0, 3)}
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
              type="monotone"
              stroke="#33b5e5"
              strokeWidth={2}
              dot={false}
            />
            <Line
              dataKey="mobile"
              type="monotone"
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
