import React from 'react';
import { UserStatus } from '../types.js';
import { Circle, Search, MoreHorizontal } from 'lucide-react';

export const UserStatusSidebar = ({ users, currentUser }) => {
  const getStatusColor = (status) => {
    switch (status) {
      case UserStatus.Active: return 'text-green-500 fill-green-500';
      case UserStatus.Busy: return 'text-red-500 fill-red-500';
      case UserStatus.Away: return 'text-yellow-500 fill-yellow-500';
      case UserStatus.Offline: return 'text-slate-300 fill-slate-300';
      default: return 'text-slate-300';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case UserStatus.Active: return 'Online';
      case UserStatus.Busy: return 'Do Not Disturb';
      case UserStatus.Away: return 'Away';
      case UserStatus.Offline: return 'Offline';
    }
  };

  return (
    <aside className="w-72 bg-slate-900 border-r border-slate-800 flex flex-col h-full shrink-0 transition-all duration-300">
      {/* Header */}
      <div className="p-4 border-b border-slate-800">
        <h1 className="text-white font-bold text-xl tracking-tight flex items-center gap-2">
          <div className="w-8 h-8 bg-indigo-500 rounded-lg flex items-center justify-center text-white text-lg">
            S
          </div>
          SyncSphere
        </h1>
      </div>

      {/* Current User Card */}
      <div className="p-4 bg-slate-800/50">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={currentUser.avatar} 
              alt="Me" 
              className="w-10 h-10 rounded-full border-2 border-slate-700"
            />
            <div className="absolute -bottom-0.5 -right-0.5 bg-slate-900 rounded-full p-0.5">
              <Circle size={10} className={getStatusColor(currentUser.status)} />
            </div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-white text-sm font-semibold truncate">You ({currentUser.name})</h3>
            <p className="text-slate-400 text-xs truncate">
              {currentUser.statusMessage || getStatusLabel(currentUser.status)}
            </p>
          </div>
        </div>
      </div>

      {/* Search */}
      <div className="px-4 py-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
          <input 
            type="text" 
            placeholder="Find a teammate..." 
            className="w-full bg-slate-800 text-slate-200 text-sm rounded-md py-2 pl-9 pr-3 focus:outline-none focus:ring-1 focus:ring-indigo-500 placeholder-slate-500"
          />
        </div>
      </div>

      {/* Team List */}
      <div className="flex-1 overflow-y-auto px-2 py-2 space-y-1">
        <div className="px-2 pb-2 text-xs font-semibold text-slate-500 uppercase tracking-wider">
          Team Members
        </div>
        {users.filter(u => u.id !== currentUser.id).map((user) => (
          <div 
            key={user.id} 
            className="group flex items-center gap-3 p-2 rounded-md hover:bg-slate-800 cursor-pointer transition-colors"
          >
            <div className="relative">
              <img 
                src={user.avatar} 
                alt={user.name} 
                className="w-9 h-9 rounded-full bg-slate-700"
              />
              <div className="absolute -bottom-0.5 -right-0.5 bg-slate-900 rounded-full p-0.5">
                <Circle size={10} className={getStatusColor(user.status)} />
              </div>
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-center">
                <h4 className="text-slate-200 text-sm font-medium truncate group-hover:text-white">
                  {user.name}
                </h4>
              </div>
              <p className="text-slate-500 text-xs truncate group-hover:text-slate-400">
                {user.statusMessage || user.role}
              </p>
            </div>
            
            <button className="opacity-0 group-hover:opacity-100 text-slate-400 hover:text-white p-1">
              <MoreHorizontal size={16} />
            </button>
          </div>
        ))}
      </div>
      
      {/* Footer */}
      <div className="p-4 border-t border-slate-800 text-xs text-slate-500 text-center">
        v1.2.0 • Online
      </div>
    </aside>
  );
};
