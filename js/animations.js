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

  // Entry point
  runPreloader(() => {
    console.log('Preloader done');
  });
}

// Reduced-motion guard
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const pre = document.getElementById('preloader');
  if (pre) pre.style.display = 'none';
} else {
  window.addEventListener('load', initAnimations);
}
