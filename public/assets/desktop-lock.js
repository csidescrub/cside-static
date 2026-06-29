/* ============================================================
   Desktop proportion lock
   ------------------------------------------------------------
   The site is designed at a 1440px-wide canvas. On any display
   WIDER than that (external monitor, TV, large MacBook) we scale
   the whole page up with CSS `zoom` so the layout keeps the exact
   same proportions everywhere — it just gets bigger, never reflows
   into a different shape. Screens at or below 1440px (laptops,
   tablets, phones) are left untouched so the responsive rules in
   mobile-overrides.css stay in charge.

   Pairing: cside-system.css clips the symmetric full-bleed overflow
   that 100vw sections produce while zoomed (no horizontal scrollbar).
   ============================================================ */
(function () {
  var DESIGN = 1440;   // design canvas width
  var MAX_ZOOM = 2.4;  // sanity guard for very large 4K+ displays
  var html = document.documentElement;

  function apply() {
    var w = window.innerWidth;
    if (w > DESIGN) {
      html.style.zoom = Math.min(w / DESIGN, MAX_ZOOM);
      html.classList.add('cs-locked');
    } else {
      html.style.zoom = '';
      html.classList.remove('cs-locked');
    }
  }

  apply();
  var t;
  window.addEventListener('resize', function () {
    clearTimeout(t);
    t = setTimeout(apply, 120);
  });
})();
