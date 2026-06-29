<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# pf-or-smth

## Commands

```sh
npm run dev       # dev server
npm run build     # production build (runs typecheck first)
npm run lint      # eslint
npm run typecheck # tsc --noEmit
npm run format    # prettier --write on ts/tsx
```

Run `lint && typecheck && build` before committing.

## Stack

- **Next.js 16** (App Router) — see note above
- **React 19**, **Tailwind CSS v4** (CSS-only, no `tailwind.config.*`)
- **shadcn/ui v4** — uses `data-slot`, `radix-ui`, `tw-animate-css`
- **next-themes** — dark/light/system, class strategy

## Tailwind v4 specifics

- Theme defined entirely in `app/globals.css` via `@theme inline {}` block
- Colors use oklch values; custom shadows (`shadow-brutal`, `shadow-brutal-hover`) defined there
- No `@apply` in components — use `cn()` utility from `@/lib/utils` for merging
- Fonts: Outfit (sans), Space Grotesk (heading), Geist Mono (mono) — via `next/font/google` in `app/layout.tsx`

## Project structure

| Path | Purpose |
|------|---------|
| `app/` | Next.js App Router pages + layout |
| `app/components/` | Custom layout/business components (BentoCard, BentoGridContainer, ThemeToggle) |
| `components/ui/` | shadcn/ui base components (button, etc.) |
| `components/theme-provider.tsx` | next-themes wrapper with d-key hotkey |
| `content/posts/*.mdx` | Blog posts (gray-matter frontmatter) |
| `lib/blog.ts` | MDX reading helpers (getAllPosts, getPostBySlug) |
| `lib/utils.ts` | `cn()` — clsx + tailwind-merge |

## Design (neo-brutalist)

- Off-white bg (`#F5F0E8` light / `#1A1510` dark), yellow accent (`#FFE500`)
- Cards: `border-2 border-black`, `shadow-brutal` (4px 4px 0px #000)
- Interactive: `hover:shadow-brutal-hover`, `active:translate-y-[3px]`
- Theme toggle in `app/components/ThemeToggle.tsx` — must guard with `mounted` state to avoid hydration mismatch

## Blog (MDX)

- `next-mdx-remote/rsc` for rendering (no next.config changes needed)
- `gray-matter` for frontmatter parsing
- Posts live in `content/posts/`, fetched via `lib/blog.ts`
- Routes: `/blog` (list), `/blog/[slug]` (single) — uses `generateStaticParams`

## Conventions

- `BentoCard` variants: `padding` (none/sm/md/lg), `interactive` (true/false), `surface` (solid/glass/accent)
- `BentoGridContainer` props: `columns`, `rows`, `gap`, `dense`
- Component organization: generic UI → `components/ui/`, feature-specific → `app/components/`
- Path alias `@/*` → project root
- Mobile-first responsive with Tailwind breakpoints
