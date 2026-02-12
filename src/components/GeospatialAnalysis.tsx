import React, { useState, useMemo } from 'react';
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import dashboardData from '../dashboard_data.json';
import indiaGeoJSON from '../india-states.json';

// Pure JS color interpolation
const interpolateColor = (value: number, min: number, max: number): string => {
  if (max === min) return '#fef08a';
  const normalized = (value - min) / (max - min);
  
  const colors = [
    { pos: 0, rgb: [254, 240, 138] },
    { pos: 0.2, rgb: [253, 224, 71] },
    { pos: 0.4, rgb: [251, 146, 60] },
    { pos: 0.6, rgb: [249, 115, 22] },
    { pos: 0.8, rgb: [220, 38, 38] },
    { pos: 1, rgb: [153, 27, 27] },
  ];
  
  let lower = colors[0];
  let upper = colors[colors.length - 1];
  
  for (let i = 0; i < colors.length - 1; i++) {
    if (normalized >= colors[i].pos && normalized <= colors[i + 1].pos) {
      lower = colors[i];
      upper = colors[i + 1];
      break;
    }
  }
  
  const range = upper.pos - lower.pos;
  const rangePct = range === 0 ? 0 : (normalized - lower.pos) / range;
  
  const r = Math.round(lower.rgb[0] + (upper.rgb[0] - lower.rgb[0]) * rangePct);
  const g = Math.round(lower.rgb[1] + (upper.rgb[1] - lower.rgb[1]) * rangePct);
  const b = Math.round(lower.rgb[2] + (upper.rgb[2] - lower.rgb[2]) * rangePct);
  
  return `rgb(${r}, ${g}, ${b})`;
};

// State name normalizer with comprehensive mappings
const normalizeStateName = (name: string): string => {
  if (!name) return '';
  
  // Trim and normalize whitespace
  const trimmed = name.trim();
  
  // Direct mappings for known variations
  const normalizations: Record<string, string> = {
    // GeoJSON variations → Dashboard data names
    'Orissa': 'Odisha',
    'Uttaranchal': 'Uttarakhand',
    'Pondicherry': 'Puducherry',
    'Andaman & Nicobar': 'Andaman and Nicobar Islands',
    'Andaman & Nicobar Island': 'Andaman and Nicobar Islands',
    'Andaman and Nicobar': 'Andaman and Nicobar Islands',
    'Dadra and Nagar Haveli and Daman and Diu': 'Dadra and Nagar Haveli',
    'Dadra & Nagar Haveli': 'Dadra and Nagar Haveli',
    'Daman and Diu': 'Dadra and Nagar Haveli',
    'Daman & Diu': 'Dadra and Nagar Haveli',
    'NCT of Delhi': 'Delhi',
    'National Capital Territory of Delhi': 'Delhi',
    'Jammu & Kashmir': 'Jammu and Kashmir',
    'Jammu and Kashmir': 'Jammu and Kashmir',
    'Arunanchal Pradesh': 'Arunachal Pradesh',
    'Chhattisgarh': 'Chhattisgarh',
    'Chattisgarh': 'Chhattisgarh',
  };
  
  // Check direct mapping first
  if (normalizations[trimmed]) {
    return normalizations[trimmed];
  }
  
  // Return as-is if no mapping found
  return trimmed;
};

const GeospatialAnalysis: React.FC = () => {
  const [selectedMonth, setSelectedMonth] = useState('2025-03');
  const [selectedState, setSelectedState] = useState('All India');
  const [hoveredState, setHoveredState] = useState<{ name: string; enrolment: number } | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  const months = [
    { value: '2025-03', label: 'March 2025' },
    { value: '2025-04', label: 'April 2025' },
    { value: '2025-05', label: 'May 2025' },
    { value: '2025-06', label: 'June 2025' },
    { value: '2025-07', label: 'July 2025' },
    { value: '2025-09', label: 'September 2025' },
    { value: '2025-10', label: 'October 2025' },
    { value: '2025-11', label: 'November 2025' },
    { value: '2025-12', label: 'December 2025' },
  ];

  const states = useMemo(() => {
    const stateList = dashboardData.data.map((item) => item.state).sort();
    return ['All India', ...stateList];
  }, []);

  const heatmapData = useMemo(() => {
    const dataMap: Record<string, number> = {};
    dashboardData.data.forEach((stateItem) => {
      const monthData = stateItem.trends.find((t) => t.month === selectedMonth);
      const normalizedName = normalizeStateName(stateItem.state);
      const enrolment = monthData?.enrolment || 0;
      
      dataMap[normalizedName] = enrolment;
      // Also store with original name for fallback
      dataMap[stateItem.state] = enrolment;
    });
    return dataMap;
  }, [selectedMonth]);

  const colorScale = useMemo(() => {
    const values = Object.values(heatmapData).filter(v => v > 0);
    if (values.length === 0) return { min: 0, max: 100 };
    return {
      min: Math.min(...values),
      max: Math.max(...values),
    };
  }, [heatmapData]);

  const getEnrolmentForState = (geoName: string): number => {
    const normalized = normalizeStateName(geoName);
    return heatmapData[normalized] || heatmapData[geoName] || 0;
  };

  const trendChartData = useMemo(() => {
    if (selectedState === 'All India') {
      const monthlyTotals: Record<string, { biometric: number; demographic: number }> = {};
      dashboardData.data.forEach((stateItem) => {
        stateItem.trends.forEach((trend) => {
          if (!monthlyTotals[trend.month]) {
            monthlyTotals[trend.month] = { biometric: 0, demographic: 0 };
          }
          monthlyTotals[trend.month].biometric += trend.biometric;
          monthlyTotals[trend.month].demographic += trend.demographic;
        });
      });
      return months.map((month) => ({
        month: month.label.split(' ')[0],
        biometric: monthlyTotals[month.value]?.biometric || 0,
        demographic: monthlyTotals[month.value]?.demographic || 0,
      }));
    } else {
      const stateItem = dashboardData.data.find((s) => s.state === selectedState);
      if (!stateItem) return [];
      return months.map((month) => {
        const trend = stateItem.trends.find((t) => t.month === month.value);
        return {
          month: month.label.split(' ')[0],
          biometric: trend?.biometric || 0,
          demographic: trend?.demographic || 0,
        };
      });
    }
  }, [selectedState]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* LEFT PANEL: India Choropleth Map */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Regional Enrolment Intensity</h3>
              <p className="text-sm text-gray-500">Interactive geographical heatmap</p>
            </div>
            <select
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm hover:shadow-md cursor-pointer flex-shrink-0"
              style={{ minWidth: '160px' }}
            >
              {months.map((month) => (
                <option key={month.value} value={month.value} className="text-gray-800">
                  {month.label}
                </option>
              ))}
            </select>
          </div>

          {/* Color Legend */}
          <div className="mb-4 p-3 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-700 mb-2">Enrolment Intensity</p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-gray-600">Low</span>
              <div className="flex-1 h-4 rounded" style={{
                background: 'linear-gradient(to right, #fef08a, #fde047, #fb923c, #f97316, #dc2626, #991b1b)'
              }}></div>
              <span className="text-xs text-gray-600">High</span>
            </div>
          </div>

          {/* India Geographical Map */}
          <div className="relative bg-gray-50 rounded-lg p-2" style={{ height: '500px' }}>
            <ComposableMap
              projection="geoMercator"
              projectionConfig={{
                scale: 1100,
                center: [78.9629, 23.5937],
              }}
              width={800}
              height={600}
              style={{ width: '100%', height: '100%' }}
            >
              <Geographies geography={indiaGeoJSON}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const stateName = geo.properties.ST_NM || geo.properties.NAME_1 || geo.properties.name || '';
                    const enrolment = getEnrolmentForState(stateName);
                    const fillColor = enrolment > 0 
                      ? interpolateColor(enrolment, colorScale.min, colorScale.max)
                      : '#e5e7eb';

                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill={fillColor}
                        stroke="#ffffff"
                        strokeWidth={0.5}
                        style={{
                          default: { outline: 'none' },
                          hover: {
                            fill: '#3b82f6',
                            outline: 'none',
                            cursor: 'pointer',
                          },
                          pressed: { outline: 'none' },
                        }}
                        onMouseEnter={(event) => {
                          setHoveredState({ name: stateName, enrolment });
                          setTooltipPosition({ x: event.clientX, y: event.clientY });
                        }}
                        onMouseMove={(event) => {
                          setTooltipPosition({ x: event.clientX, y: event.clientY });
                        }}
                        onMouseLeave={() => {
                          setHoveredState(null);
                        }}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>

            {/* Tooltip */}
            {hoveredState && (
              <div
                className="fixed z-50 bg-gray-900 text-white px-3 py-2 rounded-lg shadow-lg text-sm pointer-events-none"
                style={{
                  left: `${tooltipPosition.x + 10}px`,
                  top: `${tooltipPosition.y + 10}px`,
                }}
              >
                <div className="font-semibold">{hoveredState.name}</div>
                <div className="text-xs text-gray-300">
                  Enrolment: {hoveredState.enrolment.toLocaleString()}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* RIGHT PANEL: Biometric vs Demographic Trends */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="mb-4 flex items-start justify-between">
            <div>
              <h3 className="text-lg font-semibold text-gray-800">Service Usage Comparison</h3>
              <p className="text-sm text-gray-500">Monthly biometric vs demographic trends</p>
            </div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="px-3 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all shadow-sm hover:shadow-md cursor-pointer flex-shrink-0"
              style={{ minWidth: '160px' }}
            >
              {states.map((state) => (
                <option key={state} value={state} className="text-gray-800">
                  {state}
                </option>
              ))}
            </select>
          </div>

          <ResponsiveContainer width="100%" height={380}>
            <BarChart data={trendChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" style={{ fontSize: '12px' }} />
              <YAxis
                stroke="#6b7280"
                style={{ fontSize: '12px' }}
                tickFormatter={(value) => {
                  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
                  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
                  return value.toString();
                }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: '#fff',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                  fontSize: '12px',
                }}
                formatter={(value: number) => value.toLocaleString()}
              />
              <Legend wrapperStyle={{ fontSize: '12px' }} />
              <Bar dataKey="biometric" fill="#3b82f6" name="Biometric Auth" radius={[4, 4, 0, 0]} />
              <Bar dataKey="demographic" fill="#22c55e" name="Demographic Updates" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>

          <div className="mt-6 pt-4 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-blue-50 rounded-lg p-3 border border-blue-200">
                <p className="text-xs text-blue-700 font-medium mb-1">Total Biometric Auth</p>
                <p className="text-xl font-bold text-blue-600">
                  {trendChartData.reduce((sum, item) => sum + item.biometric, 0).toLocaleString()}
                </p>
              </div>
              <div className="bg-green-50 rounded-lg p-3 border border-green-200">
                <p className="text-xs text-green-700 font-medium mb-1">Total Demographic Updates</p>
                <p className="text-xl font-bold text-green-600">
                  {trendChartData.reduce((sum, item) => sum + item.demographic, 0).toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GeospatialAnalysis;
