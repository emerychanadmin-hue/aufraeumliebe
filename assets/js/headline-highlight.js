// Auto-highlights numbers in the post headline (e.g. "9 Ideen", "5-Kisten-Methode")
// in the accent color, since specific numbers are a strong curiosity/specificity cue.
// Works on any headline without needing per-post editing.
(function () {
  var h1 = document.querySelector('.hook h1');
  if (!h1) return;
  var text = h1.textContent;
  if (!/\d/.test(text)) return;
  h1.innerHTML = text.replace(/\b\d+\b/g, '<span class="hl-num">$&</span>');
})();
