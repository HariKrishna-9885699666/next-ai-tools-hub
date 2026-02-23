"use client";

import { useEffect } from "react";
import { useAppContext } from "@/components/Providers";
import { cn } from "@/utils/cn";

interface ToolDetailActionsProps {
  slug: string;
  websiteUrl: string;
}

function HeartIcon({ filled }: { filled?: boolean }) {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={2}
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
      />
    </svg>
  );
}

function ScaleIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m16 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="m2 16 3-8 3 8c-.87.65-1.92 1-3 1s-2.13-.35-3-1Z" />
      <path d="M7 21h10" />
      <path d="M12 3v18" />
      <path d="M3 7h2c2 0 5-1 7-2 2 1 5 2 7 2h2" />
    </svg>
  );
}

function ExternalLinkIcon() {
  return (
    <svg
      className="h-5 w-5"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" x2="21" y1="14" y2="3" />
    </svg>
  );
}

export function ToolDetailActions({ slug, websiteUrl }: ToolDetailActionsProps) {
  const {
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isInCompare,
    canAddMore,
    addToRecentlyViewed,
  } = useAppContext();

  useEffect(() => {
    addToRecentlyViewed(slug);
  }, [slug, addToRecentlyViewed]);

  const compareDisabled = !canAddMore && !isInCompare(slug);

  const buttonBase =
    "inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium transition-all duration-200";

  return (
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={() => toggleFavorite(slug)}
        className={cn(
          buttonBase,
          "border",
          isFavorite(slug)
            ? "border-rose-500 bg-rose-500 text-white hover:bg-rose-600 dark:border-rose-400 dark:bg-rose-500 dark:text-white dark:hover:bg-rose-600"
            : "border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
        )}
        aria-label={isFavorite(slug) ? "Remove from favorites" : "Add to favorites"}
      >
        <HeartIcon filled={isFavorite(slug)} />
        {isFavorite(slug) ? "Favorited" : "Add to Favorites"}
      </button>

      <button
        type="button"
        onClick={() => !compareDisabled && toggleCompare(slug)}
        disabled={compareDisabled}
        className={cn(
          buttonBase,
          "border border-zinc-200 bg-white text-zinc-700 hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700",
          compareDisabled && "cursor-not-allowed opacity-50"
        )}
        aria-label={isInCompare(slug) ? "Remove from compare" : "Add to compare"}
      >
        <ScaleIcon />
        {isInCompare(slug) ? "In Compare" : "Add to Compare"}
      </button>

      <a
        href={websiteUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          buttonBase,
          "border border-violet-500 bg-violet-500 text-white hover:bg-violet-600 dark:border-violet-400 dark:bg-violet-500 dark:hover:bg-violet-600"
        )}
        aria-label="Visit website"
      >
        <ExternalLinkIcon />
        Visit Website
      </a>
    </div>
  );
}
