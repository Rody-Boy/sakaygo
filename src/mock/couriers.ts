import type { CourierJob } from '@/types';

export const couriers: CourierJob[] = [
  { id: 'c1', sender: 'Liza Bakery', recipient: 'Ramon S.', pickup: 'Poblacion Market', dropoff: 'Barangay Hilamonan', item: 'Pastries box', fee: 95, status: 'assigned', etaMinutes: 22 },
  { id: 'c2', sender: 'Noreen Pharmacy', recipient: 'Teresita V.', pickup: 'Gaisano Kabankalan', dropoff: 'Talubangi Chapel', item: 'Medicine pack', fee: 75, status: 'pending', etaMinutes: 31 },
  { id: 'c3', sender: 'Kabankalan Prints', recipient: 'CPSU Registrar', pickup: 'Poblacion Print Hub', dropoff: 'CPSU Main Gate', item: 'Documents envelope', fee: 82, status: 'in_transit', etaMinutes: 14 },
  { id: 'c4', sender: 'Ana Sari-Sari Store', recipient: 'Mila C.', pickup: 'Barangay Tabugon', dropoff: 'Public Plaza', item: 'Grocery bundle', fee: 110, status: 'delivered', etaMinutes: 0 },
];
