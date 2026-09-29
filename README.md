# Find My Dravya — Ready Website

Created by Aditya.

This is a zero-build static website. It can be deployed free on GitHub Pages, Cloudflare Pages, or Vercel.

## Files
- index.html
- styles.css
- app.js
- assets/icon.svg

## GitHub Pages
1. Create a GitHub account.
2. Create a public repository named `find-my-dravya`.
3. Upload the files and the `assets` folder.
4. Repository Settings → Pages.
5. Source: Deploy from branch.
6. Branch: `main`, folder `/ (root)`.
7. Save.
8. Your website will appear at `https://YOUR-USERNAME.github.io/find-my-dravya/`.

## Owner
The site displays "Created by Aditya". The Owner area can add/delete Dravya records locally in the current browser.

## Production note
For shared editing across devices, connect a real authenticated database such as Firebase or Supabase. For automatic plant recognition, connect a validated ML model and show top matches/confidence rather than claiming certainty.
