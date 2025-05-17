'use client';

import { ReactNode } from 'react';
import { SimpleFavoritesProvider } from "@/components/SimpleFavoritesProvider";

// Remove duplicate SessionProvider since it's already in the layout
export default function ClientProviders({ children }: { children: ReactNode }) {
  return (
    <SimpleFavoritesProvider>
      {children}
    </SimpleFavoritesProvider>
  );
}
