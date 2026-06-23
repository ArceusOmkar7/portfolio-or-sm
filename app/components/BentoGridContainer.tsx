import * as React from "react"

import { cn } from "@/lib/utils"

type GridSize = number | string

export interface BentoGridContainerProps
	extends React.HTMLAttributes<HTMLDivElement> {
	/** Number of columns in the grid */
	columns?: number
	/** Number of rows in the grid (optional) */
	rows?: number
	/** Gap between grid items (number for px, string for CSS value) */
	gap?: GridSize
	/** Height of each row (optional) */
	rowHeight?: GridSize
	/** If true, uses grid-flow-dense to fill holes in the grid */
	dense?: boolean
}

/**
 * Utility to convert numeric values to pixel strings
 */
function toCssSize(value?: GridSize) {
	if (value === undefined) return undefined
	return typeof value === "number" ? `${value}px` : value
}

/**
 * BentoGridContainer provides a responsive CSS Grid layout specialized for Bento-style designs.
 * It simplifies grid configuration while allowing for Tailwind class overrides.
 */
function BentoGridContainer({
	columns,
	rows,
	gap = "1rem",
	rowHeight,
	dense = true,
	className,
	style,
	...props
}: BentoGridContainerProps) {
	const gridStyle: React.CSSProperties = {
		// Set grid-template-columns only if columns prop is provided
		...(columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {}),
		// Set grid-template-rows only if rows prop is provided
		...(rows ? { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` } : {}),
		// Set auto-rows height if rowHeight prop is provided
		...(rowHeight ? { gridAutoRows: toCssSize(rowHeight) } : {}),
		gap: toCssSize(gap),
		...style,
	}

	return (
		<div
			data-slot="bento-grid"
			className={cn(
				"grid w-full", 
				dense && "grid-flow-dense", 
				className
			)}
			style={gridStyle}
			{...props}
		/>
	)
}

export { BentoGridContainer }
