export enum UserStatus {
  Active = 'Active',
  Busy = 'Busy',
  Away = 'Away',
  Offline = 'Offline',
}

export interface User {
  id: string;
  name: string;
  role: string;
  avatar: string;
  status: UserStatus;
  statusMessage?: string;
}

export interface Room {
  id: string;
  name: string;
  description: string;
  type: 'video' | 'audio' | 'quiet';
  capacity: number;
  participants: string[]; // User IDs
}

export interface Message {
  id: string;
  userId: string;
  content: string;
  timestamp: string;
}
