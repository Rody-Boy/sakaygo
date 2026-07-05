'use client';

import type { ComponentType } from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Car, ShieldCheck, UserRound } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ErrorState } from '@/components/ui/async-state';
import { AuthService } from '@/services/AuthService';
import { useAuthStore } from '@/hooks/useAuthStore';
import type { Role } from '@/types';

const roles: Array<{ role: Role; label: string; icon: ComponentType<{ className?: string }> }> = [
  { role: 'rider', label: 'Continue as Rider', icon: UserRound },
  { role: 'driver', label: 'Continue as Driver', icon: Car },
  { role: 'admin', label: 'Continue as Admin', icon: ShieldCheck },
];

export function LoginPage() {
  const router = useRouter();
  const setSession = useAuthStore((state) => state.setSession);
  const [loadingRole, setLoadingRole] = useState<Role | null>(null);
  const [error, setError] = useState(false);

  async function choose(role: Role) {
    setError(false);
    setLoadingRole(role);
    try {
      const user = await AuthService.continueAs(role);
      setSession(user);
      router.push(role === 'admin' ? '/admin' : `/${role}`);
    } catch {
      setError(true);
    } finally {
      setLoadingRole(null);
    }
  }

  return (
    <div className="mx-auto max-w-xl">
      {error ? <ErrorState title="Could not start demo session" description="Please retry the mocked sign-in flow." onAction={() => setError(false)} /> : null}
      <Card className="mt-4">
        <h1 className="text-3xl font-black">Choose demo role</h1>
        <p className="mt-2 text-slate-600">Authentication is mocked and persisted locally for a production-like flow.</p>
        <div className="mt-6 grid gap-3">
          {roles.map(({ role, label, icon: Icon }) => (
            <Button key={role} onClick={() => choose(role)} disabled={loadingRole !== null} className="justify-start bg-slate-900 hover:bg-slate-800">
              <Icon className="mr-2 size-5" aria-hidden="true" />
              {loadingRole === role ? 'Starting session...' : label}
            </Button>
          ))}
        </div>
      </Card>
    </div>
  );
}
