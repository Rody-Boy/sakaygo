import { rides } from '@/mock/rides';
import { drivers } from '@/mock/drivers';
import { couriers } from '@/mock/couriers';
import { feedback } from '@/mock/feedback';
import { notifications } from '@/mock/notifications';
import { delay, peso } from '@/lib/utils';

export class AdminService {
  static async dashboard() {
    await delay();
    const completedTrips = rides.filter((ride) => ride.status === 'completed').length;
    const activeDrivers = drivers.filter((driver) => driver.status !== 'offline').length;
    const activeCouriers = couriers.filter((job) => job.status !== 'delivered').length;
    const revenue = rides.reduce((sum, ride) => sum + ride.fare, 0) + couriers.reduce((sum, job) => sum + job.fee, 0) + 12430;

    return {
      stats: [
        { label: 'Trips today', value: String(rides.length + 124), trend: `${completedTrips} completed in mock data` },
        { label: 'Active drivers', value: String(activeDrivers), trend: '+2 vs morning' },
        { label: 'Courier jobs', value: String(couriers.length), trend: `${activeCouriers} still active` },
        { label: 'Revenue', value: peso(revenue), trend: '+12% vs yesterday' },
      ],
      drivers,
      couriers,
      feedback,
      notifications,
    };
  }
}
