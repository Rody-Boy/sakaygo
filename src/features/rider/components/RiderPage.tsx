'use client';

import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { LoadingState, EmptyState, ErrorState } from '@/components/ui/async-state';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { MapView } from '@/components/maps/MapView';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { RideService } from '@/services/RideService';
import { peso } from '@/lib/utils';
import type { Driver, PickupPoint, Ride, RideLifecycleStep } from '@/types';

const bookingSchema = z.object({
  pickup: z.string().min(2, 'Pickup point is required.'),
  dropoff: z.string().min(2, 'Drop-off is required.'),
  distanceKm: z.coerce.number().min(1, 'Minimum distance is 1 km.').max(20, 'Maximum demo distance is 20 km.'),
});

type BookingForm = z.infer<typeof bookingSchema>;

type BootstrapData = {
  drivers: Driver[];
  pickupPoints: PickupPoint[];
};

export function RiderPage() {
  const [data, setData] = useState<BootstrapData | null>(null);
  const [error, setError] = useState(false);
  const [booking, setBooking] = useState<{ ride: Ride; driver: Driver; lifecycle: RideLifecycleStep[]; matchConfidence: number } | null>(null);
  const [activeStep, setActiveStep] = useState(0);

  const { register, handleSubmit, watch, formState: { errors, isSubmitting } } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { pickup: 'Kabankalan Public Plaza', dropoff: 'CPSU Main Gate', distanceKm: 4.8 },
  });

  async function load() {
    setError(false);
    try {
      const response = await RideService.bootstrap();
      setData(response);
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  useEffect(() => {
    if (!booking) {
      setActiveStep(0);
      return;
    }

    const timer = window.setInterval(() => {
      setActiveStep((current) => Math.min(current + 1, booking.lifecycle.length - 1));
    }, 1400);

    return () => window.clearInterval(timer);
  }, [booking]);

  const quote = RideService.quote(Number(watch('distanceKm') || 0));

  return (
    <div>
      <PageHeader eyebrow="Rider" title="Book a tricycle" description="Request a ride, see a realistic fare quote, and simulate the matching lifecycle with nearby Kabankalan drivers." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <form className="grid gap-4" onSubmit={handleSubmit(async (values) => {
            const result = await RideService.book({ riderName: 'Ma. Isabel Gonzales', ...values });
            setActiveStep(0);
            setBooking(result);
          })}>
            <label className="font-medium" htmlFor="pickup">Pickup</label>
            <input id="pickup" className="rounded-xl border p-3" {...register('pickup')} aria-describedby="pickup-error" />
            {errors.pickup ? <p id="pickup-error" className="text-sm text-red-600">{errors.pickup.message}</p> : null}

            <label className="font-medium" htmlFor="dropoff">Drop-off</label>
            <input id="dropoff" className="rounded-xl border p-3" {...register('dropoff')} aria-describedby="dropoff-error" />
            {errors.dropoff ? <p id="dropoff-error" className="text-sm text-red-600">{errors.dropoff.message}</p> : null}

            <label className="font-medium" htmlFor="distanceKm">Distance in kilometers</label>
            <input id="distanceKm" className="rounded-xl border p-3" type="number" step="0.1" {...register('distanceKm')} aria-describedby="distance-error" />
            {errors.distanceKm ? <p id="distance-error" className="text-sm text-red-600">{errors.distanceKm.message}</p> : null}

            <div className="rounded-2xl bg-green-50 p-4 font-bold">Estimated fare: {peso(quote)}</div>
            <Button disabled={isSubmitting} type="submit">{isSubmitting ? 'Finding drivers...' : 'Request ride'}</Button>
          </form>
        </Card>

        <div className="grid gap-4">
          <MapView label="Rider pickup and driver map" />
          {error ? <ErrorState title="Drivers failed to load" onAction={load} /> : null}
          {!data && !error ? <LoadingState title="Loading nearby drivers" /> : null}
          {data && data.drivers.length === 0 ? <EmptyState title="No drivers nearby" description="Try another pickup point or retry in a few moments." onAction={load} actionLabel="Retry" /> : null}
          {data && data.drivers.length > 0 ? (
            <Card>
              <h2 className="font-bold">Nearby drivers</h2>
              <div className="mt-3 grid gap-3">
                {data.drivers.map((driver) => (
                  <div key={driver.id} className="flex items-center justify-between rounded-2xl border p-3 text-sm">
                    <span>{driver.name} · {driver.plate} · ⭐ {driver.rating}</span>
                    <StatusBadge tone={driver.status === 'available' ? 'success' : 'warning'}>{driver.status}</StatusBadge>
                  </div>
                ))}
              </div>
            </Card>
          ) : null}
          {booking ? (
            <Card>
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h2 className="font-bold">Matched with {booking.driver.name}</h2>
                <StatusBadge tone="success">{booking.matchConfidence}% match</StatusBadge>
              </div>
              <p className="mt-1 text-sm text-slate-600">Fare recorded: {peso(booking.ride.fare)}</p>
              <ol className="mt-3 grid gap-2">
                {booking.lifecycle.map((step, index) => (
                  <li key={step.id} className={index <= activeStep ? 'rounded-2xl bg-green-50 p-3' : 'rounded-2xl bg-slate-50 p-3 text-slate-500'}>
                    <b>{index + 1}. {step.title}</b>
                    <p className="text-sm">{step.description}</p>
                    <p className="text-xs">ETA: {step.etaMinutes === 0 ? 'now' : `${step.etaMinutes} min`}</p>
                  </li>
                ))}
              </ol>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
