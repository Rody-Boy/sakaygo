'use client';

import { useEffect, useState } from 'react';
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { LoadingState, ErrorState } from '@/components/ui/async-state';
import { Card } from '@/components/ui/card';
import { MetricCard } from '@/components/ui/metric-card';
import { PageHeader } from '@/components/ui/page-header';
import { StatusBadge } from '@/components/ui/status-badge';
import { AdminService } from '@/services/AdminService';
import type { CourierJob, Driver, Feedback, Notification, Stat } from '@/types';

type AdminDashboardData = {
  stats: Stat[];
  drivers: Driver[];
  couriers: CourierJob[];
  feedback: Feedback[];
  notifications: Notification[];
};

export function AdminPage() {
  const [data, setData] = useState<AdminDashboardData | null>(null);
  const [error, setError] = useState(false);

  async function load() {
    setError(false);
    try {
      setData(await AdminService.dashboard());
    } catch {
      setError(true);
    }
  }

  useEffect(() => {
    void load();
  }, []);

  if (error) {
    return <ErrorState title="Operations dashboard failed to load" onAction={load} />;
  }

  if (!data) {
    return <LoadingState title="Loading operations dashboard" />;
  }

  const chart = data.stats.map((stat, index) => ({
    name: stat.label,
    value: Number(stat.value.replace(/[^0-9]/g, '')) || index + 1,
  }));

  return (
    <div className="grid gap-5">
      <PageHeader eyebrow="Admin" title="Operations dashboard" description="Monitor mocked city demand, active drivers, courier jobs, feedback, notifications, and revenue trends." />
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {data.stats.map((stat) => <MetricCard key={stat.label} label={stat.label} value={stat.value} trend={stat.trend} />)}
      </div>
      <Card>
        <h2 className="font-bold">Demand snapshot</h2>
        <div className="h-64">
          <ResponsiveContainer>
            <BarChart data={chart}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#16a34a" radius={8} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <h2 className="font-bold">Fleet</h2>
          <div className="mt-3 grid gap-2">
            {data.drivers.map((driver) => (
              <div key={driver.id} className="flex items-center justify-between rounded-2xl border p-3 text-sm">
                <span>{driver.name} · {driver.barangay} · {driver.completedTrips.toLocaleString()} trips</span>
                <StatusBadge tone={driver.status === 'available' ? 'success' : 'warning'}>{driver.status}</StatusBadge>
              </div>
            ))}
          </div>
        </Card>
        <Card>
          <h2 className="font-bold">Feedback</h2>
          <div className="mt-3 grid gap-3">
            {data.feedback.map((item) => <p className="rounded-2xl border p-3 text-sm" key={item.id}>⭐ {item.rating} {item.comment}</p>)}
          </div>
        </Card>
      </div>
    </div>
  );
}
