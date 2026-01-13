import { User, Room, UserStatus, Message } from './types';

export const USERS: User[] = [
  {
    id: 'u1',
    name: 'Sarah Jenkins',
    role: 'Product Manager',
    avatar: 'https://picsum.photos/id/64/100/100',
    status: UserStatus.Active,
    statusMessage: 'Reviewing Q3 Roadmap'
  },
  {
    id: 'u2',
    name: 'David Chen',
    role: 'Senior Engineer',
    avatar: 'https://picsum.photos/id/91/100/100',
    status: UserStatus.Busy,
    statusMessage: 'Deep Work - DND'
  },
  {
    id: 'u3',
    name: 'Elena Rodriguez',
    role: 'UX Designer',
    avatar: 'https://picsum.photos/id/129/100/100',
    status: UserStatus.Active,
  },
  {
    id: 'u4',
    name: 'Marcus Johnson',
    role: 'Frontend Dev',
    avatar: 'https://picsum.photos/id/177/100/100',
    status: UserStatus.Away,
    statusMessage: 'Lunch 🌮'
  },
  {
    id: 'u5',
    name: 'Priya Patel',
    role: 'QA Engineer',
    avatar: 'https://picsum.photos/id/338/100/100',
    status: UserStatus.Active,
  },
  {
    id: 'u6',
    name: 'Tom Wilson',
    role: 'Backend Dev',
    avatar: 'https://picsum.photos/id/349/100/100',
    status: UserStatus.Offline,
  }
];

export const INITIAL_ROOMS: Room[] = [
  {
    id: 'r1',
    name: 'The Watercooler',
    description: 'Casual hangouts and coffee chats',
    type: 'audio',
    capacity: 20,
    participants: ['u1', 'u3']
  },
  {
    id: 'r2',
    name: 'Design Studio',
    description: 'Collaboration space for design team',
    type: 'video',
    capacity: 10,
    participants: ['u5']
  },
  {
    id: 'r3',
    name: 'Focus Pod A',
    description: 'Quiet work zone',
    type: 'quiet',
    capacity: 5,
    participants: ['u2']
  },
  {
    id: 'r4',
    name: 'Engineering Standup',
    description: 'Daily sync meeting room',
    type: 'video',
    capacity: 15,
    participants: []
  },
  {
    id: 'r5',
    name: 'Library',
    description: 'Silent reading and research',
    type: 'quiet',
    capacity: 8,
    participants: []
  },
  {
    id: 'r6',
    name: 'Client Meeting',
    description: 'External presentations',
    type: 'video',
    capacity: 12,
    participants: []
  }
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', userId: 'u1', content: 'Hey everyone! The roadmap review starts in 30 mins.', timestamp: '10:00 AM' },
  { id: 'm2', userId: 'u2', content: 'Thanks Sarah, I will be there.', timestamp: '10:02 AM' },
  { id: 'm3', userId: 'u4', content: 'Anyone want to grab tacos for lunch?', timestamp: '11:45 AM' },
];
