// ===================================================
//  AHMAD MIFTAHUDDIN — PORTFOLIO
//  script.js — Interactions & Animations
// ===================================================

(function () {
  'use strict';

  /* ---- Navbar scroll effect ---- */
  const navbar = document.getElementById('navbar');
  function onScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    toggleBackToTop();
  }
  window.addEventListener('scroll', onScroll, { passive: true });

  /* ---- Mobile hamburger menu ---- */
  const hamburger = document.getElementById('hamburger');

  // Create mobile menu
  const mobileMenu = document.createElement('div');
  mobileMenu.className = 'mobile-menu';
  mobileMenu.innerHTML = `
    <a href="#about"   onclick="closeMobileMenu()">About</a>
    <a href="#projects" onclick="closeMobileMenu()">Projects</a>
    <a href="#skills"  onclick="closeMobileMenu()">Skills</a>
    <a href="#timeline" onclick="closeMobileMenu()">Journey</a>
    <a href="#contact" onclick="closeMobileMenu()">Contact</a>
  `;
  document.body.appendChild(mobileMenu);

  window.closeMobileMenu = function () {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  };

  hamburger.addEventListener('click', function () {
    mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active');
  });

  /* ---- Back to top ---- */
  const backToTop = document.getElementById('backToTop');
  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }
  backToTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---- Scroll reveal ---- */
  const revealEls = document.querySelectorAll(
    '.about-grid, .project-polaroid, .skill-cluster, .timeline-card, .contact-board, .section-header'
  );

  revealEls.forEach(function (el, i) {
    el.classList.add('reveal');
    // stagger children slightly
    if (i % 3 === 1) el.classList.add('reveal-delay-1');
    if (i % 3 === 2) el.classList.add('reveal-delay-2');
  });

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }
  );

  revealEls.forEach(function (el) { observer.observe(el); });

  /* ---- Active nav link highlight ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sectionObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(function (link) {
            link.style.background = '';
            link.style.color = '';
            if (link.getAttribute('href') === '#' + id) {
              link.style.background = 'rgba(255,255,255,0.15)';
              link.style.color = '#fff';
            }
          });
        }
      });
    },
    { threshold: 0.5 }
  );

  sections.forEach(function (s) { sectionObserver.observe(s); });

  /* ---- Polaroid tilt on mousemove ---- */
  document.querySelectorAll('.project-polaroid').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = `rotate(0deg) scale(1.04) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
    });
  });

  /* ---- Sticky notes slight parallax ---- */
  const stickies = document.querySelectorAll('.sticky-float');
  window.addEventListener('scroll', function () {
    const scrollY = window.scrollY;
    stickies.forEach(function (el, i) {
      const speed = 0.04 + i * 0.02;
      el.style.transform = el.style.transform.replace(/translateY\([^)]+\)/g, '') +
        ` translateY(${scrollY * speed}px)`;
    });
  }, { passive: true });

  /* ---- Skill tag hover colors ---- */
  document.querySelectorAll('.skill-tag').forEach(function (tag) {
    tag.addEventListener('mouseenter', function () {
      tag.style.opacity = '0.85';
    });
    tag.addEventListener('mouseleave', function () {
      tag.style.opacity = '';
    });
  });

  /* ---- Typed greeting effect in hero ---- */
  const greeting = document.querySelector('.hero-greeting');
  if (greeting) {
    const text = greeting.textContent;
    greeting.textContent = '';
    greeting.style.opacity = '1';
    let i = 0;
    setTimeout(function type() {
      if (i < text.length) {
        greeting.textContent += text[i++];
        setTimeout(type, 60);
      }
    }, 600);
  }

  /* ---- Hamburger animation ---- */
  const style = document.createElement('style');
  style.textContent = `
    .hamburger.active span:nth-child(1) { transform: translateY(7px) rotate(45deg); }
    .hamburger.active span:nth-child(2) { opacity: 0; }
    .hamburger.active span:nth-child(3) { transform: translateY(-7px) rotate(-45deg); }
  `;
  document.head.appendChild(style);

})();
