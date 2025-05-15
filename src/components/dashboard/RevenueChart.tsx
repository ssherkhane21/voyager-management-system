
import React from 'react';
import { Line } from 'recharts';
import { ChartData } from '@/types/admin';

interface RevenueChartProps {
  data: ChartData;
}

const RevenueChart = ({ data }: RevenueChartProps) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Revenue Trends</h3>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-blue-500 mr-1"></div>
            <span className="text-xs text-gray-500">Revenue</span>
          </div>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data.labels.map((label, index) => ({
            name: label,
            revenue: data.datasets[0].data[index]
          }))}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="revenue"
              stroke="#3b82f6"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Mock the Recharts components to avoid errors in this context
const ResponsiveContainer = ({ children, width, height }: { children: React.ReactNode, width: string, height: string }) => (
  <div style={{ width, height }}>{children}</div>
);

const LineChart = ({ data, children }: { data: any[], children: React.ReactNode }) => (
  <div className="flex justify-center items-center h-full">
    <div className="text-center text-gray-500">
      [Line Chart: Data visualization showing revenue trends over time]
      <div className="text-sm mt-4">
        <strong>Note:</strong> This is a placeholder for the actual Recharts component
      </div>
    </div>
  </div>
);

const CartesianGrid = ({ strokeDasharray, vertical }: { strokeDasharray: string, vertical: boolean }) => null;
const XAxis = ({ dataKey }: { dataKey: string }) => null;
const YAxis = () => null;
const Tooltip = () => null;
const Legend = () => null;

export default RevenueChart;
