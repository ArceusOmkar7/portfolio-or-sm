"use client"

import { useState, useCallback } from "react"
import Image from "next/image"

export function ProjectCarousel({ images, name }: { images: string[]; name: string }) {
  const [idx, setIdx] = useState(0)
  const [lightboxOpen, setLightboxOpen] = useState(false)

  const prev = useCallback(() => {
    setIdx((i) => (i === 0 ? images.length - 1 : i - 1))
  }, [images.length])

  const next = useCallback(() => {
    setIdx((i) => (i === images.length - 1 ? 0 : i + 1))
  }, [images.length])

  return (
    <>
      <div className="group relative overflow-hidden rounded-xl border-2 border-black bg-card pb-6 shadow-brutal">
        <button
          className="block w-full cursor-pointer text-left"
          onClick={() => setLightboxOpen(true)}
          type="button"
        >
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{ transform: `translateX(-${idx * 100}%)` }}
          >
            {images.map((src, i) => (
              <div key={i} className="relative aspect-video w-full shrink-0 bg-card">
                <Image
                  src={src}
                  alt={`${name} screenshot ${i + 1}`}
                  fill
                  className="rounded object-contain p-4 pointer-events-none"
                />
              </div>
            ))}
          </div>
        </button>

        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev() }}
              className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full border-2 border-black bg-card p-1.5 text-foreground opacity-0 shadow-[2px_2px_0px_#000] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95 group-hover:opacity-100"
              aria-label="Previous image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next() }}
              className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border-2 border-black bg-card p-1.5 text-foreground opacity-0 shadow-[2px_2px_0px_#000] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95 group-hover:opacity-100"
              aria-label="Next image"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            <div className="absolute bottom-2 left-1/2 flex -translate-x-1/2 items-center gap-1.5">
              <div className="relative flex gap-1.5">
                {images.map((_, i) => (
                  <button
                    key={i}
                    onClick={(e) => { e.stopPropagation(); setIdx(i) }}
                    className={`size-2 rounded-full border border-black transition-all duration-300 ${
                      i === idx ? "bg-foreground" : "bg-card hover:bg-muted"
                    }`}
                    aria-label={`Go to image ${i + 1}`}
                  />
                ))}
              </div>
            </div>
          </>
        )}
      </div>

      {lightboxOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setLightboxOpen(false)}
        >
          <div
            className="flex items-center justify-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-[90vh] w-[90vw] overflow-hidden rounded-xl border-2 border-black bg-card shadow-brutal">
              <Image
                src={images[idx]}
                alt={`${name} screenshot ${idx + 1}`}
                fill
                className="object-contain p-4"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={(e) => { e.stopPropagation(); prev() }}
                    className="absolute top-1/2 left-2 -translate-y-1/2 rounded-full border-2 border-black bg-card p-2 text-foreground shadow-[2px_2px_0px_#000] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95"
                    aria-label="Previous image"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); next() }}
                    className="absolute top-1/2 right-2 -translate-y-1/2 rounded-full border-2 border-black bg-card p-2 text-foreground shadow-[2px_2px_0px_#000] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95"
                    aria-label="Next image"
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-5">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}

              <button
                onClick={() => setLightboxOpen(false)}
                className="absolute top-2 right-2 rounded-full border-2 border-black bg-card p-1.5 text-foreground shadow-[2px_2px_0px_#000] transition-all duration-200 hover:scale-110 hover:bg-muted active:scale-95"
                aria-label="Close"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="size-4">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
