import { AlertCircle, Inbox, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

interface AsyncStateProps {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export function LoadingState({ title, description = 'Please wait while we prepare the latest mock data.' }: AsyncStateProps) {
  return (
    <Card className="flex items-center gap-4" role="status" aria-live="polite">
      <Loader2 className="size-6 animate-spin text-green-600" aria-hidden="true" />
      <div>
        <h2 className="font-semibold">{title}</h2>
        <p className="text-sm text-slate-600">{description}</p>
      </div>
    </Card>
  );
}

export function EmptyState({ title, description = 'There is nothing to show yet.', actionLabel, onAction }: AsyncStateProps) {
  return (
    <Card className="text-center">
      <Inbox className="mx-auto size-8 text-slate-400" aria-hidden="true" />
      <h2 className="mt-3 font-semibold">{title}</h2>
      <p className="mx-auto mt-1 max-w-sm text-sm text-slate-600">{description}</p>
      {actionLabel && onAction ? (
        <Button className="mt-4" onClick={onAction} type="button">
          {actionLabel}
        </Button>
      ) : null}
    </Card>
  );
}

export function ErrorState({ title, description = 'Something went wrong while loading this section.', actionLabel = 'Retry', onAction }: AsyncStateProps) {
  return (
    <Card className="border-red-200 bg-red-50 text-red-950" role="alert">
      <div className="flex items-start gap-3">
        <AlertCircle className="mt-0.5 size-5 text-red-600" aria-hidden="true" />
        <div>
          <h2 className="font-semibold">{title}</h2>
          <p className="mt-1 text-sm text-red-800">{description}</p>
          {onAction ? (
            <Button className="mt-4 bg-red-600 hover:bg-red-700" onClick={onAction} type="button">
              <RefreshCw className="mr-2 size-4" aria-hidden="true" />
              {actionLabel}
            </Button>
          ) : null}
        </div>
      </div>
    </Card>
  );
}

export function SkeletonCard() {
  return (
    <Card role="status" aria-label="Loading content">
      <div className="h-4 w-32 animate-pulse rounded bg-slate-200" />
      <div className="mt-4 h-8 w-48 animate-pulse rounded bg-slate-200" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-slate-100" />
      <div className="mt-2 h-3 w-2/3 animate-pulse rounded bg-slate-100" />
    </Card>
  );
}
