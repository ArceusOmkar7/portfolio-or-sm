"use client"

import { useEffect } from "react"

export function TransitionTypeSetter() {
  useEffect(() => {
    function handler(e: MouseEvent) {
      const link = (e.target as HTMLElement).closest("a[data-transition]")
      if (!link) return
      document.documentElement.setAttribute(
        "data-transition-type",
        link.getAttribute("data-transition")!
      )
      setTimeout(() => {
        document.documentElement.removeAttribute("data-transition-type")
      }, 400)
    }
    document.addEventListener("click", handler, { capture: true })
    return () => document.removeEventListener("click", handler, { capture: true })
  }, [])

  return null
}
