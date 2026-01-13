import React from 'react';
import { Room, User } from '../types';
import { Video, Mic, VolumeX, Users, ArrowRight } from 'lucide-react';

interface RoomGridProps {
  rooms: Room[];
  users: User[];
  currentUser: User;
  onJoinRoom: (roomId: string) => void;
}

export const RoomGrid: React.FC<RoomGridProps> = ({ rooms, users, currentUser, onJoinRoom }) => {
  
  const getRoomIcon = (type: Room['type']) => {
    switch (type) {
      case 'video': return <Video size={18} className="text-indigo-500" />;
      case 'audio': return <Mic size={18} className="text-emerald-500" />;
      case 'quiet': return <VolumeX size={18} className="text-slate-400" />;
    }
  };

  const getParticipants = (participantIds: string[]) => {
    return participantIds.map(id => users.find(u => u.id === id)).filter(Boolean) as User[];
  };

  return (
    <div className="p-6 md:p-8 flex-1 overflow-y-auto bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-6">
          <div>
            <h2 className="text-2xl font-bold text-slate-800">Workspace</h2>
            <p className="text-slate-500 mt-1">Join a room to start collaborating</p>
          </div>
          <div className="flex gap-2">
            <button className="text-sm font-medium text-slate-600 bg-white border border-slate-200 px-3 py-1.5 rounded-md hover:bg-slate-50 transition">
              Filter
            </button>
            <button className="text-sm font-medium text-white bg-indigo-600 px-3 py-1.5 rounded-md hover:bg-indigo-700 transition shadow-sm">
              + New Room
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {rooms.map((room) => {
            const participants = getParticipants(room.participants);
            const isFull = participants.length >= room.capacity;
            const isCurrentRoom = room.participants.includes(currentUser.id);
            
            return (
              <div 
                key={room.id} 
                className={`room-card group relative bg-white rounded-xl border shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-64 ${
                  isCurrentRoom ? 'border-indigo-500 ring-2 ring-indigo-200' : 'border-slate-200 hover:border-indigo-200'
                } ${isFull && !isCurrentRoom ? 'opacity-90' : ''}`}
              >
                {/* Active Indicator Label */}
                {isCurrentRoom && (
                  <div className="absolute top-0 right-0 transform translate-x-1/3 -translate-y-1/3">
                    <span className="flex h-4 w-4">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-4 w-4 bg-green-500 border-2 border-white"></span>
                    </span>
                  </div>
                )}

                {/* Room Header */}
                <div className="p-5 flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2.5 rounded-lg border ${isCurrentRoom ? 'bg-indigo-50 border-indigo-100' : 'bg-slate-50 border-slate-100'}`}>
                      {getRoomIcon(room.type)}
                    </div>
                    <div>
                      <h3 className={`font-semibold leading-tight ${isCurrentRoom ? 'text-indigo-900' : 'text-slate-800'}`}>{room.name}</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{room.type.charAt(0).toUpperCase() + room.type.slice(1)} • {participants.length}/{room.capacity}</p>
                    </div>
                  </div>
                  {/* Join Button (Visible on Hover or if NOT current) */}
                  {!isCurrentRoom && (
                    <button 
                      onClick={() => onJoinRoom(room.id)}
                      disabled={isFull}
                      className="opacity-0 group-hover:opacity-100 transition-opacity bg-indigo-50 text-indigo-600 p-2 rounded-full hover:bg-indigo-100 disabled:bg-slate-100 disabled:text-slate-400"
                      aria-label={`Join ${room.name}`}
                    >
                      <ArrowRight size={18} />
                    </button>
                  )}
                  {isCurrentRoom && (
                    <span className="text-xs font-bold text-indigo-600 bg-indigo-50 px-2 py-1 rounded-full">
                      Joined
                    </span>
                  )}
                </div>

                {/* Room Description */}
                <div className="px-5 pb-2">
                   <p className="text-sm text-slate-500 line-clamp-2">{room.description}</p>
                </div>

                {/* Participants Area - Fills remaining space */}
                <div className="flex-1 bg-slate-50/50 mt-2 rounded-b-xl border-t border-slate-100 p-4">
                  {participants.length > 0 ? (
                    <div className="grid grid-cols-4 gap-2">
                       {participants.map((user) => (
                         <div key={user.id} className="flex flex-col items-center group/avatar cursor-pointer">
                            <div className="relative">
                              <img 
                                src={user.avatar} 
                                alt={user.name} 
                                className={`w-10 h-10 rounded-full border-2 shadow-sm ${user.id === currentUser.id ? 'border-indigo-400' : 'border-white'}`}
                              />
                              <div className="opacity-0 group-hover/avatar:opacity-100 absolute -bottom-6 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap z-10 pointer-events-none transition-opacity">
                                {user.name}
                              </div>
                            </div>
                         </div>
                       ))}
                    </div>
                  ) : (
                    <div className="h-full flex flex-col items-center justify-center text-slate-400 text-sm">
                      <Users size={24} className="mb-2 opacity-20" />
                      <span className="opacity-60">Room is empty</span>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};