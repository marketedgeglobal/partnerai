// Scroll-triggered reveals. Elements with .reveal or .reveal-stagger get .in
// when they enter the viewport. Bars inside .bar-anim get their width applied
// from data-w when revealed, so growth animates on encounter.
// A MutationObserver picks up elements injected after load (data-driven pages).
(function () {
  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function applyBars(scope) {
    scope.querySelectorAll('.bar-anim i[data-w]').forEach(function (i) {
      i.style.width = i.getAttribute('data-w');
    });
    if (!reduced) {
      scope.querySelectorAll('[data-count]:not(.counted)').forEach(function (b) {
        b.classList.add('counted');
        var end = parseFloat(b.getAttribute('data-count'));
        var suffix = b.getAttribute('data-suffix') || '';
        var t0 = performance.now();
        (function step(t) {
          var k = Math.min(1, (t - t0) / 900);
          var e = 1 - Math.pow(1 - k, 3);
          b.textContent = Math.round(end * e).toLocaleString('en-US') + suffix;
          if (k < 1) requestAnimationFrame(step);
        })(t0);
      });
    }
  }
  function showAll() {
    document.querySelectorAll('.reveal,.reveal-stagger').forEach(function (el) { el.classList.add('in'); });
    applyBars(document);
  }
  if (reduced || !('IntersectionObserver' in window)) {
    document.addEventListener('DOMContentLoaded', showAll);
    var mo0 = new MutationObserver(showAll);
    document.addEventListener('DOMContentLoaded', function () {
      mo0.observe(document.body, { childList: true, subtree: true });
    });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        applyBars(entry.target);
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  function observeAll() {
    document.querySelectorAll('.reveal:not(.in),.reveal-stagger:not(.in)').forEach(function (el) {
      io.observe(el);
    });
  }
  document.addEventListener('DOMContentLoaded', function () {
    observeAll();
    new MutationObserver(function () { observeAll(); }).observe(document.body, { childList: true, subtree: true });
  });
})();
