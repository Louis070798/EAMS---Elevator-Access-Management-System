
import React from 'react';
import { Search, UserPlus, MoreVertical, ShieldCheck, ShieldX } from 'lucide-react';
import { User, UserType } from '../types';

interface UserManagementProps {
  users: User[];
}

const UserManagement: React.FC<UserManagementProps> = ({ users }) => {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Search users by name, ID or identifier..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex items-center space-x-3">
          <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors">
            <UserPlus size={18} />
            <span className="font-medium">Add New User</span>
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 text-gray-500 text-xs font-bold uppercase tracking-wider">
            <tr>
              <th className="px-6 py-4">User Info</th>
              <th className="px-6 py-4">Category</th>
              <th className="px-6 py-4">Identifier</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4">Allowed Floors</th>
              <th className="px-6 py-4">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <img 
                      src={`https://picsum.photos/seed/${user.id}/40/40`} 
                      className="w-10 h-10 rounded-full" 
                      alt="" 
                    />
                    <div>
                      <p className="text-sm font-bold text-gray-900">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${
                    user.type === UserType.VIP ? 'bg-purple-100 text-purple-700' :
                    user.type === UserType.STAFF ? 'bg-blue-100 text-blue-700' :
                    user.type === UserType.RESIDENT ? 'bg-emerald-100 text-emerald-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {user.type}
                  </span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{user.identifier}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-2">
                    {user.status === 'ACTIVE' ? (
                      <ShieldCheck className="text-emerald-500" size={16} />
                    ) : (
                      <ShieldX className="text-red-500" size={16} />
                    )}
                    <span className={`text-xs font-medium ${user.status === 'ACTIVE' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {user.status}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.allowedFloors.slice(0, 3).map(floor => (
                      <span key={floor} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded text-[10px] font-bold">F{floor}</span>
                    ))}
                    {user.allowedFloors.length > 3 && (
                      <span className="text-[10px] text-gray-400 font-medium">+{user.allowedFloors.length - 3} more</span>
                    )}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors text-gray-400">
                    <MoreVertical size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
