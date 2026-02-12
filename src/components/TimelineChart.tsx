import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const TimelineChart: React.FC = () => {
  // 2025 monthly data with specific spikes
  const data = [
    { month: 'Jan', enrolment: 380, biometrics: 5200, updates: 3800 },
    { month: 'Feb', enrolment: 420, biometrics: 5500, updates: 4100 },
    { month: 'Mar', enrolment: 390, biometrics: 5300, updates: 3900 },
    { month: 'Apr', enrolment: 410, biometrics: 5600, updates: 4200 },
    { month: 'May', enrolment: 450, biometrics: 5800, updates: 4300 },
    { month: 'Jun', enrolment: 430, biometrics: 5700, updates: 4100 },
    { month: 'Jul', enrolment: 460, biometrics: 6000, updates: 4400 },
    { month: 'Aug', enrolment: 440, biometrics: 5900, updates: 4200 },
    { month: 'Sep', enrolment: 470, biometrics: 6100, updates: 4500 },
    { month: 'Oct', enrolment: 490, biometrics: 6300, updates: 8200 }, // Updates spike (fee hike deadline)
    { month: 'Nov', enrolment: 520, biometrics: 12500, updates: 5100 }, // Biometrics spike (2.31B nationally)
    { month: 'Dec', enrolment: 1850, biometrics: 6800, updates: 4800 }, // Enrolment spike (PAN-Aadhaar deadline)
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-800">The 2025 Timeline</h3>
        <p className="text-sm text-gray-500">Monthly Activity Trends (in thousands)</p>
      </div>
      <ResponsiveContainer width="100%" height={350}>
        <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="month" 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <YAxis 
            stroke="#6b7280"
            style={{ fontSize: '12px' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
          />
          <Legend 
            wrapperStyle={{ fontSize: '12px' }}
          />
          <Line 
            type="monotone" 
            dataKey="enrolment" 
            stroke="#a855f7" 
            strokeWidth={2}
            name="Enrolment"
            dot={{ fill: '#a855f7', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="biometrics" 
            stroke="#3b82f6" 
            strokeWidth={2}
            name="Biometrics"
            dot={{ fill: '#3b82f6', r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line 
            type="monotone" 
            dataKey="updates" 
            stroke="#22c55e" 
            strokeWidth={2}
            name="Updates"
            dot={{ fill: '#22c55e', r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TimelineChart;
