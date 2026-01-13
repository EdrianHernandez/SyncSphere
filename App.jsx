import React, { useState } from 'react';
import { UserStatusSidebar } from './components/UserStatusSidebar.jsx';
import { RoomGrid } from './components/RoomGrid.jsx';
import { GlobalAnnouncement } from './components/GlobalAnnouncement.jsx';
import { ChatPreview } from './components/ChatPreview.jsx';
import { ActiveRoom } from './components/ActiveRoom.jsx';
import { USERS, INITIAL_ROOMS, MOCK_MESSAGES } from './constants.js';
import { Menu } from 'lucide-react';

const App = () => {
  const [users] = useState(USERS);
  const [rooms, setRooms] = useState(INITIAL_ROOMS);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // Assume first user is current user for demo
  const currentUser = users[0];

  const handleJoinRoom = (roomId) => {
    setRooms(prevRooms => prevRooms.map(room => {
      // Remove user from all other rooms
      const cleanParticipants = room.participants.filter(id => id !== currentUser.id);
      
      // Add to target room
      if (room.id === roomId) {
        return { ...room, participants: [...cleanParticipants, currentUser.id] };
      }
      return { ...room, participants: cleanParticipants };
    }));
  };

  const handleLeaveRoom = () => {
    setRooms(prevRooms => prevRooms.map(room => ({
      ...room,
      participants: room.participants.filter(id => id !== currentUser.id)
    })));
  };

  // Check if current user is in any room
  const activeRoom = rooms.find(r => r.participants.includes(currentUser.id));
  const activeParticipants = activeRoom 
    ? activeRoom.participants.map(id => users.find(u => u.id === id)).filter(Boolean)
    : [];

  return (
    <div className="flex h-screen w-full bg-gray-50 overflow-hidden relative">
      
      {/* Active Room Overlay (Modal) */}
      {activeRoom && (
        <ActiveRoom 
          room={activeRoom}
          participants={activeParticipants}
          currentUser={currentUser}
          onLeave={handleLeaveRoom}
        />
      )}

      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 z-40 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar - Responsive */}
      <div className={`fixed inset-y-0 left-0 z-50 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <UserStatusSidebar users={users} currentUser={currentUser} />
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col min-w-0 h-full relative">
        <GlobalAnnouncement />
        
        {/* Mobile Header for Menu Toggle */}
        <div className="md:hidden bg-white border-b border-slate-200 p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
               <button onClick={() => setIsSidebarOpen(true)} className="text-slate-600">
                  <Menu size={24} />
               </button>
               <span className="font-bold text-slate-800">SyncSphere</span>
            </div>
            <img src={currentUser.avatar} alt="Me" className="w-8 h-8 rounded-full" />
        </div>

        <RoomGrid 
          rooms={rooms} 
          users={users} 
          currentUser={currentUser}
          onJoinRoom={handleJoinRoom} 
        />
        
        <ChatPreview 
          messages={MOCK_MESSAGES} 
          users={users} 
          currentUser={currentUser}
        />
      </div>
    </div>
  );
};

export default App;
