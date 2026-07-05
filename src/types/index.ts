export type Role = 'rider' | 'driver' | 'admin';
export type RideStatus = 'searching' | 'accepted' | 'arriving' | 'in_progress' | 'completed';
export type DriverStatus = 'available' | 'busy' | 'offline';
export type CourierStatus = 'pending' | 'assigned' | 'picked_up' | 'in_transit' | 'delivered';

export interface Coordinates {
  lat: number;
  lng: number;
}

export interface User {
  id: string;
  name: string;
  role: Role;
  barangay: string;
  phone: string;
}

export interface Driver extends Coordinates {
  id: string;
  name: string;
  plate: string;
  barangay: string;
  rating: number;
  completedTrips: number;
  status: DriverStatus;
}

export interface PickupPoint extends Coordinates {
  id: string;
  name: string;
  barangay: string;
  landmark: string;
  demandLevel: 'low' | 'moderate' | 'high';
}

export interface Ride {
  id: string;
  riderName: string;
  driverId: string;
  pickup: string;
  dropoff: string;
  distanceKm: number;
  fare: number;
  status: RideStatus;
  paymentMethod: 'cash' | 'wallet';
  requestedAt: string;
}

export interface RideLifecycleStep {
  id: RideStatus;
  title: string;
  description: string;
  etaMinutes: number;
}

export interface CourierJob {
  id: string;
  sender: string;
  recipient: string;
  pickup: string;
  dropoff: string;
  item: string;
  fee: number;
  status: CourierStatus;
  etaMinutes: number;
}

export interface Feedback {
  id: string;
  author: string;
  rating: number;
  comment: string;
  target: string;
}

export interface Notification {
  id: string;
  title: string;
  body: string;
  type: 'ride' | 'courier' | 'system';
  read: boolean;
}

export interface Stat {
  label: string;
  value: string;
  trend: string;
}
