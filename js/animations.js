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
