'use client';

import { useEffect, useState, type ReactNode } from 'react';

/**
 * The address never appears as plain text in the static HTML. The server passes it
 * base64-encoded plus a human-readable "name [at] domain" fallback for no-JS visitors.
 */
export default function ObfuscatedEmail({
  encoded,
  fallback,
  subject,
  className,
  children,
}: {
  encoded: string;
  fallback: string;
  subject?: string;
  className?: string;
  children?: ReactNode;
}) {
  const [address, setAddress] = useState<string | null>(null);

  useEffect(() => {
    try {
      setAddress(atob(encoded));
    } catch {
      setAddress(null);
    }
  }, [encoded]);

  if (!address) return <span className={className}>{fallback}</span>;

  const href = `mailto:${address}${subject ? `?subject=${encodeURIComponent(subject)}` : ''}`;
  return (
    <a className={className} href={href}>
      {children ?? address}
    </a>
  );
}
