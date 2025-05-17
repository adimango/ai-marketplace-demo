'use client';

import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

// Define the interface for our context
interface FavoritesContextType {
  favorites: number[];
  isFavorite: (id: number) => boolean;
  toggleFavorite: (id: number) => void;
}

// Create the context with default values
const FavoritesContext = createContext<FavoritesContextType>({
  favorites: [],
  isFavorite: () => false,
  toggleFavorite: () => {},
});

// Custom hook to use favorites context
export function useFavorites() {
  return useContext(FavoritesContext);
}

// Provider component to wrap around components that need access to favorites
export function SimpleFavoritesProvider({ children }: { children: ReactNode }) {
  // State to store favorites - with safer initialization for SSR/CSR
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isClient, setIsClient] = useState(false);
  
  // Mark when component is mounted on client
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Load favorites from localStorage only on client-side after mount
  useEffect(() => {
    if (isClient) {
      try {
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
          setFavorites(JSON.parse(storedFavorites));
        }
      } catch (error) {
        console.error('Error loading favorites from localStorage:', error);
      }
    }
  }, [isClient]);

  // Save favorites to localStorage when changed - only on client side
  useEffect(() => {
    if (isClient) {
      try {
        localStorage.setItem('favorites', JSON.stringify(favorites));
      } catch (error) {
        console.error('Error saving favorites to localStorage:', error);
      }
    }
  }, [favorites, isClient]);

  // Check if a product is in favorites
  const isFavorite = (id: number) => favorites.includes(id);

  // Toggle a product in favorites
  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id)
        ? prev.filter(itemId => itemId !== id)
        : [...prev, id]
    );
  };

  // Value object to be provided to consumers
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
