
import React, { useState } from 'react';
import { Bar } from 'recharts';
import { ChartData } from '@/types/admin';

interface BookingChartProps {
  monthlyData: ChartData;
  weeklyData: ChartData;
  yearlyData: ChartData;
}

const BookingChart = ({ monthlyData, weeklyData, yearlyData }: BookingChartProps) => {
  const [timeRange, setTimeRange] = useState<'weekly' | 'monthly' | 'yearly'>('monthly');

  const getCurrentData = () => {
    switch (timeRange) {
      case 'weekly':
        return weeklyData;
      case 'yearly':
        return yearlyData;
      case 'monthly':
      default:
        return monthlyData;
    }
  };

  const currentData = getCurrentData();

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium">Booking Statistics</h3>
        <div className="flex space-x-2">
          <button
            onClick={() => setTimeRange('weekly')}
            className={`px-3 py-1 text-xs rounded-md ${
              timeRange === 'weekly'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Weekly
          </button>
          <button
            onClick={() => setTimeRange('monthly')}
            className={`px-3 py-1 text-xs rounded-md ${
              timeRange === 'monthly'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Monthly
          </button>
          <button
            onClick={() => setTimeRange('yearly')}
            className={`px-3 py-1 text-xs rounded-md ${
              timeRange === 'yearly'
                ? 'bg-blue-100 text-blue-700'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            Yearly
          </button>
        </div>
      </div>

      <div className="w-full h-80">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={currentData.labels.map((label, index) => {
            const dataPoint: { [key: string]: any } = { name: label };
            
            // Add values for each dataset
            currentData.datasets.forEach((dataset) => {
              dataPoint[dataset.label] = dataset.data[index];
            });
            
            return dataPoint;
          })}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            {currentData.datasets.map((dataset, index) => (
              <Bar 
                key={dataset.label}
                dataKey={dataset.label}
                fill={dataset.backgroundColor.replace('0.5', '0.8')}
                radius={[4, 4, 0, 0]}
                barSize={timeRange === 'yearly' ? 40 : 20}
              />
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

// Mock the Recharts components to avoid errors in this context
const ResponsiveContainer = ({ children, width, height }: { children: React.ReactNode, width: string, height: string }) => (
  <div style={{ width, height }}>{children}</div>
);

const BarChart = ({ data, children }: { data: any[], children: React.ReactNode }) => (
  <div className="flex justify-center items-center h-full">
    <div className="text-center text-gray-500">
      [Bar Chart: Data visualization showing booking statistics across different services]
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

export default BookingChart;
