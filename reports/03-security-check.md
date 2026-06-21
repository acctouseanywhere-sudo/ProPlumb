# SECURITY CHECK REPORT — Bute Plumbing Services

**Auditor:** AI Security Review
**Date:** 2026-06-21
**Stack:** React 19 + Vite 8 + Tailwind + React Router 7, no backend, no TypeScript
**Deployment:** Cloudflare Pages (static SPA)

---

## 1. SECRETS & CONFIG EXPOSURE

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| `YOUR_WEB3FORMS_ACCESS_KEY` placeholder | INFO | Contact.jsx:13 | Client must replace with real key |
| `YOUR_HCAPTCHA_SITE_KEY` placeholder | INFO | Contact.jsx:14 | Client must replace with real key |
| .gitignore excludes .env, node_modules, dist | PASS | .gitignore | No fix needed |
| No .env files in repo (git history clean) | PASS | — | No fix needed |
| vite.config.js has no secrets injected | PASS | vite.config.js | No fix needed |

**Verdict:** No issues found. Placeholders are clearly marked and must be replaced before go-live.

---

## 2. FORM SECURITY

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| Web3Forms third-party handler | PASS | Contact.jsx:95 | No fix needed |
| Honeypot field present (hidden from humans) | PASS | Contact.jsx:174-183 | No fix needed |
| hCaptcha integrated, blocks submit until solved | PASS | Contact.jsx:70-77 | No fix needed |
| maxLength on all inputs: Name(100), Email(254), Phone(20), Zip(10), Message(2000) | PASS | Contact.jsx:186-204 | No fix needed |
| Email uses type="email", Phone uses type="tel" | PASS | Contact.jsx:187-188 | No fix needed |
| Submit button disabled during sending | PASS | Contact.jsx:247 | No fix needed |
| No sensitive data collected (no SSN, payment, DOB) | PASS | — | No fix needed |
| Form validation before submission (required fields enforced in React state) | PASS | Contact.jsx:64 | No fix needed |

**Verdict:** No issues found. All form security best practices implemented.

---

## 3. XSS PREVENTION

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| No dangerouslySetInnerHTML usage | PASS | — | No fix needed |
| No eval() or new Function() | PASS | — | No fix needed |
| React escapes by default via JSX | PASS | — | No fix needed |
| No unsanitized URL params rendered as HTML | PASS | main.jsx:16 (Navigate for 404) | No fix needed |

**Verdict:** No issues found.

---

## 4. DEPENDENCY SECURITY

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| npm audit: 0 critical, 0 high, 0 moderate, 0 low | PASS | — | No fix needed |
| Versions use ^ ranges (standard for npm) | INFO | package.json | Pin exact versions for stricter supply chain control |
| All packages from official npm registry | PASS | package.json | No fix needed |
| No typosquatted package names | PASS | package.json | No fix needed |

**Verdict:** No issues found. All dependencies clean.

---

## 5. THIRD-PARTY SCRIPTS & EXTERNAL CONTENT

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| hCaptcha loaded via `<script src="https://js.hcaptcha.com/1/api.js">` | PASS | index.html:22 | No fix needed (CDN script, no exposed API key) |
| Google Fonts loaded (Plus Jakarta Sans, Cormorant Garamond, Inter, JetBrains Mono) | PASS | index.html:18-20 | No fix needed |
| Google Maps iframe embed (not JS API — no exposed key) | PASS | Contact.jsx:271 | No fix needed |
| External images from Unsplash (CDN) | PASS | Hero.jsx:26, servicesData.js | No fix needed |

**Verdict:** No issues found. All external resources loaded safely.

---

## 6. ROUTING SECURITY

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| 404 handling via `<Navigate to="/" replace />` | PASS | main.jsx:16 | No fix needed |
| No /admin or /test routes | PASS | main.jsx:12-16 | No fix needed |
| External links use rel="noopener noreferrer" with target="_blank" | PASS | App.jsx:36 | No fix needed |
| No javascript: or data: URI schemes in href attributes | PASS | — | No fix needed |

**Verdict:** No issues found.

---

## 7. BUILD OUTPUT CHECK

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| No .env or .git in dist/ | PASS | dist/ | No fix needed |
| Source maps: Vite default (not generated for production) | PASS | vite.config.js | No fix needed |
| No console.logs or debug flags in build | PASS | dist/ | No fix needed |
| Bundle: 406.10 KB JS, 33.58 KB CSS (136.49 KB / 6.75 KB gzipped) | INFO | dist/assets/ | Under 500KB threshold |

**Verdict:** No issues found.

---

## 8. CLOUDFLARE PAGES DEPLOYMENT

| Finding | Severity | File | Fix |
|---------|----------|------|-----|
| _headers file exists with security headers | PASS | public/_headers | No fix needed |
| X-Frame-Options: DENY | PASS | public/_headers | No fix needed |
| X-Content-Type-Options: nosniff | PASS | public/_headers | No fix needed |
| Referrer-Policy: strict-origin-when-cross-origin | PASS | public/_headers | No fix needed |
| Permissions-Policy: camera=(), microphone=(), geolocation=() | PASS | public/_headers | No fix needed |
| Strict-Transport-Security: max-age=31536000; includeSubDomains; preload | PASS | public/_headers | No fix needed |
| Content-Security-Policy configured | PASS | public/_headers | No fix needed |
| frame-ancestors 'none' | PASS | public/_headers | No fix needed |

**Verdict:** No issues found. All security headers configured.

---

## OVERALL VERDICT: APPROVED FOR DELIVERY

All 8 sections passed. No critical or warning findings. Placeholders in Contact.jsx must be replaced before client go-live.
