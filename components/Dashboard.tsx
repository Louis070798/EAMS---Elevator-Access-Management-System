
import React from 'react';
import { 
  Users, 
  TrendingUp, 
  ShieldAlert, 
  Activity,
  ArrowUpRight,
  Clock
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';
import { AccessLog } from '../types';

const data = [
  { name: '00:00', users: 12 },
  { name: '04:00', users: 5 },
  { name: '08:00', users: 85 },
  { name: '12:00', users: 60 },
  { name: '16:00', users: 95 },
  { name: '20:00', users: 45 },
];

const StatCard = ({ title, value, icon: Icon, color, trend }: any) => (
  <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
    <div className="flex items-start justify-between">
      <div>
        <p className="text-sm text-gray-500 font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-900">{value}</h3>
        {trend && (
          <div className="flex items-center mt-2 text-xs font-medium text-emerald-600">
            <ArrowUpRight size={14} className="mr-1" />
            <span>{trend}</span>
          </div>
        )}
      </div>
      <div className={`${color} p-3 rounded-xl`}>
        <Icon size={24} className="text-white" />
      </div>
    </div>
  </div>
);

interface DashboardProps {
  logs: AccessLog[];
}

const Dashboard: React.FC<DashboardProps> = ({ logs }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Total Active Users" 
          value="1,284" 
          icon={Users} 
          color="bg-blue-600" 
          trend="+12% from last month"
        />
        <StatCard 
          title="Daily Access Trips" 
          value="4,821" 
          icon={Activity} 
          color="bg-emerald-500" 
          trend="+5.4% today"
        />
        <StatCard 
          title="Average Wait Time" 
          value="45s" 
          icon={Clock} 
          color="bg-amber-500" 
          trend="-2s improvement"
        />
        <StatCard 
          title="Security Alerts" 
          value="3" 
          icon={ShieldAlert} 
          color="bg-red-500" 
          trend="Immediate attention"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-bold text-gray-800">Access Traffic (24h)</h3>
            <select className="text-sm border-none bg-gray-50 rounded-lg p-2 font-medium">
              <option>Today</option>
              <option>Yesterday</option>
            </select>
          </div>
          <div className="h-80 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2563eb" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{fontSize: 12, fill: '#64748b'}} />
                <Tooltip 
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Area type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} fillOpacity={1} fill="url(#colorUsers)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-800 mb-6">Recent Activities</h3>
          <div className="space-y-6">
            {logs.slice(0, 5).map((log, i) => (
              <div key={log.id} className="flex items-start space-x-4">
                <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${log.result === 'ALLOW' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-gray-900 truncate">{log.userName}</p>
                  <p className="text-xs text-gray-500">{log.elevatorName} • Floor {log.floor}</p>
                </div>
                <span className="text-xs text-gray-400">
                  {new Date(log.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            ))}
          </div>
          <button className="w-full mt-6 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
            View all logs
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
