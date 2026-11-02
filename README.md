# Personal Portfolio Website

A modern, high-performance, single-page personal portfolio website for **Divyanshi Sahu**, Amazon Future Engineer Scholar and aspiring Software Engineer specializing in Data Science. Engineered to showcase projects, skills, leadership experience, and technical certifications.

**Live Application:** [divyanshisahu2024.github.io/Portfolio](https://divyanshisahu2024.github.io/Portfolio/)

---

## ✨ Key Features & Engineering Highlights

- **Zero-Flicker Dual Theming (Dark/Light Mode)**: Pure CSS Custom Properties design system with `localStorage` persistence and early inline anti-FOUC script. Dynamically synchronizes both color palettes and raster branding logos.
- **Interactive Project Filtering**: Instant client-side category filtering (`All`, `Full-Stack`, `Data Engineering`, `AI & ML`) with smooth CSS fade transitions.
- **Serverless Form Ingestion with Honeypot Anti-Spam**: Contact form sends asynchronous `FormData` payloads via native `fetch()` to a Google Apps Script REST endpoint, logging submissions to a Google Sheet. Includes a client-side honeypot field to block automated bot spam.
- **Dynamic Micro-Interactions**: Hero section typewriter animation powered by Typed.js, tabbed navigation for Skills/Experience/Education, sticky glassmorphic navigation bar, and smooth "Back to Top" scrolling.
- **SEO & Open Graph Social Cards**: Configured with rich metadata, canonical URLs, Twitter cards, and Open Graph previews for sharing on LinkedIn, GitHub, and Twitter.
- **Automated CI/CD**: GitHub Actions workflow automatically verifies and deploys changes to GitHub Pages upon push to `main`.

---

## 🛠️ Tech Stack & Architecture

- **Frontend**: Semantic HTML5, CSS3 (CSS Variables, Flexbox, Grid, Glassmorphism), Vanilla JavaScript (ES6+).
- **Libraries & Icons**: [Typed.js](https://github.com/mattboldt/typed.js/) (hero animation), [Font Awesome 6](https://fontawesome.com/) (vector icons).
- **Backend (Serverless)**: Google Apps Script Web App (Webhook ingestion into Google Sheets).
- **CI/CD & Hosting**: GitHub Actions (`.github/workflows/static.yml`), GitHub Pages CDN edge delivery.

---

## 📂 Project Structure

```text
Portfolio-main/
├── .github/workflows/
│   └── static.yml         # GitHub Actions CI/CD deployment pipeline
└── docs/
    ├── index.html         # Semantic structure, Open Graph SEO & Anti-FOUC
    ├── style.css          # CSS Variables, theming tokens & responsive layout
    ├── script.js          # Tab navigation, project filters, async form & back-to-top
    └── images/            # Project previews, SVG skill icons, CV & assets
```

---

## 🚀 Local Development

1. Clone or download the repository:
   ```bash
   git clone https://github.com/DivyanshiSahu2024/Portfolio.git
   ```
2. Navigate into `docs/` and open `index.html` directly in any modern browser, or run a local server:
   ```bash
   # Using Python 3
   python -m http.server 8000
   ```
3. Open `http://localhost:8000/docs` in your browser.



