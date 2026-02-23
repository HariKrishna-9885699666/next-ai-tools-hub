"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { useRouter } from "next/navigation";
import { sanitizeSearchInput } from "@/utils/sanitize";
import { cn } from "@/utils/cn";

interface SearchBarProps {
  defaultValue?: string;
  compact?: boolean;
  large?: boolean;
}

export function SearchBar({
  defaultValue = "",
  compact = false,
  large = false,
}: SearchBarProps) {
  const [query, setQuery] = useState(defaultValue);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const performSearch = useCallback(() => {
    const sanitized = sanitizeSearchInput(query);
    if (sanitized) {
      router.push(`/search?q=${encodeURIComponent(sanitized)}`);
    } else {
      router.push("/search");
    }
  }, [query, router]);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (query.trim()) {
        performSearch();
      }
    }, 300);
    return () => clearTimeout(timer);
  }, [query, performSearch]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch();
  };

  const handleClear = () => {
    setQuery("");
    router.push("/tools");
    inputRef.current?.focus();
  };

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        "relative w-full",
        compact && "max-w-[200px]",
        !compact && !large && "max-w-xs",
        large && "max-w-2xl"
      )}
    >
      <input
        ref={inputRef}
        type="search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search AI tools..."
        aria-label="Search AI tools"
        className={cn(
          "w-full rounded-lg border px-4 pl-10 text-sm transition-colors",
          compact ? "py-1.5" : "py-2",
          "border-zinc-200 bg-zinc-50 text-zinc-900 placeholder-zinc-500",
          "focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-400/25",
          "dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-100 dark:placeholder-zinc-400",
          "dark:focus:border-violet-500 dark:focus:ring-violet-500/25",
          query && "pr-10"
        )}
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400 dark:text-zinc-500"
        aria-hidden
      >
        <circle cx="11" cy="11" r="8" />
        <path d="m21 21-4.35-4.35" />
      </svg>
      {query && (
        <button
          type="button"
          onClick={handleClear}
          aria-label="Clear search"
          className={cn(
            "absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 transition-colors",
            "text-zinc-400 hover:bg-zinc-200 hover:text-zinc-600",
            "dark:text-zinc-500 dark:hover:bg-zinc-700 dark:hover:text-zinc-300"
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
            className="h-4 w-4"
          >
            <path d="M18 6 6 18M6 6l12 12" />
          </svg>
        </button>
      )}
    </form>
  );
}
