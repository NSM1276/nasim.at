# Nasim Vision

Visitor analytics for hospitality and retail, running entirely on a box inside the venue.
No cloud, no video storage. Vienna, Austria.

- Product plan: [`PLAN.md`](PLAN.md)
- Website plan: [`WEBSITE_PLAN.md`](WEBSITE_PLAN.md)
- Implementation plans: [`docs/superpowers/plans/`](docs/superpowers/plans/)

## History note

Before 18 September 2026 this repository held a different site, the personal business page
"Nasim Nuridinov — Webseiten für kleine Unternehmen in Wien". On the owner's instruction it
was replaced by Nasim Vision. **Nothing was lost:** those 30 commits are preserved on the
`old-site` branch and can be restored at any time.

```bash
git checkout old-site        # inspect the previous site
```

## Repository layout

| Path | Contents |
|---|---|
| `website/` | Marketing site, Astro. Deployed to Vercel. |
| `box/` | On-premise analytics software, Python. Not deployed. |

## Website: local development

```bash
cd website
npm install
npm run dev      # http://localhost:4321
npm run build    # production build
npm test         # unit tests
npm run check    # TypeScript / Astro diagnostics
```

## Website: Vercel setup

Done once, in the Vercel dashboard:

1. Import the GitHub repository.
2. **Settings → General → Root Directory**: set to `website`.
3. Framework preset: Astro (auto-detected). Leave build and output settings unchanged.
4. Deploy.

After that, every push to `main` deploys to production and every push to any other
branch gets its own preview URL.

## Language handling

German is the default locale and is served without a URL prefix. English lives under
`/en/`. Every user-facing string lives in [`website/src/i18n/ui.ts`](website/src/i18n/ui.ts);
components never contain literal German or English text. A unit test fails the build if
the two dictionaries drift apart.

Page slugs differ between languages (`/impressum/` vs `/en/imprint/`), so the pairing is
declared in [`website/src/i18n/routes.ts`](website/src/i18n/routes.ts). That one map drives
both the language switcher and the `hreflang` tags.
