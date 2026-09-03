import React from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './ChartCard.css';

export default function VegetationChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">Vegetation Change Over Time</h3>
        <p className="chart-card-subtitle">Vegetation index (NDVI), monthly average</p>
      </div>
      <div className="chart-card-body">
        <ResponsiveContainer width="100%" height={260}>
          <LineChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#E1E8E4" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#5C6B63', fontSize: 12 }}
              axisLine={{ stroke: '#E1E8E4' }}
              tickLine={false}
            />
            <YAxis
              domain={[0, 0.6]}
              tick={{ fill: '#5C6B63', fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              width={36}
            />
            <Tooltip
              contentStyle={{
                background: '#FFFFFF',
                border: '1px solid #E1E8E4',
                borderRadius: 8,
                fontSize: 13,
              }}
              formatter={(value) => [value, 'NDVI']}
            />
            <Line
              type="monotone"
              dataKey="ndvi"
              stroke="#1E7A5C"
              strokeWidth={2.5}
              dot={{ r: 3, fill: '#1E7A5C', strokeWidth: 0 }}
              activeDot={{ r: 5 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
