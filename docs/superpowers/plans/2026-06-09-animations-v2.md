# Mynewweb Animations v2 Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add 6 new visual effects to mynewweb.de: hero particles, card tilt, scroll-reveal on all pages, price counters, magnetic buttons, and hero parallax.

**Architecture:** All 6 animations are added as new functions inside the existing `initAnimations()` in `js/animations.js`. Each function is self-guarding (checks for element existence). CSS additions go into `css/animations.css`. No HTML changes needed — all DOM manipulation is done at runtime in JS.

**Tech Stack:** GSAP 3.12.5 + ScrollTrigger (already loaded via CDN on all pages), Vanilla JS, CSS3

---

## File Map

| File | Change |
|---|---|
| `js/animations.js` | Add 6 new functions inside `initAnimations()` |
| `css/animations.css` | Append particle, tilt CSS |

**Current `animations.js` entry point (line 192–195):**
```js
// Entry point
runPreloader(() => {
  runHeroReveal();
});
```
All new function calls go BEFORE this entry point block.

---

## Task 1: Hero Particle Background

**Files:**
- Modify: `js/animations.js`
- Modify: `css/animations.css`

- [ ] **Step 1: Append particle CSS to `css/animations.css`**

```css
/* Hero Particles */
#hero-particles {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
  z-index: 0;
}

.hero {
  position: relative;
}

.hero__inner {
  position: relative;
  z-index: 1;
}

.particle {
  position: absolute;
  border-radius: 50%;
  background: #3b82f6;
}
```

- [ ] **Step 2: Add `initParticles()` to `js/animations.js`** — insert BEFORE the entry point block (line 192):

```js
// Hero Particle Background
function initParticles() {
  const hero = document.querySelector('.hero');
  if (!hero) return;

  const container = document.createElement('div');
  container.id = 'hero-particles';
  hero.prepend(container);

  for (let i = 0; i < 30; i++) {
    const p = document.createElement('div');
    p.className = 'particle';
    const size = 3 + Math.random() * 4;
    p.style.cssText = `width:${size}px;height:${size}px;opacity:${0.15 + Math.random() * 0.25};left:${Math.random() * 100}%;top:${Math.random() * 100}%`;
    container.appendChild(p);

    gsap.to(p, {
      y: `${(Math.random() > 0.5 ? 1 : -1) * (20 + Math.random() * 20)}`,
      x: `${(Math.random() > 0.5 ? 1 : -1) * (10 + Math.random() * 10)}`,
      duration: 4 + Math.random() * 4,
      ease: 'sine.inOut',
      repeat: -1,
      yoyo: true,
      delay: Math.random() * 4
    });
  }
}

initParticles();
```

- [ ] **Step 3: Verify** — Open `index.html` in browser. Hero section should have 30 small blue dots floating gently. Other pages should be unaffected.

- [ ] **Step 4: Commit**

```bash
git add js/animations.js css/animations.css
git commit -m "feat: add hero particle background"
```

---

## Task 2: 3D Card Tilt on Hover

**Files:**
- Modify: `js/animations.js`
- Modify: `css/animations.css`

- [ ] **Step 1: Append tilt CSS to `css/animations.css`**

```css
/* Card Tilt */
.card {
  transform-style: preserve-3d;
  will-change: transform;
}
```

- [ ] **Step 2: Add `initCardTilt()` to `js/animations.js`** — insert BEFORE the entry point block:

```js
// 3D Card Tilt on Hover
function initCardTilt() {
  if (window.innerWidth < 768) return;

  document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      gsap.to(card, {
        rotateX: -dy * 12,
        rotateY: dx * 12,
        duration: 0.4,
        ease: 'power1.out',
        transformPerspective: 800
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
    });
  });
}

initCardTilt();
```

- [ ] **Step 3: Verify** — Open any page with cards (index.html, preise.html). Hover over a card — it should tilt toward the mouse. Moving away should spring it back. Mobile (< 768px) should have no tilt.

- [ ] **Step 4: Commit**

```bash
git add js/animations.js css/animations.css
git commit -m "feat: add 3D card tilt on hover"
```

---

## Task 3: Scroll-Reveal on All Pages

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add `initScrollReveal()` to `js/animations.js`** — insert BEFORE the entry point block:

```js
// Scroll-Reveal — all pages
function initScrollReveal() {
  const targets = document.querySelectorAll(
    '.pricing__card, .section__tag, .section__title, .card, .fade-in'
  );
  if (!targets.length) return;

  targets.forEach(el => {
    // Skip elements already handled by other animations
    if (el.classList.contains('process__step')) return;
    if (el.closest('.portfolio__stage')) return;
    if (el.closest('.icon-explode-wrapper')) return;

    el.classList.remove('fade-in');
    gsap.set(el, { opacity: 0, y: 30 });

    gsap.to(el, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true
      }
    });
  });
}

initScrollReveal();
```

- [ ] **Step 2: Verify** — Open `preise.html`. Scroll down — pricing cards and section titles should fade in smoothly. Open `kontakt.html` and `ueber-mich.html` — same effect. Check that `index.html` hero and process steps still work (not broken by this function).

- [ ] **Step 3: Commit**

```bash
git add js/animations.js
git commit -m "feat: add scroll-reveal on all remaining pages"
```

---

## Task 4: Number Counter on Preise

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add `initCounters()` to `js/animations.js`** — insert BEFORE the entry point block:

```js
// Number Counter — preise.html
function initCounters() {
  document.querySelectorAll('.pricing__price').forEach(el => {
    // Find text node containing the number (skip "Auf Anfrage")
    let textNode = null;
    let targetNum = 0;

    el.childNodes.forEach(node => {
      if (node.nodeType === Node.TEXT_NODE) {
        const parsed = parseInt(node.textContent.replace(/\D/g, ''));
        if (!isNaN(parsed) && parsed > 0) {
          textNode = node;
          targetNum = parsed;
        }
      }
    });

    if (!textNode || targetNum === 0) return;

    // Replace text node with a countable span
    const span = document.createElement('span');
    span.className = 'counter-num';
    span.textContent = '0€';
    textNode.replaceWith(span);

    ScrollTrigger.create({
      trigger: el,
      start: 'top 80%',
      once: true,
      onEnter: () => {
        const obj = { val: 0 };
        gsap.to(obj, {
          val: targetNum,
          duration: 1.5,
          ease: 'power2.out',
          onUpdate: () => { span.textContent = Math.round(obj.val) + '€'; }
        });
      }
    });
  });
}

initCounters();
```

- [ ] **Step 2: Verify** — Open `preise.html`. Scroll to the pricing section. The numbers (499, 999, 29) should count up from 0 when they enter the viewport. The "ab" prefix and "/ Monat" suffix should remain unchanged. "Auf Anfrage" should be unaffected.

- [ ] **Step 3: Commit**

```bash
git add js/animations.js
git commit -m "feat: add number counter animation on pricing page"
```

---

## Task 5: Magnetic Buttons

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add `initMagneticButtons()` to `js/animations.js`** — insert BEFORE the entry point block:

```js
// Magnetic Buttons
function initMagneticButtons() {
  if (window.innerWidth < 768) return;

  const buttons = Array.from(document.querySelectorAll('.btn-primary'));
  if (!buttons.length) return;

  document.addEventListener('mousemove', e => {
    buttons.forEach(btn => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dist = Math.hypot(e.clientX - cx, e.clientY - cy);

      if (dist < 80) {
        const dx = Math.max(-20, Math.min((e.clientX - cx) * 0.25, 20));
        const dy = Math.max(-20, Math.min((e.clientY - cy) * 0.25, 20));
        gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
      } else {
        gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power2.out' });
      }
    });
  });

  buttons.forEach(btn => {
    btn.addEventListener('mouseleave', () => {
      gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
    });
  });
}

initMagneticButtons();
```

- [ ] **Step 2: Verify** — Open `index.html`. Move the mouse slowly toward the "Kostenlose Beratung anfragen" button — it should pull slightly toward the cursor when within ~80px. Moving away snaps it back with an elastic bounce. Mobile should have no effect.

- [ ] **Step 3: Commit**

```bash
git add js/animations.js
git commit -m "feat: add magnetic button effect"
```

---

## Task 6: Hero Parallax

**Files:**
- Modify: `js/animations.js`

- [ ] **Step 1: Add `initHeroParallax()` to `js/animations.js`** — insert BEFORE the entry point block.

**Important:** `initHeroParallax()` must NOT be called at the top level. It must be called INSIDE the `runPreloader` callback, AFTER `runHeroReveal()` completes, to avoid fighting GSAP's `y` property on `.hero__inner`. The entry point block at the bottom of `initAnimations()` must be updated to:

```js
// Entry point
runPreloader(() => {
  runHeroReveal();
  initHeroParallax();
});
```

**Add the function definition before the entry point:**

```js
// Hero Parallax
function initHeroParallax() {
  const heroInner = document.querySelector('.hero__inner');
  const particles = document.getElementById('hero-particles');
  if (!heroInner) return;

  gsap.to(heroInner, {
    y: 80,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true
    }
  });

  if (particles) {
    gsap.to(particles, {
      y: 120,
      ease: 'none',
      scrollTrigger: {
        trigger: '.hero',
        start: 'top top',
        end: 'bottom top',
        scrub: true
      }
    });
  }
}
// Note: initHeroParallax() is called inside runPreloader callback — NOT here
```

- [ ] **Step 2: Update the entry point block** at the bottom of `initAnimations()` to call `initHeroParallax()` after `runHeroReveal()`:

```js
// Entry point
runPreloader(() => {
  runHeroReveal();
  initHeroParallax();
});
```

- [ ] **Step 3: Verify** — Open `index.html`. Scroll slowly. The hero text should drift downward more slowly than the page scrolls (parallax effect). Particles should drift slightly faster than the text, creating depth. Other pages should be unaffected.

- [ ] **Step 4: Commit**

```bash
git add js/animations.js
git commit -m "feat: add hero parallax scrolling effect"
```
