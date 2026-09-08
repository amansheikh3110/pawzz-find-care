<div align="center">

# 🐾 Pawzz — Find Care

**An emergency-first animal-care discovery platform, prototyped end to end.**

Built for the Pawzz Foundation Product & Technology Internship screening assignment —
not a mockup, a working, clickable, deployable site.

[Live prototype](https://pawzz-find-care.vercel.app/index.html) · [Case study](https://pawzz-find-care.vercel.app/) · [Design system](#-design-system) · [Deploying](#-deploying)

![No build step](https://img.shields.io/badge/build-none-1F6F5C?style=flat-square)
![Vanilla JS](https://img.shields.io/badge/JS-vanilla-1F6F5C?style=flat-square)
![Deploy](https://img.shields.io/badge/deploys%20to-Vercel-E2532D?style=flat-square)
![Status](https://img.shields.io/badge/status-prototype-E8B94A?style=flat-square)

</div>

---

## The idea

Today, finding a vet, ambulance, NGO or rescuer in India means guessing across Google,
Instagram, WhatsApp groups and word of mouth — and that guessing gets a lot more stressful
when it's an emergency. **Find Care** turns that into a location-based directory with one
job done first: *in a crisis, get to verified help in seconds.*

This repo is the full result of that thinking — eight working pages, a real design system,
two working AI-flow demos, and a case study explaining the reasoning behind all of it.

## ✨ Features

- **Location-based directory** — vets, ambulances, NGOs, rescuers, boarding, filterable by distance and open-now status
- **Emergency SOS mode** — nearest help ranked by ETA and verification, never by ads
- **Verified provider profiles** — timings, services, one-tap call/WhatsApp
- **Pet health timeline** — vaccination and visit history, AI-extracted entries flagged separately from manual ones
- **AI document upload (working demo)** — a 3-step wizard simulating photo → extracted structured record
- **AI symptom triage (working demo)** — a branching flow that routes to urgent vs. routine care
- **Donate impact card** — a paw-print progress meter instead of a plain donate button
- **Mobile app-pattern nav** — collapses to a fixed bottom tab bar (Home / Search / SOS / Health) under 768px
- **Scroll/mount reveal animations** — headlines fold in via GSAP; buttons animate via a hand-adapted Uiverse component

## 📄 Pages

All site pages live in [`pawzz-care/`](./pawzz-care):

| Page | Purpose |
|---|---|
| `index.html` | Landing — hero, search, categories, nearby providers, AI teasers, donate card |
| `search.html` | Filtered directory results with an illustrative map panel |
| `provider.html` | Provider profile — overview / timings / reviews, sticky contact bar |
| `emergency.html` | Emergency SOS — nearest help, ranked by ETA |
| `health.html` | Pet health timeline — AI-extracted vs. manual entries |
| `upload.html` | AI document-upload demo (photo → extracted record) |
| `triage.html` | AI symptom-triage demo (symptom → urgent/routine routing) |
| `case-study.html` | The product write-up — same 5 questions as the assignment, with live diagrams |

All provider names, reviews, and stats are **illustrative** — not real listings.

## 🎨 Design system

No gradients, one accent spent deliberately: **teal** carries the brand, **coral** is spent
on exactly one thing (emergency actions), so it never loses urgency.

| Token | Hex | Role |
|---|---|---|
| `--purple-950` | `#123B32` | Darkest teal — header / footer chrome |
| `--purple-800` | `#1F6F5C` | Primary teal — buttons, active states |
| `--purple-600` | `#2E8C71` | Mid teal — hovers, icons |
| `--purple-100` | `#DCEFE8` | Light teal tint — soft backgrounds |
| `--coral-500` | `#E2532D` | The one vivid accent — emergency only |
| `--yellow-400` | `#E8B94A` | Mustard — ratings, gentle callouts |
| `--cream-50` | `#F6F4EA` | Warm parchment ground |

**Type:** [Fraunces](https://fonts.google.com/specimen/Fraunces) (display/headlines) ·
[Manrope](https://fonts.google.com/specimen/Manrope) (UI/body) ·
[IBM Plex Mono](https://fonts.google.com/specimen/IBM+Plex+Mono) (distances, ETAs, data)

## 🤖 AI & automation

Two of the assignment's four AI workflows are **working demos**, not just descriptions:

- **Medical-document extraction** (`upload.html`) — a 3-step wizard: choose a file → simulated
  AI scan → structured fields (diagnosis, medicine, follow-up date) ready to add to the timeline.
- **Symptom triage** (`triage.html`) — pick a symptom and a duration, and the flow branches
  live into an urgent (→ Emergency SOS) or routine (→ Search) recommendation.

The other two — directory enrichment and a rescue-story copy assistant — are described in
the [case study](./pawzz-care/case-study.html) as the next AI bets once there's real provider data to work with.

## 🗂️ Repo structure

```
.
├── pawzz-care/              # the deployable site (Vercel root directory)
│   ├── index.html            search.html          provider.html
│   ├── emergency.html         health.html          upload.html
│   ├── triage.html            case-study.html
│   ├── vercel.json           # makes "/" serve case-study.html
│   ├── assets/
│   │   ├── css/
│   │   │   ├── styles.css        # design tokens + every component
│   │   │   ├── send-button.css   # the animated CTA (adapted from a Uiverse component)
│   │   │   └── case-study.css    # long-form doc page layout
│   │   ├── js/
│   │   │   ├── app.js            # nav, wizards, fold-text, send-button generator
│   │   │   └── case-study.js     # scroll-reveal for the case study page
│   │   └── images/                # illustrations + brand mark (see asset-plan.html)
│   ├── asset-plan.html        # the brief given to generate every illustration
│   └── button/                 # the original Uiverse source this repo's CTA is adapted from
├── docs/                     # the 2-page LaTeX submission doc + compiled PDF
└── Practo-for-Animals-Product-Technology-Assignment.pdf   # the original brief
```

## 🚀 Running it locally

No install, no build step, no dependencies beyond two CDN-hosted fonts and GSAP:

```bash
cd pawzz-care

# just open it
open index.html          # macOS
start index.html         # Windows

# or serve it (needed if you want clean relative-path behaviour in some browsers)
npx serve .
```

## ☁️ Deploying

Static site — deploys to [Vercel](https://vercel.com) with **zero build configuration**.
Because the repo root holds more than just the site, set the project's **Root Directory to
`pawzz-care`** on import. A `vercel.json` inside that folder rewrites `/` to `case-study.html`,
so the shared link opens the case study first, with a button through to the live prototype.

## 🙏 Credits

- Animated CTA button pattern adapted from a [Uiverse.io](https://uiverse.io) component by
  **marcelodolza** (recoloured to this project's palette — see `assets/css/send-button.css`
  for the details of what changed and why).
- Fonts via [Google Fonts](https://fonts.google.com); scroll/fold animation via
  [GSAP](https://gsap.com) + ScrollTrigger.
- Illustrations generated from the prompts in [`asset-plan.html`](./pawzz-care/asset-plan.html).

## 📌 Scope — what's deliberately not here

Per the assignment's own 30-day MVP framing: no booking/payments, no native mobile app, no
self-serve provider onboarding, no reviews/ratings backend, and no real backend at all — this
is a **conceptual prototype**, built to show product thinking and craft, not production code.

---

<div align="center">
<sub>Made with ❤️ by Aman Sheikh</sub>
</div>
