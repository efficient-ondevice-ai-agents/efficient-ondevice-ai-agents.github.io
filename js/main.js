/**
 * Efficient and On-Device AI Agents — NeurIPS 2026 Workshop
 * Main JavaScript
 */

(function () {
  'use strict';

  /* ============================================================
     NAVBAR: Shrink on scroll
     ============================================================ */
  const navbar = document.getElementById('navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 80) {
      navbar.classList.add('navbar-shrunk');
    } else {
      navbar.classList.remove('navbar-shrunk');
    }
  }

  if (navbar) {
    window.addEventListener('scroll', handleNavbarScroll, { passive: true });
    // Run once on load in case page is already scrolled
    handleNavbarScroll();
  }

  /* ============================================================
     SMOOTH SCROLL: Offset for fixed navbar
     ============================================================ */
  const NAVBAR_HEIGHT = 72; // px — matches --navbar-height + buffer

  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;

      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      const targetTop = target.getBoundingClientRect().top + window.scrollY - NAVBAR_HEIGHT;

      window.scrollTo({
        top: targetTop,
        behavior: 'smooth'
      });

      // Close mobile navbar if open
      const navbarCollapse = document.getElementById('navbarNav');
      if (navbarCollapse && navbarCollapse.classList.contains('show')) {
        const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
        if (bsCollapse) bsCollapse.hide();
      }

      // Update URL hash without jumping
      history.pushState(null, '', targetId);
    });
  });

  /* ============================================================
     ACTIVE NAV LINK: Highlight current section on scroll
     ============================================================ */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('#navbar .nav-link');

  function updateActiveNavLink() {
    let currentSection = '';
    const scrollPos = window.scrollY + NAVBAR_HEIGHT + 20;

    sections.forEach(function (section) {
      if (section.offsetTop <= scrollPos) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(function (link) {
      link.classList.remove('active');
      const href = link.getAttribute('href');
      if (href === '#' + currentSection) {
        link.classList.add('active');
      }
    });
  }

  if (sections.length && navLinks.length) {
    window.addEventListener('scroll', updateActiveNavLink, { passive: true });
    updateActiveNavLink();
  }

})();
