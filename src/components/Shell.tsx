'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { useEffect } from 'react';
import { Car, Home, LogOut, Package, ShieldCheck, UserRound } from 'lucide-react';
import { useAuthStore } from '@/hooks/useAuthStore';

const links = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/rider', label: 'Rider', icon: UserRound },
  { href: '/driver', label: 'Driver', icon: Car },
  { href: '/courier', label: 'Courier', icon: Package },
  { href: '/admin', label: 'Admin', icon: ShieldCheck },
];

export function Shell({ children }: { children: ReactNode }) {
  const { hydrate, logout, user } = useAuthStore();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <>
      <a href="#main-content" className="skip-link">Skip to main content</a>
      <header className="sticky top-0 z-20 border-b border-slate-200 bg-white/90 backdrop-blur" role="banner">
        <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Primary navigation">
          <Link href="/" className="focus-ring rounded-lg text-xl font-black text-green-700" aria-label="SakayGo home">
            SakayGo
          </Link>
          <div className="hidden gap-2 md:flex">
            {links.map(({ href, label, icon: Icon }) => (
              <Link className="focus-ring rounded-xl px-3 py-2 text-sm hover:bg-slate-100" key={href} href={href}>
                <Icon className="mr-1 inline size-4" aria-hidden="true" />
                {label}
              </Link>
            ))}
          </div>
          {user ? (
            <button onClick={logout} className="focus-ring rounded-xl px-3 py-2 text-sm" type="button" aria-label={`Logout ${user.name}`}>
              <LogOut className="mr-1 inline size-4" aria-hidden="true" />
              Logout
            </button>
          ) : (
            <Link href="/login" className="focus-ring rounded-xl px-3 py-2 text-sm font-semibold">
              Login
            </Link>
          )}
        </nav>
      </header>
      <main id="main-content" className="mx-auto max-w-6xl px-4 py-6 pb-28 md:pb-6" tabIndex={-1}>
        {children}
      </main>
      <nav className="fixed inset-x-3 bottom-3 z-30 grid grid-cols-5 rounded-2xl border bg-white p-2 shadow-lg md:hidden" aria-label="Mobile navigation">
        {links.map(({ href, label, icon: Icon }) => (
          <Link className="focus-ring rounded-xl p-2 text-center text-xs" key={href} href={href}>
            <Icon className="mx-auto size-5" aria-hidden="true" />
            {label}
          </Link>
        ))}
      </nav>
    </>
  );
}
