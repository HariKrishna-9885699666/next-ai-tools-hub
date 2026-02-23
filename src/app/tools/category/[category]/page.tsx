import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getToolsByCategory } from "@/lib/tools-data";
import { CATEGORY_MAP, CATEGORIES } from "@/config/categories";
import { ToolGrid } from "@/components/ToolGrid";
import type { Category } from "@/lib/types";

interface PageProps {
  params: Promise<{ category: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { category } = await params;
  const info = CATEGORY_MAP.get(category as Category);
  if (!info) {
    return { title: "Category Not Found" };
  }
  return {
    title: `${info.name} - AI & SaaS Tools`,
    description: info.description,
  };
}

export async function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

export default async function CategoryPage({ params }: PageProps) {
  const { category } = await params;

  const info = CATEGORY_MAP.get(category as Category);
  if (!info) {
    notFound();
  }

  const tools = getToolsByCategory(category as Category);

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-6">
          <div
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl text-2xl dark:bg-zinc-800/80"
            style={{ backgroundColor: `${info.color}20` }}
            aria-hidden
          >
            {info.icon}
          </div>
          <div>
            <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
              {info.name}
            </h1>
            <p className="mt-1 text-zinc-600 dark:text-zinc-400">
              {info.description}
            </p>
          </div>
        </div>

        <ToolGrid tools={tools} showCompare={true} />
      </div>
    </div>
  );
}
