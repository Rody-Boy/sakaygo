import * as React from 'react';import { cn } from '@/lib/utils';
export function Button({className,...props}:React.ButtonHTMLAttributes<HTMLButtonElement>){return <button className={cn('focus-ring inline-flex items-center justify-center rounded-xl bg-green-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-green-700 disabled:opacity-50',className)} {...props}/>}
