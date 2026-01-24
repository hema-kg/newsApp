# newsApp

This is a small React + Vite project for a news app demo.

Run locally:

```bash
npm install
npm run dev
```

Build for production:

```bash
npm run build
```

Deploy to GitHub Pages (configured):

```bash
npm install --save-dev gh-pages
npm run deploy

npm run predeploy
npm run deploy

Notes for GitHub Pages
- If you deploy under a repo subpath (for example: https://<user>.github.io/newsApp/), set `base: '/newsApp/'` in `vite.config.js` and use `import.meta.env.BASE_URL` when fetching static assets (e.g. `fetch(`${import.meta.env.BASE_URL}latest.json`)`).
```
