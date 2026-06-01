import * as React from "react"

import { cn } from "@/lib/utils"

type GridSize = number | string

export interface BentoGridContainerProps
	extends React.HTMLAttributes<HTMLDivElement> {
	columns?: number
	rows?: number
	gap?: GridSize
	rowHeight?: GridSize
	dense?: boolean
}

function toCssSize(value?: GridSize) {
	if (value === undefined) return undefined
	return typeof value === "number" ? `${value}px` : value
}

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
		...(columns ? { gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` } : {}),
		...(rows ? { gridTemplateRows: `repeat(${rows}, minmax(0, 1fr))` } : {}),
		...(rowHeight ? { gridAutoRows: toCssSize(rowHeight) } : {}),
		gap: toCssSize(gap),
		...style,
	}

	return (
		<div
			data-slot="bento-grid"
			className={cn("grid w-full", dense && "grid-flow-dense", className)}
			style={gridStyle}
			{...props}
		/>
	)
}

export { BentoGridContainer }
