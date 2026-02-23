"use client";

import Link from "next/link";
import { cn } from "@/utils/cn";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  basePath: string;
  searchParams?: Record<string, string>;
}

function buildUrl(
  basePath: string,
  page: number,
  searchParams?: Record<string, string>
): string {
  const params = new URLSearchParams(searchParams);
  if (page === 1) {
    params.delete("page");
  } else {
    params.set("page", String(page));
  }
  const query = params.toString();
  return query ? `${basePath}?${query}` : basePath;
}

export function Pagination({
  currentPage,
  totalPages,
  basePath,
  searchParams = {},
}: PaginationProps) {
  const prevUrl = buildUrl(basePath, currentPage - 1, searchParams);
  const nextUrl = buildUrl(basePath, currentPage + 1, searchParams);

  const pageNumbers = getPageNumbers(currentPage, totalPages);

  const linkClass = (active?: boolean) =>
    cn(
      "flex min-w-[2.25rem] items-center justify-center rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      active
        ? "bg-violet-500 text-white dark:bg-violet-600"
        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    );

  const buttonClass = (disabled?: boolean) =>
    cn(
      "flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
      disabled
        ? "cursor-not-allowed text-zinc-400 dark:text-zinc-500"
        : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
    );

  if (totalPages <= 1) return null;

  return (
    <nav
      role="navigation"
      aria-label="Pagination"
      className="flex items-center justify-center gap-1"
    >
      <Link
        href={prevUrl}
        aria-label="Previous page"
        className={cn(
          buttonClass(currentPage <= 1),
          currentPage <= 1 && "pointer-events-none"
        )}
        {...(currentPage <= 1 && { "aria-disabled": true })}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m15 18-6-6 6-6" />
        </svg>
        Previous
      </Link>

      <div className="flex items-center gap-1">
        {pageNumbers.map((page, i) =>
          page === "ellipsis" ? (
            <span
              key={`ellipsis-${i}`}
              className="flex min-w-[2.25rem] items-center justify-center px-2 py-2 text-zinc-500"
            >
              …
            </span>
          ) : (
            <Link
              key={page}
              href={buildUrl(basePath, page, searchParams)}
              aria-label={`Page ${page}`}
              aria-current={page === currentPage ? "page" : undefined}
              className={linkClass(page === currentPage)}
            >
              {page}
            </Link>
          )
        )}
      </div>

      <Link
        href={nextUrl}
        aria-label="Next page"
        className={cn(
          buttonClass(currentPage >= totalPages),
          currentPage >= totalPages && "pointer-events-none"
        )}
        {...(currentPage >= totalPages && { "aria-disabled": true })}
      >
        Next
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="h-4 w-4"
        >
          <path d="m9 18 6-6-6-6" />
        </svg>
      </Link>
    </nav>
  );
}

function getPageNumbers(
  current: number,
  total: number
): (number | "ellipsis")[] {
  if (total <= 7) {
    return Array.from({ length: total }, (_, i) => i + 1);
  }

  const pages: (number | "ellipsis")[] = [];

  if (current <= 3) {
    pages.push(1, 2, 3, 4, "ellipsis", total);
  } else if (current >= total - 2) {
    pages.push(1, "ellipsis", total - 3, total - 2, total - 1, total);
  } else {
    pages.push(1, "ellipsis", current - 1, current, current + 1, "ellipsis", total);
  }

  return pages;
}
