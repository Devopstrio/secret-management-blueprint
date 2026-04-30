import React from 'react';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  BarChart, Bar, Cell
} from 'recharts';
import { 
  Key, 
  ShieldCheck, 
  RefreshCw, 
  Lock,
  ArrowUpRight,
  TrendingDown,
  Clock,
  History,
  Activity,
  AlertTriangle,
  Fingerprint
} from 'lucide-react';

const accessData = [
  { name: '00:00', requests: 120, status: 'OK' },
  { name: '04:00', requests: 80, status: 'OK' },
  { name: '08:00', requests: 450, status: 'OK' },
  { name: '12:00', requests: 620, status: 'OK' },
  { name: '16:00', requests: 580, status: 'OK' },
  { name: '20:00', requests: 340, status: 'OK' },
  { name: '00:00', requests: 150, status: 'OK' },
];

const KPI_CARDS = [
  { title: 'Total Active Secrets', value: '1,482', trend: '+12', color: 'violet', icon: Key },
  { title: 'Vault Unseal Status', value: 'HEALTHY', trend: '99.99%', color: 'emerald', icon: Lock },
  { title: 'Rotation Compliance', value: '98.5%', trend: 'Last 24h', color: 'violet', icon: RefreshCw },
  { title: 'Identity Requests', value: '12.4k', trend: '24h Total', color: 'slate', icon: Fingerprint },
];

const SecretsDashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Security Vault Intelligence</h1>
          <p className="text-slate-400">Strategic oversight of encryption keys, dynamic secrets, and access policies.</p>
        </div>
        <div className="flex gap-2">
          <button className="bg-slate-800 hover:bg-slate-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Download Security Audit
          </button>
          <button className="bg-violet-600 hover:bg-violet-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all">
            Seal Vault
          </button>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {KPI_CARDS.map((card) => (
          <div key={card.title} className="bg-slate-900 border border-slate-800 p-6 rounded-2xl relative group hover:border-slate-700 transition-all">
            <div className="flex justify-between items-start">
              <div className={`p-2 bg-${card.color}-600/10 rounded-lg`}>
                <card.icon className={`w-6 h-6 text-${card.color}-400`} />
              </div>
              <div className={`text-xs font-medium ${card.trend.includes('%') ? 'text-emerald-400' : 'text-slate-400'}`}>
                {card.trend}
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-slate-500 font-medium">{card.title}</p>
              <p className="text-3xl font-bold text-white mt-1">{card.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Secret Access Graph */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
          <h3 className="text-lg font-bold text-white mb-6">Identity Access Requests (24h)</h3>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={accessData}>
                <defs>
                  <linearGradient id="colorReq" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis dataKey="name" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '8px' }}
                />
                <Area type="monotone" dataKey="requests" stroke="#8b5cf6" fill="url(#colorReq)" name="Access Requests" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Namespace Distribution */}
        <div className="bg-slate-900 border border-slate-800 p-6 rounded-2xl flex flex-col">
          <h3 className="text-lg font-bold text-white mb-6">Namespace Distribution</h3>
          <div className="flex-1 space-y-6">
            {[
              { name: 'Production (kv-prod)', value: 42, color: 'bg-violet-500' },
              { name: 'Infrastructure (kv-infra)', value: 28, color: 'bg-indigo-500' },
              { name: 'Shared Services (kv-common)', value: 20, color: 'bg-emerald-500' },
              { name: 'Development (kv-dev)', value: 10, color: 'bg-slate-500' },
            ].map((ns) => (
              <div key={ns.name} className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-300 font-medium">{ns.name}</span>
                  <span className="text-slate-400">{ns.value}%</span>
                </div>
                <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                  <div className={`h-full ${ns.color}`} style={{ width: `${ns.value}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secret Rotation Queue */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex items-center justify-between">
          <h3 className="text-lg font-bold text-white">Upcoming Secret Rotations</h3>
          <button className="text-violet-400 hover:text-violet-300 text-sm font-medium">Manage Policies</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-slate-800/50 text-slate-400 text-xs uppercase tracking-wider">
              <tr>
                <th className="px-6 py-4 font-semibold">Secret Path</th>
                <th className="px-6 py-4 font-semibold">Namespace</th>
                <th className="px-6 py-4 font-semibold">Last Rotated</th>
                <th className="px-6 py-4 font-semibold">Next Window</th>
                <th className="px-6 py-4 font-semibold">Status</th>
                <th className="px-6 py-4 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {[
                { path: 'db/prod/master_pw', ns: 'kv-prod', last: '2024-04-10', next: '2024-05-10', status: 'PENDING' },
                { path: 'api/stripe/secret_key', ns: 'kv-common', last: '2024-03-25', next: '2024-04-25', status: 'OVERDUE' },
                { path: 'infra/aws/iam_access', ns: 'kv-infra', last: '2024-04-20', next: '2024-05-20', status: 'HEALTHY' },
              ].map((row, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition-all group">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <Lock className="w-4 h-4 text-violet-400" />
                      <span className="text-sm font-medium text-slate-300">{row.path}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.ns}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.last}</td>
                  <td className="px-6 py-4 text-sm text-slate-300">{row.next}</td>
                  <td className="px-6 py-4">
                    <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${
                      row.status === 'HEALTHY' ? 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10' : 
                      row.status === 'OVERDUE' ? 'text-rose-400 border-rose-500/20 bg-rose-500/10' : 
                      'text-violet-400 border-violet-500/20 bg-violet-500/10'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <button className="text-violet-400 hover:text-violet-300 text-xs font-bold uppercase tracking-wider">
                      Rotate Now
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SecretsDashboard;
