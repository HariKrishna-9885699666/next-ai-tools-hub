"use client";

import Link from "next/link";
import { useAppContext } from "@/components/Providers";
import toolsData from "@/data/tools.json";
import { calculatePopularityScore } from "@/lib/scoring";
import type { Tool, PricingModel } from "@/lib/types";
import { CATEGORY_MAP } from "@/config/categories";
import { cn } from "@/utils/cn";

const PRICING_LABELS: Record<PricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "open-source": "Open Source",
};

function ExternalLinkIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

export default function ComparePage() {
  const { compareList, clearCompare } = useAppContext();
  const allTools: Tool[] = (toolsData as Tool[]).map((t) => {
    const scored: Tool = { ...t, popularityScore: calculatePopularityScore(t) };
    return scored;
  });
  const toolMap = new Map(allTools.map((t) => [t.slug, t]));
  const tools: Tool[] = [];
  for (const slug of compareList) {
    const t = toolMap.get(slug);
    if (t) tools.push(t);
  }

  if (tools.length === 0) {
    return (
      <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
        <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 py-20 px-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
            <h2 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              No tools to compare
            </h2>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">
              Add up to 3 tools from the tools list to compare them side by side.
            </p>
            <Link
              href="/tools"
              className="mt-6 inline-flex items-center rounded-lg bg-violet-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-violet-700 dark:bg-violet-500 dark:hover:bg-violet-600"
            >
              Browse Tools
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
            Compare Tools
          </h1>
          <button
            type="button"
            onClick={clearCompare}
            className="rounded-lg border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-800"
          >
            Clear compare
          </button>
        </div>

        <div className="overflow-x-auto rounded-2xl border border-zinc-200 bg-white dark:border-zinc-700 dark:bg-zinc-900/50">
          <div className="grid min-w-[600px] grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-3">
            {tools.map((tool) => (
              <div
                key={tool.slug}
                className="flex flex-col border-b border-zinc-200 last:border-b-0 dark:border-zinc-700 sm:border-b-0 sm:border-r sm:last:border-r-0"
              >
                <div className="border-b border-zinc-200 bg-zinc-50/50 p-4 dark:border-zinc-700 dark:bg-zinc-800/30">
                  <Link
                    href={`/tools/${tool.slug}`}
                    className="text-lg font-semibold text-violet-600 hover:underline dark:text-violet-400"
                  >
                    {tool.name}
                  </Link>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <CompareRow
                    label="Category"
                    value={
                      CATEGORY_MAP.get(tool.category)?.name ?? tool.category
                    }
                  />
                  <CompareRow
                    label="Pricing"
                    value={PRICING_LABELS[tool.pricing]}
                  />
                  <CompareRow
                    label="Tags"
                    value={tool.tags.join(", ") || "—"}
                  />
                  <CompareRow
                    label="GitHub Stars"
                    value={
                      tool.githubStars != null
                        ? tool.githubStars.toLocaleString()
                        : "—"
                    }
                  />
                  <CompareRow
                    label="Popularity Score"
                    value={String(tool.popularityScore ?? "—")}
                  />
                  <CompareRow
                    label="Website"
                    value={
                      <a
                        href={tool.websiteUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-violet-600 hover:underline dark:text-violet-400"
                      >
                        Visit <ExternalLinkIcon className="h-3.5 w-3.5" />
                      </a>
                    }
                  />
                  <CompareRow
                    label="Description"
                    value={tool.description}
                    className="text-sm"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CompareRow({
  label,
  value,
  className,
}: {
  label: string;
  value: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "border-b border-zinc-100 py-3 last:border-b-0 dark:border-zinc-800",
        className
      )}
    >
      <div className="text-xs font-medium uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
        {label}
      </div>
      <div className="mt-1 text-zinc-900 dark:text-zinc-100">{value}</div>
    </div>
  );
}
