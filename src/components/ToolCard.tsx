"use client";

import Link from "next/link";
import { Tool, PricingModel } from "@/lib/types";
import { CATEGORY_MAP } from "@/config/categories";
import { useAppContext } from "@/components/Providers";
import { cn } from "@/utils/cn";

const PRICING_STYLES: Record<
  PricingModel,
  { label: string; className: string }
> = {
  free: {
    label: "Free",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
  freemium: {
    label: "Freemium",
    className:
      "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  },
  paid: {
    label: "Paid",
    className:
      "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  },
  "open-source": {
    label: "Open Source",
    className:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  },
};

function StarIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FlameIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path
        fillRule="evenodd"
        d="M12.963 2.286a.75.75 0 0 0-1.071-.136 9.742 9.742 0 0 0-3.539 6.177 7.547 7.547 0 0 1-1.705-1.715.75.75 0 0 0-1.152-.082A9 9 0 1 0 15.68 4.534a7.46 7.46 0 0 1-2.717-2.248ZM15.75 14a3.75 3.75 0 1 1-7.313-1.172c.628.465 1.35.81 2.133 1a5.99 5.99 0 0 1 1.925-3.545 3.75 3.75 0 0 1 3.255 3.717Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function HeartIcon({
  className,
  filled,
}: {
  className?: string;
  filled?: boolean;
}) {
  return (
    <svg
      className={className}
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

interface ToolCardProps {
  tool: Tool;
  showCompare?: boolean;
}

export function ToolCard({ tool, showCompare = true }: ToolCardProps) {
  const {
    toggleFavorite,
    isFavorite,
    toggleCompare,
    isInCompare,
    canAddMore,
  } = useAppContext();

  const categoryInfo = CATEGORY_MAP.get(tool.category);
  const pricingStyle = PRICING_STYLES[tool.pricing];
  const displayTags = tool.tags.slice(0, 3);
  const popularityScore = tool.popularityScore ?? 0;
  const isTrending = popularityScore > 70;
  const compareDisabled = showCompare && !canAddMore && !isInCompare(tool.slug);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(tool.slug);
  };

  const handleCompareChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.stopPropagation();
    if (!compareDisabled) {
      toggleCompare(tool.slug);
    }
  };

  return (
    <Link
      href={`/tools/${tool.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-5 shadow-sm transition-all duration-300",
        "hover:border-zinc-300 hover:shadow-lg hover:shadow-zinc-200/50 hover:-translate-y-0.5",
        "dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-zinc-700 dark:hover:shadow-zinc-950/50"
      )}
      aria-label={`View ${tool.name} tool details`}
    >
      {/* Header: logo, badges, actions */}
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex min-w-0 flex-1 items-center gap-3">
          <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-lg"
            style={{
              backgroundColor: categoryInfo
                ? `${categoryInfo.color}20`
                : undefined,
            }}
          >
            {categoryInfo?.icon ?? "🔧"}
          </div>
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-zinc-900 dark:text-zinc-50">
              {tool.name}
            </h3>
            <div className="mt-1 flex flex-wrap items-center gap-1.5">
              {categoryInfo && (
                <span
                  className="inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium"
                  style={{
                    backgroundColor: `${categoryInfo.color}25`,
                    color: categoryInfo.color,
                  }}
                >
                  {categoryInfo.name}
                </span>
              )}
              {!(tool.category === "open-source" && tool.pricing === "open-source") && (
                <span
                  className={cn(
                    "rounded-md px-2 py-0.5 text-xs font-medium",
                    pricingStyle.className
                  )}
                >
                  {pricingStyle.label}
                </span>
              )}
              {isTrending && (
                <span
                  className="inline-flex items-center gap-0.5 rounded-md bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-900/40 dark:text-amber-300"
                  aria-label="Trending"
                >
                  <FlameIcon className="h-3.5 w-3.5" />
                  Trending
                </span>
              )}
            </div>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button
            type="button"
            onClick={handleFavoriteClick}
            className={cn(
              "rounded-lg p-2 transition-colors",
              "hover:bg-zinc-100 dark:hover:bg-zinc-800",
              "focus:outline-none focus:ring-2 focus:ring-zinc-400 focus:ring-offset-2 dark:focus:ring-zinc-500 dark:focus:ring-offset-zinc-900"
            )}
            aria-label={isFavorite(tool.slug) ? "Remove from favorites" : "Add to favorites"}
          >
            <HeartIcon
              className={cn(
                "h-5 w-5",
                isFavorite(tool.slug)
                  ? "text-rose-500"
                  : "text-zinc-400 dark:text-zinc-500"
              )}
              filled={isFavorite(tool.slug)}
            />
          </button>
          {showCompare && (
            <label
              onClick={(e) => e.stopPropagation()}
              className={cn(
                "flex cursor-pointer items-center rounded-lg p-2 transition-colors",
                "hover:bg-zinc-100 dark:hover:bg-zinc-800",
                compareDisabled && "cursor-not-allowed opacity-50"
              )}
            >
              <input
                type="checkbox"
                checked={isInCompare(tool.slug)}
                onChange={handleCompareChange}
                disabled={compareDisabled}
                onClick={(e) => e.stopPropagation()}
                className="h-4 w-4 rounded border-zinc-300 text-zinc-600 focus:ring-zinc-500 dark:border-zinc-600 dark:bg-zinc-800"
                aria-label={
                  isInCompare(tool.slug)
                    ? "Remove from compare"
                    : "Add to compare"
                }
              />
            </label>
          )}
        </div>
      </div>

      {/* Description */}
      <p
        className="mb-4 line-clamp-2 text-sm text-zinc-600 dark:text-zinc-400"
        title={tool.description}
      >
        {tool.description}
      </p>

      {/* Tags */}
      {displayTags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-1.5">
          {displayTags.map((tag) => (
            <span
              key={tag}
              className="rounded-full bg-zinc-100 px-2.5 py-0.5 text-xs text-zinc-600 dark:bg-zinc-800 dark:text-zinc-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: GitHub stars + popularity bar */}
      <div className="mt-auto flex flex-col gap-2 pt-2 border-t border-zinc-100 dark:border-zinc-800">
        <div className="flex items-center justify-between gap-2">
          {tool.githubStars != null && tool.githubStars > 0 && (
            <span
              className="inline-flex items-center gap-1 text-xs text-zinc-500 dark:text-zinc-400"
              aria-label={`${tool.githubStars} GitHub stars`}
            >
              <StarIcon className="h-4 w-4 text-amber-500" />
              {tool.githubStars >= 1000
                ? `${(tool.githubStars / 1000).toFixed(1)}k`
                : tool.githubStars}
            </span>
          )}
          {tool.popularityScore != null && (
            <span className="text-xs text-zinc-500 dark:text-zinc-400">
              Popularity: {tool.popularityScore}%
            </span>
          )}
        </div>
        {tool.popularityScore != null && (
          <div
            className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-200 dark:bg-zinc-700"
            role="progressbar"
            aria-valuenow={tool.popularityScore}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Popularity score"
          >
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 to-fuchsia-500 transition-all duration-500"
              style={{ width: `${tool.popularityScore}%` }}
            />
          </div>
        )}
      </div>
    </Link>
  );
}
