# Project Overview

This is a modern Next.js portfolio/template project built with React 19, Tailwind CSS v4, and shadcn/ui. It features a responsive, grid-based layout using custom Bento components.

## Core Technologies

- **Framework:** [Next.js](https://nextjs.org/) (App Router)
- **Library:** [React 19](https://react.dev/)
- **Styling:** [Tailwind CSS v4](https://tailwindcss.com/)
- **UI Components:** [shadcn/ui](https://ui.shadcn.com/) (using Radix UI)
- **Icons:** [Lucide React](https://lucide.dev/)
- **Theming:** [next-themes](https://github.com/pacocoursey/next-themes)
- **Fonts:** [Google Fonts](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) (Outfit, Raleway, Geist Mono)

## Directory Structure

- \`app/\`: Contains the application routes and layout (Next.js App Router).
  - \`components/\`: Custom business/layout components (e.g., \`BentoCard\`, \`BentoGridContainer\`).
- \`components/ui/\`: shadcn/ui base components.
- \`lib/\`: Utility functions and shared logic (e.g., \`utils.ts\` for Tailwind merge).
- \`hooks/\`: Custom React hooks.
- \`public/\`: Static assets.

## Building and Running

### Development
\`\`\`bash
bun dev
# or
npm run dev
\`\`\`

### Build
\`\`\`bash
bun build
# or
npm run build
\`\`\`

### Other Commands
- \`lint\`: Run ESLint for code quality checks.
- \`format\`: Format code using Prettier.
- \`typecheck\`: Run TypeScript compiler check without emitting files.

## Development Conventions

- **Component Organization:** 
  - Generic UI components should be added via shadcn CLI and reside in \`components/ui/\`.
  - Feature-specific or layout-specific components should be placed in \`app/components/\`.
- **Styling:** 
  - Use Tailwind CSS v4 utility classes.
  - Custom grid layouts are implemented using the \`BentoGridContainer\` and \`BentoCard\` components.
  - Follow the \`cn()\` utility pattern for conditional class merging.
- **Path Aliases:**
  - \`@/components/*\`: UI and shared components.
  - \`@/lib/*\`: Utility functions.
  - \`@/hooks/*\`: Custom hooks.
  - \`@/app/*\`: Application routes and logic.
- **Responsive Design:** Prioritize mobile-first responsive design using Tailwind's breakpoint prefixes.
