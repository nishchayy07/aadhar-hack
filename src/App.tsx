import { useState } from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import KPICards from './components/KPICards';
import TimelineChart from './components/TimelineChart';
import StateMaturityChart from './components/StateMaturityChart';
import AgeDemographics from './components/AgeDemographics';
import AnomalyFeed from './components/AnomalyFeed';
import GeospatialAnalysis from './components/GeospatialAnalysis';

type ActiveView = 'overview' | 'state' | 'demographic' | 'anomaly';

function App() {
  const [activeView, setActiveView] = useState<ActiveView>('state');

  return (
    <div className="min-h-screen bg-grey-light">
      {/* Sidebar */}
      <Sidebar activeView={activeView} onViewChange={setActiveView} />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header activeView={activeView} />

        {/* Dashboard Content */}
        <main className="pt-20 p-6 space-y-6">
          {/* State Performance View */}
          {activeView === 'state' && (
            <>
              <KPICards />
              <GeospatialAnalysis />
            </>
          )}

          {/* National Overview */}
          {activeView === 'overview' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">National Overview</h2>
                <p className="text-gray-600 mb-6">Comprehensive view of UIDAI operations across India</p>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  <div className="bg-blue-50 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-sm font-semibold text-blue-900 mb-2">Total Aadhaar Generated</h3>
                    <p className="text-3xl font-bold text-blue-600">1.39 Billion</p>
                    <p className="text-xs text-blue-700 mt-2">99.9% of adult population</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-6 border border-green-200">
                    <h3 className="text-sm font-semibold text-green-900 mb-2">Active States/UTs</h3>
                    <p className="text-3xl font-bold text-green-600">36</p>
                    <p className="text-xs text-green-700 mt-2">100% coverage nationwide</p>
                  </div>
                  <div className="bg-purple-50 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-sm font-semibold text-purple-900 mb-2">Daily Authentications</h3>
                    <p className="text-3xl font-bold text-purple-600">85M+</p>
                    <p className="text-xs text-purple-700 mt-2">Peak: 120M/day</p>
                  </div>
                </div>

                <KPICards />
                <div className="mt-6">
                  <TimelineChart />
                </div>
              </div>
            </div>
          )}

          {/* Demographic Trends */}
          {activeView === 'demographic' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Demographic Trends</h2>
                <p className="text-gray-600 mb-6">Age-wise distribution and enrollment patterns</p>
                
                <AgeDemographics />
                
                <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 border border-blue-200">
                    <h3 className="text-lg font-semibold text-blue-900 mb-4">Key Insights</h3>
                    <ul className="space-y-3 text-sm text-blue-800">
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>95% of new enrollments</strong> are children aged 0-5 years</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Biometric updates</strong> are evenly split between children and adults</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>90% of demographic updates</strong> are from adults (address/name changes)</span>
                      </li>
                      <li className="flex items-start gap-2">
                        <span className="text-blue-600 font-bold">•</span>
                        <span><strong>Mandatory biometric update</strong> at age 5 and 15 drives child authentication</span>
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 border border-purple-200">
                    <h3 className="text-lg font-semibold text-purple-900 mb-4">Enrollment Trends</h3>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-800 font-medium">Children (0-18)</span>
                          <span className="text-purple-900 font-bold">78%</span>
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-3">
                          <div className="bg-purple-600 h-3 rounded-full" style={{ width: '78%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-800 font-medium">Adults (19-60)</span>
                          <span className="text-purple-900 font-bold">18%</span>
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-3">
                          <div className="bg-purple-500 h-3 rounded-full" style={{ width: '18%' }}></div>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span className="text-purple-800 font-medium">Senior Citizens (60+)</span>
                          <span className="text-purple-900 font-bold">4%</span>
                        </div>
                        <div className="w-full bg-purple-200 rounded-full h-3">
                          <div className="bg-purple-400 h-3 rounded-full" style={{ width: '4%' }}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Anomaly Detection */}
          {activeView === 'anomaly' && (
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8">
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Anomaly Detection & Security</h2>
                <p className="text-gray-600 mb-6">Real-time monitoring and threat analysis</p>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                  <AnomalyFeed />
                  
                  <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-xl shadow-sm border border-red-200 p-6">
                    <h3 className="text-lg font-semibold text-red-900 mb-4">Security Metrics</h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-red-100">
                        <div>
                          <p className="text-sm text-gray-600">Failed Auth Attempts</p>
                          <p className="text-2xl font-bold text-red-600">2.3%</p>
                        </div>
                        <div className="text-red-500">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-green-100">
                        <div>
                          <p className="text-sm text-gray-600">Successful Verifications</p>
                          <p className="text-2xl font-bold text-green-600">97.7%</p>
                        </div>
                        <div className="text-green-500">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                      
                      <div className="flex items-center justify-between p-4 bg-white rounded-lg border border-yellow-100">
                        <div>
                          <p className="text-sm text-gray-600">Duplicate Detection</p>
                          <p className="text-2xl font-bold text-yellow-600">0.01%</p>
                        </div>
                        <div className="text-yellow-500">
                          <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"/>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">Recent Security Events</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">System health check completed - All systems operational</span>
                      <span className="text-gray-400 ml-auto">10 min ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Unusual traffic pattern detected in West Bengal region</span>
                      <span className="text-gray-400 ml-auto">1 hour ago</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Database backup completed successfully</span>
                      <span className="text-gray-400 ml-auto">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;
