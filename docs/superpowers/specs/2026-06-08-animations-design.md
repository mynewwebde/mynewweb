# Mynewweb Animations — Design Spec

**Date:** 2026-06-08  
**Status:** Approved  
**Library:** GSAP + ScrollTrigger + ScrollSmoother (CDN)  
**Trigger:** Scroll-based (automatic), except Preloader (on page load) and Page Transitions (on link click)

---

## Overview

Add immersive animations to the mynewweb.de portfolio site to demonstrate web development capabilities to potential clients. The goal is "WOW without overload" — 1–2 dramatic moments paired with subtle scroll-reveals everywhere else.

All animations use GSAP loaded via CDN. No npm, no build step. Existing `style.css` and `script.js` remain untouched.

---

## New Files

| File | Purpose |
|---|---|
| `js/animations.js` | All GSAP animation logic |
| `css/animations.css` | Animation-specific CSS (transforms, keyframes, visibility) |

Both files are added to all affected HTML pages via `<link>` and `<script>` tags.

---

## Animation 1 — Preloader (all pages)

**Trigger:** On every page load, before content is visible.  
**Duration:** ~1.5 seconds total.

**Sequence:**
1. Full-screen overlay (`#preloader`) covers the page — background `#0f172a`
2. A new inline SVG (built specifically for animation, NOT the existing `images/logo-mnw.svg`) draws in:
   - A circle with `stroke-dasharray` / `stroke-dashoffset` animates from 0 to full circumference (0.5s)
   - "MNW" letters fade in after the circle completes (0.3s)
3. After 0.8s, overlay fades out (opacity 1 → 0, 0.4s) — page content becomes visible
4. Hero Reveal (if on `index.html`) starts immediately after preloader exits via GSAP `.then()` callback

**HTML:** A `<div id="preloader">` containing an inline `<svg>` is added as the first child of `<body>` on every page. The SVG consists of: a `<circle>` element with `stroke-dasharray` equal to its circumference, and a `<text>` or three `<tspan>` elements for M, N, W.

**CSS:** `#preloader` is `position: fixed; inset: 0; z-index: 9999; display: flex; align-items: center; justify-content: center; background: #0f172a`.

---

## Animation 2 — Page Transitions (all pages)

**Trigger:** On click of any internal `<a>` link.  
**Duration:** 0.4s out + 0.4s in.

**Sequence:**
1. User clicks a link — default navigation is prevented via `e.preventDefault()`
2. A full-screen overlay (`#page-transition`, `position: fixed; inset: 0; z-index: 9998; background: #0f172a; opacity: 0; pointer-events: none`) fades in (opacity 0 → 1, 0.4s)
3. After the fade completes, `window.location.href` is set to navigate to the new page

**On the new page:** The `#page-transition` element does NOT appear — it stays hidden (`opacity: 0`). The **preloader** (Animation 1, `z-index: 9999`) handles the entry experience. This means: exit is handled by page-transition on the departing page, entry is handled by the preloader on the arriving page. They are independent and never overlap.

**Implementation:** Event listener on all `<a>` tags where `href` does not start with `mailto:`, `tel:`, `http`, or `#`. Added in `animations.js`.

---

## Animation 3 — Hero Text Reveal (`index.html`)

**Trigger:** Immediately after preloader exits (on page load).  
**Duration:** ~1.2 seconds total.

**Sequence (GSAP Timeline):**
1. `.section__tag` — fades in from below (y: 20 → 0, opacity 0 → 1, 0.4s)
2. `.hero__title` words — each word wrapped in a `<span>`, staggers in from below (y: 40 → 0, 0.05s stagger)
3. `.hero__subtitle` — slides up from below (y: 30 → 0, 0.5s, slight delay)
4. `.hero__actions` buttons — fade in with scale (scale: 0.9 → 1, 0.4s, stagger 0.1s)

**Implementation:** JS splits `.hero__title` text into word-spans at runtime. No changes to HTML source needed.

---

## Animation 4 — Process Scroll-Reveal (`index.html`)

**Trigger:** Each `.process__step` enters the viewport (ScrollTrigger, `start: "top 80%"`).  
**Duration:** 0.6s per step.

**Sequence:**
- Steps 01 and 03 (left column): slide in from the left (x: -60 → 0)
- Steps 02 and 04 (right column): slide in from the right (x: 60 → 0)
- All steps: opacity 0 → 1
- Stagger: 0.15s between steps

**Grid layout:** `.process__grid` renders as `grid-template-columns: repeat(2, 1fr)` (verified in `style.css`). Steps 01 and 03 are in the left column (`:nth-child(odd)`), steps 02 and 04 in the right column (`:nth-child(even)`). The direction is determined in JS via: `const isLeft = index % 2 === 0` (0-indexed).

**Note:** The existing `.fade-in` CSS class on `.process__step` elements is removed via JS on init (`el.classList.remove('fade-in')`) to prevent CSS animation conflicts with GSAP.

---

## Animation 5 — 3D Portfolio Slider (`portfolio.html`)

**Trigger:** Replaces the static project grid. Active on page load.

**Layout:**
- 3 project cards displayed in a CSS perspective container
- Active card: center, full size, `rotateY(0deg)`, full opacity, blue glow border
- Left card: `rotateY(45deg)`, `translateX(-120px)`, 60% opacity, smaller scale
- Right card: `rotateY(-45deg)`, `translateX(120px)`, 60% opacity, smaller scale

**Interaction:**
- Left/right arrow buttons to cycle through projects
- GSAP animates the card positions/rotations on each click (0.5s ease)
- On mobile: touch swipe supported via pointer events

**Scroll-in animation:** When the slider section enters viewport, it starts with all cards at `rotateY(180deg)` and spins to final position (0.8s, ease-out).

**Existing HTML structure** (from `portfolio.html`): A `<div class="portfolio__grid">` containing 3 `<div class="portfolio__item card fade-in">` elements. Each item has a `.portfolio__image` (with `<img>` and `.portfolio__overlay` containing a demo link button) and a `.portfolio__info` (with `<h3>` and `<p>`).

**HTML change:** The `.portfolio__grid` div is replaced with:
```html
<div class="portfolio__slider">
  <button class="portfolio__arrow portfolio__arrow--prev">&#8592;</button>
  <div class="portfolio__stage"> <!-- perspective container -->
    <!-- same 3 .portfolio__item elements, class="portfolio__item card" (fade-in removed) -->
  </div>
  <button class="portfolio__arrow portfolio__arrow--next">&#8594;</button>
</div>
```

---

## Animation 6 — Icon Explosion (`leistungen.html`)

**Trigger:** When each service icon enters the viewport (ScrollTrigger, `start: "top 75%"`).  
**Duration:** 0.8s total per service.

**Sequence:**
1. Icon (`<i class="fa-...">`) scales up briefly (scale: 1 → 1.3 → 1, 0.3s) — the "charge"
2. Icon flashes white briefly
3. 4–5 feature chips (`.feature-chip`) fly outward from the icon center in different directions (x/y offsets, stagger 0.08s, ease-out)
4. Chips settle into their final positions around/below the icon
5. Each chip fades from opacity 0 to 1 during flight

**Feature chips per service:**
- **Webentwicklung:** Responsive · SEO-optimiert · Schnell · DSGVO-konform · Individuell
- **Redesign:** Modernes Design · Bessere UX · Markenkonsistent · Mobile-First
- **Hosting & Wartung:** 99.9% Uptime · Automatische Updates · SSL · Support

**HTML change:** Each service icon wrapper (e.g. `<i class="fa-solid fa-laptop-code card__icon">`) is wrapped in a new `<div class="icon-explode-wrapper">` with `position: relative; display: inline-block`. Below the icon, a `<div class="feature-chips">` contains the chip `<span class="feature-chip">` elements.

**Initial state (CSS):** `.feature-chip { opacity: 0; transform: translate(0, 0) scale(0); position: absolute; top: 50%; left: 50%; }` — all chips start at the icon center.

**Final state (after animation):** Chips transition to `position: static` within the `.feature-chips` flex container (row-wrap). GSAP animates each chip from its absolute start position to its natural static position using `gsap.to()` with staggered `x`/`y` offsets (e.g. chip 1: `x: -80, y: -40`; chip 2: `x: 0, y: -60`; chip 3: `x: 80, y: -40`; chip 4: `x: -50, y: 20`; chip 5: `x: 50, y: 20`). After the animation, `position: static` is restored so the chips flow naturally in the layout.

---

## Technical Constraints

- **GSAP CDN URLs** (add to `<head>` of all pages):
  ```html
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  ```
- **ScrollSmoother:** This is a Club GSAP plugin (paid) and is NOT available on the free CDN. **Replace with:** `scroll-behavior: smooth` in `animations.css` + a 30-line custom `SmoothScroll` class in `animations.js` that uses `requestAnimationFrame` to lerp the scroll position (lerp factor: 0.08). This achieves the same buttery feel without any paid library.
- **Performance:** All animations use `will-change: transform` and `gsap.set()` for initial states to avoid layout thrash.
- **Reduced motion:** Wrap all GSAP animations in `if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches)` check.
- **Dark/Light mode:** Animations are mode-agnostic (transform/opacity only, no color animations). Chip colors use CSS variables from `style.css`.

---

## Files Changed

| File | Change |
|---|---|
| `index.html` | Add `animations.css` link, `animations.js` script, `#preloader` div, `#page-transition` div |
| `portfolio.html` | Same as above + replace `.portfolio__grid` with `.portfolio__slider` |
| `leistungen.html` | Same as above + add `.feature-chip` spans to each service |
| `js/animations.js` | New — all GSAP logic |
| `css/animations.css` | New — animation CSS |

All other pages (`preise.html`, `kontakt.html`, `ueber-mich.html`, `impressum.html`, `datenschutz.html`) get only the preloader and page transition (minimal change: add 2 tags to `<head>`/`<body>`).
