// ═══════════════════════════════════════════════════════════
// Cside Worker — hostname-based routing
// ═══════════════════════════════════════════════════════════
// csidescrubs.com / www.csidescrubs.com  → Coming Soon page
// cside-static.csidescrub.workers.dev    → Full website (public/)
//
// 🟢 LAUNCH the real site to csidescrubs.com:
//    Set COMING_SOON_HOSTS = [] then `npx wrangler deploy`
//
// 🔴 ปิดกลับเป็น Coming Soon:
//    Set COMING_SOON_HOSTS = ['csidescrubs.com', 'www.csidescrubs.com']
// ═══════════════════════════════════════════════════════════

const COMING_SOON_HOSTS = ['csidescrubs.com', 'www.csidescrubs.com'];

const COMING_SOON_HTML = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Coming Soon — Cside</title>
<link rel="preconnect" href="https://fonts.googleapis.com/">
<link rel="preconnect" href="https://fonts.gstatic.com/" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500&family=Inter:wght@300;400&display=swap" rel="stylesheet">
<style>
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{font-family:'Inter',sans-serif;color:#000;background:#fff;display:flex;align-items:center;justify-content:center;padding:24px;text-align:center}
h1{font-family:'Cormorant Garamond',serif;font-weight:500;font-size:clamp(40px,8vw,72px);line-height:1;letter-spacing:-.02em}
</style>
</head>
<body>
<h1>Coming Soon</h1>
</body>
</html>`;

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (COMING_SOON_HOSTS.includes(url.hostname)) {
      return new Response(COMING_SOON_HTML, {
        headers: {
          'content-type': 'text/html;charset=UTF-8',
          'cache-control': 'public, max-age=60'
        }
      });
    }
    return env.ASSETS.fetch(request);
  }
};
