import { Card } from '@/components/ui/card';

interface CourierTrackingCardProps {
  summary: string;
  checkpoints: string[];
}

export function CourierTrackingCard({ summary, checkpoints }: CourierTrackingCardProps) {
  return (
    <Card className="border-green-200 bg-green-50">
      <h2 className="font-bold text-green-950">Courier request created</h2>
      <p className="mt-2 text-sm font-semibold text-green-900">{summary}</p>
      <ol className="mt-4 grid gap-2 text-sm text-green-950">
        {checkpoints.map((checkpoint, index) => (
          <li key={checkpoint} className="rounded-xl bg-white/70 p-2">
            {index + 1}. {checkpoint}
          </li>
        ))}
      </ol>
    </Card>
  );
}
