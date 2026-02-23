import { Suspense } from "react";
import { getFilteredTools } from "@/lib/tools-data";
import { ToolGrid } from "@/components/ToolGrid";
import { SearchBar } from "@/components/SearchBar";
import { sanitizeSearchInput, escapeHtml } from "@/utils/sanitize";

export const metadata = {
  title: "Search",
};

interface PageProps {
  searchParams: Promise<{ q?: string }>;
}

export default async function SearchPage({ searchParams }: PageProps) {
  const sp = await searchParams;
  const q = sp.q ?? "";
  const sanitizedForDisplay = sanitizeSearchInput(q);
  const result = getFilteredTools({ query: q });

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
          Search Results
        </h1>

        <div className="mt-6 flex justify-center">
          <Suspense
            fallback={
              <div className="h-10 w-full max-w-2xl animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800" />
            }
          >
            <SearchBar defaultValue={sanitizedForDisplay} large />
          </Suspense>
        </div>

        <p className="mt-4 text-zinc-600 dark:text-zinc-400">
          {result.total} result{result.total !== 1 ? "s" : ""}
          {sanitizedForDisplay && (
            <>
              {" "}
              for{" "}
              <span
                className="font-medium text-zinc-900 dark:text-zinc-100"
                dangerouslySetInnerHTML={{
                  __html: escapeHtml(sanitizedForDisplay),
                }}
              />
            </>
          )}
        </p>

        <div className="mt-10">
          <ToolGrid tools={result.items} showCompare={true} />
        </div>
      </div>
    </div>
  );
}
