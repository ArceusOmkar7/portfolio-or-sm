import Link from "next/link"
import { notFound } from "next/navigation"
import { getProjectBySlug, getAllProjectSlugs } from "@/lib/projects"
import { ProjectCarousel } from "@/app/components/ProjectCarousel"

export function generateStaticParams() {
  return getAllProjectSlugs().map((slug) => ({ slug }))
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="mb-8">
      <h2 className="mb-3 font-heading text-lg font-bold tracking-tight text-foreground">
        {title}
      </h2>
      <p className="text-sm leading-relaxed text-muted-foreground">{children}</p>
    </section>
  )
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const project = getProjectBySlug(slug)

  if (!project) notFound()

  return (
    <main className="min-h-screen bg-background p-6 sm:p-12">
      <article className="mx-auto max-w-3xl">
        <Link
          href="/projects"
          className="mb-8 inline-block text-sm font-bold text-foreground transition-colors hover:text-primary"
        >
          ← back to projects
        </Link>

        <header className="mb-10">
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <h1 className="font-heading text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {project.name}
            </h1>
            <div className="flex items-center gap-3">
              {project.url && (
                <Link
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-sm font-bold text-foreground underline-offset-4 hover:underline"
                >
                  Live ↗
                </Link>
              )}
              <Link
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm font-bold text-foreground underline-offset-4 hover:underline"
              >
                GitHub ↗
              </Link>
            </div>
          </div>

          <p className="mt-3 text-base leading-relaxed text-muted-foreground">
            {project.description}
          </p>
          <div className="mt-6">
            <ProjectCarousel images={project.images} name={project.name} />
          </div>
          <div className="mt-4 flex flex-wrap gap-1.5">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-2xl border border-black bg-card px-2.5 py-0.5 text-[11px] font-bold text-foreground shadow-[2px_2px_0px_#000]"
              >
                {tag}
              </span>
            ))}
          </div>
        </header>

        <hr className="mb-8 border-black" />

        <Section title="The Problem / Motivation">{project.problem}</Section>
        <Section title="What I Built">{project.what}</Section>
        <Section title="Tech Decisions (Why X over Y)">{project.techDecisions}</Section>
        <Section title="Results / Numbers">{project.results}</Section>
      </article>
    </main>
  )
}
