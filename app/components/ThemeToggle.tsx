"use client"

import { useSyncExternalStore } from "react"
import { useTheme } from "next-themes"

const modes = ["light", "dark", "system"] as const

const icons: Record<string, React.ReactNode> = {
  light: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M6.34 17.66l-1.41 1.41M19.07 4.93l-1.41 1.41" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  ),
  system: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="size-4">
      <rect x="2" y="3" width="20" height="14" rx="2" />
      <path d="M8 21h8M12 17v4" />
    </svg>
  ),
}

export function ThemeToggle() {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  )
  const { theme, setTheme } = useTheme()

  if (!mounted) return null

  const current = theme === "system" ? "system" : theme === "dark" ? "dark" : "light"

  return (
    <div className="fixed top-4 right-4 z-50 flex border-2 border-black bg-card rounded-2xl shadow-brutal overflow-hidden">
      {modes.map((mode) => (
        <button
          key={mode}
          onClick={() => setTheme(mode)}
          className={`p-2.5 transition-all duration-150 active:translate-y-[2px] ${
            current === mode
              ? "bg-primary text-primary-foreground"
              : "bg-card text-card-foreground hover:bg-muted"
          }`}
          aria-label={mode}
        >
          {icons[mode]}
        </button>
      ))}
    </div>
  )
}
