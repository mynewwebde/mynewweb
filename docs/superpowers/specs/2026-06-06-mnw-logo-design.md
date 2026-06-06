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
**Font:** Georgia or similar classic serif  
**Colors:**
- Circle outline: `#3b82f6` (brand blue), stroke width ~2.5px
- M: `#ffffff` (white)
- N: `#3b82f6` (blue accent)
- W: `#ffffff` (white)
- Background: transparent (works on dark + light)

**Shape:** Perfect circle, outline only (no fill)

---

## Deliverables

### 1. SVG Logo (`images/logo-mnw.svg`)
- Vector format, scalable to any size
- Two versions: dark background (white letters) + light background (dark letters, for invoices)

### 2. Favicon (`favicon.svg` + `favicon.ico`)
- `favicon.svg` — modern browsers
- `favicon.ico` — legacy fallback (16x16, 32x32)
- `apple-touch-icon.png` — 180x180px for iOS

### 3. Website Integration
- Favicon linked in `<head>` of all HTML pages
- Logo added to navbar: circle icon LEFT NEXT TO the "Mynewweb" text (not replacing it)
- Logo also visible in footer next to the brand name

### 4. Invoice-ready version
- Light background variant: blue circle, dark letters
- Suitable for PDF invoices and letterheads

---

## File Structure

```
mynewweb/
├── favicon.svg
├── favicon.ico
├── apple-touch-icon.png
└── images/
    ├── logo-mnw.svg          (dark bg version)
    └── logo-mnw-light.svg    (light bg version)
```

---

## Implementation Notes

- All favicons generated from the SVG source
- Navbar logo replaces the plain text logo with icon + text combo
- Logo SVG uses `currentColor` where possible for easy theming
- `.gitignore` already handles build artifacts

---

## Success Criteria

- Logo looks professional and consistent at all sizes (16px favicon to 200px header)
- Works on both dark and light backgrounds
- Integrated into all 8 HTML pages of the website
- Matches existing brand colors exactly
