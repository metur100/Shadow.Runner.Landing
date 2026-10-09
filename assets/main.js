(function () {
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Header state, scroll progress and hero parallax
  var header = document.getElementById('top');
  var progress = document.getElementById('progress');
  var parallax = Array.prototype.slice.call(document.querySelectorAll('.parallax'));
  var ticking = false;
  function onScroll() {
    var y = window.scrollY;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (header) header.classList.toggle('scrolled', y > 10);
    if (progress) progress.style.transform = 'scaleX(' + (max > 0 ? y / max : 0) + ')';
    if (!reduceMotion) {
      parallax.forEach(function (el) {
        el.style.transform = 'translateY(' + y * parseFloat(el.dataset.speed || 0) + 'px)';
      });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () {
    if (!ticking) { ticking = true; requestAnimationFrame(onScroll); }
  }, { passive: true });
  onScroll();

  // Count-up numbers
  function countUp(el) {
    var target = parseInt(el.dataset.count, 10);
    if (reduceMotion || !target) return;
    var start = null;
    function step(t) {
      if (start === null) start = t;
      var p = Math.min((t - start) / 1200, 1);
      el.textContent = Math.round(target * (1 - Math.pow(1 - p, 3)));
      if (p < 1) requestAnimationFrame(step);
    }
    el.textContent = '0';
    requestAnimationFrame(step);
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduceMotion) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('in');
        entry.target.querySelectorAll('[data-count]').forEach(countUp);
        io.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // Screenshot gallery arrows
  var gallery = document.getElementById('gallery');
  if (gallery) {
    document.querySelectorAll('.gallery-nav button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var shot = gallery.querySelector('.shot');
        var step = shot ? shot.getBoundingClientRect().width + 28 : 260;
        gallery.scrollBy({ left: step * 2 * parseInt(btn.dataset.dir, 10), behavior: reduceMotion ? 'auto' : 'smooth' });
      });
    });
  }

  // Switch demo: tap to change which form is active
  var demo = document.getElementById('demo');
  var switchBtn = document.getElementById('switch');
  var msg = document.getElementById('demo-msg');
  if (demo && switchBtn && msg) {
    var texts = {
      reality: '<strong>Reality is active.</strong> Walls stop your physical self. Collect coins up here.',
      shadow: '<strong>Shadow is active.</strong> You phase through walls, but bright light destroys you. Collect crystals down here.'
    };
    var section = document.getElementById('how');
    function toggle() {
      var next = demo.dataset.active === 'reality' ? 'shadow' : 'reality';
      demo.dataset.active = next;
      demo.setAttribute('aria-pressed', next === 'shadow' ? 'true' : 'false');
      demo.setAttribute('aria-label', 'Switch worlds. Active: ' + (next === 'shadow' ? 'Shadow' : 'Reality'));
      msg.innerHTML = texts[next];
      if (navigator.vibrate) { try { navigator.vibrate(15); } catch (e) { /* ignore */ } }
    }
    demo.addEventListener('click', toggle);
    switchBtn.addEventListener('click', toggle);
    // Space anywhere inside the demo card (when not on another control) switches too
    document.addEventListener('keydown', function (e) {
      if (e.key !== ' ' || e.repeat) return;
      var t = e.target;
      if (t !== document.body && !(section && section.contains(t))) return;
      if (t.tagName === 'BUTTON' || t.tagName === 'A' || t.tagName === 'INPUT' || t.tagName === 'SUMMARY') return;
      if (!section) return;
      var r = section.getBoundingClientRect();
      if (r.bottom < 0 || r.top > window.innerHeight) return;
      e.preventDefault();
      toggle();
    });
  }
})();
