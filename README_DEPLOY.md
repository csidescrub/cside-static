Deploy quick reference

1) Install Node.js and npm if not already installed.

2) From project root run (recommended, uses npx no global install):

```
npm run login   # opens Cloudflare OAuth once
npm run deploy  # builds and deploys to Cloudflare Workers (assets from public/)
```

3) Alternative: publish to Cloudflare Pages

```
npm run deploy:pages
```

Notes:
- The first time you run `npm run login` a browser window will open; complete the OAuth.
- Scripts use `npx wrangler@latest` so you don't need a global wrangler install.
