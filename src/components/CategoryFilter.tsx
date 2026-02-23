"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { Category } from "@/lib/types";
import { CATEGORIES } from "@/config/categories";
import { cn } from "@/utils/cn";

interface CategoryFilterProps {
  selectedCategory?: Category;
  basePath?: string;
}

export function CategoryFilter({
  selectedCategory,
  basePath = "/tools",
}: CategoryFilterProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const buildUrl = (categorySlug: string | null) => {
    const params = new URLSearchParams(searchParams.toString());
    if (categorySlug) {
      params.set("category", categorySlug);
    } else {
      params.delete("category");
    }
    const query = params.toString();
    return query ? `${basePath}?${query}` : basePath;
  };

  const handleClick = (categorySlug: string | null) => {
    router.push(buildUrl(categorySlug));
  };

  return (
    <div className="w-full overflow-x-auto">
      <div className="flex min-w-max gap-2 pb-2">
        <button
          type="button"
          onClick={() => handleClick(null)}
          className={cn(
            "shrink-0 rounded-full px-4 py-2 text-sm font-medium transition-colors",
            "border",
            !selectedCategory
              ? "border-violet-500 bg-violet-500 text-white dark:border-violet-400 dark:bg-violet-500 dark:text-white"
              : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
          )}
        >
          All
        </button>
        {CATEGORIES.map((cat) => {
          const isActive = selectedCategory === cat.slug;
          return (
            <button
              key={cat.slug}
              type="button"
              onClick={() => handleClick(cat.slug)}
              className={cn(
                "flex shrink-0 items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors",
                "border",
                isActive
                  ? "border-violet-500 bg-violet-500 text-white dark:border-violet-400 dark:bg-violet-500 dark:text-white"
                  : "border-zinc-200 bg-zinc-100 text-zinc-700 hover:border-zinc-300 hover:bg-zinc-200 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-zinc-600 dark:hover:bg-zinc-700"
              )}
            >
              <span aria-hidden>{cat.icon}</span>
              {cat.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}
