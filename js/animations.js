// animations.js — all GSAP logic for mynewweb.de

function initAnimations() {
  gsap.registerPlugin(ScrollTrigger);

  // --- Preloader ---
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
      .to({}, { duration: 0.3 }); // hold 0.3s before exit
  }

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

  // Entry point
  runPreloader(() => {
    runHeroReveal();
  });
}

// Reduced-motion guard
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const pre = document.getElementById('preloader');
  if (pre) pre.style.display = 'none';
} else {
  window.addEventListener('load', initAnimations);
}
