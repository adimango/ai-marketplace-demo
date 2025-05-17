'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { createStore, useStore } from 'zustand';
import { useRef } from 'react';

// Define the store types
interface FavoritesState {
  favorites: number[];
  addFavorite: (productId: number) => void;
  removeFavorite: (productId: number) => void;
  toggleFavorite: (productId: number) => void;
  isFavorite: (productId: number) => boolean;
}

// Using a factory pattern to avoid SSR issues
const createFavoritesStore = () => 
  createStore<FavoritesState>((set, get) => ({
    favorites: [],
    
    addFavorite: (productId: number) => 
      set((state) => ({
        favorites: [...state.favorites, productId]
      })),
    
    removeFavorite: (productId: number) =>
      set((state) => ({
        favorites: state.favorites.filter(id => id !== productId)
      })),
    
    toggleFavorite: (productId: number) => {
      const { favorites, addFavorite, removeFavorite } = get();
      if (favorites.includes(productId)) {
        removeFavorite(productId);
      } else {
        addFavorite(productId);
      }
    },
    
    isFavorite: (productId: number) => {
      return get().favorites.includes(productId);
    }
  }));

// For non-react contexts or initialization
let store: ReturnType<typeof createFavoritesStore> | null = null;

// Get the store to use
export const getStore = () => {
  if (typeof window === 'undefined') return createFavoritesStore();
  if (!store) store = createFavoritesStore();
  return store;
};

// Client-side only Zustand store with persistence
export const useFavoritesStore = create<FavoritesState>()(
  persist(
    (set, get) => ({
      favorites: [],
      
      addFavorite: (productId: number) => 
        set((state) => ({
          favorites: [...state.favorites, productId]
        })),
      
      removeFavorite: (productId: number) =>
        set((state) => ({
          favorites: state.favorites.filter(id => id !== productId)
        })),
      
      toggleFavorite: (productId: number) => {
        const { favorites, addFavorite, removeFavorite } = get();
        if (favorites.includes(productId)) {
          removeFavorite(productId);
        } else {
          addFavorite(productId);
        }
      },
      
      isFavorite: (productId: number) => {
        return get().favorites.includes(productId);
      }
    }),
    {
      name: 'favorites-storage',
    }
  )
);
