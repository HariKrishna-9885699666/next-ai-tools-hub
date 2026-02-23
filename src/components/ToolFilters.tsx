"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "@/utils/cn";
import type { PricingModel, SortOption } from "@/lib/types";

const PRICING_OPTIONS: { value: PricingModel | ""; label: string }[] = [
  { value: "", label: "All" },
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
  { value: "open-source", label: "Open Source" },
];

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "trending", label: "Trending" },
  { value: "newest", label: "Newest" },
  { value: "popular", label: "Popular" },
  { value: "name", label: "A-Z" },
];

interface ToolFiltersProps {
  selectedPricing?: string;
  selectedSort?: string;
}

export function ToolFilters({
  selectedPricing,
  selectedSort = "trending",
}: ToolFiltersProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const updateParam = (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    params.delete("page");
    const query = params.toString();
    router.push(query ? `/tools?${query}` : "/tools");
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Pricing pills */}
      <div className="flex flex-wrap gap-2">
        <span className="sr-only">Filter by pricing</span>
        {PRICING_OPTIONS.map(({ value, label }) => {
          const isActive = value === "" ? !selectedPricing : selectedPricing === value;
          return (
            <button
              key={value || "all"}
              type="button"
              onClick={() => updateParam("pricing", value || null)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                "border",
                isActive
                  ? "border-violet-500 bg-violet-500 text-white dark:border-violet-400 dark:bg-violet-500 dark:text-white"
                  : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>

      {/* Sort pills */}
      <div className="flex flex-wrap gap-2">
        <span className="sr-only">Sort by</span>
        {SORT_OPTIONS.map(({ value, label }) => {
          const isActive = selectedSort === value;
          return (
            <button
              key={value}
              type="button"
              onClick={() => updateParam("sort", value)}
              className={cn(
                "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                "border",
                isActive
                  ? "border-fuchsia-500 bg-fuchsia-500 text-white dark:border-fuchsia-400 dark:bg-fuchsia-500 dark:text-white"
                  : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
              )}
            >
              {label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
