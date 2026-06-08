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

  // Number Counter — preise.html
  function initCounters() {
    document.querySelectorAll('.pricing__price').forEach(el => {
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

  // Entry point
  runPreloader(() => {
    runHeroReveal();
    initHeroParallax();
  });
}

// Reduced-motion guard
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const pre = document.getElementById('preloader');
  if (pre) pre.style.display = 'none';
} else {
  window.addEventListener('load', initAnimations);
}
