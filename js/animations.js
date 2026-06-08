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
      if (!overlay) { window.location.href = href; return; }
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

    render(false);

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

    // Scroll-in animation
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

  // Icon Explosion — chips animate FROM scale(0)/opacity(0) in natural flow position
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
        // Icon pulse (charge effect)
        gsap.timeline()
          .to(icon, { scale: 1.3, duration: 0.18, ease: 'power1.out' })
          .to(icon, { scale: 1, duration: 0.15, ease: 'power1.in' });

        // Chips pop in from natural positions
        gsap.to(chips, {
          scale: 1, opacity: 1, y: 0,
          duration: 0.4, ease: 'back.out(1.5)', stagger: 0.08,
          delay: 0.2
        });
      }
    });
  });

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
