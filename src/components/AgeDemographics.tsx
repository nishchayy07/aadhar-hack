import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface DonutChartProps {
  title: string;
  data: { name: string; value: number; color: string }[];
}

const DonutChart: React.FC<DonutChartProps> = ({ title, data }) => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h4 className="text-sm font-semibold text-gray-800 mb-4 text-center">{title}</h4>
      <ResponsiveContainer width="100%" height={200}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}%`}
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
        </PieChart>
      </ResponsiveContainer>
      <div className="mt-4 space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded" style={{ backgroundColor: item.color }}></div>
              <span className="text-gray-600">{item.name}</span>
            </div>
            <span className="font-semibold text-gray-800">{item.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

const AgeDemographics: React.FC = () => {
  const enrolmentData = [
    { name: 'Children (0-5)', value: 95, color: '#3b82f6' },
    { name: 'Adults', value: 5, color: '#94a3b8' },
  ];

  const biometricsData = [
    { name: 'Children', value: 49, color: '#8b5cf6' },
    { name: 'Adults', value: 51, color: '#22c55e' },
  ];

  const updatesData = [
    { name: 'Adults', value: 90, color: '#f97316' },
    { name: 'Children', value: 10, color: '#94a3b8' },
  ];

  return (
    <div className="space-y-6">
      <h3 className="text-lg font-semibold text-gray-800">Age Demographics Breakdown</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DonutChart title="Enrolment" data={enrolmentData} />
        <DonutChart title="Biometrics" data={biometricsData} />
        <DonutChart title="Updates" data={updatesData} />
      </div>
    </div>
  );
};

export default AgeDemographics;
