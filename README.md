# Egg Bowl landing page

Vite + React 19 + Tailwind CSS v4 + GSAP (ScrollTrigger) + Lenis.

```bash
npm install
npm run dev      # local dev server
npm run build    # production build in dist/
```

Deploys to Vercel with the default Vite settings (build: `npm run build`, output: `dist`).

## Before going live

- Edit `src/config.js`: set `whatsapp` (country code + number, digits only) and optionally `phoneDisplay`, `email`, `address`. The order form sends a pre-filled WhatsApp message to that number.
- Images live in `src/assets/` (cropped from the supplied logo, poster, pack mockups and labels). Swap them with higher resolution originals or real photography for a sharper result.
- Fonts (Fraunces, Figtree, Kaushan Script) load from Google Fonts in `index.html`.

## Structure

- `src/lib/motion.js` sets up GSAP + Lenis (smooth scroll, reduced-motion aware).
- `src/components/*` has one file per section: Hero, Marquee, Statement, Power (pinned yolk reveal), Packs (6/10 toggle), Eggs (horizontal scroll), Why, Journey, Audience, Order, Footer.
- Colors and fonts are tokens in `src/index.css` under `@theme`.
