import { ReactNode } from 'react';

export function H2({ children }: { children: ReactNode }) {
  return (
    <h2 className='scroll-m-20 text-3xl font-semibold tracking-tight'>
      {children}
    </h2>
  );
}
