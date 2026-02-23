import { CategoryInfo } from "@/lib/types";

export const CATEGORIES: CategoryInfo[] = [
  {
    slug: "ai-tools",
    name: "AI Tools",
    description: "Artificial intelligence powered tools and platforms",
    icon: "🤖",
    color: "#8B5CF6",
  },
  {
    slug: "developer-tools",
    name: "Developer Tools",
    description: "Tools built for software developers and engineers",
    icon: "💻",
    color: "#3B82F6",
  },
  {
    slug: "marketing-tools",
    name: "Marketing Tools",
    description: "Digital marketing and growth tools",
    icon: "📈",
    color: "#10B981",
  },
  {
    slug: "design-tools",
    name: "Design Tools",
    description: "UI/UX design and creative tools",
    icon: "🎨",
    color: "#F59E0B",
  },
  {
    slug: "productivity",
    name: "Productivity",
    description: "Tools to boost your daily productivity",
    icon: "⚡",
    color: "#EF4444",
  },
  {
    slug: "writing",
    name: "Writing",
    description: "AI-powered writing and content creation tools",
    icon: "✍️",
    color: "#EC4899",
  },
  {
    slug: "automation",
    name: "Automation",
    description: "Workflow automation and integration platforms",
    icon: "🔄",
    color: "#6366F1",
  },
  {
    slug: "no-code",
    name: "No-Code",
    description: "Build apps and websites without coding",
    icon: "🧩",
    color: "#14B8A6",
  },
  {
    slug: "analytics",
    name: "Analytics",
    description: "Data analytics and business intelligence tools",
    icon: "📊",
    color: "#F97316",
  },
  {
    slug: "open-source",
    name: "Open Source",
    description: "Free and open-source software tools",
    icon: "🌐",
    color: "#22C55E",
  },
];

export const CATEGORY_MAP = new Map(
  CATEGORIES.map((c) => [c.slug, c])
);

export const PAGE_SIZE = 12;
export const MAX_COMPARE = 3;
