"use client";

import { useState, useEffect, useCallback } from "react";

const FAVORITES_KEY = "ai-tools-hub-favorites";

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        setFavorites(JSON.parse(stored));
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const toggleFavorite = useCallback((slug: string) => {
    setFavorites((prev) => {
      const updated = prev.includes(slug)
        ? prev.filter((f) => f !== slug)
        : [...prev, slug];
      try {
        localStorage.setItem(FAVORITES_KEY, JSON.stringify(updated));
      } catch {
        // localStorage unavailable
      }
      return updated;
    });
  }, []);

  const isFavorite = useCallback(
    (slug: string) => favorites.includes(slug),
    [favorites]
  );

  const clearAll = useCallback(() => {
    setFavorites([]);
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify([]));
    } catch {
      // localStorage unavailable
    }
  }, []);

  return { favorites, toggleFavorite, isFavorite, clearAll };
}
