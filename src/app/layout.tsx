import type { Metadata } from 'next';import type { ReactNode } from 'react';import './globals.css';import { Shell } from '@/components/Shell';
export const metadata:Metadata={title:'SakayGo',description:'Smarter Tricycle Booking & Courier Services'};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body><Shell>{children}</Shell></body></html>}
