# Khayaal Foundation Website

A premium, mobile-first NGO website for Khayaal Foundation — a youth-led social impact initiative in India.

## Getting Started

**Requirements:** Node.js 18+ and npm (or pnpm / yarn)

```bash
# Install dependencies
npm install

# Start development server (opens at http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Stack

- React 18 + TypeScript
- Vite 6
- Tailwind CSS v4
- Framer Motion (animations)
- shadcn/ui components (Radix UI primitives)
- Wouter (routing)

## Project Structure

```
src/
  assets/          # All 6 Khayaal Foundation photos
  components/ui/   # shadcn/ui components (Button, Input, Textarea, etc.)
  hooks/           # use-toast hook
  lib/             # Utility functions (cn)
  pages/
    home.tsx       # Main landing page (all 12 sections)
    not-found.tsx  # 404 page
  App.tsx          # Router setup
  index.css        # Global styles + brand theme
  main.tsx         # Entry point
```

## Customisation

- Brand colors live in `src/index.css` under `:root`
- Primary Pink: `#F45B9A` (`--primary: 335 87% 66%`)
- All photos are in `src/assets/` — replace to update imagery
- Contact details can be updated in `src/pages/home.tsx` (Contact section)
