# AI Risk Navigator — landing page

A cinematic, single-page marketing site built with React, Vite, Tailwind CSS and Framer Motion.

## Run it on your computer

1. Install [Node.js](https://nodejs.org) (version 18 or newer).
2. Open a terminal in this folder and run:

   ```bash
   npm install
   npm run dev
   ```

3. Open the address it prints (usually http://localhost:5173).

To make a production build, run `npm run build`; the finished site lands in `dist/`.

## Where to change things

| What | File |
|---|---|
| Headline, intro text, buttons | `src/components/Hero.tsx` |
| The six risk domains | `src/components/Domains.tsx` |
| The four method steps | `src/components/Method.tsx` |
| "What you get" list and example matrix | `src/components/Deliverables.tsx` |
| Email form and footer | `src/components/RequestCta.tsx` |
| Colours, glass effect, animations | `src/index.css` |
| Background video and poster | `public/hero.mp4`, `public/hero-poster.jpg` |

## Before going live

- **The email form is not connected yet.** It shows a thank-you message but doesn't send anything.
  Connect it to a form service (for example Formspree or your CRM) in `src/components/RequestCta.tsx`.
- The background video is an original, generated contour-line loop, so there are no licence issues.
  Swap it for your own footage any time by replacing `public/hero.mp4` and `public/hero-poster.jpg`.
