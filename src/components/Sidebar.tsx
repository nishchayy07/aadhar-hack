import React from 'react';
import { Activity, Users, Map, AlertTriangle } from 'lucide-react';

interface MenuItem {
  id: 'overview' | 'state' | 'demographic' | 'anomaly';
  label: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  activeView: 'overview' | 'state' | 'demographic' | 'anomaly';
  onViewChange: (view: 'overview' | 'state' | 'demographic' | 'anomaly') => void;
}

const Sidebar: React.FC<SidebarProps> = ({ activeView, onViewChange }) => {
  const menuItems: MenuItem[] = [
    { id: 'overview', label: 'National Overview', icon: <Activity size={20} /> },
    { id: 'state', label: 'State Performance', icon: <Map size={20} /> },
    { id: 'demographic', label: 'Demographic Trends', icon: <Users size={20} /> },
    { id: 'anomaly', label: 'Anomaly Detection', icon: <AlertTriangle size={20} /> },
  ];

  return (
    <div className="w-64 bg-navy-dark h-screen fixed left-0 top-0 text-white flex flex-col">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <h1 className="text-xl font-bold tracking-tight">AADHAAR-DARPAN</h1>
        <p className="text-xs text-slate-400 mt-1">Integrated UIDAI Analytics & Monitoring</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => (
            <li key={item.id}>
              <button
                onClick={() => onViewChange(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  activeView === item.id
                    ? 'bg-blue-600 text-white shadow-lg'
                    : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                }`}
              >
                {item.icon}
                <span className="text-sm font-medium">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-slate-700">
        <p className="text-xs text-slate-500 text-center">
          UIDAI Data Analytics Portal
        </p>
      </div>
    </div>
  );
};

export default Sidebar;
