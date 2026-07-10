import Link from "next/link"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background p-6 sm:p-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="mb-8 inline-block text-sm font-bold text-foreground transition-colors hover:text-primary"
        >
          ← back
        </Link>
        <h1 className="mb-2 font-heading text-4xl font-bold tracking-tight">
          Blog
        </h1>
        <p className="mb-10 max-w-md text-muted-foreground">
          Thoughts, notes, and things I&apos;ve learned.
        </p>
        <div className="rounded-2xl border-2 border-black bg-card p-10 text-center shadow-brutal">
          <p className="font-heading text-lg font-bold text-foreground">
            Coming soon
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Writing in progress. Stay tuned.
          </p>
        </div>
      </div>
    </main>
  )
}
