import type { Ride } from '@/types';

export const rides: Ride[] = [
  { id: 'r1', riderName: 'Ma. Isabel Gonzales', driverId: 'd1', pickup: 'Kabankalan Public Plaza', dropoff: 'CPSU Main Gate', distanceKm: 4.8, fare: 84, status: 'completed', paymentMethod: 'cash', requestedAt: '2026-07-04T08:30:00Z' },
  { id: 'r2', riderName: 'Paolo Teves', driverId: 'd2', pickup: 'Gaisano Kabankalan Entrance', dropoff: 'City Hospital', distanceKm: 2.6, fare: 69, status: 'in_progress', paymentMethod: 'wallet', requestedAt: '2026-07-05T02:20:00Z' },
  { id: 'r3', riderName: 'Carla Montinola', driverId: 'd4', pickup: 'Public Market', dropoff: 'Barangay Tabugon', distanceKm: 5.1, fare: 94, status: 'accepted', paymentMethod: 'cash', requestedAt: '2026-07-05T03:05:00Z' },
  { id: 'r4', riderName: 'Bryan Garces', driverId: 'd7', pickup: 'South Ceres Terminal', dropoff: 'Binicuil Elementary School', distanceKm: 6.2, fare: 105, status: 'completed', paymentMethod: 'wallet', requestedAt: '2026-07-05T00:45:00Z' },
];
