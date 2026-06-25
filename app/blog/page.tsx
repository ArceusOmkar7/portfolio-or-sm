import Link from "next/link"
import { getAllPosts } from "@/lib/blog"

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <main className="min-h-screen bg-background p-6 sm:p-12">
      <div className="mx-auto max-w-3xl">
        <Link
          href="/"
          className="inline-block mb-8 text-sm font-bold text-foreground hover:text-primary transition-colors"
        >
          ← back
        </Link>
        <h1 className="text-4xl font-bold font-heading tracking-tight mb-2">Blog</h1>
        <p className="text-muted-foreground mb-10 max-w-md">
          Thoughts, notes, and things I&apos;ve learned.
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group block border-2 border-black rounded-2xl bg-card p-6 shadow-brutal hover:shadow-brutal-hover hover:-translate-y-1 transition-all duration-200"
            >
              <article>
                <time className="text-xs font-mono text-muted-foreground">{post.date}</time>
                <h2 className="text-xl font-bold font-heading mt-1 group-hover:text-primary transition-colors">
                  {post.title}
                </h2>
                {post.excerpt && (
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{post.excerpt}</p>
                )}
                {post.tags && (
                  <div className="flex flex-wrap gap-2 mt-3">
                    {post.tags.map((tag: string) => (
                      <span
                        key={tag}
                        className="text-xs font-bold px-2 py-1 border border-black bg-primary text-primary-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </article>
            </Link>
          ))}
          {posts.length === 0 && (
            <p className="text-muted-foreground italic">No posts yet. Coming soon.</p>
          )}
        </div>
      </div>
    </main>
  )
}
