import React, { useState } from 'react';
import { X, Megaphone } from 'lucide-react';

export const GlobalAnnouncement = () => {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-indigo-600 text-white px-4 py-3 shadow-md flex items-center justify-between relative z-20">
      <div className="flex items-center space-x-3 container mx-auto max-w-7xl">
        <div className="bg-white/20 p-1.5 rounded-full">
          <Megaphone size={18} className="text-white" />
        </div>
        <p className="text-sm font-medium">
          <span className="font-bold mr-1">Announcement:</span>
          All-hands meeting is scheduled for Friday at 3:00 PM EST. Please update your status if you cannot attend.
        </p>
      </div>
      <button 
        onClick={() => setIsVisible(false)}
        className="text-white/70 hover:text-white transition-colors p-1"
        aria-label="Close announcement"
      >
        <X size={18} />
      </button>
    </div>
  );
};
