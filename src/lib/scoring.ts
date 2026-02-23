import { Tool } from "./types";

/**
 * Stateless popularity scoring algorithm.
 * score = GitHub stars * 0.6 + Recent updates * 0.2 + External ranking weight * 0.2
 */
export function calculatePopularityScore(tool: Tool): number {
  const starsScore = normalizeStars(tool.githubStars ?? 0);
  const recencyScore = calculateRecencyScore(tool.lastUpdated);
  const externalScore = (tool.externalRankingWeight ?? 0.5) * 100;

  return Math.round(starsScore * 0.6 + recencyScore * 0.2 + externalScore * 0.2);
}

function normalizeStars(stars: number): number {
  if (stars === 0) return 50;
  if (stars >= 100000) return 100;
  return Math.min(100, Math.round((Math.log10(stars + 1) / 5) * 100));
}

function calculateRecencyScore(lastUpdated?: string): number {
  if (!lastUpdated) return 30;
  const daysSinceUpdate = Math.floor(
    (Date.now() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24)
  );
  if (daysSinceUpdate <= 7) return 100;
  if (daysSinceUpdate <= 30) return 80;
  if (daysSinceUpdate <= 90) return 60;
  if (daysSinceUpdate <= 180) return 40;
  return 20;
}

export function sortByTrending(tools: Tool[]): Tool[] {
  return [...tools].sort(
    (a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0)
  );
}

export function sortByNewest(tools: Tool[]): Tool[] {
  return [...tools].sort(
    (a, b) =>
      new Date(b.launchDate ?? "2000-01-01").getTime() -
      new Date(a.launchDate ?? "2000-01-01").getTime()
  );
}

export function sortByPopular(tools: Tool[]): Tool[] {
  return [...tools].sort(
    (a, b) => (b.githubStars ?? 0) - (a.githubStars ?? 0)
  );
}

export function sortByName(tools: Tool[]): Tool[] {
  return [...tools].sort((a, b) => a.name.localeCompare(b.name));
}
