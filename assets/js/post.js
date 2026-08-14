// Auto-redirects teaser post pages to the main blog article after 5 seconds.
// Reads the destination from the first CTA button's href, so the UTM-tagged
// link already in the page is reused (no separate URL to maintain).
(function () {
  var cta = document.querySelector('.btn[href]');
  if (!cta) return;
  var destination = cta.getAttribute('href');

  setTimeout(function () {
    window.location.href = destination;
  }, 5000);
})();
