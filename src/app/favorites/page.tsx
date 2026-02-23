"use client";

import { useCallback, useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/components/Providers";
import toolsData from "@/data/tools.json";
import { calculatePopularityScore } from "@/lib/scoring";
import type { Tool } from "@/lib/types";
import { ToolGrid } from "@/components/ToolGrid";

export default function FavoritesPage() {
  const { favorites, clearFavorites, recentlyViewed } = useAppContext();
  const [showConfirm, setShowConfirm] = useState(false);

  const favoriteTools = (toolsData as Tool[])
    .filter((t) => favorites.includes(t.slug))
    .map((t) => ({
      ...t,
      popularityScore: calculatePopularityScore(t),
    }));

  const recentlyViewedTools = (toolsData as Tool[])
    .filter((t) => recentlyViewed.includes(t.slug))
    .map((t) => ({
      ...t,
      popularityScore: calculatePopularityScore(t),
    }))
    .slice(0, 6);

  const handleClearFavorites = useCallback(() => {
    if (showConfirm) {
      clearFavorites();
      setShowConfirm(false);
    } else {
      setShowConfirm(true);
    }
  }, [showConfirm, clearFavorites]);

  const cancelConfirm = useCallback(() => setShowConfirm(false), []);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Your Favorites
          </h1>
          {favoriteTools.length > 0 && (
            <div className="flex items-center gap-2">
              {showConfirm ? (
                <>
                  <span className="text-sm text-zinc-600 dark:text-zinc-400">
                    Clear all?
                  </span>
                  <button
                    type="button"
                    onClick={handleClearFavorites}
                    className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600"
                  >
                    Yes, clear
                  </button>
                  <button
                    type="button"
                    onClick={cancelConfirm}
                    className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={handleClearFavorites}
                  className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
                >
                  Clear all
                </button>
              )}
            </div>
          )}
        </div>

        {favoriteTools.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 py-20 px-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              No favorites yet
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Save tools you like by clicking the heart icon on any tool card.
            </p>
            <Link
              href="/tools"
              className="mt-6 inline-flex items-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              Browse Tools
            </Link>
          </div>
        ) : (
          <ToolGrid tools={favoriteTools} showCompare={true} />
        )}

        {recentlyViewedTools.length > 0 && (
          <section className="mt-16">
            <h2 className="mb-6 text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Recently Viewed
            </h2>
            <ToolGrid tools={recentlyViewedTools} showCompare={true} />
          </section>
        )}
      </div>
    </div>
  );
}
