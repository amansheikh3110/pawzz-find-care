# Pawzz — Find Care (Prototype)

A clickable concept prototype for **Find Care**, an emergency-first animal-care discovery
product for [Pawzz Foundation](https://www.pawzz.org). Built for the Product & Technology
Internship screening assignment.

## What's here

Seven static pages, no build step, no dependencies beyond two Google Fonts:

| Page | Purpose |
|---|---|
| `index.html` | Landing page — search, categories, nearby providers, AI feature teasers |
| `search.html` | Filtered directory results |
| `provider.html` | Provider profile (overview / timings / reviews) |
| `emergency.html` | Emergency SOS — ranked nearest help |
| `health.html` | Pet health timeline (AI-extracted + manual entries) |
| `upload.html` | AI document-upload flow (photo → extracted record) |
| `triage.html` | AI symptom-triage flow (symptom → urgent/routine routing) |

Shared styles live in `assets/css/styles.css`, shared interaction logic in `assets/js/app.js`.
Content (provider names, reviews, stats) is illustrative, not real listings.

## Running it

No install required — open `index.html` in a browser, or serve the folder locally:

```
npx serve .
```

## Deploying

Static site — deploys to Vercel with zero configuration (no build command, no output
directory override needed).
