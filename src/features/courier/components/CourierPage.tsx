'use client';

import { useEffect, useState } from 'react';
import { PackageCheck } from 'lucide-react';
import { LoadingState, EmptyState, ErrorState } from '@/components/ui/async-state';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { CourierTrackingCard } from '@/features/courier/components/CourierTrackingCard';
import { CourierService } from '@/services/CourierService';
import { peso } from '@/lib/utils';
import type { CourierJob } from '@/types';

export function CourierPage() {
  const [jobs, setJobs] = useState<CourierJob[] | null>(null);
  const [created, setCreated] = useState<{ summary: string; checkpoints: string[] }>();
  const [error, setError] = useState(false);

  async function load() {
    setError(false);
    try {
      setJobs(await CourierService.list());
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  async function createCourierRequest() {
    const result = await CourierService.create();
    setCreated({ summary: `${result.trackingCode} · ETA ${result.eta} · ${peso(result.fee)}`, checkpoints: result.checkpoints });
  }

  return (
    <div>
      <PageHeader eyebrow="Courier" title="Courier booking" description="Simulate barangay-to-barangay parcel dispatch with pricing, ETA, and active job tracking." />
      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <PackageCheck className="size-9 text-green-600" aria-hidden="true" />
          <h2 className="mt-3 text-xl font-bold">Create delivery request</h2>
          <p className="mt-2 text-slate-600">Mock courier requests behave like an async backend response with tracking details.</p>
          <Button className="mt-5" onClick={createCourierRequest} type="button">Create courier request</Button>
          {created ? <div className="mt-4"><CourierTrackingCard summary={created.summary} checkpoints={created.checkpoints} /></div> : null}
        </Card>
        <div className="grid gap-4">
          {error ? <ErrorState title="Courier jobs failed to load" onAction={load} /> : null}
          {!jobs && !error ? <LoadingState title="Loading courier jobs" /> : null}
          {jobs && jobs.length === 0 ? <EmptyState title="No courier jobs" actionLabel="Retry" onAction={load} /> : null}
          {jobs && jobs.length > 0 ? (
            <Card>
              <h2 className="font-bold">Active courier jobs</h2>
              <div className="mt-4 grid gap-4">
                {jobs.map((job) => (
                  <article key={job.id} className="rounded-2xl border p-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="font-semibold">{job.item}</p>
                      <StatusBadge tone={job.status === 'delivered' ? 'success' : 'warning'}>{job.status}</StatusBadge>
                    </div>
                    <p className="mt-2 text-sm text-slate-600">{job.pickup} → {job.dropoff} · {peso(job.fee)}</p>
                  </article>
                ))}
              </div>
            </Card>
          ) : null}
        </div>
      </div>
    </div>
  );
}
