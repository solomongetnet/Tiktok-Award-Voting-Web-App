"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getCreatorSubmissionsChartDataAction } from "@/server/actions";

const CHART_COLORS = {
  primary: "#FE2C55",
  secondary: "#25F4EE",
};

export default function ChartOverview() {
  const [period, setPeriod] = useState<
    "daily" | "weekly" | "monthly" | "yearly"
  >("monthly");

  const { data, isLoading } = useQuery({
    queryKey: ["creatorSubmissions", period],
    queryFn: () => getCreatorSubmissionsChartDataAction(period),
  });

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white px-3 py-2 rounded-lg shadow-sm border border-gray-100">
          <p className="text-sm text-gray-600 mb-1">{label}</p>
          {payload.map((entry: any) => (
            <p
              key={entry.name}
              className="text-sm font-medium"
              style={{ color: entry.color }}
            >
              {entry.name}: {entry.value}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  if (isLoading) {
    return (
      <div className="w-full bg-white rounded-xl p-8 min-h-[600px] flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-white rounded-xl p-8">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-2xl font-semibold text-gray-900">
          TikTok Awards Overview
        </h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-500">SORT BY:</span>
          <Select
            value={period}
            onValueChange={(value: "daily" | "weekly" | "monthly" | "yearly") =>
              setPeriod(value)
            }
          >
            <SelectTrigger className="w-[130px] bg-gray-50 border-gray-200">
              <SelectValue placeholder="Select period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">Daily</SelectItem>
              <SelectItem value="weekly">Weekly</SelectItem>
              <SelectItem value="monthly">Monthly</SelectItem>
              <SelectItem value="yearly">Yearly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="h-[400px] w-full mb-8">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data?.chartData}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              {data?.categoryTotals.slice(0, 2).map((category, index) => (
                <linearGradient
                  key={category.name}
                  id={`gradient${index}`}
                  x1="0"
                  y1="0"
                  x2="0"
                  y2="1"
                >
                  <stop
                    offset="5%"
                    stopColor={
                      index === 0
                        ? CHART_COLORS.primary
                        : CHART_COLORS.secondary
                    }
                    stopOpacity={0.1}
                  />
                  <stop
                    offset="95%"
                    stopColor={
                      index === 0
                        ? CHART_COLORS.primary
                        : CHART_COLORS.secondary
                    }
                    stopOpacity={0.01}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid
              vertical={false}
              horizontal={true}
              stroke="#E5E7EB"
              strokeDasharray="8 8"
            />
            <XAxis
              dataKey="name"
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
              dy={10}
            />
            <YAxis
              axisLine={false}
              tickLine={false}
              tick={{ fill: "#6B7280", fontSize: 12 }}
            />
            <Tooltip content={<CustomTooltip />} />
            {data?.categoryTotals.slice(0, 2).map((category, index) => (
              <Area
                key={category.name}
                type="monotone"
                dataKey={category.name}
                stroke={
                  index === 0 ? CHART_COLORS.primary : CHART_COLORS.secondary
                }
                strokeWidth={2}
                fill={`url(#gradient${index})`}
              />
            ))}
          </AreaChart>
        </ResponsiveContainer>
      </div>

      <div className="grid grid-cols-2 gap-8">
        {data?.categoryTotals.slice(0, 2).map((category, index) => (
          <div key={category.name}>
            <h3 className="text-gray-500 text-sm mb-1">
              Total {category.name}
            </h3>
            <p className="text-3xl font-bold">{category.total}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
