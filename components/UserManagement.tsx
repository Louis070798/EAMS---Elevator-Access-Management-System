
import React, { useState } from 'react';
import { 
  Search, 
  UserPlus, 
  MoreVertical, 
  ShieldCheck, 
  ShieldX, 
  X, 
  Edit2, 
  Trash2,
  User as UserIcon,
  Mail,
  Fingerprint,
  Layers,
  CheckCircle2
} from 'lucide-react';
import { User, UserType } from '../types';

interface UserManagementProps {
  users: User[];
  onAdd: (user: User) => void;
  onUpdate: (user: User) => void;
  onDelete: (id: string) => void;
}

const UserManagement: React.FC<UserManagementProps> = ({ users, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [formData, setFormData] = useState<Partial<User>>({
    fullName: '',
    email: '',
    type: UserType.RESIDENT,
    identifier: '',
    status: 'ACTIVE',
    allowedFloors: [1]
  });

  const openAddModal = () => {
    setEditingUser(null);
    setFormData({ fullName: '', email: '', type: UserType.RESIDENT, identifier: '', status: 'ACTIVE', allowedFloors: [1] });
    setIsModalOpen(true);
  };

  const openEditModal = (user: User) => {
    setEditingUser(user);
    setFormData(user);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingUser) {
      onUpdate({ ...editingUser, ...formData } as User);
    } else {
      const newUser = { ...formData, id: `U${Date.now()}` } as User;
      onAdd(newUser);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-6 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
          <input 
            type="text" 
            placeholder="Tìm kiếm người dùng..."
            className="w-full pl-10 pr-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white focus:border-transparent outline-none transition-all text-sm text-slate-900"
          />
        </div>
        <button 
          onClick={openAddModal}
          className="flex items-center justify-center space-x-2 px-5 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 active:scale-95"
        >
          <UserPlus size={18} />
          <span className="font-semibold text-sm">Thêm người dùng</span>
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50/50 text-gray-500 text-[11px] font-bold uppercase tracking-widest">
            <tr>
              <th className="px-6 py-4">Thông tin</th>
              <th className="px-6 py-4">Phân loại</th>
              <th className="px-6 py-4">ID Định danh</th>
              <th className="px-6 py-4">Trạng thái</th>
              <th className="px-6 py-4">Tầng truy cập</th>
              <th className="px-6 py-4 text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-blue-50/30 transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <img src={`https://picsum.photos/seed/${user.id}/40/40`} className="w-10 h-10 rounded-full ring-2 ring-white shadow-sm" alt="" />
                      <div className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white ${user.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-red-500'}`} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900 group-hover:text-blue-600 transition-colors">{user.fullName}</p>
                      <p className="text-xs text-gray-500">{user.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                    user.type === UserType.VIP ? 'bg-purple-100 text-purple-700' :
                    user.type === UserType.STAFF ? 'bg-blue-100 text-blue-700' :
                    'bg-emerald-100 text-emerald-700'
                  }`}>{user.type}</span>
                </td>
                <td className="px-6 py-4 text-sm font-mono text-gray-600">{user.identifier}</td>
                <td className="px-6 py-4">
                   <div className="flex items-center space-x-1.5">
                    {user.status === 'ACTIVE' ? <ShieldCheck size={14} className="text-emerald-500" /> : <ShieldX size={14} className="text-red-500" />}
                    <span className={`text-xs font-bold ${user.status === 'ACTIVE' ? 'text-emerald-600' : 'text-red-600'}`}>
                      {user.status}
                    </span>
                   </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-wrap gap-1">
                    {user.allowedFloors.map(f => (
                      <span key={f} className="px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded-md text-[10px] font-bold border border-gray-200">F{f}</span>
                    ))}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex items-center justify-center space-x-1">
                    <button onClick={() => openEditModal(user)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-xl transition-all"><Edit2 size={16} /></button>
                    <button onClick={() => onDelete(user.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"><Trash2 size={16} /></button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-[24px] w-full max-w-md shadow-2xl overflow-hidden animate-in zoom-in-95 fade-in duration-200 border border-white/20">
            {/* Modal Header */}
            <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between bg-gradient-to-r from-blue-50 to-white">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-600 p-2.5 rounded-2xl shadow-lg shadow-blue-200">
                  <UserIcon className="text-white" size={20} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-slate-800">{editingUser ? 'Cập nhật thông tin' : 'Thêm người dùng mới'}</h3>
                  <p className="text-[11px] text-slate-400 font-medium uppercase tracking-wider">Elevator Access Management</p>
                </div>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)} 
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-gray-100 rounded-full transition-all"
              >
                <X size={20} />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-8 space-y-5">
              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Họ và tên</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <UserIcon size={16} />
                  </div>
                  <input 
                    required 
                    placeholder="Nhập tên đầy đủ..."
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold text-slate-900 placeholder:text-slate-400" 
                    value={formData.fullName} 
                    onChange={e => setFormData({...formData, fullName: e.target.value})} 
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Địa chỉ Email</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Mail size={16} />
                  </div>
                  <input 
                    required 
                    type="email" 
                    placeholder="example@company.com"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 focus:bg-white outline-none transition-all text-sm font-semibold text-slate-900 placeholder:text-slate-400" 
                    value={formData.email} 
                    onChange={e => setFormData({...formData, email: e.target.value})} 
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Phân loại</label>
                  <select 
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-bold text-slate-900 appearance-none cursor-pointer" 
                    value={formData.type} 
                    onChange={e => setFormData({...formData, type: e.target.value as UserType})}
                  >
                    {Object.values(UserType).map(t => <option key={t} value={t} className="text-slate-900">{t}</option>)}
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">ID Định danh</label>
                  <div className="relative group">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                      <Fingerprint size={16} />
                    </div>
                    <input 
                      required 
                      placeholder="RFID-0000"
                      className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-mono font-bold text-blue-600 placeholder:text-slate-400" 
                      value={formData.identifier} 
                      onChange={e => setFormData({...formData, identifier: e.target.value})} 
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest ml-1">Tầng cho phép</label>
                <div className="relative group">
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-500 transition-colors">
                    <Layers size={16} />
                  </div>
                  <input 
                    placeholder="Ví dụ: 1, 5, 12"
                    className="w-full pl-11 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all text-sm font-semibold text-slate-900 placeholder:text-slate-400" 
                    value={formData.allowedFloors?.join(', ')} 
                    onChange={e => setFormData({...formData, allowedFloors: e.target.value.split(',').map(s => parseInt(s.trim())).filter(n => !isNaN(n))})} 
                  />
                </div>
                <p className="text-[10px] text-slate-400 ml-1 font-medium italic">* Nhập các số tầng cách nhau bằng dấu phẩy</p>
              </div>

              {/* Modal Footer */}
              <div className="flex items-center justify-end space-x-3 pt-4">
                <button 
                  type="button" 
                  onClick={() => setIsModalOpen(false)} 
                  className="px-6 py-3 text-slate-500 font-bold text-sm hover:text-slate-700 hover:bg-slate-50 rounded-2xl transition-all"
                >
                  Hủy bỏ
                </button>
                <button 
                  type="submit" 
                  className="flex items-center space-x-2 px-8 py-3 bg-blue-600 text-white rounded-2xl font-bold text-sm shadow-xl shadow-blue-200 hover:bg-blue-700 hover:-translate-y-0.5 active:translate-y-0 transition-all"
                >
                  <CheckCircle2 size={18} />
                  <span>{editingUser ? 'Cập nhật ngay' : 'Xác nhận thêm'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
