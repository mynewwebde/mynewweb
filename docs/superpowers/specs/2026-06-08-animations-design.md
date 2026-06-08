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
2. MNW logo SVG draws in: circle strokes from 0 to full, then letters fade in
3. After 0.8s, overlay fades out and slides up — page content becomes visible
4. Hero Reveal (if on index.html) starts immediately after preloader exits

**HTML:** A `<div id="preloader">` with the MNW SVG is added to every page's `<body>` as the first child.  
**CSS:** `#preloader` is `position: fixed; inset: 0; z-index: 9999`.

---

## Animation 2 — Page Transitions (all pages)

**Trigger:** On click of any internal `<a>` link.  
**Duration:** 0.4s out + 0.4s in.

**Sequence:**
1. User clicks a link — default navigation is prevented
2. A full-screen overlay (`#page-transition`) fades in (opacity 0 → 1, 0.4s)
3. After fade completes, `window.location.href` navigates to the new page
4. On the new page, the preloader runs first, then the overlay fades out

**Implementation:** Event listener on all `<a>` tags that have `href` starting with a local path (not `mailto:`, `tel:`, or external URLs).

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

**Note:** The existing `.fade-in` CSS class on `.process__step` elements is replaced by GSAP control. The class is removed via JS on init to avoid conflicts.

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

**HTML change:** The existing `.portfolio__grid` is replaced with a `.portfolio__slider` container plus prev/next buttons.

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

**HTML change:** Each service section gets chip `<span>` elements added with class `.feature-chip`, initially `opacity: 0; position: absolute`.

---

## Technical Constraints

- **GSAP license:** Free for non-commercial use. ScrollSmoother is a Club GSAP plugin — use the free `gsap.min.js` + `ScrollTrigger.min.js` CDN links. ScrollSmoother requires Club GSAP. **Alternative:** Replace ScrollSmoother with `scroll-behavior: smooth` in CSS + a lightweight custom smooth-scroll function (~30 lines of JS).
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
