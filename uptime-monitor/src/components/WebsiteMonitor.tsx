import { format } from 'date-fns';
import { AlertCircle, CheckCircle, PlusCircle, Trash2, XCircle } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

interface Website {
  id: string;
  url: string;
  name: string;
  interval: number;
  isActive: boolean;
  createdAt: string;
}

interface UptimeCheck {
  id: string;
  websiteId: string;
  timestamp: string;
  status: 'up' | 'down' | 'slow';
  responseTime: number;
}

const WebsiteMonitor = () => {
  const [websites, setWebsites] = useState<Website[]>([]);
  const [selectedWebsite, setSelectedWebsite] = useState<string | null>(null);
  const [uptimeData, setUptimeData] = useState<UptimeCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newWebsite, setNewWebsite] = useState({
    name: '',
    url: '',
    interval: 60000,
  });

  // Fetch websites
  const fetchWebsites = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/websites');
      const data = await response.json();
      setWebsites(data);
      if (data.length > 0 && !selectedWebsite) {
        setSelectedWebsite(data[0].id);
      }
    } catch (err) {
      setError('Failed to fetch websites');
    }
  };

  // Fetch uptime data for selected website
 const fetchUptimeData = async (websiteId: string) => {
  try {
    setLoading(true);
    const response = await fetch(`http://localhost:3000/api/websites/${websiteId}/checks`);
    const data = await response.json();
    setUptimeData(data);
    setError(null);
  } catch (err) {
    setError('Failed to fetch uptime data');
  } finally {
    setLoading(false);
  }
};


  // Add new website
  const handleAddWebsite = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/api/websites', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newWebsite),
      });
      
      if (!response.ok) throw new Error('Failed to add website');
      
      await fetchWebsites();
      setShowAddForm(false);
      setNewWebsite({ name: '', url: '', interval: 60000 });
    } catch (err) {
      setError('Failed to add website');
    }
  };

  // Delete website
  const handleDeleteWebsite = async (id: string) => {
    if (!confirm('Are you sure you want to delete this website?')) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/websites/${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) throw new Error('Failed to delete website');
      
      await fetchWebsites();
      if (selectedWebsite === id) {
        setSelectedWebsite(null);
      }
    } catch (err) {
      setError('Failed to delete website');
    }
  };

  useEffect(() => {
    fetchWebsites();
  }, []);

  useEffect(() => {
    if (selectedWebsite) {
      fetchUptimeData(selectedWebsite);
      const interval = setInterval(() => fetchUptimeData(selectedWebsite), 60000);
      return () => clearInterval(interval);
    }
  }, [selectedWebsite]);

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

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Website Uptime Monitor</h1>
        <button
          onClick={() => setShowAddForm(true)}
          className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
        >
          <PlusCircle className="w-4 h-4" />
          Add Website
        </button>
      </div>

      {/* Add Website Form */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Website</h2>
            <form onSubmit={handleAddWebsite}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Name</label>
                  <input
                    type="text"
                    value={newWebsite.name}
                    onChange={e => setNewWebsite({ ...newWebsite, name: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">URL</label>
                  <input
                    type="url"
                    value={newWebsite.url}
                    onChange={e => setNewWebsite({ ...newWebsite, url: e.target.value })}
                    className="w-full p-2 border rounded"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Check Interval (ms)</label>
                  <input
                    type="number"
                    value={newWebsite.interval}
                    onChange={e => setNewWebsite({ ...newWebsite, interval: Number(e.target.value) })}
                    className="w-full p-2 border rounded"
                    min="5000"
                    step="1000"
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                >
                  Add Website
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Website List */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-1">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-xl font-bold mb-4">Monitored Websites</h2>
            <div className="space-y-2">
              {websites.map(website => (
                <div
                  key={website.id}
                  className={`p-3 rounded cursor-pointer flex justify-between items-center ${
                    selectedWebsite === website.id ? 'bg-blue-50 border-blue-500' : 'hover:bg-gray-50'
                  }`}
                  onClick={() => setSelectedWebsite(website.id)}
                >
                  <div>
                    <h3 className="font-medium">{website.name}</h3>
                    <p className="text-sm text-gray-500">{website.url}</p>
                  </div>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeleteWebsite(website.id);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Monitoring Dashboard */}
        <div className="lg:col-span-3 space-y-6">
          {selectedWebsite ? (
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-lg shadow">
                <h2 className="text-xl font-bold">Uptime Data for {websites.find(w => w.id === selectedWebsite)?.name}</h2>
                
                {loading ? (
                  <div className="flex justify-center items-center py-4">
                    <span>Loading...</span>
                  </div>
                ) : error ? (
                  <div className="text-red-500">{error}</div>
                ) : (
                  <ResponsiveContainer width="100%" height={400}>
                    <LineChart data={uptimeData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis
                        dataKey="timestamp"
                        tickFormatter={(timestamp) => format(new Date(timestamp), 'HH:mm:ss')}
                      />
                      <YAxis />
                      <Tooltip />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="status"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">Select a website to view uptime data</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WebsiteMonitor;
