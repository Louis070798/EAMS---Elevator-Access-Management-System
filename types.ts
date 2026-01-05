
export enum UserRole {
  SYSTEM_ADMIN = 'SYSTEM_ADMIN',
  BUILDING_ADMIN = 'BUILDING_ADMIN',
  SECURITY_OFFICER = 'SECURITY_OFFICER',
  END_USER = 'END_USER'
}

export enum UserType {
  RESIDENT = 'RESIDENT',
  STAFF = 'STAFF',
  GUEST = 'GUEST',
  VIP = 'VIP',
  TECHNICIAN = 'TECHNICIAN'
}

export enum ElevatorMode {
  NORMAL = 'NORMAL',
  RESTRICTED = 'RESTRICTED',
  EMERGENCY = 'EMERGENCY',
  MAINTENANCE = 'MAINTENANCE'
}

export enum AccessResult {
  ALLOW = 'ALLOW',
  DENY = 'DENY'
}

export interface User {
  id: string;
  fullName: string;
  type: UserType;
  identifier: string; // RFID/QR/FaceID ID
  status: 'ACTIVE' | 'LOCKED';
  allowedFloors: number[];
  email: string;
}

export interface Elevator {
  id: string;
  name: string;
  building: string;
  currentFloor: number;
  status: 'ONLINE' | 'OFFLINE';
  mode: ElevatorMode;
}

export interface AccessLog {
  id: string;
  timestamp: string;
  userName: string;
  userId: string;
  elevatorName: string;
  floor: number;
  result: AccessResult;
  method: 'RFID' | 'FACE' | 'QR' | 'FINGERPRINT';
}

export interface DashboardStats {
  totalUsers: number;
  activeElevators: number;
  dailyAccessCount: number;
  securityAlerts: number;
}
