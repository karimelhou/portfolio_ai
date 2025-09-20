# Karim El Houmaini · Creative AI Portfolio

A bilingual (FR/EN) portfolio for **KARIM EL HOUMAINI**, showcasing AI + software engineering projects with immersive Three.js visuals, theme & language switching, and production-ready tooling.

## ✨ Highlights
- **Next.js 14 + TypeScript** app router project structure.
- **React Three Fiber** hero scene with interactive neural particle field & CSS fallback.
- **Full bilingual experience (FR default, EN secondary)** with deep-merge fallbacks and persistent locale cookie + redirect `/ → /fr`.
- **Light/Dark/Auto theme** powered by `next-themes`, respecting `prefers-color-scheme`.
- **Command palette (⌘/Ctrl+K)** for quick navigation.
- **Dynamic sections**: experience timeline, filterable project grid with modals, skills matrix tabs, achievements deck, resume page, contact form (React Hook Form + Zod) with Nodemailer stub, and creative playground demos.
- **SEO & PWA ready**: metadata, OpenGraph/Twitter tags, sitemap, robots, JSON-LD, service worker + offline page, manifest + dynamic icon.
- **Accessibility & motion awareness**: reduced-motion checks for hero animation, matrix rain fallback, focus-visible states.

## 🚀 Getting started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Lint the project
npm run lint

# Build for production
npm run build

# Run production server
npm run start
```

The app listens on `http://localhost:3000`. The middleware redirects `/` to `/fr` (or the persisted locale).

## 🗂️ Project structure

```
app/
  layout.tsx                # Root layout & metadata
  [locale]/                 # Locale-scoped routes (fr/en)
    layout.tsx              # Locale layout + providers, footer, JSON-LD
    page.tsx                # Home
    (pages)/...             # About, Experience, Projects, Skills, Achievements, Resume, Contact, Playground
  api/                      # Contact + resume stubs
  manifest.ts, sitemap.ts, robots, offline
components/
  navigation/               # Header, language/theme toggles, mobile nav
  hero/, three/, sections/  # Reusable UI + three.js scene
  playground/               # Interactive demos
  providers/                # Theme, translation, PWA registration
lib/                        # Fonts, i18n helpers, validation schemas
messages/                   # FR & EN content JSON
public/                     # Service worker, manifest assets, model placeholder
```

## 🌐 Internationalisation
- Translation dictionaries live in `messages/fr.json` & `messages/en.json`.
- `lib/i18n.ts` merges EN onto FR to ensure FR fallback for missing keys.
- `LanguageSwitcher` stores `NEXT_LOCALE` cookie; middleware honors it on root redirect.
- To add copy, update both JSON files (keeping object structure) and TypeScript will pick it up.

## 🎨 Theming & visuals
- Theme preference is stored in local storage and reflected via `data-theme` + body classes.
- Hero 3D scene (`components/three/hero-canvas.tsx`) uses R3F particles + neural links, OrbitControls disabled for reduced motion, and CSS fallback when WebGL isn’t available.
- Playground demos (`EdgeDetectionDemo`, `MatrixRain`) showcase AI-inspired interactions with reduced-motion support.

## 📄 Contact & resume stubs
- API routes live under `app/api/contact` & `app/api/resume`.
- Contact route validates payload via Zod and logs / sends via Nodemailer (stubbed unless SMTP env vars provided).
- Resume download button calls `/api/resume`, which currently returns a 501 with guidance—hook up a PDF generator later.

## 📱 PWA & offline
- `public/sw.js` caches the offline page and adopts a network-first strategy.
- `app/manifest.ts` defines app metadata and leverages a dynamic icon from `app/icon.tsx`.
- `PWAInitializer` registers the service worker client-side.

## 🔧 Environment variables (optional)
```
MAIL_HOST=mail.server.dev
MAIL_PORT=587
MAIL_USER=username
MAIL_PASS=password
CONTACT_EMAIL=elhoumaini.ka@gmail.com
NEXT_PUBLIC_SITE_URL=https://karimelhoumaini.dev
```
If mail variables are absent, the contact endpoint logs payloads instead of sending mail.

## 🧪 Testing checklist
- `npm run lint` – ensures Next.js ESLint rules.
- `npm run build` – validates production build & type safety.

## 📦 Deployment
Deploy on any Node-compatible host (Vercel, Netlify, Render). Set `NEXT_PUBLIC_SITE_URL` to the deployed origin for correct sitemap/robots metadata. Ensure the service worker is served from the site root (`/sw.js`).

## 🔄 Customisation tips
- Update colors/typography via `tailwind.config.ts` and CSS utility classes in `app/globals.css`.
- Replace `public/models/karim-placeholder.glb` with a real GLB to extend Three.js scenes.
- Add more demos under `components/playground/` and link them from translations.
- Extend SEO by editing metadata in `app/[locale]/layout.tsx`.

Enjoy crafting with AI-inspired visuals! 💫
