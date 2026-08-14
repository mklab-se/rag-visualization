/* ============================================================
   MKLab Agentic RAG deck: presentation chrome.
   Keyboard navigation, slide counter, progress hairline,
   fullscreen, idle cursor hiding. No dependencies.
   ============================================================ */
(function () {
  'use strict';

  var slides = Array.prototype.slice.call(document.querySelectorAll('.slide'));
  if (!slides.length) return;

  var counterCur = document.querySelector('.deck-counter .cur');
  var counterTot = document.querySelector('.deck-counter .tot');
  var progress = document.querySelector('.deck-progress');
  var current = 0;

  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  if (counterTot) counterTot.textContent = pad(slides.length);

  function setActive(i) {
    if (i === current && slides[i].classList.contains('is-active')) return;
    current = i;
    slides.forEach(function (s, j) {
      s.classList.toggle('is-active', j === i);
    });
    if (counterCur) counterCur.textContent = pad(i + 1);
    if (progress) {
      progress.style.width = (slides.length > 1 ? (i / (slides.length - 1)) * 100 : 100) + '%';
    }
  }

  if ('IntersectionObserver' in window) {
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) setActive(slides.indexOf(e.target));
      });
    }, { rootMargin: '-40% 0px -40% 0px', threshold: 0 });
    slides.forEach(function (s) { obs.observe(s); });
  }
  setActive(0);

  function go(i) {
    i = Math.max(0, Math.min(slides.length - 1, i));
    slides[i].scrollIntoView({ behavior: 'smooth' });
  }

  window.addEventListener('keydown', function (e) {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    switch (e.key) {
      case 'ArrowRight':
      case 'ArrowDown':
      case 'PageDown':
      case ' ':
        e.preventDefault(); go(current + 1); break;
      case 'ArrowLeft':
      case 'ArrowUp':
      case 'PageUp':
        e.preventDefault(); go(current - 1); break;
      case 'Home':
        e.preventDefault(); go(0); break;
      case 'End':
        e.preventDefault(); go(slides.length - 1); break;
      case 'f':
      case 'F':
        if (document.fullscreenElement) document.exitFullscreen();
        else document.documentElement.requestFullscreen();
        break;
    }
  });

  // hide the cursor when idle: it is a presentation
  var idleTimer = null;
  function wake() {
    document.body.classList.remove('mk-idle');
    clearTimeout(idleTimer);
    idleTimer = setTimeout(function () {
      document.body.classList.add('mk-idle');
    }, 2600);
  }
  ['mousemove', 'pointerdown', 'keydown'].forEach(function (ev) {
    window.addEventListener(ev, wake, { passive: true });
  });
  wake();
})();
