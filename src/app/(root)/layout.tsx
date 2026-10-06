import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import '@fontsource-variable/fraunces';
import '@fontsource-variable/inter';
import '@/app/globals.css';

export const metadata: Metadata = {
  title: 'Andrew the Builder',
  icons: { icon: '/favicon.svg' },
};

// Separate root layout for "/", which only forwards visitors to /id/ or /en/.
export default function RedirectRootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
