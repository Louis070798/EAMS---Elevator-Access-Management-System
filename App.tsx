
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import UserManagement from './components/UserManagement';
import ElevatorManagement from './components/ElevatorManagement';
import AIInsights from './components/AIInsights';
import { INITIAL_USERS, INITIAL_ELEVATORS, MOCK_LOGS } from './constants';
import { User, Elevator, AccessLog, AccessResult, UserType, ElevatorMode } from './types';
import { Search, Filter, Download, Plus, X } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [language, setLanguage] = useState<'VN' | 'EN'>('VN');
  const [users, setUsers] = useState<User[]>(INITIAL_USERS);
  const [elevators, setElevators] = useState<Elevator[]>(INITIAL_ELEVATORS);
  const [logs, setLogs] = useState<AccessLog[]>(MOCK_LOGS);

  // Simulation of real-time logs
  useEffect(() => {
    const interval = setInterval(() => {
      if (users.length === 0 || elevators.length === 0) return;
      
      const randomUser = users[Math.floor(Math.random() * users.length)];
      const randomElevator = elevators[Math.floor(Math.random() * elevators.length)];
      const result = Math.random() > 0.1 ? AccessResult.ALLOW : AccessResult.DENY;
      
      const newLog: AccessLog = {
        id: `L${Date.now()}`,
        timestamp: new Date().toISOString(),
        userName: result === AccessResult.ALLOW ? randomUser.fullName : 'Unauthorized',
        userId: result === AccessResult.ALLOW ? randomUser.id : 'unknown',
        elevatorName: randomElevator.name,
        floor: Math.floor(Math.random() * 30) + 1,
        result,
        method: ['RFID', 'FACE', 'QR', 'FINGERPRINT'][Math.floor(Math.random() * 4)] as any
      };

      setLogs(prev => [newLog, ...prev.slice(0, 49)]);
    }, 20000);

    return () => clearInterval(interval);
  }, [users, elevators]);

  // CRUD Handlers for Users
  const handleAddUser = (user: User) => setUsers([...users, user]);
  const handleUpdateUser = (updatedUser: User) => setUsers(users.map(u => u.id === updatedUser.id ? updatedUser : u));
  const handleDeleteUser = (id: string) => setUsers(users.filter(u => u.id !== id));

  // CRUD Handlers for Elevators
  const handleAddElevator = (elevator: Elevator) => setElevators([...elevators, elevator]);
  const handleUpdateElevator = (updatedElevator: Elevator) => setElevators(elevators.map(e => e.id === updatedElevator.id ? updatedElevator : e));
  const handleDeleteElevator = (id: string) => setElevators(elevators.filter(e => e.id !== id));

  // Export to CSV (Excel compatible)
  const exportLogs = () => {
    const headers = ["ID", "Thời gian", "Người dùng", "Thang máy", "Tầng", "Phương thức", "Kết quả"];
    const csvData = logs.map(log => [
      log.id,
      new Date(log.timestamp).toLocaleString(),
      log.userName,
      log.elevatorName,
      log.floor,
      log.method,
      log.result
    ]);

    const csvContent = "\uFEFF" + [headers, ...csvData].map(e => e.join(",")).join("\n");
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `EAMS_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div className="space-y-6">
            <AIInsights logs={logs} />
            <Dashboard logs={logs} />
          </div>
        );
      case 'users':
        return <UserManagement users={users} onAdd={handleAddUser} onUpdate={handleUpdateUser} onDelete={handleDeleteUser} />;
      case 'elevators':
        return <ElevatorManagement elevators={elevators} onAdd={handleAddElevator} onUpdate={handleUpdateElevator} onDelete={handleDeleteElevator} />;
      case 'logs':
        return (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input 
                  type="text" 
                  placeholder="Filter logs by user, floor, elevator..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                />
              </div>
              <div className="flex items-center space-x-3">
                <button 
                  onClick={exportLogs}
                  className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium transition-colors"
                >
                  <Download size={18} />
                  <span>{language === 'VN' ? 'Xuất Excel' : 'Export Excel'}</span>
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
                  <tr>
                    <th className="px-6 py-4">Timestamp</th>
                    <th className="px-6 py-4">User</th>
                    <th className="px-6 py-4">Elevator</th>
                    <th className="px-6 py-4">Target Floor</th>
                    <th className="px-6 py-4">Method</th>
                    <th className="px-6 py-4">Result</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {logs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-6 py-4 text-sm text-gray-600 whitespace-nowrap">
                        {new Date(log.timestamp).toLocaleString()}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <div className={`w-2 h-2 rounded-full ${log.result === AccessResult.ALLOW ? 'bg-blue-500' : 'bg-red-500'}`} />
                          <span className="text-sm font-bold text-gray-900">{log.userName}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{log.elevatorName}</td>
                      <td className="px-6 py-4">
                        <span className="text-sm font-black text-blue-600">F{log.floor}</span>
                      </td>
                      <td className="px-6 py-4">
                        <span className="px-2 py-0.5 bg-gray-100 text-gray-500 rounded text-[10px] font-bold uppercase">
                          {log.method}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                          log.result === AccessResult.ALLOW ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-700'
                        }`}>
                          {log.result}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case 'alerts':
        return (
          <div className="flex flex-col items-center justify-center py-20 bg-white rounded-2xl border border-gray-100">
            <AlertCircle className="text-gray-300 mb-4" size={64} />
            <p className="text-lg font-bold text-gray-800">System Secure</p>
            <p className="text-gray-500">No active high-priority alerts recorded today.</p>
          </div>
        );
      default:
        return <div className="p-8 text-center text-gray-500">Feature Coming Soon</div>;
    }
  };

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      language={language}
      toggleLanguage={() => setLanguage(prev => prev === 'VN' ? 'EN' : 'VN')}
    >
      {renderContent()}
    </Layout>
  );
};

import { AlertCircle } from 'lucide-react';

export default App;
