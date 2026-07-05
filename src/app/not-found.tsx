import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function NotFound() {
  return (
    <Card className="mx-auto max-w-lg text-center">
      <p className="text-sm font-semibold uppercase tracking-wide text-green-700">404</p>
      <h1 className="mt-2 text-3xl font-black">Page not found</h1>
      <p className="mt-3 text-slate-600">This SakayGo demo page does not exist. Return home to continue the guided MVP flow.</p>
      <Link href="/" className="mt-5 inline-flex">
        <Button>Back to home</Button>
      </Link>
    </Card>
  );
}
