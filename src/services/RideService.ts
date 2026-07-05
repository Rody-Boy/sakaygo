import { drivers } from '@/mock/drivers';
import { pickupPoints } from '@/mock/pickupPoints';
import { rides } from '@/mock/rides';
import { settings } from '@/mock/settings';
import { delay } from '@/lib/utils';
import type { Driver, Ride, RideLifecycleStep } from '@/types';

const lifecycle: RideLifecycleStep[] = [
  { id: 'searching', title: 'Finding nearby drivers', description: 'Scanning available tricycles around the pickup point.', etaMinutes: 1 },
  { id: 'accepted', title: 'Driver accepted', description: 'A verified driver accepted the request and received rider details.', etaMinutes: 2 },
  { id: 'arriving', title: 'Driver travelling to pickup', description: 'Driver is navigating through the nearest barangay route.', etaMinutes: 5 },
  { id: 'in_progress', title: 'Passenger boarded', description: 'Ride is underway and payment is being tracked.', etaMinutes: 9 },
  { id: 'completed', title: 'Ride completed', description: 'Payment recorded and feedback can now be submitted.', etaMinutes: 0 },
];

export interface RideBookingResult {
  ride: Ride;
  driver: Driver;
  lifecycle: RideLifecycleStep[];
  matchConfidence: number;
}

export class RideService {
  static async bootstrap() {
    await delay();
    return { drivers, pickupPoints, recentRides: rides };
  }

  static quote(distanceKm: number) {
    return Math.round(settings.baseFare + distanceKm * settings.perKm + settings.serviceFee);
  }

  static async book(input: { riderName: string; pickup: string; dropoff: string; distanceKm: number }): Promise<RideBookingResult> {
    await delay(900);
    const driver = this.matchDriver(input.pickup);
    const ride: Ride = {
      id: `r${Date.now()}`,
      riderName: input.riderName,
      driverId: driver.id,
      pickup: input.pickup,
      dropoff: input.dropoff,
      distanceKm: input.distanceKm,
      fare: this.quote(input.distanceKm),
      status: 'searching',
      paymentMethod: 'cash',
      requestedAt: new Date().toISOString(),
    };

    return { ride, driver, lifecycle, matchConfidence: 96 };
  }

  private static matchDriver(pickup: string) {
    const normalizedPickup = pickup.toLowerCase();
    const preferredBarangay = pickupPoints.find((point) => normalizedPickup.includes(point.name.toLowerCase()) || normalizedPickup.includes(point.barangay.toLowerCase()))?.barangay;
    const availableDrivers = drivers.filter((driver) => driver.status === 'available');
    return availableDrivers.find((driver) => driver.barangay === preferredBarangay) ?? availableDrivers[0] ?? drivers[0];
  }
}
