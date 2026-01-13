/**
 * User status constants to replace the TypeScript enum.
 * Object.freeze ensures the values cannot be modified at runtime.
 */
export const UserStatus = Object.freeze({
  Active: 'Active',
  Busy: 'Busy',
  Away: 'Away',
  Offline: 'Offline',
});

// TypeScript interfaces (User, Room, Message) have been removed 
// as they do not exist in plain JavaScript.
