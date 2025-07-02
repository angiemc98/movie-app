// src/layouts/PrivateLayout.tsx
import type { ReactNode } from 'react';
import { Header } from '../App';

export default function PrivateLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <Header />
      <main className="p-4">{children}</main>
    </>
  );
}
