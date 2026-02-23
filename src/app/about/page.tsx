import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Hero */}
      <section className="relative overflow-hidden px-4 py-20 sm:px-6 sm:py-28 lg:px-8">
        <div className="absolute inset-0 bg-gradient-to-br from-violet-500/10 via-transparent to-fuchsia-500/10 dark:from-violet-600/20 dark:to-fuchsia-600/20" />
        <div className="relative mx-auto max-w-3xl text-center">
          <h1 className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-violet-600 bg-clip-text text-4xl font-bold tracking-tight text-transparent dark:from-violet-400 dark:via-fuchsia-400 dark:to-violet-400 sm:text-5xl">
            About AI Tools Hub
          </h1>
          <p className="mt-6 text-lg text-zinc-600 dark:text-zinc-400">
            Your trusted directory for discovering and comparing the best AI and
            SaaS tools.
          </p>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-12">
            <h2 className="text-2xl font-bold text-zinc-900 dark:text-zinc-100">
              Our Mission
            </h2>
            <p className="mt-4 text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              We believe everyone deserves access to the best tools for their
              workflow. AI Tools Hub curates, compares, and surfaces the most
              impactful AI and SaaS tools—powered by real-time GitHub data and
              expert curation—so you can make informed decisions without the
              noise.
            </p>
          </div>
        </div>
      </section>

      {/* What We Offer */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            What We Offer
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
            Everything you need to discover, evaluate, and choose the right tools
          </p>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: "🔍",
                title: "Curated Directory",
                description:
                  "Hand-picked AI and SaaS tools vetted for quality, relevance, and real-world impact.",
              },
              {
                icon: "📊",
                title: "Real-Time Data",
                description:
                  "GitHub stars, activity, and popularity scores updated regularly for accurate rankings.",
              },
              {
                icon: "⚖️",
                title: "Side-by-Side Compare",
                description:
                  "Compare up to 3 tools at once to see features, pricing, and fit for your needs.",
              },
              {
                icon: "🏷️",
                title: "Smart Filtering",
                description:
                  "Filter by category, pricing model, tags, and more to narrow down your search.",
              },
              {
                icon: "📱",
                title: "Mobile Friendly",
                description:
                  "Browse and discover tools on any device with a responsive, accessible design.",
              },
              {
                icon: "🆓",
                title: "100% Free",
                description:
                  "No paywalls, no premium tiers. All features are free for everyone.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group rounded-2xl border border-zinc-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:border-violet-300 hover:shadow-lg dark:border-zinc-700 dark:bg-zinc-900/50 dark:hover:border-violet-500/50"
              >
                <span className="text-3xl">{feature.icon}</span>
                <h3 className="mt-4 font-semibold text-zinc-900 dark:text-zinc-100">
                  {feature.title}
                </h3>
                <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            How It Works
          </h2>
          <div className="mt-12 space-y-12">
            {[
              {
                step: 1,
                title: "Browse & Search",
                description:
                  "Use our search bar or browse by category to explore 35+ curated tools. Filter by pricing, tags, and more.",
              },
              {
                step: 2,
                title: "Compare & Evaluate",
                description:
                  "Add tools to the compare drawer and see them side-by-side. Check features, pricing, and GitHub metrics.",
              },
              {
                step: 3,
                title: "Choose & Build",
                description:
                  "Pick the right tool for your workflow and start building. All links go directly to the official sites.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="flex gap-6 rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-700 dark:bg-zinc-900/50 sm:p-8"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-600 text-lg font-bold text-white">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-zinc-900 dark:text-zinc-100">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-zinc-600 dark:text-zinc-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-4xl">
          <h2 className="text-center text-2xl font-bold text-zinc-900 dark:text-zinc-100 sm:text-3xl">
            Tech Stack
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-center text-zinc-600 dark:text-zinc-400">
            Built with modern, performant technologies
          </p>
          <div className="mt-12 flex flex-wrap justify-center gap-4">
            {[
              "Next.js 16",
              "React 19",
              "TypeScript",
              "Tailwind CSS 4",
              "App Router",
            ].map((tech) => (
              <span
                key={tech}
                className="rounded-xl border border-zinc-200 bg-white px-5 py-2.5 font-medium text-zinc-700 shadow-sm transition-colors hover:border-violet-300 hover:text-violet-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300 dark:hover:border-violet-500/50 dark:hover:text-violet-400"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
