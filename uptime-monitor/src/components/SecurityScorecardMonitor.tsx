import { useEffect, useState } from 'react';

interface Entry {
  id: number;
  date: string;
  event_type: string;
  group_status: string;
  issue_count: number;
  total_score_impact: number;
  issue_type: string;
  severity: string;
  factor: string;
  detail_url: string;
}

const SecurityScorecardMonitor = () => {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortConfig, setSortConfig] = useState<{ key: keyof Entry; direction: 'asc' | 'desc' } | null>(null);

  const fetchSecurityScorecardData = async () => {
    try {
      setLoading(true);
      const response = await fetch('http://localhost:3000/api/securityscorecard');
      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }
      const data = await response.json();
      setEntries(data.entries || []);
      setError(null);
    } catch (err) {
      setError('Failed to fetch SecurityScorecard data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSecurityScorecardData();
  }, []);

  const sortEntries = (key: keyof Entry) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }

    const sortedEntries = [...entries].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });

    setEntries(sortedEntries);
    setSortConfig({ key, direction });
  };

  const getSortIcon = (key: keyof Entry) => {
    if (!sortConfig || sortConfig.key !== key) return '';
    return sortConfig.direction === 'asc' ? '↑' : '↓';
  };

  return (
    <div className="p-6 w-full mx-auto">
      <h1 className="text-3xl font-bold mb-4">SecurityScorecard Monitor</h1>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && entries.length === 0 && <p>No entries found.</p>}
      {!loading && !error && entries.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow">
            <thead>
              <tr className="bg-blue-100 text-3xl text-blue-600">
                {[
                  { label: 'ID', key: 'id' },
                  { label: 'Date', key: 'date' },
                  { label: 'Event Type', key: 'event_type' },
                  { label: 'Group Status', key: 'group_status' },
                  { label: 'Issue Count', key: 'issue_count' },
                  { label: 'Score Impact', key: 'total_score_impact' },
                  { label: 'Issue Type', key: 'issue_type' },
                  { label: 'Severity', key: 'severity' },
                  { label: 'Factor', key: 'factor' },
                ].map((col) => (
                  <th
                    key={col.key}
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase cursor-pointer"
                    onClick={() => sortEntries(col.key as keyof Entry)}
                  >
                    {col.label} {getSortIcon(col.key as keyof Entry)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry.id} className="border-t border-gray-200">
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.id}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">
                    {new Date(entry.date).toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.event_type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.group_status}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.issue_count}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.total_score_impact.toFixed(2)}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.issue_type}</td>
                  <td className="px-6 py-4 text-sm text-gray-700 capitalize">{entry.severity}</td>
                  <td className="px-6 py-4 text-sm text-gray-700">{entry.factor}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SecurityScorecardMonitor;
