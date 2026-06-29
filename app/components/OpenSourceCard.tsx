"use client"

import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog"
import { XIcon } from "lucide-react"

export function OpenSourceCard() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="flex w-full cursor-pointer flex-col gap-2 text-left">
          <h3 className="font-heading text-xl font-bold tracking-tight text-foreground">
            Open Source
          </h3>
          <p className="font-heading text-lg font-bold tracking-tight text-foreground">
            CKAN
          </p>
          <p className="text-xs leading-relaxed text-muted-foreground">
            Contributed to CKAN - the open data platform powering data.gov,
            data.gov.uk, and 100+ government portals worldwide.
          </p>
          <p className="mt-auto flex items-center gap-1 text-xs text-muted-foreground">
            CKAN ·{" "}
            <a
              href="https://github.com/ckan/ckan/pull/9010"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold underline underline-offset-2 transition-colors hover:text-foreground"
            >
              PR #9010
            </a>{" "}
            · Merged
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="ml-0.5 size-3 opacity-50"
            >
              <path d="M7 7h10v10M17 7L7 17" />
            </svg>
          </p>
        </div>
      </DialogTrigger>
      <DialogContent className="!max-w-[85vw] overflow-hidden border-2 border-black bg-card p-0 !shadow-brutal ring-0">
        <DialogTitle className="sr-only">CKAN PR #9010</DialogTitle>

        <DialogClose asChild>
          <button
            type="button"
            className="absolute right-5 top-5 z-10 flex size-8 items-center justify-center rounded-full border-2 border-black bg-background text-lg font-bold text-foreground !shadow-brutal transition-all hover:-translate-y-0.5 hover:!shadow-brutal-hover active:translate-y-[3px] active:!shadow-[2px_2px_0px_#000]"
          >
            <XIcon className="size-4" />
          </button>
        </DialogClose>

        <div className="flex max-h-[85vh] flex-col overflow-y-auto p-6 sm:p-10">

          <div className="flex items-center justify-between gap-4">
            <span className="font-heading text-2xl font-bold text-foreground">
              CKAN
            </span>
            <span className="flex shrink-0 items-center gap-1.5 rounded-full border border-black bg-primary px-3 py-1 text-[11px] font-bold tracking-wide text-primary-foreground shadow-[2px_2px_0px_#000]">
              <span className="size-1.5 rounded-full bg-current" />
              Merged
            </span>
          </div>

          <p className="mt-3 flex items-center gap-1.5 text-sm text-muted-foreground">
            <a
              href="https://github.com/ckan/ckan/pull/9010"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-1 font-semibold underline underline-offset-2 transition-colors hover:text-foreground"
            >
              PR #9010
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                className="size-3.5"
              >
                <path d="M7 7h10v10M17 7L7 17" />
              </svg>
            </a>
          </p>

          <hr className="my-6 border-t-2 border-black/20 dark:border-white/20" />

          <div className="space-y-6 text-sm leading-relaxed text-foreground">
            <section>
              <h4 className="mb-2 font-heading text-base font-bold tracking-tight">
                The Problem
              </h4>
              <p className="text-muted-foreground">
                CKAN has two maintenance commands,{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                  db clean
                </code>{" "}
                and{" "}
                <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                  search-index rebuild
                </code>
                . The issue was that after running either of these, the search
                index could get out of sync with the database, leaving behind
                orphaned entries, datasets that no longer existed in the DB but
                were still showing up in search.
              </p>
            </section>

            <section>
              <h4 className="mb-2 font-heading text-base font-bold tracking-tight">
                What I did
              </h4>
              <ul className="list-disc space-y-1.5 pl-5 text-muted-foreground">
                <li>
                  Made{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                    db clean
                  </code>{" "}
                  automatically clear the search index after cleaning the
                  database
                </li>
                <li>
                  Added orphan removal as default behavior in{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                    search-index rebuild
                  </code>
                </li>
                <li>
                  Added a{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                    --keep-orphans
                  </code>{" "}
                  flag for edge cases where preserving orphans was intentional
                </li>
                <li>
                  Removed a deprecated{" "}
                  <code className="rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs">
                    -c/--clear
                  </code>{" "}
                  flag that was just dead weight
                </li>
                <li>Wrote tests and updated the docs</li>
              </ul>
            </section>

            <section>
              <h4 className="mb-2 font-heading text-base font-bold tracking-tight">
                The Review Process
              </h4>
              <p className="text-muted-foreground">
                The maintainer{" "}
                <a
                  href="https://github.com/wardi"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold underline underline-offset-2 transition-colors hover:text-foreground"
                >
                  @wardi
                </a>{" "}
                pushed back on a few things, where changelog entries go, doc
                changes that weren&apos;t needed, etc. Fair feedback. Iterated,
                pushed the fixes, got it merged.
              </p>
            </section>

            <section>
              <h4 className="mb-2 font-heading text-base font-bold tracking-tight">
                Impact
              </h4>
              <p className="text-muted-foreground">
                CKAN powers data.gov, data.gov.uk, and 100+ government open data
                portals worldwide. Small fix, real codebase.
              </p>
            </section>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
