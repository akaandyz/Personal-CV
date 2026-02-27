# Portfolio Site — Specification

## Sections

| ID | Label | Content |
|----|-------|---------|
| `top` | Home | Name, title, tagline, hero visual |
| `about` | About | Short bio paragraph |
| `skills` | Skills | Grouped skill tags |
| `experience` | Experience | Timeline of roles |
| `projects` | Projects | Card grid with links |
| `contact` | Contact | Links only (no form) — email, GitHub, LinkedIn |

---

## Sidebar

### Desktop (≥ 1024px)
- Fixed/sticky to the left edge, full viewport height.
- Width: `14rem`.
- Shows icon + label for each nav item.
- Active section is highlighted via scrollspy.
- Logo / initials at the top.

### Mobile (< 1024px)
- Sidebar is hidden; replaced by a top bar with a hamburger button.
- Hamburger opens a drawer (slides in from left).
- Drawer overlays content with a semi-transparent backdrop.
- Drawer closes on nav-item click or backdrop click.
- Focus is trapped inside the drawer while open (accessibility).

### Nav Items
Each item: icon (inline SVG or Lucide) + text label.

```
[Home icon]      Home
[User icon]      About
[Zap icon]       Skills
[Briefcase icon] Experience
[Code icon]      Projects
[Mail icon]      Contact
```

---

## Scrollspy

- Uses `IntersectionObserver` (no library).
- Threshold: `0.4` — section is "active" when 40 % is in view.
- Root margin: `-10% 0px -50% 0px` to bias toward section entering from top.
- Active section ID is stored in React state and synced to sidebar highlight.
- Clicking a nav item smooth-scrolls to that section (`scroll-behavior: smooth` via CSS,
  disabled when `prefers-reduced-motion: reduce` is set — uses instant jump instead).

---

## Theme System

Themes are applied by setting a `data-theme` attribute on `<html>`.

```html
<html data-theme="bjork-minimal">
```

### CSS Variable Contract

```css
/* Required variables every theme must define */
--bg-base        /* page background */
--bg-surface     /* card / sidebar background */
--bg-surface-2   /* hover / subtle variant */
--text-primary   /* body text */
--text-secondary /* muted / label text */
--text-accent    /* links, active items */
--border         /* dividers */
--ring           /* focus ring */
--shadow         /* box-shadow value */
```

### Theme: `bjork-minimal`

Inspired by post-industrial minimalism. Dark, stark, typographic.

```css
[data-theme="bjork-minimal"] {
  --bg-base:        #0a0a0a;
  --bg-surface:     #111111;
  --bg-surface-2:   #1a1a1a;
  --text-primary:   #e8e8e8;
  --text-secondary: #888888;
  --text-accent:    #c8ff00; /* acid chartreuse */
  --border:         #2a2a2a;
  --ring:           #c8ff00;
  --shadow:         0 2px 16px rgba(0,0,0,0.6);
}
```

### Theme: `bjork-light-surreal`

Pearlescent, airy, experimental. Soft iridescent tones.

```css
[data-theme="bjork-light-surreal"] {
  --bg-base:        #f5f3f0;
  --bg-surface:     #fdfcfb;
  --bg-surface-2:   #ede9e4;
  --text-primary:   #1a1718;
  --text-secondary: #7a6e72;
  --text-accent:    #7c3aed; /* violet */
  --border:         #ddd8d0;
  --ring:           #7c3aed;
  --shadow:         0 2px 20px rgba(124,58,237,0.08);
}
/* Pearlescent shimmer applied via CSS gradient on bg-surface */
```

### Theme Toggle

- Persisted in `localStorage` under key `theme`.
- Defaults to `bjork-minimal` if no preference stored.
- Toggle button in sidebar footer (icon only, labeled via `aria-label`).

---

## Motion Rules

```css
@media (prefers-reduced-motion: reduce) {
  /* Disable all transitions and animations */
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  /* Smooth scroll replaced with instant scroll in JS */
}
```

- No animation libraries (Framer Motion, GSAP, etc.).
- CSS transitions only, authored by hand.
- Entrance animations (fade-in on scroll) must check `prefers-reduced-motion` before running.
- Drawer open/close uses `transition: transform` — disabled under reduced-motion.

---

## Performance Rules

- No heavy libraries. Allowed:
  - React 19 / Next.js 15 (static export)
  - Tailwind CSS (purged)
  - Lucide React (tree-shaken, icon-by-icon imports only)
- No animation libraries.
- No large icon sets imported wholesale.
- Images: use `next/image` with explicit `width`/`height`. Prefer `.webp` or `.avif`.
- Fonts: self-hosted via `next/font`. Maximum 2 font families.
- Bundle target: ≤ 150 kB JS (gzipped) for initial load.
- No client-side data fetching — all content from static JSON at build time.

---

## GitHub Pages Constraints

- `next.config.ts` must set:
  ```ts
  output: 'export'
  basePath: '/portfolio' // or repo name
  images: { unoptimized: true }
  ```
- No API routes, no server components that fetch at runtime.
- All routes must be statically generated (`generateStaticParams` where needed).
- Deploy via `gh-pages` branch or GitHub Actions (`actions/deploy-pages`).
- `public/` assets referenced with `basePath` prefix or via `next/image`.

---

## Accessibility Baseline

- Skip-to-main link at top of DOM.
- All interactive elements reachable by keyboard (Tab order follows DOM order).
- Focus ring uses `--ring` variable; never `outline: none` without a visible alternative.
- ARIA roles: `<nav aria-label="Main navigation">`, `role="main"` on main content.
- Drawer: `aria-expanded`, `aria-controls`, focus trap, `Escape` key closes.
- Color contrast: AA minimum for text/bg pairs in both themes.
- `lang="en"` on `<html>`.
