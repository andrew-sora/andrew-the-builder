# Andrew the Builder

Landing page + portfolio. Next.js 15 static export, bilingual (`/id`, `/en`), file-based content, no CMS, no backend.

Docs: `SPEC.md` (one page), `docs/PRD.md` (full), `docs/COPY.md` (writing guide, case-study template, outreach messages), `docs/LAUNCH.md` (checklist). `CLAUDE.md` holds the rules for coding agents.

## Run

```bash
npm install
npm run dev          # http://localhost:3000  (redirects to /id/ or /en/)
npm run typecheck
npm run build        # static site in ./out (dummy content allowed, pages are noindex)
npm run build:prod   # same, but FAILS while any dummy content remains
```

## Replace dummy content

| What | Where |
|---|---|
| Full name, contacts, availability, CV paths, bio (`about`), at-a-glance, experience | `content/site.yaml` |
| Projects (one file each, ID + EN required) | `content/projects/<slug>.yaml` |
| Screenshots | `public/projects/<slug>/` and the `cover` / `gallery` fields |
| CV | overwrite `public/cv/cv-id.pdf` and `public/cv/cv-en.pdf` |
| UI strings | `src/messages/id.json` and `src/messages/en.json` (same keys, enforced by TypeScript) |

Removing the dummy flags:
- Project: delete `placeholder: true`.
- Site: remove the field name from `placeholderFields` once its value is real.
- Delete the sample projects you do not need (the file name must equal `slug`).

`npm run assets` regenerates the dummy covers and CV PDFs (only needed if you delete them). Link-preview cards live in `public/og-id.png` and `public/og-en.png` (`scripts/gen-og.mjs` regenerates them, needs Playwright; they embed the portrait). The hero portrait is `public/me-{480,720}.webp`, exported from `assets-src/me-cutout.png` by `scripts/gen-photo.mjs` (needs `sharp`). Cloudflare headers are in `public/_headers` (CSP starts as Report-Only).

## Add a project

Copy any `content/projects/*.yaml`, change `slug` (= file name), fill both languages. The build fails with a readable error if a field or translation is missing.

- **APK:** fill `links.apk` (GitHub Releases URL, version, size, SHA-256). Get the hash with `sha256sum app.apk`.
- **Video:** `links.video: <YouTube video id>` (loads only after the visitor clicks play).
- **Lanes:** `web`, `infra`, `security`, `ai`. **Status:** `live`, `beta`, `archived`, `in-progress`.

## Deploy (Cloudflare Pages, free)

1. Push the repo to GitHub.
2. Cloudflare dashboard → Workers & Pages → Create → Pages → connect the repo.
3. Build command: `npm run build` for the first private preview (dummy content is `noindex`), then `npm run build:prod`. Output directory: `out`. Environment variable `NODE_VERSION=22`.
4. Project name `andrewthebuilder` gives `andrewthebuilder.pages.dev`. If the name is taken, change `siteUrl` in `content/site.yaml`.
5. Optional: Web Analytics (cookie-free) in the Cloudflare dashboard.

Custom domain later: add it in Pages, then update `siteUrl`.

## Notes

- The email address is never in the static HTML: it is base64-encoded and decoded in the browser. Without JavaScript visitors see `name [at] domain`.
- `/` is a tiny redirect page that picks `/id/` or `/en/` from the saved choice or the browser language.
- Theme follows the OS and can be toggled; the choice is kept in `localStorage` when available.
