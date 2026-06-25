import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { Slot } from "radix-ui"

import { cn } from "@/lib/utils"

/**
 * Span value for grid columns or rows.
 * Can be a number (e.g., 2) or "auto".
 */
type SpanValue = number | "auto"

const bentoCardVariants = cva(
	"relative overflow-hidden rounded-2xl border-2 border-black bg-card text-card-foreground shadow-brutal transition-all duration-200",
	{
		variants: {
			padding: {
				none: "",
				sm: "p-4",
				md: "p-6",
				lg: "p-8",
			},
			interactive: {
				true: "hover:shadow-brutal-hover hover:-translate-y-1 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring active:translate-y-[3px] active:shadow-[2px_2px_0px_#000]",
				false: "",
			},
			surface: {
				solid: "bg-card",
				glass: "bg-card/90 backdrop-blur-sm",
				accent: "bg-primary text-primary-foreground",
			},
		},
		defaultVariants: {
			padding: "md",
			interactive: false,
			surface: "solid",
		},
	}
)

export interface BentoCardProps
	extends React.HTMLAttributes<HTMLDivElement>,
		VariantProps<typeof bentoCardVariants> {
	/** Number of columns the card should span */
	colSpan?: SpanValue
	/** Number of rows the card should span */
	rowSpan?: SpanValue
	/** If true, the card will render its child as the root element (using Radix Slot) */
	asChild?: boolean
}

/**
 * Utility to convert span value to CSS grid property
 */
function toSpan(value?: SpanValue) {
	if (!value || value === "auto") return undefined
	return `span ${value}`
}

/**
 * BentoCard is a flexible container for items within a BentoGrid.
 * It supports various padding levels, interactive states, and surfaces.
 */
const BentoCard = React.forwardRef<HTMLDivElement, BentoCardProps>(
	(
		{
			colSpan,
			rowSpan,
			asChild = false,
			className,
			style,
			padding,
			interactive,
			surface,
			...props
		},
		ref
	) => {
		const Comp = asChild ? Slot.Root : "div"
		
		// Combine explicit spans with any custom styles
		const spanStyle: React.CSSProperties = {
			...(colSpan ? { gridColumn: toSpan(colSpan) } : {}),
			...(rowSpan ? { gridRow: toSpan(rowSpan) } : {}),
			...style,
		}

		return (
			<Comp
				ref={ref}
				data-slot="bento-card"
				className={cn(
					bentoCardVariants({ padding, interactive, surface }),
					className
				)}
				style={spanStyle}
				{...props}
			/>
		)
	}
)

BentoCard.displayName = "BentoCard"

export { BentoCard, bentoCardVariants }
