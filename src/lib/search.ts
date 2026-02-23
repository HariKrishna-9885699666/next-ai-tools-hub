import { Tool, SearchFilters, PaginatedResult, SortOption } from "./types";
import { PAGE_SIZE } from "@/config/categories";
import {
  sortByTrending,
  sortByNewest,
  sortByPopular,
  sortByName,
} from "./scoring";
import { sanitizeSearchInput } from "@/utils/sanitize";

export function fuzzyMatch(text: string, query: string): boolean {
  const normalizedText = text.toLowerCase();
  const normalizedQuery = query.toLowerCase();

  if (normalizedText.includes(normalizedQuery)) return true;

  let queryIdx = 0;
  for (let i = 0; i < normalizedText.length && queryIdx < normalizedQuery.length; i++) {
    if (normalizedText[i] === normalizedQuery[queryIdx]) {
      queryIdx++;
    }
  }
  return queryIdx === normalizedQuery.length;
}

function matchScore(tool: Tool, query: string): number {
  const q = query.toLowerCase();
  let score = 0;

  if (tool.name.toLowerCase() === q) score += 100;
  else if (tool.name.toLowerCase().startsWith(q)) score += 80;
  else if (tool.name.toLowerCase().includes(q)) score += 60;

  if (tool.category.toLowerCase().includes(q)) score += 30;
  if (tool.tags.some((t) => t.toLowerCase().includes(q))) score += 40;
  if (tool.description.toLowerCase().includes(q)) score += 20;

  if (score === 0 && fuzzyMatch(tool.name, q)) score += 10;

  return score;
}

export function searchTools(tools: Tool[], query: string): Tool[] {
  const sanitized = sanitizeSearchInput(query);
  if (!sanitized) return tools;

  const scored = tools
    .map((tool) => ({ tool, score: matchScore(tool, sanitized) }))
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score);

  return scored.map(({ tool }) => tool);
}

export function filterTools(tools: Tool[], filters: SearchFilters): Tool[] {
  let result = [...tools];

  if (filters.query) {
    result = searchTools(result, filters.query);
  }

  if (filters.category) {
    result = result.filter((t) => t.category === filters.category);
  }

  if (filters.pricing) {
    result = result.filter((t) => t.pricing === filters.pricing);
  }

  if (filters.tags && filters.tags.length > 0) {
    result = result.filter((t) =>
      filters.tags!.some((tag) => t.tags.includes(tag))
    );
  }

  if (filters.sort && !filters.query) {
    result = applySorting(result, filters.sort);
  }

  return result;
}

function applySorting(tools: Tool[], sort: SortOption): Tool[] {
  switch (sort) {
    case "trending":
      return sortByTrending(tools);
    case "newest":
      return sortByNewest(tools);
    case "popular":
      return sortByPopular(tools);
    case "name":
      return sortByName(tools);
    default:
      return tools;
  }
}

export function paginateTools(
  tools: Tool[],
  page: number = 1,
  pageSize: number = PAGE_SIZE
): PaginatedResult<Tool> {
  const total = tools.length;
  const totalPages = Math.ceil(total / pageSize);
  const currentPage = Math.max(1, Math.min(page, totalPages || 1));
  const start = (currentPage - 1) * pageSize;
  const items = tools.slice(start, start + pageSize);

  return {
    items,
    total,
    page: currentPage,
    pageSize,
    totalPages,
  };
}

export function extractAllTags(tools: Tool[]): string[] {
  const tagSet = new Set<string>();
  tools.forEach((t) => t.tags.forEach((tag) => tagSet.add(tag)));
  return Array.from(tagSet).sort();
}
