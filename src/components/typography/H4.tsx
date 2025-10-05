import type { ReactNode } from 'react';

export function H4({ children }: { children: ReactNode }) {
  return (
    <h4 className='scroll-m-20 text-lg leading-snug font-medium tracking-tight md:text-xl'>
      {children}
    </h4>
  );
}
