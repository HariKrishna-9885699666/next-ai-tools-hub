"use client";

import Link from "next/link";
import { useAppContext } from "@/components/Providers";
import { cn } from "@/utils/cn";

export function CompareDrawer() {
  const { compareList, toggleCompare, clearCompare } = useAppContext();

  if (compareList.length === 0) return null;

  return (
    <div
      className={cn(
        "fixed bottom-0 left-0 right-0 z-50 animate-[slide-up_0.3s_ease-out]",
        "border-t border-zinc-200 bg-white/95 shadow-lg backdrop-blur-md",
        "dark:border-zinc-800 dark:bg-zinc-950/95"
      )}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex min-w-0 flex-1 items-center gap-2">
          <span className="shrink-0 text-sm font-medium text-zinc-600 dark:text-zinc-400">
            Comparing:
          </span>
          <div className="flex flex-wrap gap-2">
            {compareList.slice(0, 3).map((slug) => (
              <span
                key={slug}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm",
                  "bg-zinc-100 text-zinc-800 dark:bg-zinc-800 dark:text-zinc-200"
                )}
              >
                <span className="truncate max-w-[120px] sm:max-w-[180px]">
                  {slug}
                </span>
                <button
                  type="button"
                  onClick={() => toggleCompare(slug)}
                  aria-label={`Remove ${slug} from compare`}
                  className={cn(
                    "shrink-0 rounded-full p-0.5 transition-colors",
                    "text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700",
                    "dark:text-zinc-400 dark:hover:bg-zinc-700 dark:hover:text-zinc-200"
                  )}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5"
                  >
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={clearCompare}
            className={cn(
              "rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
              "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
              "dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            )}
          >
            Clear All
          </button>
          <Link
            href="/tools/compare"
            className={cn(
              "rounded-lg px-4 py-1.5 text-sm font-semibold transition-colors",
              "bg-violet-500 text-white hover:bg-violet-600",
              "dark:bg-violet-600 dark:hover:bg-violet-500"
            )}
          >
            Compare Now
          </Link>
        </div>
      </div>
    </div>
  );
}
