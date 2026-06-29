import Link from "next/link"
import { BentoGridContainer } from "./components/BentoGridContainer"
import { BentoCard } from "./components/BentoCard"
import { getAllPosts } from "@/lib/blog"

function formatDate(dateStr: string) {
  const d = new Date(dateStr)
  const day = d.getDate()
  const mod100 = day % 100
  const mod10 = day % 10
  let suffix = "th"
  if (mod100 !== 11 && mod100 !== 12 && mod100 !== 13) {
    if (mod10 === 1) suffix = "st"
    else if (mod10 === 2) suffix = "nd"
    else if (mod10 === 3) suffix = "rd"
  }
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]
  return `${day}${suffix} ${months[d.getMonth()]} ${d.getFullYear()}`
}

export default function Page() {
  const posts = getAllPosts()
  return (
    <main className="flex min-h-screen items-center justify-center bg-background p-4 sm:p-8 md:p-12">
      {/*
        Outer container to mimic the rounded border from the sketch.
        The max-width ensures it looks like a card on larger screens.
      */}
      <div className="w-full max-w-6xl rounded-[2.5rem] border-2 border-black bg-card p-6 shadow-brutal sm:p-10">
        <BentoGridContainer
          gap={20}
          dense={false}
          className="grid-cols-1 sm:grid-cols-7 sm:[grid-template-rows:160px_260px]"
        >
          <BentoCard
            interactive
            className="flex flex-col justify-center gap-1 sm:col-span-3 sm:row-start-1"
          >
            <div className="flex items-baseline justify-between">
              <h1 className="font-heading text-2xl font-bold tracking-tight text-foreground">
                Omkar Mahindrakar
              </h1>
              <span className="rounded-full bg-muted px-2 py-0.5 text-sm font-medium text-muted-foreground">
                20 M
              </span>
            </div>
            <p className="text-lg font-medium text-muted-foreground/80">
              Vadodara, Gujarat
            </p>
            <div className="mt-2 flex items-center gap-3">
              <a
                href="https://github.com/ArceusOmkar7"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="GitHub"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/in/omkar-mahindrakar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="LinkedIn"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
              <a
                href="https://x.com/mightbeomkar"
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label="X"
              >
                <svg viewBox="0 0 24 24" fill="currentColor" className="size-4">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </BentoCard>

          {/*
            Center: GIF/Visual Card
            Spans 1 column and 2 rows (tall card) to match the verticality in the sketch.
          */}
          <BentoCard
            surface="accent"
            interactive
            className="flex items-center justify-center p-0 text-center sm:col-span-1 sm:col-start-4 sm:row-span-2"
          >
            <img
              src="/images/kitty.gif"
              alt="Kitty"
              className="size-full rounded-2xl object-cover"
              style={{ objectPosition: "-70px center" }}
            />
          </BentoCard>

          {/*
            Top-Right: About Card
            Spans 3 columns in the first row.
          */}
          <BentoCard
            interactive
            className="flex flex-col gap-3 sm:col-span-3 sm:col-start-5 sm:row-start-1"
          >
            <h2 className="font-heading text-xl font-bold text-foreground">
              About
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground italic">
              Student at Navrachana University, loves exploring ML/DL stuff.
              While the models are training I watch anime.
            </p>
          </BentoCard>

          {/*
            Bottom-Left: Major Project Card
            Spans 3 columns in the second row.
          */}
          <BentoCard
            interactive
            className="flex flex-col justify-between sm:col-span-3 sm:row-start-2"
          >
            <div>
              <Link
                href="https://github.com/ArceusOmkar7/some-project"
                target="_blank"
                rel="noopener noreferrer"
                className="group"
              >
                <h3 className="font-heading text-2xl font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
                  GNIEM
                </h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                  All scattered events at one place, near real-time and with AI
                  insights.
                </p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {["Python", "DuckDB", "BigQuery", "Fast API", "Big Data"].map(
                    (tag) => (
                      <span
                        key={tag}
                        className="border border-black bg-card px-2 py-0.5 text-[11px] font-bold text-foreground rounded-2xl shadow-[2px_2px_0px_#000]"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </Link>
            </div>
            <Link
              href="https://github.com/ArceusOmkar7"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 self-start font-mono text-xs text-muted-foreground transition-colors hover:text-foreground"
            >
              View all projects →
            </Link>
          </BentoCard>

          {/*
            Bottom-Right (Inner): Open Source Card
            Spans 2 columns in the second row.
          */}
          <BentoCard
            interactive
            className="flex items-center justify-center sm:col-span-2 sm:col-start-5 sm:row-start-2"
          >
            <p className="text-center text-lg font-bold text-foreground">
              Open source contribution
            </p>
          </BentoCard>

          <BentoCard
            interactive
            surface="accent"
            className="flex flex-col gap-2 p-3 sm:col-span-1 sm:col-start-7 sm:row-start-2"
          >
            <Link
              href="/blog"
              className="font-heading text-sm font-bold tracking-tight text-primary-foreground/90 hover:underline"
            >
              Blog
            </Link>
            <div className="flex flex-col gap-1.5">
              {posts.slice(0, 3).map((post, i) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group block rounded-lg border border-primary-foreground/20 bg-primary-foreground/5 px-2.5 py-1.5 transition-colors hover:bg-primary-foreground/10"
                >
                  <div className="flex items-center justify-between gap-1">
                    <span className="truncate text-[11px] leading-tight font-semibold text-primary-foreground">
                      {post.title}
                    </span>
                    {i === 0 && (
                      <span className="shrink-0 text-[9px] font-bold tracking-wider text-primary-foreground/50 uppercase">
                        Latest
                      </span>
                    )}
                  </div>
                  <time className="mt-0.5 block text-[10px] text-primary-foreground/40">
                    {formatDate(post.date)}
                  </time>
                </Link>
              ))}
            </div>
            <Link
              href="/blog"
              className="font-mono text-[10px] text-primary-foreground/40 transition-colors hover:text-primary-foreground/70"
            >
              View all →
            </Link>
          </BentoCard>
        </BentoGridContainer>
      </div>
    </main>
  )
}
