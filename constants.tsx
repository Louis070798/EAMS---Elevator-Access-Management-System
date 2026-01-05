
import { UserType, User, Elevator, ElevatorMode, AccessResult, AccessLog } from './types';

export const INITIAL_USERS: User[] = [
  { id: '1', fullName: 'Nguyen Van A', type: UserType.RESIDENT, identifier: 'RFID-9901', status: 'ACTIVE', allowedFloors: [1, 5, 12], email: 'vana@example.com' },
  { id: '2', fullName: 'Tran Thi B', type: UserType.STAFF, identifier: 'RFID-4421', status: 'ACTIVE', allowedFloors: [1, 2, 3, 4, 5], email: 'thib@example.com' },
  { id: '3', fullName: 'John Doe', type: UserType.VIP, identifier: 'FACE-001', status: 'ACTIVE', allowedFloors: Array.from({ length: 30 }, (_, i) => i + 1), email: 'john@vip.com' },
  { id: '4', fullName: 'Le Van C', type: UserType.GUEST, identifier: 'QR-TEMP-11', status: 'ACTIVE', allowedFloors: [1, 10], email: 'vanc@guest.com' },
];

export const INITIAL_ELEVATORS: Elevator[] = [
  { id: 'E1', name: 'Elevator A1', building: 'Tower A', currentFloor: 5, status: 'ONLINE', mode: ElevatorMode.NORMAL },
  { id: 'E2', name: 'Elevator A2', building: 'Tower A', currentFloor: 12, status: 'ONLINE', mode: ElevatorMode.NORMAL },
  { id: 'E3', name: 'Elevator B1', building: 'Tower B', currentFloor: 1, status: 'ONLINE', mode: ElevatorMode.MAINTENANCE },
  { id: 'E4', name: 'Elevator B2', building: 'Tower B', currentFloor: 22, status: 'OFFLINE', mode: ElevatorMode.RESTRICTED },
];

export const MOCK_LOGS: AccessLog[] = [
  { id: 'L1', timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(), userName: 'Nguyen Van A', userId: '1', elevatorName: 'Elevator A1', floor: 12, result: AccessResult.ALLOW, method: 'RFID' },
  { id: 'L2', timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(), userName: 'Unknown', userId: 'unknown', elevatorName: 'Elevator A2', floor: 25, result: AccessResult.DENY, method: 'QR' },
  { id: 'L3', timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(), userName: 'John Doe', userId: '3', elevatorName: 'Elevator B1', floor: 30, result: AccessResult.ALLOW, method: 'FACE' },
];
