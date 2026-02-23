import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getToolBySlug, getSimilarTools, getAllSlugs } from "@/lib/tools-data";
import { generateAISummary } from "@/lib/ai";
import { CATEGORY_MAP } from "@/config/categories";
import { TagChips } from "@/components/TagChips";
import { ToolGrid } from "@/components/ToolGrid";
import { ToolDetailActions } from "@/components/ToolDetailActions";
import type { PricingModel } from "@/lib/types";

const PRICING_LABELS: Record<PricingModel, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
  "open-source": "Open Source",
};

const PRICING_STYLES: Record<PricingModel, string> = {
  free: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  freemium: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  paid: "bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300",
  "open-source": "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
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

function ChevronIcon() {
  return (
    <svg
      className="h-4 w-4 text-zinc-400"
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="m9 18 6-6-6-6" />
    </svg>
  );
}

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tool = getToolBySlug(slug);

  if (!tool) {
    return { title: "Tool Not Found" };
  }

  const description =
    tool.longDescription?.slice(0, 160) || tool.description.slice(0, 160);

  return {
    title: tool.name,
    description: description + (description.length >= 160 ? "…" : ""),
    openGraph: {
      title: tool.name,
      description: description + (description.length >= 160 ? "…" : ""),
      type: "website",
      url: `https://example.com/tools/${tool.slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title: tool.name,
      description: description + (description.length >= 160 ? "…" : ""),
    },
  };
}

export async function generateStaticParams() {
  const slugs = getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

export default async function ToolDetailPage({ params }: Props) {
  const { slug } = await params;

  const tool = getToolBySlug(slug);
  if (!tool) notFound();

  const aiSummary = generateAISummary(tool);
  const similarTools = getSimilarTools(tool, 4);
  const categoryInfo = CATEGORY_MAP.get(tool.category);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: tool.name,
    description: tool.description,
    url: tool.websiteUrl,
    applicationCategory: "UtilitiesApplication",
    offers: {
      "@type": "Offer",
      price: tool.pricing === "free" || tool.pricing === "open-source" ? "0" : undefined,
      priceCurrency: "USD",
    },
    ...(tool.githubRepo && {
      codeRepository: tool.githubRepo,
      ...(tool.githubStars && { interactionStatistic: { "@type": "InteractionCounter", interactionType: "https://schema.org/LikeAction", userInteractionCount: tool.githubStars } }),
    }),
  };

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-2 text-sm">
            <li>
              <Link
                href="/"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Home
              </Link>
            </li>
            <li>
              <ChevronIcon />
            </li>
            <li>
              <Link
                href="/tools"
                className="text-zinc-500 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-100"
              >
                Tools
              </Link>
            </li>
            <li>
              <ChevronIcon />
            </li>
            <li className="font-medium text-zinc-900 dark:text-zinc-100">
              {tool.name}
            </li>
          </ol>
        </nav>

        {/* Tool header */}
        <header className="mb-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            <div
              className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl text-3xl"
              style={{
                backgroundColor: categoryInfo
                  ? `${categoryInfo.color}25`
                  : undefined,
              }}
            >
              {categoryInfo?.icon ?? "🔧"}
            </div>
            <div className="min-w-0 flex-1">
              <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-100 sm:text-4xl">
                {tool.name}
              </h1>
              <div className="mt-3 flex flex-wrap items-center gap-2">
                {categoryInfo && (
                  <span
                    className="inline-flex rounded-lg px-3 py-1 text-sm font-medium"
                    style={{
                      backgroundColor: `${categoryInfo.color}25`,
                      color: categoryInfo.color,
                    }}
                  >
                    {categoryInfo.name}
                  </span>
                )}
                <span
                  className={`rounded-lg px-3 py-1 text-sm font-medium ${PRICING_STYLES[tool.pricing]}`}
                >
                  {PRICING_LABELS[tool.pricing]}
                </span>
                {tool.popularityScore != null && (
                  <span className="rounded-lg bg-zinc-200 px-3 py-1 text-sm font-medium text-zinc-700 dark:bg-zinc-700 dark:text-zinc-300">
                    Popularity: {tool.popularityScore}%
                  </span>
                )}
              </div>
              <div className="mt-6">
                <ToolDetailActions slug={tool.slug} websiteUrl={tool.websiteUrl} />
              </div>
            </div>
          </div>
        </header>

        {/* Description */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            Description
          </h2>
          <p className="text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {tool.longDescription || tool.description}
          </p>
        </section>

        {/* AI Summary */}
        <section className="mb-10">
          <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
            AI Summary
          </h2>
          <div className="rounded-2xl border border-violet-200 bg-gradient-to-br from-violet-50 to-fuchsia-50 p-6 dark:border-violet-800/50 dark:from-violet-950/40 dark:to-fuchsia-950/40">
            <p className="text-zinc-700 dark:text-zinc-300 leading-relaxed">
              {aiSummary}
            </p>
          </div>
        </section>

        {/* Features */}
        {tool.features && tool.features.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Features
            </h2>
            <ul className="space-y-2">
              {tool.features.map((feature, i) => (
                <li
                  key={i}
                  className="flex items-start gap-3 text-zinc-600 dark:text-zinc-400"
                >
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-violet-500" />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* Tags */}
        {tool.tags.length > 0 && (
          <section className="mb-10">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tags
            </h2>
            <TagChips tags={tool.tags} limit={10} linkable={true} />
          </section>
        )}

        {/* Tool info card */}
        <section className="mb-12">
          <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
            <h2 className="mb-4 text-lg font-semibold text-zinc-900 dark:text-zinc-100">
              Tool Info
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2">
              <div>
                <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  Website
                </dt>
                <dd>
                  <a
                    href={tool.websiteUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-violet-600 hover:underline dark:text-violet-400"
                  >
                    {tool.websiteUrl.replace(/^https?:\/\//, "")}
                  </a>
                </dd>
              </div>
              {tool.githubRepo && (
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    GitHub
                  </dt>
                  <dd>
                    <a
                      href={tool.githubRepo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-violet-600 hover:underline dark:text-violet-400"
                    >
                      {tool.githubRepo.replace(/^https?:\/\//, "")}
                    </a>
                  </dd>
                </div>
              )}
              {tool.githubStars != null && tool.githubStars > 0 && (
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    GitHub Stars
                  </dt>
                  <dd className="inline-flex items-center gap-1">
                    <StarIcon className="h-4 w-4 text-amber-500" />
                    {tool.githubStars >= 1000
                      ? `${(tool.githubStars / 1000).toFixed(1)}k`
                      : tool.githubStars}
                  </dd>
                </div>
              )}
              {tool.launchDate && (
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Launch Date
                  </dt>
                  <dd>{tool.launchDate}</dd>
                </div>
              )}
              {tool.lastUpdated && (
                <div>
                  <dt className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    Last Updated
                  </dt>
                  <dd>{tool.lastUpdated}</dd>
                </div>
              )}
            </dl>
          </div>
        </section>

        {/* Similar Tools */}
        {similarTools.length > 0 && (
          <section>
            <h2 className="mb-6 text-xl font-semibold text-zinc-900 dark:text-zinc-100">
              Similar Tools
            </h2>
            <ToolGrid tools={similarTools} showCompare={true} />
          </section>
        )}
      </div>
    </div>
  );
}
