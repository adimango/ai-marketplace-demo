"use client";

import { ReactNode, createContext, useContext, useRef, useState, useEffect } from "react";
import { useFavoritesStore } from "@/store/favorites";

// Create a context for favorites
const FavoritesContext = createContext<{
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

// Provider component that will wrap any components that need favorites access
export function FavoritesProvider({ children }: { children: ReactNode }) {
  // We need to safely initialize on the client side
  const [isClient, setIsClient] = useState(false);

  // Immediately update on client side hydration
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Only try to use Zustand on the client
  const { favorites, toggleFavorite, isFavorite } = isClient 
    ? {
        favorites: useFavoritesStore((state) => state.favorites),
        toggleFavorite: useFavoritesStore((state) => state.toggleFavorite),
        isFavorite: useFavoritesStore((state) => state.isFavorite)
      }
    : {
        favorites: [],
        toggleFavorite: () => {},
        isFavorite: () => false
      };
  
  // Create a value object to provide through context
  const value = {
    favorites,
    isFavorite,
    toggleFavorite,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

// Hook to use favorites in components
export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
}
