import Image from "next/image"
import { Link } from "next-view-transitions"

export default function BlogPage() {
  return (
    <main className="min-h-screen bg-background p-6 sm:p-12">
      <div className="mx-auto max-w-4xl">
        <Link
          href="/"
          data-transition="back"
          className="mb-8 inline-block text-sm font-bold text-foreground transition-colors hover:text-primary"
        >
          ← Home
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
          <Image
            src="/images/chopper.gif"
            alt="Chopper"
            width={200}
            height={200}
            className="mx-auto mt-6 rounded-2xl border-2 border-black object-cover shadow-brutal"
            loading="eager"
            unoptimized
          />
        </div>
      </div>
    </main>
  )
}
