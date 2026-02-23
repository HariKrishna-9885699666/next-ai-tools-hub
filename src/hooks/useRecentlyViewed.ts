"use client";

import { useState, useEffect, useCallback } from "react";

const RECENTLY_VIEWED_KEY = "ai-tools-hub-recently-viewed";
const MAX_RECENT = 10;

export function useRecentlyViewed() {
  const [recentlyViewed, setRecentlyViewed] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(RECENTLY_VIEWED_KEY);
      if (stored) {
        setRecentlyViewed(JSON.parse(stored));
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const addToRecentlyViewed = useCallback((slug: string) => {
    setRecentlyViewed((prev) => {
      const updated = [slug, ...prev.filter((s) => s !== slug)].slice(
        0,
        MAX_RECENT
      );
      try {
        localStorage.setItem(RECENTLY_VIEWED_KEY, JSON.stringify(updated));
      } catch {
        // localStorage unavailable
      }
      return updated;
    });
  }, []);

  return { recentlyViewed, addToRecentlyViewed };
}
