import { useState } from 'react';
import { motion } from 'framer-motion';


const API_URL = 'http://localhost:3001/stats'; // Change this for production

interface Visit {
  id: string;
  ip: string;
  city: string;
  country: string;
  browser: string;
  os: string;
  timestamp: string;
}

interface StatsData {
  totalVisits: number;
  uniqueVisitors: number;
  recentVisits: Visit[];
}

export default function Dashboard() {
  const [password, setPassword] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [stats, setStats] = useState<StatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(import.meta.env.VITE_PASSCODE);
    
    // A simple hardcoded password for now. The user can change this later.
    if (password === import.meta.env.VITE_PASSCODE) {
      setAuthenticated(true);
      fetchStats();
    } else {
      setError('Invalid password');
    }
  };

  const fetchStats = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error('Failed to fetch stats');
      const data = await res.json();
      setStats(data);
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError(String(err));
      }
    } finally {
      setLoading(false);
    }
  };

  if (!authenticated) {
    return (
      <div className="min-h-screen bg-[#0a0e14] text-white flex flex-col items-center justify-center scanlines grid-bg">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-[#11151c] p-8 border border-[#30363d] rounded-lg shadow-2xl max-w-md w-full"
        >
          <h2 className="text-2xl font-mono text-green-400 mb-6 flex items-center gap-2">
            <span>🔒</span> Admin Access
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter Passcode..."
                className="w-full bg-[#0a0e14] border border-[#30363d] text-green-400 font-mono p-3 rounded focus:outline-none focus:border-green-400 transition-colors"
                autoFocus
              />
            </div>
            {error && <p className="text-red-400 text-sm font-mono">{error}</p>}
            <button 
              type="submit"
              className="w-full bg-green-500/10 border border-green-500/50 text-green-400 p-3 rounded hover:bg-green-500/20 transition-all font-mono"
            >
              Initialize Override
            </button>
          </form>
          <button onClick={() => window.location.href = '/'} className="mt-6 text-gray-500 text-sm hover:text-gray-300 font-mono w-full text-center">
            ← Return to Base
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0e14] text-gray-300 p-8 scanlines grid-bg font-mono">
      <div className="max-w-6xl mx-auto space-y-8">
        
        <div className="flex justify-between items-center border-b border-[#30363d] pb-6">
          <h1 className="text-3xl text-green-400 font-bold flex items-center gap-3">
            <span>📊</span> Analytics Command Center
          </h1>
          <div className="flex gap-4">
            <button onClick={fetchStats} className="px-4 py-2 bg-blue-500/10 text-blue-400 border border-blue-500/30 rounded hover:bg-blue-500/20 transition-colors">
              Refresh Data
            </button>
            <button onClick={() => window.location.href = '/'} className="px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/30 rounded hover:bg-red-500/20 transition-colors">
              Exit
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-20 animate-pulse text-green-400">Loading Databanks...</div>
        ) : stats ? (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-8">
            
            {/* Overview Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-[#11151c] border border-[#30363d] p-6 rounded-lg shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-gray-400 mb-2">Total Connections</h3>
                <p className="text-5xl font-bold text-green-400">{stats.totalVisits}</p>
              </div>
              <div className="bg-[#11151c] border border-[#30363d] p-6 rounded-lg shadow-xl relative overflow-hidden group">
                <div className="absolute inset-0 bg-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                <h3 className="text-gray-400 mb-2">Unique IPs</h3>
                <p className="text-5xl font-bold text-blue-400">{stats.uniqueVisitors}</p>
              </div>
            </div>

            {/* Table */}
            <div className="bg-[#11151c] border border-[#30363d] rounded-lg shadow-xl overflow-hidden">
              <div className="p-4 border-b border-[#30363d] bg-[#0a0e14]">
                <h3 className="text-green-400 font-bold">Recent Connections Log</h3>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#0a0e14] text-gray-500 text-sm">
                      <th className="p-4 border-b border-[#30363d]">TIMESTAMP</th>
                      <th className="p-4 border-b border-[#30363d]">IP ADDRESS</th>
                      <th className="p-4 border-b border-[#30363d]">LOCATION</th>
                      <th className="p-4 border-b border-[#30363d]">SYSTEM INFO</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stats.recentVisits.map((v: Visit, i: number) => (
                      <tr key={v.id || i} className="border-b border-[#30363d]/50 hover:bg-white/[0.02] transition-colors">
                        <td className="p-4 text-gray-400 text-sm">{new Date(v.timestamp).toLocaleString()}</td>
                        <td className="p-4 text-green-400/80">{v.ip}</td>
                        <td className="p-4">{v.city}, {v.country}</td>
                        <td className="p-4 text-gray-500 text-sm">{v.browser} on {v.os}</td>
                      </tr>
                    ))}
                    {stats.recentVisits.length === 0 && (
                      <tr>
                        <td colSpan={4} className="p-8 text-center text-gray-600">No connection logs found.</td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

          </motion.div>
        ) : (
          <div className="text-red-400 text-center py-20">{error}</div>
        )}
      </div>
    </div>
  );
}
