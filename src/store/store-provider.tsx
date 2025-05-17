'use client';

import { ReactNode } from 'react';
import { useFavoritesStore } from './favorites';

// This is a workaround component to fix the "Cannot read properties of null (reading 'useState')" error
// that can happen when using Zustand with React Server Components

export default function StoreInitializer({ children }: { children: ReactNode }) {
  // Initialize the store here
  // This ensures the store is properly initialized in a client component
  // before being used elsewhere
  useFavoritesStore.getState();
  
  return <>{children}</>;
}
