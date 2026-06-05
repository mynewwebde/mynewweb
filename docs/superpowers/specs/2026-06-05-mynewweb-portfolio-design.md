# Mynewweb Portfolio-Website — Design Spec
**Datum:** 2026-06-05  
**Projekt:** mynewweb.de — Freelance Webentwicklung Portfolio

---

## Ziel

Eine professionelle, zweisprachige (DE/EN) Portfolio-Webseite für das Freelance-Business "Mynewweb". Ziel: Potenzielle Kunden überzeugen, dass Mynewweb ihre Webseite professionell erstellen kann. Die Seite selbst ist das beste Portfolio-Stück.

## Zielgruppe

Alle Arten von Kunden in Deutschland: lokale Betriebe (Restaurants, Friseure, Handwerker), Selbstständige (Coaches, Fotografen, Therapeuten) und größere Unternehmen.

## Dienstleistungen

- Webseiten-Erstellung (einmalig)
- Hosting & Wartung (monatliches Abo)

---

## Seitenstruktur (8 Seiten)

| Seite | Datei | Inhalt |
|-------|-------|--------|
| Home | `index.html` | Hero, Wie läuft das ab?, Leistungsübersicht, FAQ, CTA |
| Leistungen | `leistungen.html` | Details zu Webseiten-Erstellung & Hosting-Abo |
| Portfolio | `portfolio.html` | 3 Demo-Projekte (fiktive Firmen) |
| Preise | `preise.html` | 3 Pakete + Hosting-Abo Preise |
| Über mich | `ueber-mich.html` | Profil, Motivation, persönlicher CTA |
| Kontakt | `kontakt.html` | Kontaktformular + WhatsApp |
| Impressum | `impressum.html` | Gesetzlich verpflichtende Angaben (§ 5 TMG) |
| Datenschutz | `datenschutz.html` | DSGVO-konforme Datenschutzerklärung |

**Hinweis:** Impressum und Datenschutz sind für deutsche Geschäftswebseiten gesetzlich verpflichtend. Links zu beiden im Footer auf jeder Seite.

---

## Navigation

- Fixierte Navbar oben (transparent → dunkel beim Scrollen)
- Logo "Mynewweb" links
- Menüpunkte rechts: Leistungen · Portfolio · Preise · Über mich · Kontakt
- Sprachumschalter DE/EN ganz rechts
- Mobile: Hamburger-Menü

---

## Visuelles Design

### Farben
```
Hintergrund (primary):   #0a0a0a
Hintergrund (cards):     #1a1a1a
Akzent (Blau):           #3b82f6
Akzent (Glow):           rgba(59, 130, 246, 0.15)
Text (primär):           #ffffff
Text (sekundär):         #9ca3af
Border:                  #2a2a2a
```

### Typografie
- **Schrift:** Inter (Google Fonts) — für Überschriften und Fließtext
- Alternativ: Plus Jakarta Sans für Überschriften
- Beide kostenlos, international verbreitet

### Stil-Elemente
- Blauer Glow-Effekt auf Buttons und Akzent-Elementen
- Dünne blaue Linien/Rahmen als Dekoration
- Gradient im Hero: `#0a0a0a` → `#0f172a` (dunkles Blau)
- Scroll-Animationen: Elemente faden mit `IntersectionObserver` ein
- Abgerundete Ecken: `border-radius: 12px` auf Karten/Buttons

---

## Seiteninhalt im Detail

### Home (`index.html`)

**Hero:**
- DE: *"Deine Webseite. Professionell. Schnell. Bezahlbar."*
- EN: *"Your Website. Professional. Fast. Affordable."*
- Subtext: 1-2 Sätze über Mynewweb
- CTA-Button: "Kostenlose Beratung anfragen" / "Request Free Consultation"

**Wie läuft das ab? (4 Schritte mit Icons)**
1. Beratung — kostenloses Erstgespräch
2. Design — individuelle Gestaltung
3. Entwicklung — professionelle Umsetzung
4. Launch — Webseite geht online

**Leistungsübersicht:**
- 2 Karten: Webseite erstellen & Hosting/Wartung

**FAQ (5-6 Fragen):**
- Was kostet eine Webseite?
- Wie lange dauert die Erstellung?
- Brauche ich technisches Wissen?
- Was passiert wenn ich das Hosting-Abo kündige?
- Kann ich die Webseite später noch ändern lassen?
- Welche Arten von Webseiten macht Mynewweb?

**Footer:** Logo, Links, Copyright, Social Media (optional)

---

### Leistungen (`leistungen.html`)

**Webseiten-Erstellung:**
- Was ist inbegriffen (responsives Design, SEO-Basis, Kontaktformular, etc.)
- Ablauf erklärt
- CTA: Angebot anfragen

**Hosting & Wartung:**
- Was ist inbegriffen (Server, Updates, Backups, Support)
- Monatliches Abo — flexibel kündbar
- Was passiert bei Kündigung (Übergabe aller Dateien)

---

### Portfolio (`portfolio.html`)

3 selbst gebaute Demo-Projekte für fiktive Firmen:
- z.B. Restaurant "La Bella" — Restaurantwebseite
- z.B. Friseursalon "Hair Studio" — Dienstleistungswebseite
- z.B. Handwerksbetrieb "Meister Bau" — Handwerkerwebseite

Pro Projekt: Screenshot/Preview + Projektname + kurze Beschreibung + "Demo ansehen" Button (Link zur echten Demo-Seite)

**Wichtig:** Die 3 Demo-Projekte müssen als separate Mini-Webseiten gebaut und ebenfalls auf Vercel/GitHub Pages deployed werden, *bevor* die Portfolio-Seite live geht. Sie sind eigenständige Builds und gehören zum Implementierungsplan als separate Aufgaben.

---

### Preise (`preise.html`)

**3 Pakete:**

| Paket | Preis | Leistung |
|-------|-------|----------|
| Starter | ab 499€ | Bis 5 Seiten, responsives Design, Kontaktformular |
| Professional | ab 999€ | Bis 10 Seiten, SEO-Basis, Blog, erweiterte Features |
| Premium | Auf Anfrage | Individuell, unbegrenzte Seiten, komplexe Funktionen |

**Hosting-Abo:** ab 29€/Monat (flexibel kündbar)

CTA unter den Paketen: "Nicht sicher welches Paket? Schreib mir einfach."

---

### Über mich (`ueber-mich.html`)

- Profilfoto
- Kurze persönliche Vorstellung
- Warum Mynewweb gegründet
- Motivation & Werte
- CTA: "Jetzt Projekt starten"

---

### Kontakt (`kontakt.html`)

- Kontaktformular: Name, E-Mail, Nachricht, Absenden
- E-Mail-Adresse direkt sichtbar
- WhatsApp-Link Button
- Antwortzeit: "Ich melde mich innerhalb von 24 Stunden"

**Formular-States (Formspree):**
- Standard: Leeres Formular, Button aktiv
- Laden: Button deaktiviert, Lade-Spinner sichtbar
- Erfolg: Grüne Erfolgsmeldung "Nachricht gesendet! Ich melde mich bald."
- Fehler: Rote Fehlermeldung "Etwas ist schiefgelaufen. Bitte versuche es erneut oder schreib direkt per E-Mail."

---

## Globale UI-Elemente

**Fixierter WhatsApp-Button:**
- Unten rechts auf jeder Seite
- Grüner WhatsApp-Button mit Glow-Effekt
- Öffnet WhatsApp-Chat direkt

**Sprachumschalter:**
- DE/EN Toggle in der Navbar
- Umsetzung via JavaScript: Texte in `data-de` und `data-en` Attributen gespeichert, JS wechselt die Sprache dynamisch
- Beim Sprachwechsel wird auch `<html lang="de">` bzw. `<html lang="en">` aktualisiert
- `<title>` und `<meta name="description">` werden per JS ebenfalls pro Seite in beiden Sprachen definiert und beim Wechsel aktualisiert
- Gewählte Sprache wird in `localStorage` gespeichert und beim nächsten Besuch wiederhergestellt

---

## Tech Stack

| Was | Technologie |
|-----|-------------|
| Markup | HTML5 |
| Styling | CSS3 (kein Framework) |
| Interaktivität | Vanilla JavaScript |
| Fonts | Google Fonts (Inter) |
| Icons | Font Awesome (kostenlos) |
| Hosting | Vercel oder GitHub Pages (kostenlos) |
| Formulare | Formspree (kostenloser E-Mail-Service) |

---

## Dateistruktur

```
mynewweb/
├── index.html
├── leistungen.html
├── portfolio.html
├── preise.html
├── ueber-mich.html
├── kontakt.html
├── impressum.html
├── datenschutz.html
├── css/
│   └── style.css          /* Sektionen: base, navbar, hero, sections, cards,
│                              pricing, portfolio, contact, footer, responsive */
├── js/
│   └── script.js          /* Sektionen: navbar, language-switcher, animations,
│                              contact-form, whatsapp-button */
├── images/
│   ├── logo.svg
│   ├── hero-bg.jpg
│   └── portfolio/
│       ├── project1.jpg
│       ├── project2.jpg
│       └── project3.jpg
└── docs/
    └── superpowers/specs/
        └── 2026-06-05-mynewweb-portfolio-design.md
```

Die `style.css` wird mit klar benannten Kommentar-Blöcken (`/* === NAVBAR === */` etc.) strukturiert, damit sie als Anfänger übersichtlich bleibt.

---

## Erfolgskriterien

- Lighthouse Performance Score ≥ 80 auf Mobile (gemessen mit Chrome DevTools)
- Vollständig responsiv (Mobile, Tablet, Desktop)
- Beide Sprachen (DE/EN) funktionieren korrekt inkl. `lang`-Attribut, `<title>` und `<meta description>`
- Kontaktformular zeigt Erfolgs- und Fehlermeldung korrekt an
- WhatsApp-Button funktioniert auf allen Geräten
- Portfolio zeigt 3 verlinkbare, live erreichbare Demo-Projekte
- Impressum und Datenschutz sind vorhanden und von jeder Seite erreichbar
