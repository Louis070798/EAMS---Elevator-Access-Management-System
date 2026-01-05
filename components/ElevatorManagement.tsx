
import React, { useState } from 'react';
import { Box, Settings2, Power, AlertCircle, Info, X, Edit2, Trash2, Layers } from 'lucide-react';
import { Elevator, ElevatorMode } from '../types';

interface ElevatorManagementProps {
  elevators: Elevator[];
  onAdd: (ev: Elevator) => void;
  onUpdate: (ev: Elevator) => void;
  onDelete: (id: string) => void;
}

const ElevatorManagement: React.FC<ElevatorManagementProps> = ({ elevators, onAdd, onUpdate, onDelete }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfigOpen, setIsConfigOpen] = useState(false);
  const [editingEv, setEditingEv] = useState<Elevator | null>(null);
  const [formData, setFormData] = useState<Partial<Elevator>>({
    name: '',
    building: '',
    currentFloor: 1,
    status: 'ONLINE',
    mode: ElevatorMode.NORMAL
  });

  const openAddModal = () => {
    setEditingEv(null);
    setFormData({ name: '', building: '', currentFloor: 1, status: 'ONLINE', mode: ElevatorMode.NORMAL });
    setIsModalOpen(true);
  };

  const openEditModal = (ev: Elevator) => {
    setEditingEv(ev);
    setFormData(ev);
    setIsModalOpen(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingEv) {
      onUpdate({ ...editingEv, ...formData } as Elevator);
    } else {
      onAdd({ ...formData, id: `E${Date.now()}` } as Elevator);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">Hệ thống Thang máy</h3>
        <button 
          onClick={() => setIsConfigOpen(true)}
          className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-900 transition-all flex items-center space-x-2 shadow-lg"
        >
          <Settings2 size={16} />
          <span>Cấu hình Nhóm</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {elevators.map((ev) => (
          <div key={ev.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
            <div className={`absolute top-0 left-0 w-1 h-full ${
              ev.status === 'OFFLINE' ? 'bg-gray-300' : 
              ev.mode === ElevatorMode.EMERGENCY ? 'bg-red-500 animate-pulse' :
              ev.mode === ElevatorMode.MAINTENANCE ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            
            <div className="flex justify-between items-start mb-6">
              <div className="bg-gray-50 p-3 rounded-xl">
                <Box size={24} className={ev.status === 'ONLINE' ? 'text-blue-600' : 'text-gray-400'} />
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center space-x-2 mb-1">
                  <button onClick={() => openEditModal(ev)} className="p-1 text-slate-400 hover:text-blue-600"><Edit2 size={14} /></button>
                  <button onClick={() => onDelete(ev.id)} className="p-1 text-slate-400 hover:text-red-600"><Trash2 size={14} /></button>
                </div>
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                  ev.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}>{ev.status}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-1">{ev.name}</h4>
              <p className="text-xs text-gray-400 mb-2">{ev.building}</p>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-black text-blue-600">{ev.currentFloor}</span>
                <span className="text-sm font-medium text-gray-400 mb-1.5 uppercase">Tầng</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Chế độ:</span>
                <span className={`font-bold ${ev.mode === ElevatorMode.NORMAL ? 'text-emerald-600' : 'text-amber-600'}`}>{ev.mode}</span>
              </div>
              <button 
                onClick={() => onUpdate({...ev, status: ev.status === 'ONLINE' ? 'OFFLINE' : 'ONLINE'})}
                className={`w-full flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-bold transition-colors ${
                  ev.status === 'ONLINE' ? 'bg-red-50 text-red-600' : 'bg-emerald-50 text-emerald-600'
                }`}
              >
                <Power size={14} />
                <span>{ev.status === 'ONLINE' ? 'Tắt hệ thống' : 'Bật hệ thống'}</span>
              </button>
            </div>
          </div>
        ))}

        <button 
          onClick={openAddModal}
          className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all group"
        >
          <div className="bg-gray-50 p-4 rounded-full group-hover:bg-blue-50 transition-colors mb-4">
            <Box size={32} />
          </div>
          <span className="font-bold">Đăng ký Thang mới</span>
          <span className="text-xs mt-1 text-center">Tích hợp phần cứng vào hệ thống</span>
        </button>
      </div>

      {/* Cấu hình Nhóm Modal */}
      {isConfigOpen && (
        <div className="fixed inset-0 bg-slate-900/60 z-50 flex items-center justify-center p-4 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
             <div className="p-6 border-b border-gray-100 flex items-center justify-between bg-slate-900 text-white">
                <div className="flex items-center space-x-3">
                  <Layers className="text-blue-400" size={24} />
                  <div>
                    <h3 className="text-lg font-bold">Cấu hình Nhóm Thang máy</h3>
                    <p className="text-xs text-slate-400">Thiết lập quy tắc vận hành chung cho Block</p>
                  </div>
                </div>
                <button onClick={() => setIsConfigOpen(false)} className="text-slate-400 hover:text-white"><X size={20} /></button>
             </div>
             <div className="p-8 space-y-8">
                <div className="grid grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 border-b pb-2">Ưu tiên Vận hành</h4>
                    <div className="space-y-2">
                      <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600" defaultChecked />
                        <span className="text-sm font-medium text-slate-900">Tự động điều phối theo lưu lượng</span>
                      </label>
                      <label className="flex items-center space-x-3 p-3 bg-slate-50 rounded-xl cursor-pointer">
                        <input type="checkbox" className="w-4 h-4 text-blue-600" />
                        <span className="text-sm font-medium text-slate-900">Chế độ tiết kiệm điện năng ban đêm</span>
                      </label>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-bold text-slate-800 border-b pb-2">Cấu hình Tầng</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="text-xs text-slate-500 font-bold uppercase">Tầng Lobby Mặc định</label>
                        <select className="w-full mt-1 px-3 py-2 border rounded-lg text-sm text-slate-900">
                          <option>Tầng 1 (Main Lobby)</option>
                          <option>Tầng B1 (Parking)</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-xs text-slate-500 font-bold uppercase">Thời gian mở cửa (giây)</label>
                        <input type="number" className="w-full mt-1 px-3 py-2 border rounded-lg text-sm text-slate-900" defaultValue={10} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-end pt-4 border-t">
                  <button onClick={() => setIsConfigOpen(false)} className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">Lưu cấu hình</button>
                </div>
             </div>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-lg font-bold">{editingEv ? 'Cấu hình Thang máy' : 'Thêm Thang máy'}</h3>
              <button onClick={() => setIsModalOpen(false)}><X size={20} /></button>
            </div>
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tên thang máy</label>
                <input required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Tòa nhà / Block</label>
                <input required className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.building} onChange={e => setFormData({...formData, building: e.target.value})} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Chế độ</label>
                  <select className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.mode} onChange={e => setFormData({...formData, mode: e.target.value as ElevatorMode})}>
                    {Object.values(ElevatorMode).map(m => <option key={m} value={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Tầng hiện tại</label>
                  <input type="number" className="w-full px-4 py-2 border rounded-xl text-slate-900" value={formData.currentFloor} onChange={e => setFormData({...formData, currentFloor: parseInt(e.target.value)})} />
                </div>
              </div>
              <div className="flex justify-end space-x-3 pt-4">
                <button type="button" onClick={() => setIsModalOpen(false)} className="px-4 py-2 text-slate-600 font-medium">Hủy</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-xl font-bold">Lưu</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ElevatorManagement;
