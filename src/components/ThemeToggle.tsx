"use client";

import { useAppContext } from "@/components/Providers";
import { cn } from "@/utils/cn";

type ThemeOption = "light" | "system" | "dark";

export function ThemeToggle() {
  const { theme, setTheme } = useAppContext();

  const options: { value: ThemeOption; label: string; icon: React.ReactNode }[] =
    [
      {
        value: "light",
        label: "Light",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <circle cx="12" cy="12" r="5" />
            <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
          </svg>
        ),
      },
      {
        value: "system",
        label: "System",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
            <path d="M8 21h8M12 17v4" />
          </svg>
        ),
      },
      {
        value: "dark",
        label: "Dark",
        icon: (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-4 w-4"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        ),
      },
    ];

  return (
    <div
      role="group"
      aria-label="Theme preference"
      className={cn(
        "flex rounded-lg p-1",
        "bg-zinc-100 dark:bg-zinc-800"
      )}
    >
      {options.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => setTheme(opt.value)}
          aria-label={`${opt.label} theme`}
          aria-pressed={theme === opt.value}
          className={cn(
            "flex items-center justify-center rounded-md p-1.5 transition-colors",
            theme === opt.value
              ? "bg-white text-violet-600 shadow-sm dark:bg-zinc-700 dark:text-violet-400"
              : "text-zinc-500 hover:text-zinc-700 dark:text-zinc-400 dark:hover:text-zinc-200"
          )}
        >
          {opt.icon}
        </button>
      ))}
    </div>
  );
}
