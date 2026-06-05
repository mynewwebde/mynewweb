# Mynewweb Portfolio-Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Eine professionelle, zweisprachige (DE/EN) Portfolio-Webseite für das Freelance-Business "Mynewweb" mit 8 Seiten, dunklem Design, Kontaktformular und 3 verlinkten Demo-Projekten.

**Architecture:** Statische Multi-Page-Website mit reinem HTML5/CSS3/Vanilla JS. Shared-Komponenten (Navbar, Footer, WhatsApp-Button, Language-Switcher) werden in jede HTML-Seite direkt eingebettet. Kein Build-Tool, kein Framework.

**Tech Stack:** HTML5, CSS3, Vanilla JavaScript, Inter (selbst gehostet), Font Awesome CDN, Formspree (Kontaktformular), Vercel (Hosting)

---

## Dateistruktur

```
mynewweb/
├── index.html              # Home
├── leistungen.html         # Services
├── portfolio.html          # Portfolio
├── preise.html             # Pricing
├── ueber-mich.html         # About
├── kontakt.html            # Contact
├── impressum.html          # Legal notice (Pflicht)
├── datenschutz.html        # Privacy policy (Pflicht)
├── fonts/
│   └── inter/
│       ├── inter-400.woff2
│       ├── inter-600.woff2
│       └── inter-700.woff2
├── css/
│   └── style.css           # Alle Styles, strukturiert nach Sektionen
├── js/
│   └── script.js           # Navbar, Sprache, Animationen, Formular, WhatsApp
└── images/
    ├── profile.jpg         # Über-mich Foto
    └── portfolio/
        ├── demo1.jpg       # Screenshot Restaurant-Demo
        ├── demo2.jpg       # Screenshot Friseur-Demo
        └── demo3.jpg       # Screenshot Handwerker-Demo
```

---

## Task 1: Projektsetup & Fonts

**Files:**
- Create: `fonts/inter/` (Verzeichnis + .woff2 Dateien)
- Create: `css/style.css` (Basis-Variablen und Reset)

- [ ] **Step 1: Inter-Font herunterladen**

Öffne im Browser: https://fonts.google.com/specimen/Inter  
Klicke "Download family" → ZIP entpacken  
Kopiere diese Dateien nach `mynewweb/fonts/inter/`:
- `static/Inter-Regular.ttf` → in `inter-400.woff2` konvertieren (oder `.ttf` direkt verwenden)

**Einfachere Alternative:** Lade direkt von https://github.com/rsms/inter/releases die `Inter.var.woff2` Variable Font herunter und speichere sie als `fonts/inter/inter.woff2`.

- [ ] **Step 2: `css/style.css` erstellen mit CSS-Variablen und Reset**

```css
/* === FONTS === */
@font-face {
  font-family: 'Inter';
  src: url('../fonts/inter/inter.woff2') format('woff2');
  font-weight: 100 900;
  font-style: normal;
  font-display: swap;
}

/* === VARIABLEN === */
:root {
  --bg-primary: #0a0a0a;
  --bg-card: #1a1a1a;
  --accent: #3b82f6;
  --accent-glow: rgba(59, 130, 246, 0.15);
  --text-primary: #ffffff;
  --text-secondary: #9ca3af;
  --border: #2a2a2a;
  --radius: 12px;
  --transition: 0.3s ease;
}

/* === RESET === */
*, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
html { scroll-behavior: smooth; }
body {
  font-family: 'Inter', sans-serif;
  background: var(--bg-primary);
  color: var(--text-primary);
  line-height: 1.6;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }
```

- [ ] **Step 3: Commit**

```bash
git add fonts/ css/style.css
git commit -m "feat: project setup, Inter font, CSS variables"
```

---

## Task 2: Shared Styles (Navbar, Footer, Buttons)

**Files:**
- Modify: `css/style.css` — Abschnitte: Navbar, Footer, Buttons, Utilities

- [ ] **Step 1: Navbar-Styles hinzufügen**

Füge am Ende von `style.css` hinzu:

```css
/* === NAVBAR === */
.navbar {
  position: fixed;
  top: 0; left: 0; right: 0;
  z-index: 1000;
  padding: 1rem 2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background: transparent;
  transition: background var(--transition), box-shadow var(--transition);
  border-bottom: 1px solid transparent;
}
.navbar.scrolled {
  background: rgba(10, 10, 10, 0.95);
  border-bottom-color: var(--border);
  backdrop-filter: blur(10px);
}
.navbar__logo {
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--text-primary);
  letter-spacing: -0.5px;
}
.navbar__logo span { color: var(--accent); }
.navbar__links {
  display: flex;
  gap: 2rem;
  list-style: none;
  align-items: center;
}
.navbar__links a {
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color var(--transition);
}
.navbar__links a:hover { color: var(--text-primary); }
.navbar__lang {
  display: flex;
  gap: 0.5rem;
  font-size: 0.85rem;
}
.navbar__lang button {
  background: none;
  border: 1px solid var(--border);
  color: var(--text-secondary);
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  cursor: pointer;
  transition: all var(--transition);
}
.navbar__lang button.active {
  border-color: var(--accent);
  color: var(--accent);
}
.navbar__hamburger {
  display: none;
  flex-direction: column;
  gap: 5px;
  cursor: pointer;
  background: none;
  border: none;
  padding: 4px;
}
.navbar__hamburger span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--transition);
}
@media (max-width: 768px) {
  .navbar__hamburger { display: flex; }
  .navbar__links {
    display: none;
    position: absolute;
    top: 100%; left: 0; right: 0;
    flex-direction: column;
    background: rgba(10,10,10,0.98);
    padding: 1.5rem 2rem;
    border-bottom: 1px solid var(--border);
    gap: 1.2rem;
  }
  .navbar__links.open { display: flex; }
}
```

- [ ] **Step 2: Footer, Buttons und Utilities hinzufügen**

```css
/* === BUTTONS === */
.btn {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.75rem 1.75rem;
  border-radius: var(--radius);
  font-family: inherit;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--transition);
  border: none;
}
.btn-primary {
  background: var(--accent);
  color: #fff;
  box-shadow: 0 0 20px var(--accent-glow);
}
.btn-primary:hover {
  background: #2563eb;
  box-shadow: 0 0 30px rgba(59,130,246,0.3);
  transform: translateY(-2px);
}
.btn-outline {
  background: transparent;
  color: var(--accent);
  border: 1px solid var(--accent);
}
.btn-outline:hover {
  background: var(--accent-glow);
  transform: translateY(-2px);
}

/* === SECTION BASE === */
.section { padding: 5rem 2rem; }
.section__inner { max-width: 1100px; margin: 0 auto; }
.section__tag {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  color: var(--accent);
  letter-spacing: 2px;
  text-transform: uppercase;
  margin-bottom: 1rem;
}
.section__title {
  font-size: clamp(1.8rem, 4vw, 2.8rem);
  font-weight: 700;
  line-height: 1.2;
  margin-bottom: 1rem;
}
.section__subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  max-width: 600px;
}

/* === CARDS === */
.card {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 2rem;
  transition: border-color var(--transition), transform var(--transition);
}
.card:hover {
  border-color: var(--accent);
  transform: translateY(-4px);
}

/* === FOOTER === */
.footer {
  background: var(--bg-card);
  border-top: 1px solid var(--border);
  padding: 3rem 2rem 2rem;
}
.footer__inner {
  max-width: 1100px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
  text-align: center;
}
.footer__logo { font-size: 1.3rem; font-weight: 700; }
.footer__logo span { color: var(--accent); }
.footer__links {
  display: flex;
  gap: 2rem;
  list-style: none;
  flex-wrap: wrap;
  justify-content: center;
}
.footer__links a {
  color: var(--text-secondary);
  font-size: 0.9rem;
  transition: color var(--transition);
}
.footer__links a:hover { color: var(--text-primary); }
.footer__copy { color: var(--text-secondary); font-size: 0.85rem; }

/* === WHATSAPP BUTTON === */
.whatsapp-btn {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 999;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #25d366;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  color: #fff;
  box-shadow: 0 0 20px rgba(37,211,102,0.4);
  transition: all var(--transition);
}
.whatsapp-btn:hover {
  transform: scale(1.1);
  box-shadow: 0 0 30px rgba(37,211,102,0.6);
}

/* === ANIMATIONS === */
.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}
.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}
```

- [ ] **Step 3: Commit**

```bash
git add css/style.css
git commit -m "feat: shared styles — navbar, footer, buttons, animations"
```

---

## Task 3: JavaScript (Shared Logic)

**Files:**
- Create: `js/script.js`

- [ ] **Step 1: `js/script.js` erstellen**

```javascript
/* === NAVBAR === */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
});

const hamburger = document.querySelector('.navbar__hamburger');
const navLinks = document.querySelector('.navbar__links');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});

/* === LANGUAGE SWITCHER === */
const translations = {};
let currentLang = localStorage.getItem('lang') || 'de';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-de]').forEach(el => {
    el.textContent = lang === 'de' ? el.dataset.de : el.dataset.en;
  });
  document.querySelectorAll('[data-de-html]').forEach(el => {
    el.innerHTML = lang === 'de' ? el.dataset.deHtml : el.dataset.enHtml;
  });

  const pageMeta = document.querySelector('meta[name="page-title"]');
  const metaDesc = document.querySelector('meta[name="description"]');
  if (pageMeta) {
    document.title = lang === 'de' ? pageMeta.dataset.de : pageMeta.dataset.en;
  }
  if (metaDesc) {
    metaDesc.content = lang === 'de' ? metaDesc.dataset.de : metaDesc.dataset.en;
  }

  document.querySelectorAll('.navbar__lang button').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

document.querySelectorAll('.navbar__lang button').forEach(btn => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

/* === SCROLL ANIMATIONS === */
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

/* === KONTAKTFORMULAR === */
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('button[type="submit"]');
    const success = document.getElementById('form-success');
    const error = document.getElementById('form-error');

    btn.disabled = true;
    btn.textContent = '...';
    success?.classList.add('hidden');
    error?.classList.add('hidden');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        success?.classList.remove('hidden');
      } else {
        error?.classList.remove('hidden');
      }
    } catch {
      error?.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.setAttribute('data-de', 'Absenden');
      btn.setAttribute('data-en', 'Send');
      applyLanguage(currentLang);
    }
  });
}

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
});
```

- [ ] **Step 2: Commit**

```bash
git add js/script.js
git commit -m "feat: shared JS — navbar scroll, language switcher, animations, contact form"
```

---

## Task 4: Home-Seite (`index.html`)

**Files:**
- Create: `index.html`

- [ ] **Step 1: `index.html` erstellen**

```html
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="page-title" data-de="Mynewweb – Professionelle Webseiten" data-en="Mynewweb – Professional Websites">
  <meta name="description" data-de="Mynewweb erstellt professionelle Webseiten für Unternehmen und Selbstständige. Schnell, bezahlbar, modern." data-en="Mynewweb creates professional websites for businesses and freelancers. Fast, affordable, modern.">
  <title>Mynewweb – Professionelle Webseiten</title>
  <link rel="stylesheet" href="css/style.css">
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css">
</head>
<body>

  <!-- NAVBAR -->
  <nav class="navbar">
    <a href="index.html" class="navbar__logo">My<span>new</span>web</a>
    <ul class="navbar__links">
      <li><a href="leistungen.html" data-de="Leistungen" data-en="Services">Leistungen</a></li>
      <li><a href="portfolio.html" data-de="Portfolio" data-en="Portfolio">Portfolio</a></li>
      <li><a href="preise.html" data-de="Preise" data-en="Pricing">Preise</a></li>
      <li><a href="ueber-mich.html" data-de="Über mich" data-en="About">Über mich</a></li>
      <li><a href="kontakt.html" class="btn btn-primary" style="padding:0.5rem 1.2rem" data-de="Kontakt" data-en="Contact">Kontakt</a></li>
    </ul>
    <div class="navbar__lang">
      <button data-lang="de" class="active">DE</button>
      <button data-lang="en">EN</button>
    </div>
    <button class="navbar__hamburger" aria-label="Menü">
      <span></span><span></span><span></span>
    </button>
  </nav>

  <!-- HERO -->
  <section class="hero">
    <div class="hero__inner">
      <p class="section__tag" data-de="Webentwicklung & Hosting" data-en="Web Development & Hosting">Webentwicklung & Hosting</p>
      <h1 class="hero__title">
        <span data-de="Deine Webseite." data-en="Your Website.">Deine Webseite.</span><br>
        <span class="hero__title--accent" data-de="Professionell. Schnell. Bezahlbar." data-en="Professional. Fast. Affordable.">Professionell. Schnell. Bezahlbar.</span>
      </h1>
      <p class="hero__subtitle" data-de="Ich erstelle moderne, professionelle Webseiten für Unternehmen und Selbstständige — und hoste sie für dich, wenn du möchtest." data-en="I create modern, professional websites for businesses and freelancers — and host them for you if you'd like.">
        Ich erstelle moderne, professionelle Webseiten für Unternehmen und Selbstständige — und hoste sie für dich, wenn du möchtest.
      </p>
      <div class="hero__actions">
        <a href="kontakt.html" class="btn btn-primary" data-de="Kostenlose Beratung anfragen" data-en="Request Free Consultation">Kostenlose Beratung anfragen</a>
        <a href="portfolio.html" class="btn btn-outline" data-de="Portfolio ansehen" data-en="View Portfolio">Portfolio ansehen</a>
      </div>
    </div>
  </section>

  <!-- WIE LÄUFT DAS AB -->
  <section class="section process">
    <div class="section__inner">
      <p class="section__tag fade-in" data-de="Der Ablauf" data-en="The Process">Der Ablauf</p>
      <h2 class="section__title fade-in" data-de="Wie läuft das ab?" data-en="How does it work?">Wie läuft das ab?</h2>
      <div class="process__grid">
        <div class="process__step fade-in">
          <div class="process__number">01</div>
          <h3 data-de="Beratung" data-en="Consultation">Beratung</h3>
          <p data-de="Kostenloses Erstgespräch — wir besprechen deine Wünsche und Ziele." data-en="Free initial call — we discuss your wishes and goals.">Kostenloses Erstgespräch — wir besprechen deine Wünsche und Ziele.</p>
        </div>
        <div class="process__step fade-in">
          <div class="process__number">02</div>
          <h3 data-de="Design" data-en="Design">Design</h3>
          <p data-de="Ich entwerfe ein individuelles Design das zu dir und deiner Marke passt." data-en="I design a custom look that fits you and your brand.">Ich entwerfe ein individuelles Design das zu dir und deiner Marke passt.</p>
        </div>
        <div class="process__step fade-in">
          <div class="process__number">03</div>
          <h3 data-de="Entwicklung" data-en="Development">Entwicklung</h3>
          <p data-de="Deine Webseite wird professionell und schnell umgesetzt." data-en="Your website gets professionally and quickly built.">Deine Webseite wird professionell und schnell umgesetzt.</p>
        </div>
        <div class="process__step fade-in">
          <div class="process__number">04</div>
          <h3 data-de="Launch" data-en="Launch">Launch</h3>
          <p data-de="Deine Webseite geht online — ich kümmere mich um alles." data-en="Your website goes live — I take care of everything.">Deine Webseite geht online — ich kümmere mich um alles.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- LEISTUNGSÜBERSICHT -->
  <section class="section services-overview">
    <div class="section__inner">
      <p class="section__tag fade-in" data-de="Leistungen" data-en="Services">Leistungen</p>
      <h2 class="section__title fade-in" data-de="Was ich anbiete" data-en="What I offer">Was ich anbiete</h2>
      <div class="services-overview__grid">
        <div class="card fade-in">
          <i class="fa-solid fa-laptop-code card__icon"></i>
          <h3 data-de="Webseiten-Erstellung" data-en="Website Development">Webseiten-Erstellung</h3>
          <p data-de="Professionelle, moderne Webseiten — maßgeschneidert für dein Business." data-en="Professional, modern websites — tailored to your business.">Professionelle, moderne Webseiten — maßgeschneidert für dein Business.</p>
          <a href="leistungen.html" class="btn btn-outline" style="margin-top:1.5rem" data-de="Mehr erfahren" data-en="Learn more">Mehr erfahren</a>
        </div>
        <div class="card fade-in">
          <i class="fa-solid fa-server card__icon"></i>
          <h3 data-de="Hosting & Wartung" data-en="Hosting & Maintenance">Hosting & Wartung</h3>
          <p data-de="Ich hoste deine Webseite und halte sie aktuell — monatlich kündbar." data-en="I host your website and keep it up to date — cancel anytime.">Ich hoste deine Webseite und halte sie aktuell — monatlich kündbar.</p>
          <a href="leistungen.html" class="btn btn-outline" style="margin-top:1.5rem" data-de="Mehr erfahren" data-en="Learn more">Mehr erfahren</a>
        </div>
      </div>
    </div>
  </section>

  <!-- FAQ -->
  <section class="section faq">
    <div class="section__inner">
      <p class="section__tag fade-in" data-de="FAQ" data-en="FAQ">FAQ</p>
      <h2 class="section__title fade-in" data-de="Häufige Fragen" data-en="Frequently Asked Questions">Häufige Fragen</h2>
      <div class="faq__list">
        <details class="faq__item fade-in">
          <summary data-de="Was kostet eine Webseite?" data-en="How much does a website cost?">Was kostet eine Webseite?</summary>
          <p data-de="Eine Webseite startet ab 499€. Der genaue Preis hängt von Umfang und Funktionen ab. Kontaktiere mich für ein kostenloses Angebot." data-en="A website starts from €499. The exact price depends on scope and features. Contact me for a free quote.">Eine Webseite startet ab 499€. Der genaue Preis hängt von Umfang und Funktionen ab. Kontaktiere mich für ein kostenloses Angebot.</p>
        </details>
        <details class="faq__item fade-in">
          <summary data-de="Wie lange dauert die Erstellung?" data-en="How long does it take?">Wie lange dauert die Erstellung?</summary>
          <p data-de="Eine einfache Webseite ist in 1–2 Wochen fertig. Größere Projekte nehmen 2–4 Wochen in Anspruch." data-en="A simple website is ready in 1–2 weeks. Larger projects take 2–4 weeks.">Eine einfache Webseite ist in 1–2 Wochen fertig. Größere Projekte nehmen 2–4 Wochen in Anspruch.</p>
        </details>
        <details class="faq__item fade-in">
          <summary data-de="Brauche ich technisches Wissen?" data-en="Do I need technical knowledge?">Brauche ich technisches Wissen?</summary>
          <p data-de="Nein. Ich kümmere mich um alles Technische. Du musst nur wissen was du willst." data-en="No. I take care of everything technical. You just need to know what you want.">Nein. Ich kümmere mich um alles Technische. Du musst nur wissen was du willst.</p>
        </details>
        <details class="faq__item fade-in">
          <summary data-de="Was passiert wenn ich das Hosting-Abo kündige?" data-en="What happens if I cancel the hosting subscription?">Was passiert wenn ich das Hosting-Abo kündige?</summary>
          <p data-de="Du erhältst alle Dateien deiner Webseite und kannst sie bei einem anderen Anbieter hosten — keine Bindung." data-en="You receive all your website files and can host them with another provider — no lock-in.">Du erhältst alle Dateien deiner Webseite und kannst sie bei einem anderen Anbieter hosten — keine Bindung.</p>
        </details>
        <details class="faq__item fade-in">
          <summary data-de="Kann ich die Webseite später noch ändern lassen?" data-en="Can I have changes made later?">Kann ich die Webseite später noch ändern lassen?</summary>
          <p data-de="Ja. Änderungen und Erweiterungen sind jederzeit möglich — frag einfach nach einem Angebot." data-en="Yes. Changes and additions are possible at any time — just ask for a quote.">Ja. Änderungen und Erweiterungen sind jederzeit möglich — frag einfach nach einem Angebot.</p>
        </details>
        <details class="faq__item fade-in">
          <summary data-de="Welche Arten von Webseiten macht Mynewweb?" data-en="What kinds of websites does Mynewweb make?">Welche Arten von Webseiten macht Mynewweb?</summary>
          <p data-de="Ich erstelle Webseiten für alle Branchen: Restaurants, Handwerker, Selbstständige, Unternehmen und mehr." data-en="I create websites for all industries: restaurants, tradespeople, freelancers, companies, and more.">Ich erstelle Webseiten für alle Branchen: Restaurants, Handwerker, Selbstständige, Unternehmen und mehr.</p>
        </details>
      </div>
    </div>
  </section>

  <!-- FOOTER -->
  <footer class="footer">
    <div class="footer__inner">
      <div class="footer__logo">My<span>new</span>web</div>
      <ul class="footer__links">
        <li><a href="leistungen.html" data-de="Leistungen" data-en="Services">Leistungen</a></li>
        <li><a href="portfolio.html" data-de="Portfolio" data-en="Portfolio">Portfolio</a></li>
        <li><a href="preise.html" data-de="Preise" data-en="Pricing">Preise</a></li>
        <li><a href="ueber-mich.html" data-de="Über mich" data-en="About">Über mich</a></li>
        <li><a href="kontakt.html" data-de="Kontakt" data-en="Contact">Kontakt</a></li>
        <li><a href="impressum.html" data-de="Impressum" data-en="Legal Notice">Impressum</a></li>
        <li><a href="datenschutz.html" data-de="Datenschutz" data-en="Privacy">Datenschutz</a></li>
      </ul>
      <p class="footer__copy">© 2026 Mynewweb. <span data-de="Alle Rechte vorbehalten." data-en="All rights reserved.">Alle Rechte vorbehalten.</span></p>
    </div>
  </footer>

  <!-- WHATSAPP BUTTON -->
  <a href="https://wa.me/DEINE_NUMMER" class="whatsapp-btn" target="_blank" rel="noopener" aria-label="WhatsApp">
    <i class="fa-brands fa-whatsapp"></i>
  </a>

  <script src="js/script.js"></script>
</body>
</html>
```

**Wichtig:** `DEINE_NUMMER` durch die echte WhatsApp-Nummer ersetzen (Format: `4917612345678` ohne + oder Leerzeichen).

- [ ] **Step 2: Hero und Process Styles in `css/style.css` hinzufügen**

```css
/* === HERO === */
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  padding: 8rem 2rem 5rem;
  background: linear-gradient(135deg, var(--bg-primary) 0%, #0f172a 100%);
  position: relative;
  overflow: hidden;
}
.hero::before {
  content: '';
  position: absolute;
  top: -200px; right: -200px;
  width: 600px; height: 600px;
  background: radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%);
  pointer-events: none;
}
.hero__inner { max-width: 800px; }
.hero__title {
  font-size: clamp(2.5rem, 6vw, 4.5rem);
  font-weight: 800;
  line-height: 1.1;
  margin-bottom: 1.5rem;
}
.hero__title--accent { color: var(--accent); }
.hero__subtitle {
  font-size: 1.2rem;
  color: var(--text-secondary);
  max-width: 600px;
  margin-bottom: 2.5rem;
}
.hero__actions { display: flex; gap: 1rem; flex-wrap: wrap; }

/* === PROCESS === */
.process { background: var(--bg-card); }
.process__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
.process__step { text-align: center; padding: 2rem; }
.process__number {
  font-size: 3rem;
  font-weight: 800;
  color: var(--accent);
  opacity: 0.3;
  line-height: 1;
  margin-bottom: 1rem;
}
.process__step h3 { margin-bottom: 0.5rem; font-size: 1.1rem; }
.process__step p { color: var(--text-secondary); font-size: 0.95rem; }

/* === SERVICES OVERVIEW === */
.services-overview__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
.card__icon {
  font-size: 2rem;
  color: var(--accent);
  margin-bottom: 1rem;
}
.card h3 { margin-bottom: 0.75rem; font-size: 1.2rem; }
.card p { color: var(--text-secondary); font-size: 0.95rem; }

/* === FAQ === */
.faq__list { margin-top: 3rem; display: flex; flex-direction: column; gap: 1rem; }
.faq__item {
  background: var(--bg-card);
  border: 1px solid var(--border);
  border-radius: var(--radius);
  padding: 1.5rem;
  cursor: pointer;
  transition: border-color var(--transition);
}
.faq__item:hover { border-color: var(--accent); }
.faq__item summary {
  font-weight: 600;
  font-size: 1rem;
  list-style: none;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.faq__item summary::after {
  content: '+';
  color: var(--accent);
  font-size: 1.5rem;
  transition: transform var(--transition);
}
.faq__item[open] summary::after { transform: rotate(45deg); }
.faq__item p {
  color: var(--text-secondary);
  margin-top: 1rem;
  font-size: 0.95rem;
  line-height: 1.7;
}
```

- [ ] **Step 3: Im Browser testen**

Öffne `index.html` direkt im Browser (Doppelklick auf Datei).  
Prüfe:
- Navbar ist sichtbar und fixiert
- Hero-Text wird angezeigt
- DE/EN Umschalter funktioniert
- Auf Mobile (Browser DevTools → Toggle Device) sieht alles gut aus

- [ ] **Step 4: Commit**

```bash
git add index.html css/style.css
git commit -m "feat: home page — hero, process, services overview, FAQ"
```

---

## Task 5: Leistungen-Seite (`leistungen.html`)

**Files:**
- Create: `leistungen.html`
- Modify: `css/style.css` — Leistungen-Styles

- [ ] **Step 1: `leistungen.html` erstellen**

Kopiere die Navbar, Footer und WhatsApp-Button aus `index.html` (identisch auf jeder Seite). Füge hinzu:

```html
<!-- Zwischen Navbar und Footer einfügen -->
<section class="hero hero--small">
  <div class="hero__inner">
    <p class="section__tag" data-de="Was ich anbiete" data-en="What I offer">Was ich anbiete</p>
    <h1 class="section__title" data-de="Leistungen" data-en="Services">Leistungen</h1>
  </div>
</section>

<section class="section">
  <div class="section__inner">
    <div class="service-detail card fade-in">
      <i class="fa-solid fa-laptop-code card__icon"></i>
      <h2 data-de="Webseiten-Erstellung" data-en="Website Development">Webseiten-Erstellung</h2>
      <p data-de="Ich erstelle professionelle, moderne Webseiten — individuell für dein Business gestaltet." data-en="I create professional, modern websites — individually designed for your business.">...</p>
      <ul class="service__list">
        <li><i class="fa-solid fa-check"></i> <span data-de="Responsives Design (Mobile, Tablet, Desktop)" data-en="Responsive design (mobile, tablet, desktop)">Responsives Design</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="SEO-Grundoptimierung" data-en="Basic SEO optimization">SEO-Grundoptimierung</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="Kontaktformular" data-en="Contact form">Kontaktformular</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="Schnelle Ladezeiten" data-en="Fast loading times">Schnelle Ladezeiten</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="DSGVO-konform" data-en="GDPR compliant">DSGVO-konform</span></li>
      </ul>
      <a href="kontakt.html" class="btn btn-primary" data-de="Angebot anfragen" data-en="Request a quote">Angebot anfragen</a>
    </div>

    <div class="service-detail card fade-in" style="margin-top:2rem">
      <i class="fa-solid fa-server card__icon"></i>
      <h2 data-de="Hosting & Wartung" data-en="Hosting & Maintenance">Hosting & Wartung</h2>
      <p data-de="Ich hoste deine Webseite auf schnellen Servern und halte sie aktuell." data-en="I host your website on fast servers and keep it up to date.">...</p>
      <ul class="service__list">
        <li><i class="fa-solid fa-check"></i> <span data-de="Schnelles, zuverlässiges Hosting" data-en="Fast, reliable hosting">Schnelles Hosting</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="Regelmäßige Backups" data-en="Regular backups">Regelmäßige Backups</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="Technischer Support" data-en="Technical support">Technischer Support</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="Monatlich kündbar" data-en="Cancel anytime">Monatlich kündbar</span></li>
        <li><i class="fa-solid fa-check"></i> <span data-de="Bei Kündigung: alle Dateien werden übergeben" data-en="On cancellation: all files are handed over">Volle Dateiübergabe bei Kündigung</span></li>
      </ul>
      <a href="preise.html" class="btn btn-primary" data-de="Preise ansehen" data-en="View pricing">Preise ansehen</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Styles hinzufügen**

```css
/* === SERVICES DETAIL === */
.hero--small {
  min-height: 30vh;
  padding: 8rem 2rem 3rem;
}
.service__list {
  list-style: none;
  margin: 1.5rem 0;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}
.service__list li {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
}
.service__list .fa-check { color: var(--accent); }
```

- [ ] **Step 3: Im Browser testen und committen**

```bash
git add leistungen.html css/style.css
git commit -m "feat: services page"
```

---

## Task 6: Portfolio-Seite (`portfolio.html`)

**Files:**
- Create: `portfolio.html`
- Modify: `css/style.css`
- Note: `images/portfolio/*.jpg` werden in Task 10 (Demo-Projekte) hinzugefügt

- [ ] **Step 1: `portfolio.html` erstellen**

```html
<section class="hero hero--small">
  <div class="hero__inner">
    <p class="section__tag" data-de="Meine Arbeiten" data-en="My Work">Meine Arbeiten</p>
    <h1 class="section__title" data-de="Portfolio" data-en="Portfolio">Portfolio</h1>
  </div>
</section>

<section class="section">
  <div class="section__inner">
    <div class="portfolio__grid">
      <div class="portfolio__item card fade-in">
        <div class="portfolio__image">
          <img src="images/portfolio/demo1.jpg" alt="Restaurant La Bella">
          <div class="portfolio__overlay">
            <a href="https://demo-restaurant.vercel.app" target="_blank" class="btn btn-primary" data-de="Demo ansehen" data-en="View Demo">Demo ansehen</a>
          </div>
        </div>
        <div class="portfolio__info">
          <h3 data-de="Restaurant La Bella" data-en="Restaurant La Bella">Restaurant La Bella</h3>
          <p data-de="Moderne Restaurantwebseite mit Speisekarte und Reservierungsformular." data-en="Modern restaurant website with menu and reservation form.">Moderne Restaurantwebseite mit Speisekarte und Reservierungsformular.</p>
        </div>
      </div>
      <div class="portfolio__item card fade-in">
        <div class="portfolio__image">
          <img src="images/portfolio/demo2.jpg" alt="Hair Studio">
          <div class="portfolio__overlay">
            <a href="https://demo-hairsalon.vercel.app" target="_blank" class="btn btn-primary" data-de="Demo ansehen" data-en="View Demo">Demo ansehen</a>
          </div>
        </div>
        <div class="portfolio__info">
          <h3 data-de="Hair Studio" data-en="Hair Studio">Hair Studio</h3>
          <p data-de="Elegante Webseite für einen Friseursalon mit Online-Buchung." data-en="Elegant website for a hair salon with online booking.">Elegante Webseite für einen Friseursalon mit Online-Buchung.</p>
        </div>
      </div>
      <div class="portfolio__item card fade-in">
        <div class="portfolio__image">
          <img src="images/portfolio/demo3.jpg" alt="Meister Bau">
          <div class="portfolio__overlay">
            <a href="https://demo-handwerk.vercel.app" target="_blank" class="btn btn-primary" data-de="Demo ansehen" data-en="View Demo">Demo ansehen</a>
          </div>
        </div>
        <div class="portfolio__info">
          <h3 data-de="Meister Bau" data-en="Meister Bau">Meister Bau</h3>
          <p data-de="Professionelle Webseite für einen Handwerksbetrieb mit Leistungsübersicht." data-en="Professional website for a tradesperson with service overview.">Professionelle Webseite für einen Handwerksbetrieb mit Leistungsübersicht.</p>
        </div>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Portfolio-Styles**

```css
/* === PORTFOLIO === */
.portfolio__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
}
.portfolio__item { padding: 0; overflow: hidden; }
.portfolio__image { position: relative; overflow: hidden; aspect-ratio: 16/9; }
.portfolio__image img { width: 100%; height: 100%; object-fit: cover; transition: transform 0.5s ease; }
.portfolio__item:hover .portfolio__image img { transform: scale(1.05); }
.portfolio__overlay {
  position: absolute; inset: 0;
  background: rgba(10,10,10,0.7);
  display: flex; align-items: center; justify-content: center;
  opacity: 0; transition: opacity var(--transition);
}
.portfolio__item:hover .portfolio__overlay { opacity: 1; }
.portfolio__info { padding: 1.5rem; }
.portfolio__info h3 { margin-bottom: 0.5rem; }
.portfolio__info p { color: var(--text-secondary); font-size: 0.9rem; }
```

- [ ] **Step 3: Committen (mit Platzhalter-Bildern)**

Erstelle zunächst 3 leere Platzhalterbilder (beliebiges Bild umbenennen oder Screenshots machen):

```bash
mkdir -p images/portfolio
# Platzhalterbilder hinzufügen
git add portfolio.html css/style.css images/
git commit -m "feat: portfolio page (demo project links to be updated in Task 10)"
```

---

## Task 7: Preise-Seite (`preise.html`)

**Files:**
- Create: `preise.html`
- Modify: `css/style.css`

- [ ] **Step 1: `preise.html` erstellen**

```html
<section class="hero hero--small">
  <div class="hero__inner">
    <p class="section__tag" data-de="Transparent & fair" data-en="Transparent & fair">Transparent & fair</p>
    <h1 class="section__title" data-de="Preise" data-en="Pricing">Preise</h1>
  </div>
</section>

<section class="section">
  <div class="section__inner">
    <div class="pricing__grid">
      <div class="pricing__card card fade-in">
        <h3 class="pricing__name">Starter</h3>
        <div class="pricing__price"><span class="pricing__from" data-de="ab" data-en="from">ab</span> 499€</div>
        <p class="pricing__desc" data-de="Ideal für Einsteiger und kleine Betriebe." data-en="Ideal for starters and small businesses.">Ideal für Einsteiger und kleine Betriebe.</p>
        <ul class="service__list">
          <li><i class="fa-solid fa-check"></i> <span data-de="Bis 5 Unterseiten" data-en="Up to 5 subpages">Bis 5 Unterseiten</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Responsives Design" data-en="Responsive design">Responsives Design</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Kontaktformular" data-en="Contact form">Kontaktformular</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="DSGVO-konform" data-en="GDPR compliant">DSGVO-konform</span></li>
        </ul>
        <a href="kontakt.html" class="btn btn-outline" data-de="Angebot anfragen" data-en="Request quote">Angebot anfragen</a>
      </div>
      <div class="pricing__card pricing__card--featured card fade-in">
        <div class="pricing__badge" data-de="Beliebt" data-en="Popular">Beliebt</div>
        <h3 class="pricing__name">Professional</h3>
        <div class="pricing__price"><span class="pricing__from" data-de="ab" data-en="from">ab</span> 999€</div>
        <p class="pricing__desc" data-de="Für Unternehmen die online wachsen wollen." data-en="For businesses that want to grow online.">Für Unternehmen die online wachsen wollen.</p>
        <ul class="service__list">
          <li><i class="fa-solid fa-check"></i> <span data-de="Bis 10 Unterseiten" data-en="Up to 10 subpages">Bis 10 Unterseiten</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="SEO-Optimierung" data-en="SEO optimization">SEO-Optimierung</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Blog-Funktion" data-en="Blog feature">Blog-Funktion</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Erweiterte Animationen" data-en="Advanced animations">Erweiterte Animationen</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Alles aus Starter" data-en="Everything from Starter">Alles aus Starter</span></li>
        </ul>
        <a href="kontakt.html" class="btn btn-primary" data-de="Angebot anfragen" data-en="Request quote">Angebot anfragen</a>
      </div>
      <div class="pricing__card card fade-in">
        <h3 class="pricing__name">Premium</h3>
        <div class="pricing__price" data-de="Auf Anfrage" data-en="On request">Auf Anfrage</div>
        <p class="pricing__desc" data-de="Individuelle Lösung für komplexe Anforderungen." data-en="Custom solution for complex requirements.">Individuelle Lösung für komplexe Anforderungen.</p>
        <ul class="service__list">
          <li><i class="fa-solid fa-check"></i> <span data-de="Unbegrenzte Seiten" data-en="Unlimited pages">Unbegrenzte Seiten</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Individuelle Funktionen" data-en="Custom features">Individuelle Funktionen</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Persönliche Betreuung" data-en="Personal support">Persönliche Betreuung</span></li>
          <li><i class="fa-solid fa-check"></i> <span data-de="Alles aus Professional" data-en="Everything from Professional">Alles aus Professional</span></li>
        </ul>
        <a href="kontakt.html" class="btn btn-outline" data-de="Kontakt aufnehmen" data-en="Get in touch">Kontakt aufnehmen</a>
      </div>
    </div>

    <!-- Hosting Abo -->
    <div class="hosting-abo card fade-in" style="margin-top:3rem; text-align:center;">
      <i class="fa-solid fa-server card__icon"></i>
      <h3 data-de="Hosting & Wartung Abo" data-en="Hosting & Maintenance Subscription">Hosting & Wartung Abo</h3>
      <div class="pricing__price">29€ <span style="font-size:1rem;color:var(--text-secondary)" data-de="/ Monat" data-en="/ month">/ Monat</span></div>
      <p style="color:var(--text-secondary);margin:1rem 0" data-de="Monatlich kündbar. Inklusive Hosting, Backups und Support." data-en="Cancel anytime. Includes hosting, backups and support.">Monatlich kündbar. Inklusive Hosting, Backups und Support.</p>
      <a href="kontakt.html" class="btn btn-primary" data-de="Jetzt anfragen" data-en="Enquire now">Jetzt anfragen</a>
    </div>

    <p class="pricing__note fade-in" data-de="Nicht sicher welches Paket? Schreib mir einfach — ich berate dich kostenlos." data-en="Not sure which package? Just write to me — I'll advise you for free.">Nicht sicher welches Paket? Schreib mir einfach — ich berate dich kostenlos.</p>
  </div>
</section>
```

- [ ] **Step 2: Pricing-Styles**

```css
/* === PRICING === */
.pricing__grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
  align-items: start;
}
.pricing__card { position: relative; }
.pricing__card--featured {
  border-color: var(--accent);
  box-shadow: 0 0 30px var(--accent-glow);
  transform: translateY(-8px);
}
.pricing__badge {
  position: absolute;
  top: -12px; left: 50%;
  transform: translateX(-50%);
  background: var(--accent);
  color: #fff;
  font-size: 0.75rem;
  font-weight: 700;
  padding: 0.25rem 1rem;
  border-radius: 20px;
}
.pricing__name { font-size: 1.3rem; font-weight: 700; margin-bottom: 0.75rem; }
.pricing__price { font-size: 2.5rem; font-weight: 800; margin-bottom: 0.5rem; }
.pricing__from { font-size: 1rem; font-weight: 400; color: var(--text-secondary); }
.pricing__desc { color: var(--text-secondary); font-size: 0.9rem; margin-bottom: 1.5rem; }
.pricing__note {
  text-align: center;
  color: var(--text-secondary);
  margin-top: 2rem;
  font-size: 0.95rem;
}
```

- [ ] **Step 3: Commit**

```bash
git add preise.html css/style.css
git commit -m "feat: pricing page with 3 packages and hosting subscription"
```

---

## Task 8: Über mich, Kontakt, Impressum, Datenschutz

**Files:**
- Create: `ueber-mich.html`, `kontakt.html`, `impressum.html`, `datenschutz.html`
- Modify: `css/style.css`

- [ ] **Step 1: `ueber-mich.html` erstellen**

```html
<section class="hero hero--small">
  <div class="hero__inner">
    <p class="section__tag" data-de="Wer steckt dahinter?" data-en="Who's behind it?">Wer steckt dahinter?</p>
    <h1 class="section__title" data-de="Über mich" data-en="About Me">Über mich</h1>
  </div>
</section>

<section class="section">
  <div class="section__inner about__layout">
    <div class="about__image fade-in">
      <img src="images/profile.jpg" alt="Profilfoto">
    </div>
    <div class="about__text fade-in">
      <h2 data-de="Hallo, ich bin [Dein Vorname]" data-en="Hi, I'm [Your First Name]">Hallo, ich bin [Dein Vorname]</h2>
      <p data-de="Ich bin Webentwickler und helfe Unternehmen und Selbstständigen dabei, professionell im Internet aufzutreten." data-en="I'm a web developer who helps businesses and freelancers establish a professional online presence.">Ich bin Webentwickler...</p>
      <p style="margin-top:1rem" data-de="Mit Mynewweb möchte ich Webseiten zugänglicher machen — modern, erschwinglich und ohne technisches Vorwissen für dich." data-en="With Mynewweb I want to make websites more accessible — modern, affordable, and without any technical knowledge required from you.">Mit Mynewweb...</p>
      <a href="kontakt.html" class="btn btn-primary" style="margin-top:2rem" data-de="Jetzt Projekt starten" data-en="Start your project now">Jetzt Projekt starten</a>
    </div>
  </div>
</section>
```

**Wichtig:** `[Dein Vorname]` und die Texte mit echten persönlichen Informationen ersetzen. Foto als `images/profile.jpg` einfügen.

- [ ] **Step 2: `kontakt.html` erstellen**

Registriere zuerst ein kostenloses Konto auf https://formspree.io und erstelle ein neues Formular. Kopiere die Formular-ID (sieht aus wie `xpwzabcd`).

```html
<section class="hero hero--small">
  <div class="hero__inner">
    <h1 class="section__title" data-de="Kontakt" data-en="Contact">Kontakt</h1>
    <p class="hero__subtitle" data-de="Ich melde mich innerhalb von 24 Stunden." data-en="I'll get back to you within 24 hours.">Ich melde mich innerhalb von 24 Stunden.</p>
  </div>
</section>

<section class="section">
  <div class="section__inner contact__layout">
    <div class="contact__info fade-in">
      <h3 data-de="Schreib mir" data-en="Write to me">Schreib mir</h3>
      <p style="color:var(--text-secondary);margin:1rem 0" data-de="Hast du Fragen oder möchtest ein Projekt starten? Ich freue mich von dir zu hören." data-en="Have questions or want to start a project? I'd love to hear from you.">...</p>
      <a href="mailto:DEINE@EMAIL.DE" class="contact__link"><i class="fa-solid fa-envelope"></i> DEINE@EMAIL.DE</a>
      <a href="https://wa.me/DEINE_NUMMER" class="contact__link" target="_blank"><i class="fa-brands fa-whatsapp"></i> WhatsApp</a>
    </div>
    <form id="contact-form" action="https://formspree.io/f/DEINE_FORMULAR_ID" method="POST" class="contact__form card fade-in">
      <div class="form__group">
        <label data-de="Name" data-en="Name">Name</label>
        <input type="text" name="name" required placeholder="Max Mustermann">
      </div>
      <div class="form__group">
        <label data-de="E-Mail" data-en="Email">E-Mail</label>
        <input type="email" name="email" required placeholder="max@beispiel.de">
      </div>
      <div class="form__group">
        <label data-de="Nachricht" data-en="Message">Nachricht</label>
        <textarea name="message" rows="5" required data-de-placeholder="Wie kann ich dir helfen?" data-en-placeholder="How can I help you?"></textarea>
      </div>
      <button type="submit" class="btn btn-primary" data-de="Absenden" data-en="Send">Absenden</button>
      <p id="form-success" class="form-success hidden" data-de="Nachricht gesendet! Ich melde mich bald." data-en="Message sent! I'll be in touch soon.">Nachricht gesendet!</p>
      <p id="form-error" class="form-error hidden" data-de="Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib direkt per E-Mail." data-en="Something went wrong. Please try again or write directly by email.">Fehler!</p>
    </form>
  </div>
</section>
```

- [ ] **Step 3: Kontakt-Styles hinzufügen**

```css
/* === CONTACT === */
.contact__layout {
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  gap: 3rem;
  align-items: start;
}
@media (max-width: 768px) { .contact__layout { grid-template-columns: 1fr; } }
.contact__link {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  color: var(--text-secondary);
  margin: 0.75rem 0;
  transition: color var(--transition);
}
.contact__link:hover { color: var(--accent); }
.contact__link i { color: var(--accent); width: 20px; }
.form__group { display: flex; flex-direction: column; gap: 0.4rem; margin-bottom: 1.25rem; }
.form__group label { font-size: 0.9rem; font-weight: 600; }
.form__group input, .form__group textarea {
  background: var(--bg-primary);
  border: 1px solid var(--border);
  border-radius: 8px;
  padding: 0.75rem 1rem;
  color: var(--text-primary);
  font-family: inherit;
  font-size: 0.95rem;
  transition: border-color var(--transition);
}
.form__group input:focus, .form__group textarea:focus {
  outline: none;
  border-color: var(--accent);
}
.form-success { color: #22c55e; margin-top: 1rem; font-size: 0.9rem; }
.form-error { color: #ef4444; margin-top: 1rem; font-size: 0.9rem; }
.hidden { display: none; }

/* === ABOUT === */
.about__layout {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 4rem;
  align-items: start;
}
@media (max-width: 768px) { .about__layout { grid-template-columns: 1fr; } }
.about__image img {
  border-radius: var(--radius);
  border: 2px solid var(--border);
  width: 100%;
  max-width: 300px;
}
.about__text h2 { font-size: 2rem; margin-bottom: 1rem; }
.about__text p { color: var(--text-secondary); line-height: 1.8; }
```

- [ ] **Step 4: `impressum.html` erstellen**

```html
<section class="hero hero--small">
  <div class="hero__inner">
    <h1 class="section__title">Impressum</h1>
  </div>
</section>
<section class="section">
  <div class="section__inner" style="max-width:700px">
    <h2>Angaben gemäß § 5 TMG</h2>
    <p style="margin:1rem 0;color:var(--text-secondary)">
      [Dein vollständiger Name]<br>
      [Straße und Hausnummer]<br>
      [PLZ und Ort]<br>
      Deutschland
    </p>
    <h3 style="margin-top:2rem">Kontakt</h3>
    <p style="margin:1rem 0;color:var(--text-secondary)">
      E-Mail: DEINE@EMAIL.DE<br>
      Telefon: DEINE NUMMER (optional)
    </p>
    <h3 style="margin-top:2rem">Haftungsausschluss</h3>
    <p style="margin:1rem 0;color:var(--text-secondary)">
      Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich.
    </p>
  </div>
</section>
```

**Wichtig:** Alle `[...]` Platzhalter mit echten Daten ersetzen.

- [ ] **Step 5: `datenschutz.html` erstellen**

Nutze den kostenlosen Datenschutzgenerator von https://www.datenschutz-generator.de/ um eine korrekte Datenschutzerklärung zu generieren. Kopiere den generierten Text in die Datei (gleiche Seitenstruktur wie Impressum).

- [ ] **Step 6: Commit**

```bash
git add ueber-mich.html kontakt.html impressum.html datenschutz.html css/style.css images/
git commit -m "feat: about, contact, legal pages"
```

---

## Task 9: Responsive Design & Feinschliff

**Files:**
- Modify: `css/style.css` — Responsive-Sektion

- [ ] **Step 1: Responsive Styles vervollständigen**

```css
/* === RESPONSIVE === */
@media (max-width: 768px) {
  .section { padding: 3rem 1.25rem; }
  .hero { padding: 7rem 1.25rem 4rem; }
  .hero__actions { flex-direction: column; }
  .hero__actions .btn { width: 100%; justify-content: center; }
  .process__grid { grid-template-columns: 1fr 1fr; }
  .pricing__card--featured { transform: none; }
}
@media (max-width: 480px) {
  .process__grid { grid-template-columns: 1fr; }
  .pricing__grid { grid-template-columns: 1fr; }
  .portfolio__grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Alle Seiten im Browser testen**

Öffne jede Seite und prüfe:
- Desktop (1200px+): Layout, Abstände, Fonts
- Tablet (768px): Hamburger-Menü, Grid-Layout
- Mobile (375px): Alle Buttons klickbar, kein horizontaler Scroll

Nutze Chrome DevTools → Toggle Device Toolbar (Cmd+Shift+M)

- [ ] **Step 3: Lighthouse-Audit**

In Chrome DevTools → Lighthouse → Mobile → Analyse:
- Ziel: Performance Score ≥ 80
- Falls nötig: Bilder komprimieren (https://squoosh.app)

- [ ] **Step 4: Commit**

```bash
git add css/style.css
git commit -m "feat: responsive styles and final polish"
```

---

## Task 10: Demo-Projekte (3 Mini-Webseiten)

**Files:**
- Create: 3 separate Ordner (können separate Git-Repos sein)

Jedes Demo-Projekt ist eine eigenständige Mini-Webseite. Sie müssen **vor** dem Portfolio-Launch deployed und verlinkt sein.

- [ ] **Step 1: Demo 1 — Restaurant "La Bella" bauen**

Erstelle `/Users/keyvan/Documents/Programmieren/demo-restaurant/index.html`  
Stil: Dunkel, elegant, mit Speisekarte-Sektion und Reservierungsformular-Platzhalter.  
Gleiche CSS-Basis wie Mynewweb verwenden. Dauert ca. 2-3 Stunden.

- [ ] **Step 2: Demo 2 — Friseursalon "Hair Studio" bauen**

Erstelle `/Users/keyvan/Documents/Programmieren/demo-hairsalon/index.html`  
Stil: Modern, minimalistisch, mit Services-Grid und Öffnungszeiten.

- [ ] **Step 3: Demo 3 — Handwerk "Meister Bau" bauen**

Erstelle `/Users/keyvan/Documents/Programmieren/demo-handwerk/index.html`  
Stil: Professionell, vertrauenswürdig, mit Leistungen und Kontaktformular.

- [ ] **Step 4: Screenshots erstellen**

Öffne jede Demo in Chrome, mache einen Screenshot (Cmd+Shift+4 oder Chrome DevTools → Screenshot):
- Speichere als `mynewweb/images/portfolio/demo1.jpg`, `demo2.jpg`, `demo3.jpg`
- Empfohlene Größe: 1200×675px

- [ ] **Step 5: Demo-Links in `portfolio.html` aktualisieren**

Ersetze die Platzhalter-URLs mit echten Vercel-URLs nach dem Deployment (Task 11).

---

## Task 11: Deployment auf Vercel

**Voraussetzung:** GitHub-Account + Vercel-Account (beide kostenlos)

- [ ] **Step 1: GitHub Repository erstellen**

Gehe auf https://github.com → New Repository → Name: `mynewweb`  
Öffentlich oder privat — beides funktioniert mit Vercel.

```bash
cd /Users/keyvan/Documents/Programmieren/mynewweb
git remote add origin https://github.com/DEIN-USERNAME/mynewweb.git
git push -u origin main
```

- [ ] **Step 2: Demo-Projekte ebenfalls auf GitHub pushen und deployen**

Gleicher Prozess für `demo-restaurant`, `demo-hairsalon`, `demo-handwerk`.  
Notiere die Vercel-URLs (z.B. `demo-restaurant-xyz.vercel.app`).

- [ ] **Step 3: Mynewweb auf Vercel deployen**

Gehe auf https://vercel.com → New Project → GitHub Repository auswählen → Deploy.  
Vercel erkennt automatisch statische HTML-Seiten.

- [ ] **Step 4: Domain `mynewweb.de` verknüpfen**

In Vercel → Project Settings → Domains → `mynewweb.de` hinzufügen.  
Vercel zeigt dir DNS-Einträge die du bei deinem Domain-Registrar (Porkbun) eintragen musst.  
Bei Porkbun: DNS → A-Record und CNAME-Record eintragen wie von Vercel angegeben.  
DNS-Propagation dauert 5-30 Minuten.

- [ ] **Step 5: Finale Tests auf echter Domain**

- Öffne https://mynewweb.de im Browser
- DE/EN Umschalter testen
- Kontaktformular absenden (echte E-Mail sollte ankommen)
- WhatsApp-Button auf Handy testen
- Lighthouse-Audit auf der live URL ausführen

- [ ] **Step 6: Commit**

```bash
git add .
git commit -m "feat: update portfolio with live demo URLs"
git push
```

---

## Abschluss-Checkliste

- [ ] Alle 8 Seiten sind live und erreichbar
- [ ] DE/EN Sprachwechsel funktioniert auf allen Seiten
- [ ] Kontaktformular sendet E-Mails (testen!)
- [ ] WhatsApp-Button öffnet Chat (auf Handy testen)
- [ ] 3 Demo-Projekte sind live verlinkt
- [ ] Impressum und Datenschutz sind von jeder Seite erreichbar
- [ ] Lighthouse Performance Score ≥ 80 auf Mobile
- [ ] `DEINE_NUMMER`, `DEINE@EMAIL.DE` und persönliche Texte eingetragen
- [ ] Datenschutzerklärung wurde via Generator erstellt
