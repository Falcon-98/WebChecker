import { format } from 'date-fns';
import { AlertCircle, Check, CheckCircle, RefreshCw, XCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { UptimeCheck, UptimeStats } from '../types/UptimeCheck';
import { calculateUptimeStats } from '../utils/uptimeStats';

const UptimeMonitor = () => {
const [uptimeData, setUptimeData] = useState<UptimeCheck[]>([]);
const [stats, setStats] = useState<UptimeStats | null>(null);
const [loading, setLoading] = useState(true);
const [error, setError] = useState<string | null>(null);
const [autoRefresh, setAutoRefresh] = useState(false);
const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);

const fetchUptimeData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/uptime');
      const data = await response.json();
      setUptimeData(data);
      setStats(calculateUptimeStats(data));
      setError(null);
    } catch (err) {
      setError('Failed to fetch uptime data');
    } finally {
      setLoading(false);
    }
  };

const toggleAutoRefresh = () => {
    if (autoRefresh) {
      // Disable auto-refresh
      if (intervalId) clearInterval(intervalId);
      setIntervalId(null);
    } else {
      // Enable auto-refresh
      const newIntervalId = setInterval(fetchUptimeData, 3000);
      setIntervalId(newIntervalId);
    }
    setAutoRefresh(!autoRefresh);
  };

  useEffect(() => {
    fetchUptimeData(); // Fetch data initially
    return () => {
      if (intervalId) clearInterval(intervalId); // Clean up on component unmount
    };
  }, []);

const getStatusIcon = (status: string) => {
    switch (status) {
      case 'up':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'down':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'slow':
        return <AlertCircle className="w-5 h-5 text-yellow-500" />;
      default:
        return null;
    }
  };

  if (error) {
    return (
      <div className="p-4 text-red-500 text-center">
        {error}
      </div>
    );
  }

return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Website Uptime Monitor</h1>
        <div className="flex justify-between gap-2 items-center mb-6">
            <button
            onClick={fetchUptimeData}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
            >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
            </button>
            <button
            onClick={toggleAutoRefresh}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
            <Check className={`w-4 h-4 ${autoRefresh ? 'text-white' : 'text-gray-700'}`} />
            {autoRefresh ? 'Auto Refresh ON' : 'Auto Refresh OFF'}
            </button>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Uptime</h3>
            <p className="text-2xl font-bold">{stats.uptime.toFixed(2)}%</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Avg Response Time</h3>
            <p className="text-2xl font-bold">{stats.averageResponseTime.toFixed(0)}ms</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-gray-600">Total Checks</h3>
            <p className="text-2xl font-bold">{stats.totalChecks}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Response Time Trend</h2>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={uptimeData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickFormatter={(timestamp) => format(new Date(timestamp), 'HH:mm')}
                />
                <YAxis />
                <Tooltip
                  labelFormatter={(timestamp) => format(new Date(timestamp), 'yyyy-MM-dd HH:mm:ss')}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="responseTime"
                  stroke="#2563eb"
                  name="Response Time (ms)"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-bold mb-4">Recent Checks</h2>
          <div className="overflow-x-auto max-h-[300px] overflow-y-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead>
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Website
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Response Time
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {uptimeData.map((check, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {format(new Date(check.timestamp), 'yyyy-MM-dd HH:mm:ss')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {check.websiteName} {/* Display website name */}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        {getStatusIcon(check.status)}
                        <span className="ml-2 text-sm text-gray-900">
                          {check.status.toUpperCase()}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      {check.responseTime}ms
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UptimeMonitor;