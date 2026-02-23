import { Tool, Category, SearchFilters, PaginatedResult } from "./types";
import { calculatePopularityScore } from "./scoring";
import { filterTools, paginateTools, extractAllTags } from "./search";
import toolsRaw from "@/data/tools.json";

let cachedTools: Tool[] | null = null;

function getProcessedTools(): Tool[] {
  if (cachedTools) return cachedTools;

  const tools = (toolsRaw as Tool[]).map((tool) => ({
    ...tool,
    popularityScore: calculatePopularityScore(tool),
  }));

  tools.sort((a, b) => (b.popularityScore ?? 0) - (a.popularityScore ?? 0));
  cachedTools = tools;
  return tools;
}

export function getAllTools(): Tool[] {
  return getProcessedTools();
}

export function getToolBySlug(slug: string): Tool | undefined {
  return getProcessedTools().find((t) => t.slug === slug);
}

export function getToolsByCategory(category: Category): Tool[] {
  return getProcessedTools().filter((t) => t.category === category);
}

export function getTrendingTools(limit: number = 12): Tool[] {
  return getProcessedTools().slice(0, limit);
}

export function getFilteredTools(
  filters: SearchFilters
): PaginatedResult<Tool> {
  const tools = getProcessedTools();
  const filtered = filterTools(tools, filters);
  return paginateTools(filtered, filters.page ?? 1);
}

export function getSimilarTools(tool: Tool, limit: number = 4): Tool[] {
  const all = getProcessedTools();
  return all
    .filter((t) => t.slug !== tool.slug)
    .map((t) => {
      let similarity = 0;
      if (t.category === tool.category) similarity += 50;
      const sharedTags = t.tags.filter((tag) => tool.tags.includes(tag));
      similarity += sharedTags.length * 10;
      return { tool: t, similarity };
    })
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, limit)
    .map(({ tool }) => tool);
}

export function getAllTags(): string[] {
  return extractAllTags(getProcessedTools());
}

export function getAllSlugs(): string[] {
  return getProcessedTools().map((t) => t.slug);
}

export function getToolsByMultipleSlugs(slugs: string[]): Tool[] {
  const tools = getProcessedTools();
  return slugs
    .map((slug) => tools.find((t) => t.slug === slug))
    .filter((t): t is Tool => t !== undefined);
}
