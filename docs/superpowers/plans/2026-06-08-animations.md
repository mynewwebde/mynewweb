# Mynewweb Animations Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add immersive GSAP animations to mynewweb.de — preloader, page transitions, hero reveal, process scroll-reveal, 3D portfolio slider, and icon explosion on Leistungen.

**Architecture:** Two new files (`js/animations.js`, `css/animations.css`) hold all animation logic and are added to all HTML pages without touching existing `style.css` or `script.js`. GSAP + ScrollTrigger are loaded via CDN. Smooth scroll is implemented as a custom 30-line lerp function (free alternative to ScrollSmoother).

**Tech Stack:** GSAP 3.12.5 + ScrollTrigger (CDN), Vanilla JS, CSS3 transforms/perspective, Intersection Observer (via ScrollTrigger)

---

## File Map

| File | Action | Responsibility |
|---|---|---|
| `css/animations.css` | Create | Preloader, page-transition, chip, slider, smooth-scroll CSS |
| `js/animations.js` | Create | All GSAP animation logic |
| `index.html` | Modify | Add CDN, new files, `#preloader`, `#page-transition` divs |
| `portfolio.html` | Modify | Same + replace `.portfolio__grid` with `.portfolio__slider` |
| `leistungen.html` | Modify | Same + wrap icons + add `.feature-chip` spans |
| `preise.html` | Modify | Add CDN, new files, `#preloader`, `#page-transition` |
| `kontakt.html` | Modify | Same |
| `ueber-mich.html` | Modify | Same |
| `impressum.html` | Modify | Same |
| `datenschutz.html` | Modify | Same |

---

## Task 1: Scaffolding — New files + GSAP on index.html

**Files:**
- Create: `css/animations.css`
- Create: `js/animations.js`
- Modify: `index.html`

- [ ] **Step 1: Create `css/animations.css`** with initial content:

```css
/* Animations — do not edit style.css */

/* Smooth scroll */
html {
  scroll-behavior: smooth;
}

/* Preloader */
#preloader {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #0f172a;
}

/* Page transition overlay */
#page-transition {
  position: fixed;
  inset: 0;
  z-index: 9998;
  background: #0f172a;
  opacity: 0;
  pointer-events: none;
}

/* Hide hero content before reveal animation */
body.is-animating .hero__inner > * {
  opacity: 0;
}
```

- [ ] **Step 2: Create `js/animations.js`** with GSAP registration and a console check:

```js
// animations.js — all GSAP logic for mynewweb.de
gsap.registerPlugin(ScrollTrigger);
console.log('animations.js loaded, GSAP:', gsap.version);
```

- [ ] **Step 3: Add to `index.html` `<head>` — GSAP CDN + animations.css** (after Font Awesome `<link>`):

```html
  <!-- GSAP -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <link rel="stylesheet" href="css/animations.css">
```

- [ ] **Step 4: Add `animations.js` to `index.html`** — just before `</body>`, after `script.js`:

```html
<script src="js/animations.js"></script>
```

- [ ] **Step 5: Verify** — Open `index.html` in browser (via Live Server or `open index.html`). Open DevTools Console. Expected: `animations.js loaded, GSAP: 3.12.5` — no errors.

- [ ] **Step 6: Commit**

```bash
git add css/animations.css js/animations.js index.html
git commit -m "feat: scaffold animations.js, animations.css, GSAP CDN on index.html"
```

---

## Task 2: Smooth Scroll (CSS only)

**Files:**
- Modify: `css/animations.css`

Note: GSAP ScrollSmoother is paid. A JS lerp approach conflicts with ScrollTrigger. Use CSS `scroll-behavior: smooth` — already added in Task 1. No extra JS needed.

- [ ] **Step 1: Verify `css/animations.css`** already contains `html { scroll-behavior: smooth; }` (added in Task 1). If yes, this task is done.

- [ ] **Step 2: Commit** (only if any change was needed):

```bash
git add css/animations.css
git commit -m "feat: smooth scroll via CSS scroll-behavior"
```

---

## Task 3: Preloader

**Files:**
- Modify: `js/animations.js`
- Modify: `index.html`

- [ ] **Step 1: Add `#preloader` HTML to `index.html`** — as the very first child of `<body>` (before the `<nav>`):

```html
  <!-- PRELOADER -->
  <div id="preloader">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id="preloader-circle" cx="40" cy="40" r="36"
        stroke="#3b82f6" stroke-width="2"
        stroke-dasharray="226.19"
        stroke-dashoffset="226.19"
        stroke-linecap="round"/>
      <text id="preloader-text" x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Georgia, serif" font-size="14" font-weight="700" fill="#ffffff" opacity="0">MNW</text>
    </svg>
  </div>
```

Note: Circle circumference = 2 × π × 36 ≈ 226.19

- [ ] **Step 2: Add preloader animation to `animations.js`** (add after the SmoothScroll code):

```js
// Preloader
function runPreloader(onComplete) {
  const circle = document.getElementById('preloader-circle');
  const text = document.getElementById('preloader-text');
  const overlay = document.getElementById('preloader');
  if (!overlay) { onComplete && onComplete(); return; }

  const tl = gsap.timeline({
    onComplete: () => {
      gsap.to(overlay, {
        opacity: 0,
        duration: 0.4,
        onComplete: () => {
          overlay.style.display = 'none';
          onComplete && onComplete();
        }
      });
    }
  });

  tl.to(circle, { strokeDashoffset: 0, duration: 0.6, ease: 'power2.out' })
    .to(text, { opacity: 1, duration: 0.3, ease: 'power1.in' })
    .to({}, { duration: 0.3 }); // hold for 0.3s before exit
}

runPreloader(() => {
  console.log('Preloader done');
});
```

- [ ] **Step 3: Verify** — Reload `index.html`. The preloader should appear (dark screen with MNW circle drawing, then "MNW" text appearing), then fade out revealing the page. Total ~1.5 seconds.

- [ ] **Step 4: Commit**

```bash
git add index.html js/animations.js
git commit -m "feat: add preloader with MNW SVG animation"
```

---

## Task 4: Page Transitions

**Files:**
- Modify: `index.html`
- Modify: `js/animations.js`

- [ ] **Step 1: Add `#page-transition` div to `index.html`** — right after `#preloader`, before `<nav>`:

```html
  <!-- PAGE TRANSITION -->
  <div id="page-transition"></div>
```

- [ ] **Step 2: Add page transition logic to `animations.js`** (add after `runPreloader` call):

```js
// Page transitions — fade out on internal link click
document.querySelectorAll('a[href]').forEach(link => {
  const href = link.getAttribute('href');
  if (!href || href.startsWith('http') || href.startsWith('mailto:')
      || href.startsWith('tel:') || href.startsWith('#') || link.target === '_blank') return;

  link.addEventListener('click', e => {
    e.preventDefault();
    const overlay = document.getElementById('page-transition');
    gsap.to(overlay, {
      opacity: 1,
      duration: 0.4,
      ease: 'power1.in',
      onComplete: () => { window.location.href = href; }
    });
  });
});
```

- [ ] **Step 3: Verify** — Click any nav link (e.g. "Leistungen"). The page should fade to dark before navigating. On the new page, the preloader should not show (since `#preloader` is only in index.html for now).

- [ ] **Step 4: Commit**

```bash
git add index.html js/animations.js
git commit -m "feat: add page transition fade-out on internal links"
```

---

## Task 5: Hero Text Reveal

**Files:**
- Modify: `js/animations.js`

The hero reveal should start immediately after the preloader exits. We pass it as a callback to `runPreloader`.

- [ ] **Step 1: Replace the `runPreloader(...)` call in `animations.js`** with:

```js
runPreloader(() => {
  runHeroReveal();
});
```

- [ ] **Step 2: Add `runHeroReveal()` function to `animations.js`** (add before the `runPreloader` call):

```js
// Hero Text Reveal
function runHeroReveal() {
  const hero = document.querySelector('.hero__inner');
  if (!hero) return;

  // Split hero title into word spans
  const title = hero.querySelector('.hero__title');
  if (title) {
    title.innerHTML = title.innerHTML.replace(/<br\s*\/?>/gi, '<br>');
    title.querySelectorAll('span').forEach(span => {
      const words = span.textContent.trim().split(' ');
      span.innerHTML = words.map(w => `<span class="word" style="display:inline-block;overflow:hidden"><span class="word-inner" style="display:inline-block">${w}</span></span>`).join(' ');
    });
  }

  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

  tl.from(hero.querySelector('.section__tag'), { y: 20, opacity: 0, duration: 0.5 })
    .from(hero.querySelectorAll('.word-inner'), {
      y: 50, opacity: 0, duration: 0.6, stagger: 0.05
    }, '-=0.2')
    .from(hero.querySelector('.hero__subtitle'), { y: 30, opacity: 0, duration: 0.6 }, '-=0.3')
    .from(hero.querySelectorAll('.hero__actions .btn'), {
      scale: 0.9, opacity: 0, duration: 0.4, stagger: 0.1
    }, '-=0.3');
}
```

- [ ] **Step 3: Verify** — Reload `index.html`. After the preloader exits, the hero section should animate in: tag first, then words staggering up, subtitle, then buttons. Smooth and elegant.

- [ ] **Step 4: Restructure `animations.js` to wrap all animations in a single `initAnimations()` function** with a reduced-motion guard. The final structure of `animations.js` should be:

```js
gsap.registerPlugin(ScrollTrigger);

function initAnimations() {
  // --- Preloader ---
  function runPreloader(onComplete) { /* ... existing code ... */ }

  // --- Hero Reveal ---
  function runHeroReveal() { /* ... existing code ... */ }

  // --- Page Transitions ---
  // ... existing page transition code ...

  // --- Process Scroll-Reveal ---
  // ... existing process code ...

  // --- Portfolio Slider ---
  function initPortfolioSlider() { /* ... */ }
  initPortfolioSlider();

  // --- Icon Explosion ---
  // ... existing icon explosion code ...

  // Entry point
  runPreloader(() => runHeroReveal());
}

// Reduced-motion guard — single check, easy for a beginner to find
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const pre = document.getElementById('preloader');
  if (pre) pre.style.display = 'none';
} else {
  // GSAP scripts are deferred — wait for them to load before calling
  window.addEventListener('load', initAnimations);
}
```

Note: Because GSAP is loaded with `defer`, we must wait for `window load` event before calling any GSAP functions.

- [ ] **Step 5: Verify reduced motion** — In DevTools → Rendering tab, enable "Emulate CSS media feature: prefers-reduced-motion: reduce". Reload `index.html`. Preloader should disappear instantly, no animations run.

- [ ] **Step 6: Commit**

```bash
git add js/animations.js
git commit -m "feat: add hero text reveal + prefers-reduced-motion guard"
```

---

## Task 6: Process Scroll-Reveal

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add process scroll-reveal to `animations.js`** (inside the `if (!prefersReducedMotion)` block, after `runPreloader` call):

```js
// Process section scroll-reveal
const processSteps = document.querySelectorAll('.process__step');
processSteps.forEach(el => el.classList.remove('fade-in')); // remove CSS conflict

processSteps.forEach((step, index) => {
  const isLeft = index % 2 === 0;
  gsap.from(step, {
    x: isLeft ? -60 : 60,
    opacity: 0,
    duration: 0.6,
    ease: 'power2.out',
    scrollTrigger: {
      trigger: step,
      start: 'top 80%',
    }
  });
});
```

- [ ] **Step 2: Verify** — Open `index.html`, scroll down to "Wie läuft das ab?". Steps should slide in from alternating sides (01 from left, 02 from right, etc.) as they enter the viewport.

- [ ] **Step 3: Commit**

```bash
git add js/animations.js
git commit -m "feat: add process section scroll-reveal with alternating directions"
```

---

## Task 7: 3D Portfolio Slider

**Files:**
- Modify: `portfolio.html`
- Modify: `css/animations.css`
- Modify: `js/animations.js`

- [ ] **Step 1: Add GSAP CDN + new files to `portfolio.html`** — same as done for index.html in Task 1 (add to `<head>` and before `</body>`):

```html
  <!-- in <head>, after Font Awesome -->
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <link rel="stylesheet" href="css/animations.css">
```

```html
  <!-- before </body>, after script.js -->
  <script src="js/animations.js"></script>
```

Also add `#preloader`, `#page-transition` divs as first children of `<body>` (copy from `index.html`).

- [ ] **Step 2: Replace `.portfolio__grid` in `portfolio.html`** with the slider structure. The 3 existing `.portfolio__item` divs move inside `.portfolio__stage`, with `fade-in` class removed:

```html
<div class="portfolio__slider">
  <button class="portfolio__arrow portfolio__arrow--prev" aria-label="Vorheriges Projekt">&#8592;</button>
  <div class="portfolio__stage">
    <div class="portfolio__item card" data-index="0">
      <!-- La Bella content (copy from original) -->
    </div>
    <div class="portfolio__item card" data-index="1">
      <!-- Hair Studio content (copy from original) -->
    </div>
    <div class="portfolio__item card" data-index="2">
      <!-- Meister Bau content (copy from original) -->
    </div>
  </div>
  <button class="portfolio__arrow portfolio__arrow--next" aria-label="Nächstes Projekt">&#8594;</button>
</div>
```

- [ ] **Step 3: Add slider CSS to `animations.css`**:

```css
/* 3D Portfolio Slider */
.portfolio__slider {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  padding: 2rem 0;
}

.portfolio__stage {
  position: relative;
  perspective: 1000px;
  width: 360px;
  height: 420px;
}

.portfolio__stage .portfolio__item {
  position: absolute;
  inset: 0;
  width: 100%;
  transition: none; /* GSAP handles transitions */
  backface-visibility: hidden;
  will-change: transform, opacity;
}

.portfolio__arrow {
  background: transparent;
  border: 1px solid var(--border, #334155);
  color: var(--text, #ffffff);
  width: 44px;
  height: 44px;
  border-radius: 50%;
  font-size: 1.2rem;
  cursor: pointer;
  z-index: 10;
  flex-shrink: 0;
}

.portfolio__arrow:hover {
  background: #3b82f6;
  border-color: #3b82f6;
}

/* Mobile: stack vertically */
@media (max-width: 600px) {
  .portfolio__slider { flex-direction: column; }
  .portfolio__stage { width: 100%; height: auto; min-height: 420px; }
}
```

- [ ] **Step 4: Add slider JS to `animations.js`** (inside `if (!prefersReducedMotion)` block):

```js
// 3D Portfolio Slider
function initPortfolioSlider() {
  const stage = document.querySelector('.portfolio__stage');
  if (!stage) return;

  const cards = Array.from(stage.querySelectorAll('.portfolio__item'));
  let active = 0;

  function getState(index) {
    const diff = ((index - active) % cards.length + cards.length) % cards.length;
    const normalised = diff <= cards.length / 2 ? diff : diff - cards.length;
    if (normalised === 0) return { x: 0, rotateY: 0, scale: 1, opacity: 1, zIndex: 10 };
    if (normalised === 1 || normalised === -(cards.length - 1))
      return { x: 140, rotateY: -45, scale: 0.85, opacity: 0.6, zIndex: 5 };
    return { x: -140, rotateY: 45, scale: 0.85, opacity: 0.6, zIndex: 5 };
  }

  function render(animate = true) {
    cards.forEach((card, i) => {
      const s = getState(i);
      const method = animate ? gsap.to : gsap.set;
      method(card, { x: s.x, rotateY: s.rotateY, scale: s.scale,
        opacity: s.opacity, zIndex: s.zIndex, duration: 0.5, ease: 'power2.out' });
    });
  }

  render(false); // set initial state without animation

  document.querySelector('.portfolio__arrow--prev')?.addEventListener('click', () => {
    active = (active - 1 + cards.length) % cards.length;
    render();
  });
  document.querySelector('.portfolio__arrow--next')?.addEventListener('click', () => {
    active = (active + 1) % cards.length;
    render();
  });

  // Touch/swipe support
  let touchStartX = 0;
  stage.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; });
  stage.addEventListener('touchend', e => {
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      active = diff > 0
        ? (active + 1) % cards.length
        : (active - 1 + cards.length) % cards.length;
      render();
    }
  });

  // Scroll-in: cards spin from rotateY(180) to final position
  ScrollTrigger.create({
    trigger: stage,
    start: 'top 80%',
    once: true,
    onEnter: () => {
      cards.forEach((card, i) => {
        const s = getState(i);
        gsap.fromTo(card,
          { rotateY: 180, opacity: 0 },
          { rotateY: s.rotateY, opacity: s.opacity, duration: 0.8, ease: 'power2.out', delay: i * 0.1 }
        );
      });
    }
  });
}

initPortfolioSlider();
```

- [ ] **Step 5: Verify** — Open `portfolio.html`. Three cards should appear in 3D perspective (center card front, side cards tilted). Clicking arrows should cycle through smoothly. On mobile, swipe should work.

- [ ] **Step 6: Verify scroll-in** — Reload `portfolio.html` and scroll down to the slider. Cards should spin in from 180° rotation.

- [ ] **Step 7: Commit**

```bash
git add portfolio.html css/animations.css js/animations.js
git commit -m "feat: add 3D portfolio slider with scroll-in animation and swipe support"
```

---

## Task 8: Icon Explosion on Leistungen

**Files:**
- Modify: `leistungen.html`
- Modify: `css/animations.css`
- Modify: `js/animations.js`

- [ ] **Step 1: Add GSAP CDN + files to `leistungen.html`** — same pattern as portfolio.html (CDN in `<head>`, script before `</body>`, plus `#preloader` and `#page-transition` as first `<body>` children).

- [ ] **Step 2: Modify the first `.card` in `leistungen.html`** (Webentwicklung & Redesign). Wrap the icon and add chips below it. Note: this is ONE combined card for both Webentwicklung and Redesign:

Replace:
```html
      <div class="card fade-in">
        <i class="fa-solid fa-laptop-code card__icon"></i>
        <h2 data-de="Webentwicklung & Redesign"
```

With:
```html
      <div class="card">
        <div class="icon-explode-wrapper">
          <i class="fa-solid fa-laptop-code card__icon"></i>
          <div class="feature-chips">
            <span class="feature-chip">Responsive</span>
            <span class="feature-chip">SEO-optimiert</span>
            <span class="feature-chip">DSGVO-konform</span>
            <span class="feature-chip">Schnell</span>
            <span class="feature-chip">Mobile-First</span>
          </div>
        </div>
        <h2 data-de="Webentwicklung & Redesign"
```

- [ ] **Step 3: Modify the second `.card` in `leistungen.html`** (Hosting & Wartung):

Replace:
```html
      <div class="card fade-in" style="margin-top:2rem">
        <i class="fa-solid fa-server card__icon"></i>
        <h2 data-de="Hosting & Wartung"
```

With:
```html
      <div class="card" style="margin-top:2rem">
        <div class="icon-explode-wrapper">
          <i class="fa-solid fa-server card__icon"></i>
          <div class="feature-chips">
            <span class="feature-chip">99.9% Uptime</span>
            <span class="feature-chip">Automatische Updates</span>
            <span class="feature-chip">SSL inklusive</span>
            <span class="feature-chip">Support</span>
          </div>
        </div>
        <h2 data-de="Hosting & Wartung"
```

- [ ] **Step 4: Add chip + wrapper CSS to `animations.css`**:

```css
/* Icon Explosion */
.icon-explode-wrapper {
  display: block;
  margin-bottom: 1rem;
}

.feature-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 0.4rem;
  margin-top: 0.75rem;
}

.feature-chip {
  background: rgba(59, 130, 246, 0.1);
  color: #3b82f6;
  border: 1px solid rgba(59, 130, 246, 0.3);
  padding: 0.25rem 0.65rem;
  border-radius: 20px;
  font-size: 0.75rem;
  white-space: nowrap;
  will-change: transform, opacity;
  /* Chips are in normal flow — GSAP animates them FROM hidden state */
}
```

- [ ] **Step 5: Add icon explosion JS to `animations.js`** (inside `initAnimations()`):

```js
// Icon Explosion — chips animate FROM scale(0)/opacity(0) in their natural flow position
document.querySelectorAll('.icon-explode-wrapper').forEach(wrapper => {
  const icon = wrapper.querySelector('.card__icon');
  const chips = Array.from(wrapper.querySelectorAll('.feature-chip'));

  // Set initial hidden state
  gsap.set(chips, { scale: 0, opacity: 0, y: -20 });

  ScrollTrigger.create({
    trigger: wrapper,
    start: 'top 75%',
    once: true,
    onEnter: () => {
      // 1. Icon pulse (charge effect)
      gsap.timeline()
        .to(icon, { scale: 1.3, duration: 0.18, ease: 'power1.out' })
        .to(icon, { scale: 1, duration: 0.15, ease: 'power1.in' });

      // 2. Chips pop in from their natural positions (no position swap needed)
      gsap.to(chips, {
        scale: 1, opacity: 1, y: 0,
        duration: 0.4, ease: 'back.out(1.5)', stagger: 0.08,
        delay: 0.2
      });
    }
  });
});
```

- [ ] **Step 6: Verify** — Open `leistungen.html`, scroll down to the service cards. When each card enters the viewport: icon should briefly pulse, then chips should fly outward and settle below the icon. Check both cards (Webentwicklung + Hosting).

- [ ] **Step 7: Commit**

```bash
git add leistungen.html css/animations.css js/animations.js
git commit -m "feat: add icon explosion with feature chips on Leistungen"
```

---

## Task 9: Apply preloader + page transition to remaining 5 pages

**Files:**
- Modify: `preise.html`, `kontakt.html`, `ueber-mich.html`, `impressum.html`, `datenschutz.html`

For each of the 5 pages, make the same 4 changes:

- [ ] **Step 1: In `<head>`** — add after Font Awesome `<link>`:

```html
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>
  <script defer src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/ScrollTrigger.min.js"></script>
  <link rel="stylesheet" href="css/animations.css">
```

- [ ] **Step 2: In `<body>` — as first children** (before `<nav>`):

```html
  <div id="preloader">
    <svg width="80" height="80" viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle id="preloader-circle" cx="40" cy="40" r="36"
        stroke="#3b82f6" stroke-width="2"
        stroke-dasharray="226.19" stroke-dashoffset="226.19"
        stroke-linecap="round"/>
      <text id="preloader-text" x="50%" y="54%" dominant-baseline="middle" text-anchor="middle"
        font-family="Georgia, serif" font-size="14" font-weight="700" fill="#ffffff" opacity="0">MNW</text>
    </svg>
  </div>
  <div id="page-transition"></div>
```

- [ ] **Step 3: Before `</body>`** — after `script.js`:

```html
<script src="js/animations.js"></script>
```

- [ ] **Step 4: Verify** — Click through all 8 pages. Each should show the preloader on load and fade out when navigating away.

- [ ] **Step 5: Commit**

```bash
git add preise.html kontakt.html ueber-mich.html impressum.html datenschutz.html
git commit -m "feat: apply preloader and page transitions to all remaining pages"
```

---

## Task 10: Final integration check + mobile

**Files:** None (testing only)

- [ ] **Step 1: Full walkthrough** — Open `index.html` in browser. Verify in order:
  1. Preloader appears (MNW circle + text), then fades out
  2. Hero text animates in (tag → words → subtitle → buttons)
  3. Scroll down: process steps slide in from alternating sides
  4. Click "Portfolio" in nav: page fades to black, portfolio.html loads with preloader
  5. On portfolio.html: 3D slider visible, arrows work, scroll-in spin works
  6. Click "Leistungen": page transition + preloader → scroll to services → icons pulse and chips fly out
  7. Click back to Home: transition works

- [ ] **Step 2: Mobile check** — Open DevTools, switch to mobile view (e.g. iPhone 12):
  - Preloader: centered and visible ✓
  - Hero reveal: works on mobile ✓
  - Portfolio slider: swipe works, cards don't overflow ✓
  - Icon explosion: chips don't overflow the card ✓

- [ ] **Step 3: Fix any mobile issues found** — Common: chips overflowing → reduce x/y offsets; slider stage height → set explicit min-height.

- [ ] **Step 4: Final commit**

```bash
git add -A
git commit -m "feat: complete animations — preloader, transitions, hero reveal, 3D slider, icon explosion"
```
