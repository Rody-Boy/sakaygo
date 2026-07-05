import { Card } from '@/components/ui/card';

interface MetricCardProps {
  label: string;
  value: string;
  trend?: string;
}

export function MetricCard({ label, value, trend }: MetricCardProps) {
  return (
    <Card>
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-2 text-2xl font-black text-slate-950">{value}</p>
      {trend ? <p className="mt-1 text-sm font-medium text-green-700">{trend}</p> : null}
    </Card>
  );
}
