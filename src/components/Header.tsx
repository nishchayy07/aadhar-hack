import React from 'react';

interface HeaderProps {
  activeView: 'overview' | 'state' | 'demographic' | 'anomaly';
}

const Header: React.FC<HeaderProps> = ({ activeView }) => {
  const titles = {
    overview: 'National Overview Dashboard',
    state: 'State Performance Dashboard',
    demographic: 'Demographic Trends Dashboard',
    anomaly: 'Anomaly Detection Dashboard',
  };

  return (
    <header className="bg-white h-16 fixed top-0 right-0 left-64 shadow-sm z-10 flex items-center justify-between px-6">
      <div>
        <h2 className="text-lg font-semibold text-gray-800">{titles[activeView]}</h2>
        <p className="text-xs text-gray-500">Real-time Analytics • 2025 Dataset</p>
      </div>
      <div className="flex items-center gap-4">
        <div className="text-right">
          <p className="text-xs text-gray-500">Last Updated</p>
          <p className="text-sm font-medium text-gray-800">Feb 12, 2026</p>
        </div>
      </div>
    </header>
  );
};

export default Header;
