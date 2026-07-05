import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { drivers } from '@/mock/drivers';
import { rides } from '@/mock/rides';
import { peso } from '@/lib/utils';

export function DriverPage() {
  const driver = drivers[0];

  return (
    <div>
      <PageHeader eyebrow="Driver" title="Driver workspace" description="Review assigned trips, availability, and earnings context for the mocked driver demo." />
      <div className="grid gap-6 lg:grid-cols-[.8fr_1.2fr]">
        <Card>
          <h2 className="text-xl font-bold">{driver.name}</h2>
          <p className="mt-2 text-slate-600">{driver.plate} · {driver.barangay} · {driver.completedTrips.toLocaleString()} trips</p>
          <div className="mt-5 rounded-2xl bg-green-50 p-4">
            <b>Status:</b> Available near {driver.barangay}
          </div>
          <Button className="mt-4 w-full" type="button">Go online</Button>
        </Card>
        <Card>
          <h2 className="font-bold">Today&apos;s trips</h2>
          <div className="mt-4 grid gap-4">
            {rides.map((ride) => (
              <article key={ride.id} className="rounded-2xl border p-4">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <p className="font-semibold">{ride.pickup} → {ride.dropoff}</p>
                  <StatusBadge tone={ride.status === 'completed' ? 'success' : 'warning'}>{ride.status.replace('_', ' ')}</StatusBadge>
                </div>
                <p className="mt-2 text-sm text-slate-600">{peso(ride.fare)} · {ride.distanceKm} km</p>
              </article>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
}
