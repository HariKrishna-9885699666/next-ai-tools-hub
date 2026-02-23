import Link from "next/link";
import { Suspense } from "react";
import { getTrendingTools } from "@/lib/tools-data";
import { CATEGORIES } from "@/config/categories";
import { ToolGrid } from "@/components/ToolGrid";
import { SearchBar } from "@/components/SearchBar";

export default function Home() {
  const trendingTools = getTrendingTools(6);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero Section */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 dark:from-violet-600/20 dark:to-fuchsia-600/20" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.15),transparent)] dark:bg-[radial-gradient(ellipse_80%_50%_at_50%_-20%,rgba(139,92,246,0.25),transparent)]" />
        <div className="relative mx-auto max-w-4xl text-center">
          <h1 className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-5xl md:text-6xl lg:text-7xl dark:from-violet-400 dark:via-fuchsia-400 dark:to-violet-400">
            Discover the Best AI & SaaS Tools
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400 sm:text-xl">
            Browse, compare, and find the perfect AI tools for your workflow.
            Powered by real-time data from GitHub and curated expert picks.
          </p>
          <div className="mx-auto mt-10 flex justify-center">
            <div className="w-full max-w-2xl">
              <Suspense fallback={<div className="h-10" />}>
                <SearchBar compact={false} />
              </Suspense>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Row */}
      <section className="border-y border-zinc-200 bg-white/50 px-4 py-8 dark:border-zinc-800 dark:bg-zinc-900/30 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-center gap-8 sm:gap-12">
          <div className="text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              35+ Tools
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              Curated directory
            </p>
          </div>
          <div className="hidden h-8 w-px bg-zinc-200 dark:bg-zinc-700 sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              10 Categories
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              From AI to analytics
            </p>
          </div>
          <div className="hidden h-8 w-px bg-zinc-200 dark:bg-zinc-700 sm:block" />
          <div className="text-center">
            <p className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
              100% Free
            </p>
            <p className="mt-1 text-sm text-zinc-500 dark:text-zinc-400">
              No paywall, ever
            </p>
          </div>
        </div>
      </section>

      {/* Trending Tools */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Trending Tools
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Most popular picks based on GitHub stars and community engagement
          </p>
          <div className="mt-8">
            <ToolGrid tools={trendingTools} showCompare={true} />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Browse by Category
          </h2>
          <p className="mt-2 text-zinc-600 dark:text-zinc-400">
            Explore tools organized by use case and industry
          </p>
          <div className="mt-8 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
            {CATEGORIES.map((category) => (
              <Link
                key={category.slug}
                href={`/tools/category/${category.slug}`}
                className="group relative overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg hover:shadow-violet-500/10 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:border-violet-500/50 dark:hover:shadow-violet-500/5"
              >
                <div
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{
                    background: `linear-gradient(135deg, ${category.color}15, transparent)`,
                  }}
                />
                <div className="relative">
                  <span
                    className="inline-flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{ backgroundColor: `${category.color}20` }}
                  >
                    {category.icon}
                  </span>
                  <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">
                    {category.name}
                  </h3>
                  <p className="mt-2 line-clamp-2 text-sm text-zinc-500 dark:text-zinc-400">
                    {category.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl rounded-3xl bg-gradient-to-br from-violet-500 to-fuchsia-600 px-8 py-16 text-center shadow-xl dark:from-violet-600 dark:to-fuchsia-700">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to find your next favorite tool?
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-violet-100">
            Browse our full directory of AI and SaaS tools. Filter, compare, and
            discover what works for you.
          </p>
          <Link
            href="/tools"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-violet-600 shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl dark:bg-zinc-900 dark:text-violet-300 dark:hover:bg-zinc-800"
          >
            Explore All Tools
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="h-5 w-5"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </section>
    </div>
  );
}
