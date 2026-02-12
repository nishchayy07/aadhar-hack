import React from 'react';
import { TrendingUp, Users, UserPlus, Calendar } from 'lucide-react';

interface KPICardProps {
  title: string;
  value: string;
  label: string;
  icon: React.ReactNode;
  color: 'orange' | 'green' | 'blue' | 'purple';
}

const KPICard: React.FC<KPICardProps> = ({ title, value, label, icon, color }) => {
  const colorClasses = {
    orange: 'bg-orange-50 text-orange-600 border-orange-200',
    green: 'bg-green-50 text-green-600 border-green-200',
    blue: 'bg-blue-50 text-blue-600 border-blue-200',
    purple: 'bg-purple-50 text-purple-600 border-purple-200',
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 font-medium mb-2">{title}</p>
          <h3 className="text-3xl font-bold text-gray-900 mb-1">{value}</h3>
          <p className="text-xs text-gray-500">{label}</p>
        </div>
        <div className={`p-3 rounded-lg border ${colorClasses[color]}`}>
          {icon}
        </div>
      </div>
    </div>
  );
};

const KPICards: React.FC = () => {
  const cards = [
    {
      title: 'TOTAL BIOMETRIC AUTHENTICATIONS',
      value: '69.8M',
      label: 'Highest Activity Volume',
      icon: <TrendingUp size={24} />,
      color: 'blue' as const,
    },
    {
      title: 'DEMOGRAPHIC UPDATES',
      value: '49.3M',
      label: 'Address/Name Changes',
      icon: <Users size={24} />,
      color: 'green' as const,
    },
    {
      title: 'NEW ENROLMENTS',
      value: '5.4M',
      label: 'Mostly Children 0-5',
      icon: <UserPlus size={24} />,
      color: 'purple' as const,
    },
    {
      title: 'PEAK ACTIVITY MONTH',
      value: 'Nov 2025',
      label: 'Record High Traffic',
      icon: <Calendar size={24} />,
      color: 'orange' as const,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {cards.map((card, index) => (
        <KPICard key={index} {...card} />
      ))}
    </div>
  );
};

export default KPICards;
