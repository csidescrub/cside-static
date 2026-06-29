/* Phase 2: Redirect product / shop CTAs to the Zaviago store.
   Product cards on /women, /men, homepage and /collection already carry
   real Zaviago hrefs (set per-card). This script:
     - leaves any element that already resolves to a Zaviago URL alone
       (native <a> handles it, so hover / copy-link / new-tab all work),
     - lets the /collection page run its own category mapping for .cc-card,
     - sends generic shop CTAs (Shop Now / View All / #shop etc.) to the store home. */
(function(){
  var DOMAIN = "shop.zaviago.com";
  var SHOP   = "https://0j85q3282r.shop.zaviago.com";

  var SHOP_HREFS  = ['#shop','#products','#all','#collection','#scrub','#new','#view'];
  var PRODUCT_SEL = '.bsl-card, .cc-card, .prod-card, .bsl-arrow';
  var SHOP_SEL    = '.cc-cta, .cc-link, .sec-link';

  function txt(el){ return (el.textContent || '').toLowerCase(); }
  function isShopNow(el){ return /shop\s*now/.test(txt(el)); }
  function isViewAll(el){ return /view\s*all/.test(txt(el)); }

  // If the element is (or sits inside) an anchor that already points to Zaviago,
  // let the browser handle it natively — don't hijack the click.
  function hasZaviagoHref(el){
    var a = el.closest && el.closest('a[href]');
    if (!a) return false;
    var h = a.getAttribute('href') || '';
    return h.indexOf(DOMAIN) !== -1 || h.indexOf('/product/') === 0;
  }

  function decideUrl(el){
    if (hasZaviagoHref(el)) return null;
    // /collection cards map themselves by category — don't interfere.
    if (el.closest && el.closest('.cc-card')) return null;
    if (el.matches && el.matches(PRODUCT_SEL)) return SHOP;
    if (el.tagName === 'A') {
      if (isShopNow(el) || isViewAll(el)) return SHOP;
      var h = el.getAttribute('href');
      if (h && SHOP_HREFS.indexOf(h) !== -1) return SHOP;
      if (el.matches && el.matches(SHOP_SEL)) return SHOP;
    }
    return null;
  }

  document.addEventListener('click', function(e){
    var el = e.target && e.target.closest && e.target.closest('a, ' + PRODUCT_SEL + ', ' + SHOP_SEL);
    if (!el) return;
    var url = decideUrl(el);
    if (!url) return;
    e.preventDefault();
    window.open(url, '_blank', 'noopener');
  }, true);

  // Rewrite href on generic shop CTAs so hover preview / right-click shows the store URL.
  // Cards that already carry a Zaviago href are skipped by decideUrl.
  function rewriteStatic(){
    document.querySelectorAll('a').forEach(function(a){
      var url = decideUrl(a);
      if (url) { a.setAttribute('href', url); a.setAttribute('target','_blank'); a.setAttribute('rel','noopener'); }
    });
    document.querySelectorAll(PRODUCT_SEL).forEach(function(el){ el.style.cursor = 'pointer'; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', rewriteStatic);
  else rewriteStatic();
})();
