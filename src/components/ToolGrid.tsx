import { Tool } from "@/lib/types";
import { ToolCard } from "@/components/ToolCard";

interface ToolGridProps {
  tools: Tool[];
  showCompare?: boolean;
}

export function ToolGrid({ tools, showCompare = true }: ToolGridProps) {
  if (tools.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-zinc-300 bg-zinc-50/50 py-16 px-8 text-center dark:border-zinc-700 dark:bg-zinc-900/30">
        <p className="text-lg font-medium text-zinc-600 dark:text-zinc-400">
          No tools found
        </p>
        <p className="mt-2 text-sm text-zinc-500 dark:text-zinc-500">
          Try adjusting your filters or search to find what you&apos;re looking for.
        </p>
      </div>
    );
  }

  return (
    <div
      className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
      role="list"
      aria-label="Tools list"
    >
      {tools.map((tool) => (
        <div key={tool.slug} role="listitem">
          <ToolCard tool={tool} showCompare={showCompare} />
        </div>
      ))}
    </div>
  );
}
