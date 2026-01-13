import React, { useState } from 'react';
import { Room, User } from '../types';
import { 
  Mic, MicOff, Video, VideoOff, PhoneOff, 
  Monitor, Settings, Maximize2, Minimize2, 
  Users, MessageSquare 
} from 'lucide-react';

interface ActiveRoomProps {
  room: Room;
  participants: User[];
  currentUser: User;
  onLeave: () => void;
}

export const ActiveRoom: React.FC<ActiveRoomProps> = ({ room, participants, currentUser, onLeave }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOn, setIsVideoOn] = useState(room.type === 'video');
  const [isScreenSharing, setIsScreenSharing] = useState(false);

  // If minimized, show a floating PiP style widget
  if (isMinimized) {
    return (
      <div className="fixed bottom-20 right-4 sm:right-8 w-72 bg-slate-900 rounded-xl shadow-2xl border border-slate-700 z-40 overflow-hidden transition-all duration-300">
        <div className="p-3 bg-slate-800 flex items-center justify-between border-b border-slate-700">
          <div className="flex items-center gap-2 overflow-hidden">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
            <h3 className="text-white text-sm font-medium truncate">{room.name}</h3>
          </div>
          <button 
            onClick={() => setIsMinimized(false)}
            className="text-slate-400 hover:text-white transition-colors"
          >
            <Maximize2 size={16} />
          </button>
        </div>
        <div className="p-3 flex items-center justify-between">
            <div className="flex -space-x-2">
              {participants.slice(0, 3).map(p => (
                <img key={p.id} src={p.avatar} alt={p.name} className="w-8 h-8 rounded-full border-2 border-slate-900" />
              ))}
              {participants.length > 3 && (
                <div className="w-8 h-8 rounded-full border-2 border-slate-900 bg-slate-700 flex items-center justify-center text-xs text-white">
                  +{participants.length - 3}
                </div>
              )}
            </div>
            <button 
              onClick={onLeave}
              className="bg-red-500 hover:bg-red-600 text-white p-2 rounded-full transition-colors"
            >
              <PhoneOff size={16} />
            </button>
        </div>
      </div>
    );
  }

  // Maximized Full View
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/95 backdrop-blur-sm p-4 md:p-6 transition-all duration-300">
      <div className="w-full max-w-6xl h-full max-h-[90vh] bg-slate-950 rounded-2xl shadow-2xl flex flex-col overflow-hidden border border-slate-800 relative">
        
        {/* Header */}
        <div className="h-16 px-6 flex items-center justify-between border-b border-slate-800 bg-slate-900/50">
          <div className="flex items-center gap-4">
            <h2 className="text-white font-semibold text-lg flex items-center gap-2">
              {room.name}
              <span className="text-xs font-normal text-slate-400 px-2 py-0.5 bg-slate-800 rounded-full border border-slate-700">
                {room.type.toUpperCase()}
              </span>
            </h2>
            <div className="hidden md:flex items-center text-slate-400 text-sm gap-2">
              <Users size={16} />
              <span>{participants.length} / {room.capacity}</span>
            </div>
          </div>
          
          <button 
            onClick={() => setIsMinimized(true)}
            className="text-slate-400 hover:text-white hover:bg-slate-800 p-2 rounded-lg transition-colors"
          >
            <Minimize2 size={20} />
          </button>
        </div>

        {/* Main Grid Stage */}
        <div className="flex-1 p-6 overflow-y-auto">
          <div className={`grid gap-4 h-full ${
            participants.length <= 1 ? 'grid-cols-1' : 
            participants.length <= 4 ? 'grid-cols-2' : 
            'grid-cols-2 md:grid-cols-3 lg:grid-cols-4'
          }`}>
            {participants.map((user) => {
              const isCurrentUser = user.id === currentUser.id;
              // Mock active speaker detection for random users
              const isSpeaking = !isCurrentUser && Math.random() > 0.7; 
              
              return (
                <div key={user.id} className="relative group bg-slate-800 rounded-xl overflow-hidden border border-slate-700 flex flex-col items-center justify-center aspect-video shadow-lg">
                  {/* Status Indicators */}
                  <div className="absolute top-3 right-3 flex gap-2">
                    {isCurrentUser && isMuted && (
                      <div className="bg-red-500/20 p-1.5 rounded-full backdrop-blur-md">
                        <MicOff size={14} className="text-red-500" />
                      </div>
                    )}
                  </div>

                  {/* Avatar/Video Placeholder */}
                  <div className={`relative ${isSpeaking ? 'ring-4 ring-indigo-500/50 rounded-full' : ''}`}>
                    <img 
                      src={user.avatar} 
                      alt={user.name} 
                      className={`w-24 h-24 rounded-full object-cover shadow-xl ${isCurrentUser && !isVideoOn ? 'grayscale opacity-70' : ''}`}
                    />
                    {isSpeaking && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-4 w-4 bg-indigo-500"></span>
                      </span>
                    )}
                  </div>
                  
                  <div className="mt-4 flex flex-col items-center">
                    <span className="text-white font-medium text-sm">{user.name} {isCurrentUser && '(You)'}</span>
                    <span className="text-slate-500 text-xs">{user.role}</span>
                  </div>

                  {/* Video Off Overlay */}
                  {isCurrentUser && !isVideoOn && (
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px] flex items-center justify-center pointer-events-none">
                       <div className="text-center">
                         <div className="bg-slate-800 p-4 rounded-full inline-flex mb-2">
                            <VideoOff size={32} className="text-slate-500" />
                         </div>
                         <p className="text-slate-400 text-sm">Camera Off</p>
                       </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Control Bar */}
        <div className="h-20 bg-slate-900 border-t border-slate-800 flex items-center justify-center gap-4 px-6 relative z-10">
            <button 
              onClick={() => setIsMuted(!isMuted)}
              className={`p-4 rounded-full transition-all duration-200 ${isMuted ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
              title={isMuted ? "Unmute" : "Mute"}
            >
              {isMuted ? <MicOff size={24} /> : <Mic size={24} />}
            </button>
            
            <button 
              onClick={() => setIsVideoOn(!isVideoOn)}
              className={`p-4 rounded-full transition-all duration-200 ${!isVideoOn ? 'bg-red-500 hover:bg-red-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-white'}`}
              title={isVideoOn ? "Turn Camera Off" : "Turn Camera On"}
            >
              {!isVideoOn ? <VideoOff size={24} /> : <Video size={24} />}
            </button>

            <button 
              onClick={() => setIsScreenSharing(!isScreenSharing)}
              className={`p-4 rounded-full transition-all duration-200 hidden sm:block ${isScreenSharing ? 'bg-green-500 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'}`}
              title="Share Screen"
            >
              <Monitor size={24} />
            </button>

            <div className="w-px h-10 bg-slate-700 mx-2 hidden sm:block"></div>

            <button className="p-4 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-200 hidden sm:block">
              <Settings size={24} />
            </button>
            
            <button 
              onClick={onLeave}
              className="p-4 rounded-full bg-red-600 hover:bg-red-700 text-white ml-2 md:ml-4 px-8 flex items-center gap-2"
            >
              <PhoneOff size={24} />
              <span className="hidden md:inline font-medium">Leave</span>
            </button>
        </div>
      </div>
    </div>
  );
};