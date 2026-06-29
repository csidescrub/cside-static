/* Injects the "CONNECT WITH US" social-channels section near the bottom of a page.
   Self-contained (styles + markup). Skips any page that already shows the panel
   (the /women and /men pages ship it inline as "ORDER FROM OVERSEAS"). */
(function(){
  if (document.querySelector('.ofo-panel')) return;

  var css =
   ".ofo-panel.ofo-standalone{width:calc(100% - 40px);max-width:1240px;margin:28px auto;padding:32px 40px;border-radius:28px;background:rgba(255,255,255,.55);-webkit-backdrop-filter:blur(20px) saturate(180%);backdrop-filter:blur(20px) saturate(180%);border:1px solid rgba(255,255,255,.6);box-shadow:0 4px 30px rgba(50,80,120,.08);box-sizing:border-box}" +
   ".ofo-standalone .ofo-head{margin-bottom:22px;text-align:left}" +
   ".ofo-standalone .ofo-label{font-family:'Inter','Kanit',sans-serif;font-weight:700;font-size:22px;letter-spacing:.14em;color:#1a1a1a;margin:0 0 6px}" +
   ".ofo-standalone .ofo-rows{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}" +
   ".ofo-standalone .ofo-row{display:flex;gap:14px;align-items:flex-start;padding:18px 20px;border-radius:14px;background:rgba(255,255,255,.55);border:1px solid rgba(255,255,255,.6);transition:transform .15s,background .2s;text-decoration:none;color:#1a1a1a}" +
   ".ofo-standalone .ofo-row:hover{transform:translateY(-2px);background:rgba(255,255,255,.85)}" +
   ".ofo-standalone .ofo-ico{width:42px;height:42px;border-radius:50%;background:rgba(0,0,0,.06);display:grid;place-items:center;flex-shrink:0;color:#1a1a1a}" +
   ".ofo-standalone .ofo-ico svg{width:20px;height:20px}" +
   ".ofo-standalone .ofo-info h4{font-family:'Inter','Kanit',sans-serif;font-size:14px;font-weight:600;color:#1a1a1a;margin:0 0 3px}" +
   ".ofo-standalone .ofo-info .val{font-family:'Inter','Kanit',sans-serif;font-size:13px;color:#3a3a3a;margin:0 0 3px}" +
   ".ofo-standalone .ofo-info .hint{font-family:'Kanit',sans-serif;font-size:12px;color:#7b8794;line-height:1.5;margin:0}" +
   "@media(max-width:768px){.ofo-panel.ofo-standalone{margin:16px 12px;padding:22px 18px;border-radius:18px}.ofo-standalone .ofo-rows{grid-template-columns:1fr;gap:12px}.ofo-standalone .ofo-label{font-size:18px}}";

  var style = document.createElement('style');
  style.textContent = css;
  document.head.appendChild(style);

  var LINE_SVG = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><circle cx="12" cy="12" r="9"/><path d="M7 11h10M7 14h6"/></svg>';
  var FB_SVG   = '<svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 5 3.7 9.1 8.4 9.9V15H8v-3h2.4V9.8c0-2.4 1.5-3.8 3.6-3.8 1.1 0 2.2.2 2.2.2v2.4h-1.3c-1.2 0-1.6.8-1.6 1.5V12h2.7l-.4 3h-2.3v6.9c4.7-.8 8.4-4.9 8.4-9.9Z"/></svg>';
  var IG_SVG   = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r=".8" fill="currentColor" stroke="none"/></svg>';

  var sec = document.createElement('section');
  sec.className = 'ofo-panel ofo-standalone';
  sec.innerHTML =
   '<div class="ofo-head"><p class="ofo-label">CONNECT WITH US</p></div>' +
   '<div class="ofo-rows">' +
    '<a class="ofo-row" href="https://line.me/R/ti/p/@cside" target="_blank" rel="noopener"><div class="ofo-ico">' + LINE_SVG + '</div><div class="ofo-info"><h4>LINE Official</h4><p class="val">@cside</p><p class="hint">Fastest way to get help!</p></div></a>' +
    '<a class="ofo-row" href="https://www.facebook.com/Cside.scrub" target="_blank" rel="noopener"><div class="ofo-ico">' + FB_SVG + '</div><div class="ofo-info"><h4>Facebook</h4><p class="val">Cside.scrub</p><p class="hint">Follow us for updates &amp; news.</p></div></a>' +
    '<a class="ofo-row" href="https://www.instagram.com/cside.s/" target="_blank" rel="noopener"><div class="ofo-ico">' + IG_SVG + '</div><div class="ofo-info"><h4>Instagram</h4><p class="val">@cside.s</p><p class="hint">DM us anytime.</p></div></a>' +
   '</div>';

  function place(){
    // Insert directly above the footer so the footer stays at the very bottom.
    // Pages use either a real <footer> (home, collection) or a .foot-wrap div (rest).
    var footer = document.querySelector('footer, .foot-wrap');
    if (footer && footer.parentNode){ footer.parentNode.insertBefore(sec, footer); return; }
    var main = document.querySelector('main');
    if (main){ main.appendChild(sec); return; }
    document.body.appendChild(sec);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', place);
  else place();
})();
