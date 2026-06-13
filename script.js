(function () {
  'use strict';

  /* ---- Navbar scroll ---- */
  const navbar = document.getElementById('navbar');
  const backToTop = document.getElementById('backToTop');

  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    navbar.classList.toggle('scrolled', y > 40);
    backToTop.classList.toggle('visible', y > 400);
  }, { passive: true });

  backToTop.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

  /* ---- Mobile menu ---- */
  const hamburger = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');

  hamburger.addEventListener('click', function () {
    const open = mobileMenu.classList.toggle('open');
    hamburger.classList.toggle('active', open);
  });

  window.closeMobileMenu = function () {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('active');
  };

  /* Hamburger animation */
  const style = document.createElement('style');
  style.textContent = `
    .hamburger.active span:nth-child(1){transform:translateY(7px) rotate(45deg)}
    .hamburger.active span:nth-child(2){opacity:0}
    .hamburger.active span:nth-child(3){transform:translateY(-7px) rotate(-45deg)}
  `;
  document.head.appendChild(style);

  /* ---- Scroll reveal ---- */
  const targets = document.querySelectorAll(
    '.about-grid, .project-row, .section-title-center, .section-line, .contact-grid, .about-service'
  );

  targets.forEach((el, i) => {
    el.classList.add('reveal');
    if (i % 3 === 1) el.classList.add('reveal-d1');
    if (i % 3 === 2) el.classList.add('reveal-d2');
  });

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  targets.forEach(el => io.observe(el));

  /* ---- Active nav ---- */
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-links a');

  const sio = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(a => {
          const active = a.getAttribute('href') === '#' + id;
          a.style.color = active ? 'var(--text)' : '';
          a.style.background = active ? 'rgba(255,255,255,0.06)' : '';
        });
      }
    });
  }, { threshold: 0.5 });

  sections.forEach(s => sio.observe(s));

  /* ---- Contact form ---- */
  window.handleSubmit = function () {
    const name  = document.getElementById('cName').value.trim();
    const email = document.getElementById('cEmail').value.trim();
    const msg   = document.getElementById('cMsg').value.trim();
    const note  = document.getElementById('formNote');
    const btn   = document.getElementById('sendBtn');

    if (!name || !email || !msg) {
      note.textContent = 'Please fill in all fields.';
      note.style.color = '#FF8A82';
      return;
    }

    btn.textContent = 'Sending...';
    btn.disabled = true;

    setTimeout(() => {
      note.textContent = 'Thanks! Message received. I\'ll get back to you soon.';
      note.style.color = '#4ADE80';
      btn.textContent = 'Submit';
      btn.disabled = false;
      document.getElementById('cName').value = '';
      document.getElementById('cEmail').value = '';
      document.getElementById('cMsg').value = '';
    }, 1200);
  };

  /* ---- Hero typed greeting ---- */
  const hello = document.querySelector('.hero-hello');
  if (hello) {
    const full = hello.innerHTML;
    hello.innerHTML = '';
    hello.style.opacity = '1';
    const plain = 'Hello';
    let i = 0;
    const type = () => {
      if (i < plain.length) {
        hello.innerHTML = plain.slice(0, ++i) + (i === plain.length ? '<span class="dot-red">.</span>' : '');
        setTimeout(type, 80);
      }
    };
    setTimeout(type, 500);
    void full; // suppress unused warning
  }

})();
