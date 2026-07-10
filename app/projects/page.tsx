import Link from "next/link"
import { getAllProjects } from "@/lib/projects"

const typeColors: Record<string, string> = {
  ML: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  Backend: "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/40 dark:text-emerald-300",
  OSS: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
  "Full Stack": "bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300",
  "Big Data": "bg-sky-100 text-sky-800 dark:bg-sky-900/40 dark:text-sky-300"
}

export default function ProjectsPage() {
  const projects = getAllProjects()

  return (
    <main className="min-h-screen bg-background p-6 sm:p-12">
      <div className="mx-auto max-w-5xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-bold text-foreground transition-colors hover:text-primary"
        >
          ← back
        </Link>
        <h1 className="mb-2 font-heading text-4xl font-bold tracking-tight">
          Projects
        </h1>
        <p className="mb-10 max-w-md text-muted-foreground">
          Things I&apos;ve built — some ship, some never will.
        </p>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className="group flex flex-col justify-between rounded-2xl border-2 border-black bg-card p-6 shadow-brutal transition-all duration-200 hover:-translate-y-1 hover:shadow-brutal-hover"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <h2 className="font-heading text-xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                    {project.name}
                  </h2>
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold leading-tight ${typeColors[project.type]}`}
                  >
                    {project.type}
                  </span>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {project.description}
                </p>
              </div>

              <div className="mt-5 space-y-3">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-2xl border border-black bg-card px-2 py-0.5 text-[11px] font-bold text-foreground shadow-[2px_2px_0px_#000]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="block font-mono text-xs font-semibold text-muted-foreground transition-colors group-hover:text-foreground">
                  View project →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
