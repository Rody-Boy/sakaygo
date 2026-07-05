import type { PickupPoint } from '@/types';

export const pickupPoints: PickupPoint[] = [
  { id: 'p1', name: 'Kabankalan Public Plaza', barangay: 'Poblacion', lat: 9.988, lng: 122.814, landmark: 'Near city hall', demandLevel: 'high' },
  { id: 'p2', name: 'Gaisano Kabankalan Entrance', barangay: 'Poblacion', lat: 9.990, lng: 122.817, landmark: 'Main entrance canopy', demandLevel: 'high' },
  { id: 'p3', name: 'CPSU Main Gate', barangay: 'Camingawan', lat: 10.003, lng: 122.813, landmark: 'Guard house', demandLevel: 'moderate' },
  { id: 'p4', name: 'Kabankalan City Hospital', barangay: 'Talubangi', lat: 9.982, lng: 122.809, landmark: 'Emergency bay', demandLevel: 'moderate' },
  { id: 'p5', name: 'Kabankalan Public Market', barangay: 'Poblacion', lat: 9.987, lng: 122.819, landmark: 'Fruit section gate', demandLevel: 'high' },
  { id: 'p6', name: 'South Ceres Terminal', barangay: 'Poblacion', lat: 9.985, lng: 122.821, landmark: 'Passenger waiting shed', demandLevel: 'moderate' },
];
