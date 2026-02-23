import { Suspense } from "react";
import type { Category, PricingModel, SortOption } from "@/lib/types";
import { getFilteredTools } from "@/lib/tools-data";
import { CategoryFilter } from "@/components/CategoryFilter";
import { ToolFilters } from "@/components/ToolFilters";
import { ToolGrid } from "@/components/ToolGrid";
import { Pagination } from "@/components/Pagination";

export const metadata = {
  title: "Browse Tools",
};

const VALID_CATEGORIES: Category[] = [
  "ai-tools",
  "developer-tools",
  "marketing-tools",
  "design-tools",
  "productivity",
  "writing",
  "automation",
  "no-code",
  "analytics",
  "open-source",
];

const VALID_PRICING: PricingModel[] = [
  "free",
  "freemium",
  "paid",
  "open-source",
];

const VALID_SORT: SortOption[] = ["trending", "newest", "popular", "name"];

function isValidCategory(s: string | undefined): s is Category {
  return !!s && VALID_CATEGORIES.includes(s as Category);
}

function isValidPricing(s: string | undefined): s is PricingModel {
  return !!s && VALID_PRICING.includes(s as PricingModel);
}

function isValidSort(s: string | undefined): s is SortOption {
  return !!s && VALID_SORT.includes(s as SortOption);
}

export default async function ToolsPage({
  searchParams,
}: {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
}) {
  const params = await searchParams;

  const categoryParam = typeof params.category === "string" ? params.category : undefined;
  const pricingParam = typeof params.pricing === "string" ? params.pricing : undefined;
  const sortParam = typeof params.sort === "string" ? params.sort : undefined;
  const pageParam = typeof params.page === "string" ? params.page : undefined;
  const queryParam = typeof params.query === "string" ? params.query : undefined;

  const category = isValidCategory(categoryParam) ? categoryParam : undefined;
  const pricing = isValidPricing(pricingParam) ? pricingParam : undefined;
  const sort = isValidSort(sortParam) ? sortParam : "trending";
  const page = Math.max(1, parseInt(pageParam ?? "1", 10) || 1);

  const result = getFilteredTools({
    query: queryParam,
    category,
    pricing,
    sort,
    page,
  });

  const paginationSearchParams: Record<string, string> = {};
  if (category) paginationSearchParams.category = category;
  if (pricing) paginationSearchParams.pricing = pricing;
  if (sort && sort !== "trending") paginationSearchParams.sort = sort;
  if (queryParam) paginationSearchParams.query = queryParam;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Browse AI & SaaS Tools
        </h1>
        <p className="mt-2 text-zinc-600 dark:text-zinc-400">
          Discover and filter tools by category, pricing, and more.
        </p>

        <div className="mt-8 space-y-6">
          <Suspense fallback={<div className="h-12 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />}>
            <CategoryFilter selectedCategory={category} basePath="/tools" />
          </Suspense>

          <Suspense fallback={<div className="h-20 animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />}>
            <ToolFilters selectedPricing={pricing} selectedSort={sort} />
          </Suspense>

          <div className="mt-10">
            <ToolGrid tools={result.items} showCompare={true} />
          </div>

          {result.totalPages > 1 && (
            <div className="mt-12 flex justify-center">
              <Pagination
                currentPage={result.page}
                totalPages={result.totalPages}
                basePath="/tools"
                searchParams={paginationSearchParams}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
