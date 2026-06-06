# MNW Logo & Brand Identity — Design Spec
**Date:** 2026-06-06  
**Project:** mynewweb.de

---

## Overview

Create a professional monogram logo for mynewweb that works across all brand touchpoints: favicon, website navbar, invoices, and future marketing materials.

---

## Logo Design

**Style:** Classic serif monogram in a circle  
**Letters:** M · N · W (stacked vertically, centered)  
**Font:** Georgia serif — letters are rendered as SVG `<text>` with `font-family="Georgia, serif"`. Since favicons are generated from rasterized PNG exports, cross-platform font rendering is not a concern for favicon use. For the navbar `<img>` usage, the SVG is rendered by the browser, which will use the system Georgia font.  
**SVG Canvas:** `viewBox="0 0 100 100"`, circle centered at `cx="50" cy="50" r="46"`, stroke-width `2.5`

**Dark version colors (default — dark backgrounds):**
- Circle stroke: `#3b82f6`
- M: `#ffffff`
- N: `#3b82f6`
- W: `#ffffff`
- Background: transparent

**Light version colors (for invoices and light backgrounds):**
- Circle stroke: `#3b82f6`
- M: `#1e293b`
- N: `#3b82f6`
- W: `#1e293b`
- Background: transparent

---

## Deliverables

### 1. SVG Logo files
- `images/logo-mnw.svg` — dark version (white + blue letters, for website/dark backgrounds)
- `images/logo-mnw-light.svg` — light version (dark + blue letters, for invoices/light backgrounds)

### 2. Favicon files
- `favicon.svg` — copy of `logo-mnw.svg`, used by modern browsers
- `favicon.ico` — legacy fallback; generated from a 32x32 PNG export of the SVG using an online tool such as favicon.io or realfavicongenerator.net
- `apple-touch-icon.png` — 180x180px; exported from SVG with explicit background color `#0f172a` (the site's dark background) since iOS does not support transparent touch icons

**Favicon generation workflow:**
1. Export SVG as 32x32 PNG (using browser screenshot or Inkscape/Figma)
2. Upload to realfavicongenerator.net → download `favicon.ico`
3. Export SVG as 180x180 PNG with `#0f172a` background → save as `apple-touch-icon.png`

### 3. Website Integration — Favicon `<head>` tags
Add to `<head>` of all 8 HTML pages:
- `index.html`
- `leistungen.html`
- `portfolio.html`
- `preise.html`
- `ueber-mich.html`
- `kontakt.html`
- `impressum.html`
- `datenschutz.html`

```html
<link rel="icon" type="image/svg+xml" href="favicon.svg">
<link rel="icon" type="image/x-icon" href="favicon.ico">
<link rel="apple-touch-icon" href="apple-touch-icon.png">
```

### 4. Website Integration — Navbar
Current navbar HTML:
```html
<a href="index.html" class="navbar__logo">My<span>new</span>web</a>
```

Updated navbar HTML:
```html
<a href="index.html" class="navbar__logo">
  <img src="images/logo-mnw.svg" alt="MNW Logo" class="navbar__logo-icon">
  My<span>new</span>web
</a>
```

CSS to add:
```css
.navbar__logo-icon {
  width: 28px;
  height: 28px;
  margin-right: 8px;
  vertical-align: middle;
}
```

### 5. Footer Integration
Same logo icon next to brand name in footer.

### 6. Invoice-ready version
`images/logo-mnw-light.svg` — blue circle, dark letters — suitable for light-background PDF invoices and letterheads.

---

## File Structure

```
mynewweb/
├── favicon.svg
├── favicon.ico
├── apple-touch-icon.png
└── images/
    ├── logo-mnw.svg          (dark bg version — white + blue letters)
    └── logo-mnw-light.svg    (light bg version — dark + blue letters)
```

---

## Success Criteria

- Logo looks professional and consistent at all sizes (16px favicon to 200px header)
- Works on both dark and light backgrounds
- Favicon integrated into all 8 HTML pages
- Navbar shows icon (28px) left of "Mynewweb" text with 8px gap
- Footer shows same icon
- Light version ready for invoice use
