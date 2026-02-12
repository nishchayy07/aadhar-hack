import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

const StateMaturityChart: React.FC = () => {
  const data = [
    { state: 'Uttar Pradesh', ratio: 45, category: 'High Maturity', color: '#22c55e' },
    { state: 'Maharashtra', ratio: 42, category: 'High Maturity', color: '#22c55e' },
    { state: 'Daman & Diu', ratio: 63, category: 'Saturation', color: '#f97316' },
    { state: 'West Bengal', ratio: 28, category: 'Growth Needed', color: '#eab308' },
    { state: 'Assam', ratio: 25, category: 'Growth Needed', color: '#eab308' },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">State Maturity Analysis</h3>
        <p className="text-sm text-gray-500">Biometric Auth vs Enrolment Ratio</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="state" 
            stroke="#6b7280"
            style={{ fontSize: '11px' }}
            angle={-15}
            textAnchor="end"
            height={80}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
            label={{ value: 'Auth/Enrolment Ratio', angle: -90, position: 'insideLeft', style: { fontSize: '12px' } }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value: number | undefined) => value !== undefined ? [`${value}x`, 'Maturity Score'] : ['0x', 'Maturity Score']}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
            content={() => (
              <div className="flex justify-center gap-6 mt-4 text-xs">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-green-success"></div>
                  <span>High Maturity</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-orange-alert"></div>
                  <span>Saturation</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded bg-yellow-500"></div>
                  <span>Growth Needed</span>
                </div>
              </div>
            )}
          />
          <Bar dataKey="ratio" name="Ratio" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default StateMaturityChart;
