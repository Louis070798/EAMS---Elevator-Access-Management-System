
import React from 'react';
import { Box, Settings2, Power, AlertCircle, Info } from 'lucide-react';
import { Elevator, ElevatorMode } from '../types';

interface ElevatorManagementProps {
  elevators: Elevator[];
}

const ElevatorManagement: React.FC<ElevatorManagementProps> = ({ elevators }) => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-gray-800 text-lg">Connected Units</h3>
        <button className="px-4 py-2 bg-slate-800 text-white rounded-xl text-sm font-medium hover:bg-slate-900 transition-all flex items-center space-x-2">
          <Settings2 size={16} />
          <span>Config Group</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {elevators.map((ev) => (
          <div key={ev.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm relative overflow-hidden group">
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
                <span className={`text-[10px] font-black uppercase tracking-widest px-2 py-0.5 rounded ${
                  ev.status === 'ONLINE' ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-500'
                }`}>
                  {ev.status}
                </span>
                <span className="text-xs font-medium text-gray-400 mt-1">{ev.building}</span>
              </div>
            </div>

            <div className="mb-6">
              <h4 className="text-lg font-bold text-gray-900 mb-1">{ev.name}</h4>
              <div className="flex items-end space-x-2">
                <span className="text-3xl font-black text-blue-600">{ev.currentFloor}</span>
                <span className="text-sm font-medium text-gray-400 mb-1.5 uppercase">Floor</span>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Mode:</span>
                <span className={`font-bold ${
                  ev.mode === ElevatorMode.NORMAL ? 'text-emerald-600' :
                  ev.mode === ElevatorMode.EMERGENCY ? 'text-red-600' : 'text-amber-600'
                }`}>{ev.mode}</span>
              </div>
              
              <div className="grid grid-cols-2 gap-2 pt-2">
                <button className="flex items-center justify-center space-x-2 py-2 bg-gray-50 text-gray-600 rounded-lg text-xs font-bold hover:bg-gray-100 transition-colors border border-gray-100">
                  <Info size={14} />
                  <span>Logs</span>
                </button>
                <button className={`flex items-center justify-center space-x-2 py-2 rounded-lg text-xs font-bold transition-colors border ${
                  ev.status === 'ONLINE' 
                    ? 'bg-red-50 text-red-600 border-red-100 hover:bg-red-100' 
                    : 'bg-emerald-50 text-emerald-600 border-emerald-100 hover:bg-emerald-100'
                }`}>
                  <Power size={14} />
                  <span>{ev.status === 'ONLINE' ? 'Stop' : 'Start'}</span>
                </button>
              </div>
            </div>
          </div>
        ))}

        <button className="border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-gray-400 hover:border-blue-400 hover:text-blue-500 transition-all group">
          <div className="bg-gray-50 p-4 rounded-full group-hover:bg-blue-50 transition-colors mb-4">
            <Box size={32} />
          </div>
          <span className="font-bold">Register New Elevator</span>
          <span className="text-xs mt-1 text-center">Add hardware unit to system</span>
        </button>
      </div>

      <div className="bg-blue-600 p-8 rounded-2xl text-white relative overflow-hidden shadow-xl shadow-blue-200">
        <div className="relative z-10">
          <h3 className="text-2xl font-bold mb-2">Emergency Override System</h3>
          <p className="text-blue-100 max-w-xl mb-6">
            In case of emergency evacuation, click below to set all elevators to Emergency Mode (Ground Floor + Doors Open).
          </p>
          <button className="bg-white text-blue-600 px-6 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors flex items-center space-x-2">
            <AlertCircle size={20} />
            <span>ACTIVATE GLOBAL EMERGENCY</span>
          </button>
        </div>
        <div className="absolute right-0 bottom-0 opacity-10 -mr-10 -mb-10">
          <AlertCircle size={300} />
        </div>
      </div>
    </div>
  );
};

export default ElevatorManagement;
