import { ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "May", vendors: 186, cars: 280 },
  { month: "June", vendors: 180, cars: 200 },
  { month: "July", vendors: 37, cars: 120 },
  { month: "August", vendors: 173, cars: 190 },
  { month: "September", vendors: 109, cars: 130 },
  { month: "October", vendors: 114, cars: 140 },
];

const chartConfig = {
  vendors: {
    label: "Vendors",
    color: "var(--chart-1)",
  },
  cars: {
    label: "Cars Added",
    color: "var(--chart-2)",
  },
};

export function ChartBarMultiple() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Vendor & Car Bar Chart</CardTitle>
        <CardDescription>May - October 2025</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent indicator="dashed" />}
            />
            <Bar dataKey="vendors" fill="var(--color-vendors)" radius={4} />
            <Bar dataKey="cars" fill="var(--color-cars)" radius={4} />
            <ChartLegend content={<ChartLegendContent />} />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
