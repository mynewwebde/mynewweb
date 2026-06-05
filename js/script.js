/* === NAVBAR SCROLL === */
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  navbar?.classList.toggle('scrolled', window.scrollY > 50);
});

/* === HAMBURGER MENU === */
const hamburger = document.querySelector('.navbar__hamburger');
const navLinks = document.querySelector('.navbar__links');
hamburger?.addEventListener('click', () => {
  navLinks?.classList.toggle('open');
});
document.querySelectorAll('.navbar__links a').forEach(link => {
  link.addEventListener('click', () => navLinks?.classList.remove('open'));
});

/* === LANGUAGE SWITCHER === */
let currentLang = localStorage.getItem('lang') || 'de';

function applyLanguage(lang) {
  currentLang = lang;
  localStorage.setItem('lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-de]').forEach(el => {
    if (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA') return;
    el.textContent = lang === 'de' ? el.dataset.de : (el.dataset.en || el.dataset.de);
  });

  document.querySelectorAll('[data-de-placeholder]').forEach(el => {
    el.placeholder = lang === 'de' ? el.dataset.dePlaceholder : (el.dataset.enPlaceholder || el.dataset.dePlaceholder);
  });

  const pageTitleMeta = document.querySelector('meta[name="page-title"]');
  if (pageTitleMeta) {
    document.title = lang === 'de' ? pageTitleMeta.dataset.de : (pageTitleMeta.dataset.en || pageTitleMeta.dataset.de);
  }

  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc && metaDesc.dataset.de) {
    metaDesc.content = lang === 'de' ? metaDesc.dataset.de : (metaDesc.dataset.en || metaDesc.dataset.de);
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
    const successEl = document.getElementById('form-success');
    const errorEl = document.getElementById('form-error');

    btn.disabled = true;
    btn.textContent = '...';
    successEl?.classList.add('hidden');
    errorEl?.classList.add('hidden');

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });
      if (res.ok) {
        form.reset();
        successEl?.classList.remove('hidden');
      } else {
        errorEl?.classList.remove('hidden');
      }
    } catch {
      errorEl?.classList.remove('hidden');
    } finally {
      btn.disabled = false;
      btn.textContent = currentLang === 'de' ? 'Absenden' : 'Send';
    }
  });
}

/* === THEME TOGGLE === */
const themeToggle = document.getElementById('theme-toggle');
let currentTheme = localStorage.getItem('theme') || 'dark';

function applyTheme(theme) {
  currentTheme = theme;
  localStorage.setItem('theme', theme);
  document.documentElement.setAttribute('data-theme', theme === 'light' ? 'light' : '');
  if (themeToggle) {
    themeToggle.textContent = theme === 'light' ? '🌙' : '☀️';
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Dark Mode' : 'Light Mode');
  }
}

themeToggle?.addEventListener('click', () => {
  applyTheme(currentTheme === 'dark' ? 'light' : 'dark');
});

/* === INIT === */
document.addEventListener('DOMContentLoaded', () => {
  applyLanguage(currentLang);
  applyTheme(currentTheme);
});
