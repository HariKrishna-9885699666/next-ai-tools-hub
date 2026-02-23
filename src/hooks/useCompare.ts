"use client";

import { useState, useEffect, useCallback } from "react";
import { MAX_COMPARE } from "@/config/categories";

const COMPARE_KEY = "ai-tools-hub-compare";

export function useCompare() {
  const [compareList, setCompareList] = useState<string[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPARE_KEY);
      if (stored) {
        setCompareList(JSON.parse(stored));
      }
    } catch {
      // localStorage unavailable
    }
  }, []);

  const toggleCompare = useCallback((slug: string) => {
    setCompareList((prev) => {
      let updated: string[];
      if (prev.includes(slug)) {
        updated = prev.filter((s) => s !== slug);
      } else if (prev.length < MAX_COMPARE) {
        updated = [...prev, slug];
      } else {
        return prev;
      }
      try {
        localStorage.setItem(COMPARE_KEY, JSON.stringify(updated));
      } catch {
        // localStorage unavailable
      }
      return updated;
    });
  }, []);

  const isInCompare = useCallback(
    (slug: string) => compareList.includes(slug),
    [compareList]
  );

  const clearCompare = useCallback(() => {
    setCompareList([]);
    try {
      localStorage.setItem(COMPARE_KEY, JSON.stringify([]));
    } catch {
      // localStorage unavailable
    }
  }, []);

  const canAddMore = compareList.length < MAX_COMPARE;

  return {
    compareList,
    toggleCompare,
    isInCompare,
    clearCompare,
    canAddMore,
  };
}
