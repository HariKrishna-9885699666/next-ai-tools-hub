"use client";

import { createContext, useContext, ReactNode } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { useCompare } from "@/hooks/useCompare";
import { useRecentlyViewed } from "@/hooks/useRecentlyViewed";
import { useTheme } from "@/hooks/useTheme";

type Theme = "light" | "dark" | "system";

interface AppContextType {
  favorites: string[];
  toggleFavorite: (slug: string) => void;
  isFavorite: (slug: string) => boolean;
  clearFavorites: () => void;
  compareList: string[];
  toggleCompare: (slug: string) => void;
  isInCompare: (slug: string) => boolean;
  clearCompare: () => void;
  canAddMore: boolean;
  recentlyViewed: string[];
  addToRecentlyViewed: (slug: string) => void;
  theme: Theme;
  resolvedTheme: "light" | "dark";
  setTheme: (t: Theme) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function useAppContext() {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error("useAppContext must be used within Providers");
  return ctx;
}

export function Providers({ children }: { children: ReactNode }) {
  const {
    favorites,
    toggleFavorite,
    isFavorite,
    clearAll: clearFavorites,
  } = useFavorites();
  const { compareList, toggleCompare, isInCompare, clearCompare, canAddMore } =
    useCompare();
  const { recentlyViewed, addToRecentlyViewed } = useRecentlyViewed();
  const { theme, resolvedTheme, setTheme } = useTheme();

  return (
    <AppContext.Provider
      value={{
        favorites,
        toggleFavorite,
        isFavorite,
        clearFavorites,
        compareList,
        toggleCompare,
        isInCompare,
        clearCompare,
        canAddMore,
        recentlyViewed,
        addToRecentlyViewed,
        theme,
        resolvedTheme,
        setTheme,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}
