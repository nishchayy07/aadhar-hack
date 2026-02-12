import React from 'react';
import { AlertTriangle, AlertCircle, Info } from 'lucide-react';

interface Alert {
  id: number;
  severity: 'high' | 'medium' | 'info';
  title: string;
  description: string;
  timestamp: string;
}

const AnomalyFeed: React.FC = () => {
  const alerts: Alert[] = [
    {
      id: 1,
      severity: 'high',
      title: 'Zero Adult Enrolments Detected',
      description: 'Daman & Diu showing saturation - no adult enrolments recorded',
      timestamp: '2 hours ago',
    },
    {
      id: 2,
      severity: 'medium',
      title: 'Age 15-17 Biometric Surge',
      description: 'Sudden surge in biometric updates for teenagers (Mandatory Update Cycle)',
      timestamp: '5 hours ago',
    },
    {
      id: 3,
      severity: 'info',
      title: 'Face Auth Usage Spike',
      description: 'Pensioners showing increased face authentication (Life Certificates - Nov 2025)',
      timestamp: '8 hours ago',
    },
  ];

  const getSeverityStyles = (severity: string) => {
    switch (severity) {
      case 'high':
        return {
          bg: 'bg-red-50',
          border: 'border-red-200',
          text: 'text-red-700',
          badge: 'bg-red-100 text-red-700',
          icon: <AlertTriangle size={20} className="text-red-600" />,
        };
      case 'medium':
        return {
          bg: 'bg-yellow-50',
          border: 'border-yellow-200',
          text: 'text-yellow-700',
          badge: 'bg-yellow-100 text-yellow-700',
          icon: <AlertCircle size={20} className="text-yellow-600" />,
        };
      case 'info':
        return {
          bg: 'bg-blue-50',
          border: 'border-blue-200',
          text: 'text-blue-700',
          badge: 'bg-blue-100 text-blue-700',
          icon: <Info size={20} className="text-blue-600" />,
        };
      default:
        return {
          bg: 'bg-gray-50',
          border: 'border-gray-200',
          text: 'text-gray-700',
          badge: 'bg-gray-100 text-gray-700',
          icon: <Info size={20} className="text-gray-600" />,
        };
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Anomaly Detection Feed</h3>
          <p className="text-sm text-gray-500">Live threat monitoring</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
          <span className="text-xs text-gray-600 font-medium">LIVE</span>
        </div>
      </div>

      <div className="space-y-4">
        {alerts.map((alert) => {
          const styles = getSeverityStyles(alert.severity);
          return (
            <div
              key={alert.id}
              className={`${styles.bg} ${styles.border} border rounded-lg p-4 hover:shadow-md transition-shadow duration-200`}
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5">{styles.icon}</div>
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <h4 className={`font-semibold text-sm ${styles.text}`}>
                      {alert.title}
                    </h4>
                    <span className={`${styles.badge} text-xs font-medium px-2 py-1 rounded uppercase`}>
                      {alert.severity}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                  <p className="text-xs text-gray-500">{alert.timestamp}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 pt-4 border-t border-gray-200">
        <button className="w-full text-sm text-blue-600 hover:text-blue-700 font-medium">
          View All Alerts →
        </button>
      </div>
    </div>
  );
};

export default AnomalyFeed;
