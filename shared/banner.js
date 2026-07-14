// Injects the persistent demo banner at the top of every demo page.
// Usage: <script src="../../shared/banner.js" data-demo="Chapter 1: Investment Pipeline" defer></script>
(function () {
  var banner = document.createElement('div');
  banner.className = 'demo-banner';
  banner.setAttribute('role', 'note');
  banner.innerHTML =
    '<div class="wrap">' +
    '<span class="dot" aria-hidden="true"></span>' +
    '<span class="txt">Demo environment. Illustrative example, representative data. These tools ship inside MarketEdge engagements.</span>' +
    '<a href="../../index.html">&larr; Back to PartnerAI</a>' +
    '</div>';
  document.body.insertBefore(banner, document.body.firstChild);
})();
