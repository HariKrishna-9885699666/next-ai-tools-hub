import Link from "next/link";
import { cn } from "@/utils/cn";

interface TagChipsProps {
  tags: string[];
  limit?: number;
  linkable?: boolean;
}

const TAG_COLORS = [
  "bg-violet-100 text-violet-700 dark:bg-violet-900/40 dark:text-violet-300",
  "bg-blue-100 text-blue-700 dark:bg-blue-900/40 dark:text-blue-300",
  "bg-emerald-100 text-emerald-700 dark:bg-emerald-900/40 dark:text-emerald-300",
  "bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-300",
  "bg-rose-100 text-rose-700 dark:bg-rose-900/40 dark:text-rose-300",
  "bg-cyan-100 text-cyan-700 dark:bg-cyan-900/40 dark:text-cyan-300",
];

function getTagColor(index: number): string {
  return TAG_COLORS[index % TAG_COLORS.length];
}

export function TagChips({
  tags,
  limit = 3,
  linkable = true,
}: TagChipsProps) {
  const visible = tags.slice(0, limit);
  const remaining = tags.length - limit;

  return (
    <div className="flex flex-wrap gap-1.5">
      {visible.map((tag, i) => {
        const chipClass = cn(
          "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
          getTagColor(i)
        );
        const content = (
          <>
            <span>{tag}</span>
          </>
        );

        if (linkable) {
          return (
            <Link
              key={tag}
              href={`/search?q=${encodeURIComponent(tag)}`}
              className={cn(
                chipClass,
                "transition-opacity hover:opacity-80"
              )}
            >
              {content}
            </Link>
          );
        }

        return (
          <span key={tag} className={chipClass}>
            {content}
          </span>
        );
      })}
      {remaining > 0 && (
        <span
          className={cn(
            "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium",
            "bg-zinc-100 text-zinc-600 dark:bg-zinc-700 dark:text-zinc-400"
          )}
        >
          +{remaining} more
        </span>
      )}
    </div>
  );
}
