(function () {
  const header = document.getElementById('siteHeader');
  const menuToggle = document.getElementById('menuToggle');
  const mobileNav = document.getElementById('mobileNav');
  const megaItems = document.querySelectorAll('.has-mega');
  const mobileMenuGroups = document.querySelectorAll('.mobile-menu-group');
  const footerMenuGroups = document.querySelectorAll('.footer-menu-group');
  const ticker = document.querySelector('.ticker-track');
  const revealTargets = document.querySelectorAll('.section, .market-card, .icon-card-grid article, .step-grid article');

  function updateHeader() {
    if (window.scrollY > 24) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  function closeMenu() {
    header.classList.remove('menu-open');
    mobileNav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }

  window.addEventListener('scroll', updateHeader, { passive: true });
  updateHeader();

  menuToggle.addEventListener('click', function () {
    const isOpen = mobileNav.classList.toggle('open');
    header.classList.toggle('menu-open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    document.body.classList.toggle('no-scroll', isOpen);
  });

  mobileNav.querySelectorAll('a').forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  mobileMenuGroups.forEach(function (group) {
    const trigger = group.querySelector('.mobile-heading');

    if (!trigger || trigger.tagName.toLowerCase() !== 'button') {
      return;
    }

    trigger.addEventListener('click', function () {
      const isExpanded = group.classList.toggle('is-expanded');
      trigger.setAttribute('aria-expanded', String(isExpanded));
    });
  });

  footerMenuGroups.forEach(function (group) {
    const trigger = group.querySelector('.footer-menu-toggle');

    if (!trigger) {
      return;
    }

    trigger.addEventListener('click', function () {
      const isExpanded = group.classList.toggle('is-expanded');
      trigger.setAttribute('aria-expanded', String(isExpanded));
    });
  });

  megaItems.forEach(function (item) {
    item.addEventListener('mouseenter', function () {
      item.classList.add('is-open');
    });

    item.addEventListener('mouseleave', function () {
      item.classList.remove('is-open');
    });

    item.addEventListener('focusin', function () {
      item.classList.add('is-open');
    });

    item.addEventListener('focusout', function () {
      window.setTimeout(function () {
        if (!item.contains(document.activeElement)) {
          item.classList.remove('is-open');
        }
      }, 0);
    });
  });

  if ('IntersectionObserver' in window) {
    revealTargets.forEach(function (target) {
      target.classList.add('reveal');
    });

    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    revealTargets.forEach(function (target) {
      observer.observe(target);
    });
  }

  if (ticker) {
    ticker.addEventListener('mouseenter', function () {
      ticker.style.animationPlayState = 'paused';
    });

    ticker.addEventListener('mouseleave', function () {
      ticker.style.animationPlayState = 'running';
    });
  }

  document.querySelectorAll('.hero-arrow, .hero-dots span').forEach(function (control) {
    control.addEventListener('click', function () {
      document.querySelectorAll('.hero-dots span').forEach(function (dot) {
        dot.classList.toggle('active');
      });
    });
  });
})();
