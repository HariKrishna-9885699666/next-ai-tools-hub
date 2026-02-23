import { Tool } from "./types";

export function generateAISummary(tool: Tool): string {
  const pricingText =
    tool.pricing === "free"
      ? "completely free"
      : tool.pricing === "open-source"
        ? "open-source and free to use"
        : tool.pricing === "freemium"
          ? "free with premium options"
          : "a paid service";

  const starsText =
    tool.githubStars && tool.githubStars > 0
      ? ` With ${formatStars(tool.githubStars)} GitHub stars, it has strong community backing.`
      : "";

  const tagsText = tool.tags.slice(0, 3).join(", ");

  return `${tool.name} is ${pricingText} in the ${tool.category.replace("-", " ")} category. ${tool.description}${starsText} Key areas: ${tagsText}.`;
}

function formatStars(stars: number): string {
  if (stars >= 1000) return `${(stars / 1000).toFixed(1)}k`;
  return stars.toString();
}

export function extractTags(description: string): string[] {
  const keywords = new Map<string, string[]>([
    ["ai", ["ai", "artificial intelligence", "machine learning", "ml", "deep learning"]],
    ["automation", ["automate", "automation", "workflow", "integrate"]],
    ["developer", ["developer", "coding", "programming", "code", "api", "sdk"]],
    ["design", ["design", "ui", "ux", "visual", "graphic"]],
    ["analytics", ["analytics", "data", "metrics", "tracking", "insights"]],
    ["writing", ["writing", "content", "copywriting", "text", "blog"]],
    ["open-source", ["open-source", "open source", "github", "self-hosted"]],
    ["no-code", ["no-code", "no code", "low-code", "visual builder", "drag"]],
    ["marketing", ["marketing", "seo", "social media", "campaign", "growth"]],
    ["productivity", ["productivity", "workspace", "collaboration", "team"]],
  ]);

  const lowerDesc = description.toLowerCase();
  const extracted: string[] = [];

  for (const [tag, patterns] of keywords) {
    if (patterns.some((p) => lowerDesc.includes(p))) {
      extracted.push(tag);
    }
  }

  return extracted;
}

export function getSmartRecommendations(
  recentlyViewed: string[],
  allTools: Tool[]
): Tool[] {
  if (recentlyViewed.length === 0) {
    return allTools
      .sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0))
      .slice(0, 6);
  }

  const viewedTools = recentlyViewed
    .map((slug) => allTools.find((t) => t.slug === slug))
    .filter((t): t is Tool => t !== undefined);

  const categoryCount = new Map<string, number>();
  const tagCount = new Map<string, number>();

  viewedTools.forEach((t) => {
    categoryCount.set(t.category, (categoryCount.get(t.category) ?? 0) + 1);
    t.tags.forEach((tag) => tagCount.set(tag, (tagCount.get(tag) ?? 0) + 1));
  });

  const viewedSlugs = new Set(recentlyViewed);

  return allTools
    .filter((t) => !viewedSlugs.has(t.slug))
    .map((t) => {
      let score = t.popularityScore ?? 0;
      score += (categoryCount.get(t.category) ?? 0) * 20;
      t.tags.forEach((tag) => {
        score += (tagCount.get(tag) ?? 0) * 5;
      });
      return { tool: t, score };
    })
    .sort((a, b) => b.score - a.score)
    .slice(0, 6)
    .map(({ tool }) => tool);
}
