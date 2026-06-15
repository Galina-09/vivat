import React from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
} from 'recharts';

interface LineChartProps {
  data: Record<string, string | number>[];
  dataKey?: string;
  xAxisKey?: string;
  height?: number;
  showGrid?: boolean;
  area?: boolean;
  color?: string;
}

export const LineChart: React.FC<LineChartProps> = ({
  data,
  dataKey = 'value',
  xAxisKey = 'name',
  height = 300,
  showGrid = true,
  area = false,
  color = '#3b82f6',
}) => {
  const ChartComponent = area ? AreaChart : RechartsLineChart;

  return (
    <ResponsiveContainer width="100%" height={height}>
      <ChartComponent data={data}>
        {showGrid && (
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="#e5e7eb"
            vertical={false}
          />
        )}
        <XAxis
          dataKey={xAxisKey}
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#6b7280', fontSize: 12 }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: '#fff',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
          }}
        />
        {area ? (
          <Area
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            fill={color}
            fillOpacity={0.1}
          />
        ) : (
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke={color}
            strokeWidth={2}
            dot={false}
          />
        )}
      </ChartComponent>
    </ResponsiveContainer>
  );
};
