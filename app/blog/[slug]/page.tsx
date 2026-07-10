import { Link } from "next-view-transitions"
import { notFound } from "next/navigation"
import { MDXRemote } from "next-mdx-remote/rsc"
import { getPostBySlug, getAllSlugs } from "@/lib/blog"

export async function generateStaticParams() {
  const slugs = getAllSlugs()
  return slugs.map((slug) => ({ slug }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  let post: ReturnType<typeof getPostBySlug>

  try {
    post = getPostBySlug(slug)
  } catch {
    notFound()
  }

  return (
    <main className="min-h-screen bg-background p-6 sm:p-12">
      <article className="mx-auto max-w-4xl">
        <Link
          href="/blog"
          data-transition="back"
          className="mb-8 inline-block text-sm font-bold text-foreground transition-colors hover:text-primary"
        >
          ← Blog
        </Link>
        <header className="mb-10">
          <time className="text-xs font-mono text-muted-foreground">{post.date}</time>
          <h1 className="text-3xl sm:text-4xl font-bold font-heading tracking-tight mt-1">
            {post.title}
          </h1>
          {post.excerpt && (
            <p className="text-muted-foreground mt-3 text-base leading-relaxed">{post.excerpt}</p>
          )}
          {post.tags && (
            <div className="flex flex-wrap gap-2 mt-4">
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
        </header>
        <div className="prose-custom max-w-none">
          <MDXRemote source={post.content} />
        </div>
      </article>
    </main>
  )
}
