# Mynewweb Animations v2 — Design Spec

**Date:** 2026-06-09  
**Status:** Approved  
**Extends:** `2026-06-08-animations-design.md`  
**Library:** GSAP + ScrollTrigger (already loaded via CDN on all pages)

---

## Overview

Extend the existing animation system with 6 new effects to make mynewweb.de feel more alive and impressive. All new code goes into the existing `js/animations.js` and `css/animations.css` — no new files needed.

---

## Animation 7 — Particle Background in Hero (`index.html`)

**Trigger:** On page load (after preloader exits), runs continuously.

**Implementation:**
- Create a `<div id="hero-particles">` inside `.hero` (as first child, behind `.hero__inner` using z-index)
- Generate 30 `<div class="particle">` elements via JS and append them inside `#hero-particles`
- Each particle: width/height 3–6px (random), background `#3b82f6`, border-radius 50%, opacity 0.15–0.4 (random), absolute positioned at random x/y within the hero bounds
- GSAP animates each particle on an infinite loop: `y` oscillates ±20–40px, `x` oscillates ±10–20px, duration 4–8s (random), ease `sine.inOut`, repeat `-1`, yoyo `true`
- Particles do not interact with mouse

**CSS:**
```css
#hero-particles { position: absolute; inset: 0; overflow: hidden; pointer-events: none; z-index: 0; }
.hero__inner { position: relative; z-index: 1; }
.particle { position: absolute; border-radius: 50%; background: #3b82f6; }
```

---

## Animation 8 — 3D Tilt on Cards (all pages with `.card`)

**Trigger:** `mousemove` on each `.card` element. Resets on `mouseleave`.

**Implementation:**
- Add `mousemove` and `mouseleave` listeners to every `.card` element via `document.querySelectorAll('.card')`
- On `mousemove`: calculate cursor position relative to card center, map to `rotateX` (max ±12°) and `rotateY` (max ±12°), apply via `gsap.to(card, { rotateX, rotateY, duration: 0.4, ease: 'power1.out', transformPerspective: 800 })`
- On `mouseleave`: `gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' })`
- Skip on mobile (check `window.innerWidth < 768` in event listener)

**CSS:**
```css
.card { transform-style: preserve-3d; will-change: transform; }
```

---

## Animation 9 — Scroll-Reveal on remaining pages

**Trigger:** ScrollTrigger, `start: 'top 85%'`, `once: true` on each target element.

**Targets on `preise.html`:**
- `.pricing__card` elements (stagger 0.15s, y: 40 → 0, opacity 0 → 1, duration 0.6s)
- Section tags, titles (y: 20 → 0, opacity 0 → 1, duration 0.5s)

**Targets on `kontakt.html`:**
- Kontakt form fields and labels (y: 20 → 0, opacity 0 → 1, stagger 0.1s)
- Any `.card` elements

**Targets on `ueber-mich.html`:**
- Team/profile cards, section headings

**Implementation:** A reusable `initScrollReveal()` function added to `animations.js` that runs `document.querySelectorAll('.fade-in')` elements (existing class already on many elements) and any elements with `data-reveal` attribute, plus explicit selectors for `.pricing__card`. Remove `fade-in` CSS class behavior via JS (same pattern as process steps in v1).

Note: The `.fade-in` CSS class already triggers a CSS animation in `style.css`. JS must remove this class and replace with GSAP control to avoid conflicts.

---

## Animation 10 — Number Counter on Preise (`preise.html`)

**Trigger:** When `.pricing__price` elements enter viewport (ScrollTrigger, `start: 'top 80%'`, `once: true`).

**Implementation:**
- Target the two `.pricing__price` divs containing numbers (499€ and 999€) and the 29€ hosting price
- Each `.pricing__price` stores the target number as a `data-count` attribute added via JS at init time (parse from text content)
- GSAP animates a counter object `{ val: 0 }` to `{ val: targetNumber }` over 1.5s, ease `power2.out`, and on each update renders `Math.round(obj.val) + '€'` (with "ab " prefix for 499/999, "/ Monat" suffix for 29)
- The "Auf Anfrage" pricing card is skipped (no number to count)
- The `<span class="pricing__from">ab</span>` prefix is preserved separately — only the number portion animates

**HTML change:** None — numbers are parsed from existing text content at runtime.

---

## Animation 11 — Magnetic Buttons (all `.btn-primary`)

**Trigger:** `mousemove` within 80px of button center. Resets on `mouseleave`.

**Implementation:**
- Add `mousemove` listener to `document` (not per-button, for performance)
- For each `.btn-primary`, check if cursor is within 80px radius of button center
- If within radius: calculate offset vector from button center to cursor, apply 25% of that distance as GSAP transform (`x`, `y`, max 20px), `duration: 0.3, ease: 'power2.out'`
- On `mouseleave` (per button): `gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' })`
- Skip on mobile (`window.innerWidth < 768`)

---

## Animation 12 — Hero Parallax (`index.html`)

**Trigger:** ScrollTrigger on `.hero` section, scrub: `true`.

**Implementation:**
- `.hero__inner` moves at 30% of scroll speed: `gsap.to('.hero__inner', { y: 80, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } })`
- `#hero-particles` moves at 50% of scroll speed (faster than content, slower than scroll)
- Result: content and particles move at different rates creating depth

---

## Files Changed

| File | Change |
|---|---|
| `js/animations.js` | Add 6 new animation blocks inside `initAnimations()` |
| `css/animations.css` | Add particle, tilt, and reveal CSS |
| `preise.html` | Add `data-count` is not needed (parsed at runtime) — no HTML changes |

All HTML pages already have GSAP CDN and `animations.js` loaded from v1.
