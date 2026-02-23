"use client";

import { useState } from "react";
import Link from "next/link";
import { useAppContext } from "@/components/Providers";
import { ThemeToggle } from "@/components/ThemeToggle";
import { SearchBar } from "@/components/SearchBar";
import { cn } from "@/utils/cn";
import { CATEGORIES } from "@/config/categories";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);
  const { compareList } = useAppContext();

  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-50 w-full",
          "border-b border-zinc-200/80 bg-white/80 backdrop-blur-md",
          "dark:border-zinc-800/80 dark:bg-zinc-950/80"
        )}
      >
        <div className="mx-auto flex h-16 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <Link
            href="/"
            className="shrink-0 text-xl font-bold tracking-tight"
            onClick={closeMobileMenu}
          >
            <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 bg-clip-text text-transparent">
              AI Tools Hub
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            <Link
              href="/"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              Home
            </Link>
            <Link
              href="/tools"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              Tools
            </Link>

            <div
              className="relative"
              onMouseEnter={() => setCategoriesOpen(true)}
              onMouseLeave={() => setCategoriesOpen(false)}
            >
              <button
                type="button"
                className={cn(
                  "flex items-center gap-1 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900",
                  "dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                )}
              >
                Categories
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={cn(
                    "h-4 w-4 transition-transform",
                    categoriesOpen && "rotate-180"
                  )}
                >
                  <path d="m6 9 6 6 6-6" />
                </svg>
              </button>
              {categoriesOpen && (
                <div
                  className={cn(
                    "absolute left-0 top-full mt-1 w-56 rounded-lg border py-1 shadow-lg",
                    "border-zinc-200 bg-white",
                    "dark:border-zinc-700 dark:bg-zinc-900"
                  )}
                >
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/tools/category/${cat.slug}`}
                      className="block px-4 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link
              href="/tools/compare"
              className="relative rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              Compare
              {compareList.length > 0 && (
                <span
                  className={cn(
                    "absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full px-1.5 text-xs font-semibold",
                    "bg-violet-500 text-white",
                    "dark:bg-violet-600"
                  )}
                >
                  {compareList.length}
                </span>
              )}
            </Link>
            <Link
              href="/favorites"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              Favorites
            </Link>
            <Link
              href="/about"
              className="rounded-md px-3 py-2 text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
            >
              About
            </Link>
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <SearchBar compact />
            <ThemeToggle />
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <SearchBar compact />
            <ThemeToggle />
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              className={cn(
                "rounded-lg p-2 transition-colors",
                "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900",
                "dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-100"
              )}
            >
              {mobileMenuOpen ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  <path d="M18 6 6 18M6 6l12 12" />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className="h-6 w-6"
                >
                  <path d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {mobileMenuOpen && (
        <div className="fixed inset-0 z-[999] lg:hidden">
          <div
            role="button"
            tabIndex={0}
            onClick={closeMobileMenu}
            onKeyDown={(e) => e.key === "Escape" && closeMobileMenu()}
            className="absolute inset-0 bg-black/20 dark:bg-black/40"
            aria-hidden="true"
          />
          <div
            className={cn(
              "absolute right-0 top-0 h-full w-80 max-w-[85vw] overflow-y-auto border-l shadow-xl",
              "border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-950"
            )}
          >
            <nav className="flex flex-col gap-1 p-4 pt-20">
              <Link
                href="/"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Home
              </Link>
              <Link
                href="/tools"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Tools
              </Link>
              <div className="rounded-lg px-4 py-2">
                <span className="block text-xs font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
                  Categories
                </span>
                <div className="mt-2 flex flex-col gap-1">
                  {CATEGORIES.map((cat) => (
                    <Link
                      key={cat.slug}
                      href={`/tools/category/${cat.slug}`}
                      onClick={closeMobileMenu}
                      className="rounded-md px-3 py-2 text-sm text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
                    >
                      <span className="mr-2">{cat.icon}</span>
                      {cat.name}
                    </Link>
                  ))}
                </div>
              </div>
              <Link
                href="/tools/compare"
                onClick={closeMobileMenu}
                className="relative flex items-center rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Compare
                {compareList.length > 0 && (
                  <span
                    className={cn(
                      "ml-2 flex h-6 min-w-6 items-center justify-center rounded-full px-2 text-xs font-semibold",
                      "bg-violet-500 text-white dark:bg-violet-600"
                    )}
                  >
                    {compareList.length}
                  </span>
                )}
              </Link>
              <Link
                href="/favorites"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                Favorites
              </Link>
              <Link
                href="/about"
                onClick={closeMobileMenu}
                className="rounded-lg px-4 py-3 text-base font-medium text-zinc-700 hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
              >
                About
              </Link>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
