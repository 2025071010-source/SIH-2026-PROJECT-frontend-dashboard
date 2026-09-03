import React from 'react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import './ChartCard.css';

export default function WaterChart({ data }) {
  return (
    <div className="chart-card">
      <div className="chart-card-header">
        <h3 className="chart-card-title">Water Availability</h3>
        <p className="chart-card-subtitle">Surface water coverage, % of watershed area</p>
      </div>
      <div className="chart-card-body">
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={data} margin={{ top: 8, right: 12, left: -12, bottom: 0 }}>
            <CartesianGrid stroke="#E1E8E4" vertical={false} />
            <XAxis
              dataKey="month"
              tick={{ fill: '#5C6B63', fontSize: 12 }}
              axisLine={{ stroke: '#E1E8E4' }}
              tickLine={false}
            />
            <YAxis
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
              formatter={(value) => [`${value}%`, 'Availability']}
              cursor={{ fill: '#E7F0F7' }}
            />
            <Bar dataKey="percent" fill="#2B6CA3" radius={[4, 4, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
