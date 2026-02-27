## 1) Project Overview

Dotten is a static, client-side web app for styling carousel pagination dots on uploaded images and exporting final images with dots baked in.

### What it does

- Upload one or more images (file picker or drag/drop).
- Preview images in a carousel with interactive dot overlay controls.
- Reorder images via thumbnail strip (desktop + mobile).
- Export:
  - 1 image: PNG download.
  - Multiple images: ZIP containing PNG files.

### Design philosophy

- Vanilla HTML/CSS/JS (no framework, no bundler).
- Fast interaction in preview.
- Full-quality export at native image resolution.
- Mobile-first interaction support.

---

## 2) Rename / History Notes (dotten → Dotten)

The project was renamed from **dotten** to **Dotten**.

Current state:

- Product/UI name is Dotten.
- Persistence key is now `dotten:v2` (legacy keys still read).
- Some legacy naming is intentionally retained in export filenames for compatibility:
  - ZIP filename constant: `ruhiddin.github.io-dotten.zip`
  - Single PNG filename: `dotten-01.png`

Do not change filename rules unless explicitly requested.

---

## 3) Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Canvas 2D API for export rendering
- In-file JSZip implementation (custom class in `app.js`)
- GitHub Pages + GitHub Actions for deployment

No build tools, no transpilation, no package manager required for runtime.

---

## 4) Current Feature Set (Accurate to Code)

- EN/UZ language switcher uses **segmented buttons** (`EN`, `UZ`) in header (not a dropdown).
- Theme toggle works and persists.
- Header branding:
  - `assets/dotten-logo.png` shown in header.
  - Logo inverts in dark theme via CSS filter.
- Favicon:
  - `assets/dotten-logo.svg` via relative paths in `<head>`.
- Upload pipeline:
  - Picker and drag/drop both feed `handleFiles(...)`.
  - Filters `image/*`, creates object URLs, updates state, renders.
- Thumbnail strip:
  - Desktop reorder via HTML5 DnD (handle-gated).
  - Mobile reorder via Pointer Events:
    - drag handle immediate start
    - long-press start (`220ms`)
    - movement cancel threshold (`8px`)
    - auto-scroll near edges
- Dot overlay:
  - No drag hint text in overlay.
  - Anchor is center-based.
  - Mapping uses rendered image rect (contain/cover aware).
  - Edge clamping uses **dot radius** (thin margin), not row width.
- Export behavior:
  - Single image => PNG
  - Multiple images => ZIP (PNG entries only)
- Footer:
  - Dynamic current year copyright line
  - “Made with heart by BITHERD”
  - Instagram/Telegram links: `@bit_herd`
- Persistence:
  - Settings/theme/language persisted
  - Uploaded images are **not** persisted

---

## 5) Architecture Overview

Dotten is state-driven with batched rendering.

### Core state (`app.js`)

`state` includes:

- `language`: `"en"` or `"uz"`
- `theme`: `"light"` or `"dark"`
- `images`: ordered records `{ id, file, name, objectUrl, naturalWidth, naturalHeight }`
- `activeIndex`
- `exportFormat` (UI state only; export implementation still writes PNG)
- `carousel`:
  - `showArrows`, `infinite`, `transition` (`slide|fade`), `fit` (`contain|cover`)
- `dots`:
  - `style`, `activeBehavior`, colors, `pill`, `snap`
  - canonical geometry:
    - `xPct`, `yPct` in normalized `[0..1]`
    - `sizePct`, `gapPct` as ratio of min image dimension

### Persistence

- Active key: `dotten:v2`
- Legacy read keys: `dotten:v1`, `dotten:v1`
- Schema: `version: 2`
- `mergeSettings(...)` validates and migrates legacy values.

### Render scheduler

- `requestRender(parts)` batches updates via `requestAnimationFrame`
- `flushRenderQueue()` calls:
  - `renderPreview()`
  - `renderThumbs()`
  - `renderControls()`

---

## 6) Preview vs Export Rendering Model

Preview and export intentionally use different execution paths but shared geometry model.

### Preview path (fast)

- Uses DOM + object URLs.
- Computes displayed image rect via:
  - `getRenderedImageRect(containerW, containerH, imgNaturalW, imgNaturalH, fitMode)`
- Dot center in preview:
  - `centerX = rect.x + xPct * rect.w`
  - `centerY = rect.y + yPct * rect.h`
- Dot diameter/gap in preview:
  - `dotD = sizePct * min(rect.w, rect.h)`
  - `gap = gapPct * min(rect.w, rect.h)`
- Clamping uses dot radius:
  - center constrained to image rect with `dotRadius = dotD / 2`

### Export path (full quality)

- Uses native-size canvas (`naturalWidth`/`naturalHeight`).
- Draws original image at full native size.
- Dot geometry mirrors preview model in native pixels:
  - `dotD = sizePct * min(nativeW, nativeH)`
  - `gap = gapPct * min(nativeW, nativeH)`
  - center from `xPct/yPct`, clamped by native dot radius
- Multiple-image export always produces PNG files in ZIP.

---

## 7) Dot Geometry + Dragging Details (Important)

### Canonical dot model

- `xPct`, `yPct` are normalized ratios (`0..1`) relative to rendered image rect.
- `sizePct`, `gapPct` are normalized ratios of min image dimension.

### Drag mapping

- On dots drag start, pointer offset is stored relative to anchor center.
- On move:
  - center derived from pointer minus offset
  - converted back to normalized `xPct/yPct` relative to rendered image rect
  - clamped by dot radius bounds
  - optional snap guides applied in normalized space

### Why this matters

This is what keeps preview and export aligned, including near-edge positioning and contain/cover fit behavior.

---

## 8) i18n System

- Translations live in `I18N` object (`app.js`) for `en` and `uz`.
- `t(key, vars)` resolves translated strings.
- `applyI18n()` updates:
  - `textContent` for `[data-i18n]`
  - mapped attributes for `[data-i18n-attr]`
- i18n updates are non-destructive (no container `innerHTML` replacement for core controls).

Language UI:

- Segmented buttons in header:
  - `#langEnBtn`, `#langUzBtn`
- `setLanguage(...)` updates state, i18n, and persistence.

---

## 9) Theme System

- Theme toggle button: `#themeToggle`
- Theme applied to both:
  - `document.documentElement[data-theme=...]`
  - `body[data-theme=...]`
- Early theme application before init:
  - `applyInitialTheme()` + `readStoredThemeEarly()`
- Header logo in dark mode:
  - CSS inversion filter on `.brand-logo` under dark theme.

---

## 10) Upload, Reorder, Export Workflows

### Upload

- Input: `#imageInput`
- Drop zone: `#dropZone`
- `handleFiles(fileList)`:
  - array conversion + `image/*` filter
  - `fileToRecord(...)` + `URL.createObjectURL(...)`
  - appends to `state.images`
  - schedules render

### Reorder

- Thumbnails container: `#thumbStrip`
- Desktop:
  - HTML5 DnD with handle gating
- Mobile:
  - Pointer events with:
    - handle immediate drag
    - long-press fallback
    - auto-scroll strip while dragging
  - final order synced by image IDs

### Export

- `exportAction()` routes:
  - `exportSinglePng()` for one image
  - `exportZip()` for multiple
- ZIP generation uses in-file JSZip class.
- ZIP filename from `buildZipFilename()` => `ZIP_BASE_NAME`.

---

## 11) File Structure

```text
dotten/
├── index.html
├── styles.css
├── app.js
├── DEVELOPMENT.md
├── assets/
│   ├── dotten-logo.png
│   └── dotten-logo.svg
└── .github/
    └── workflows/
        └── pages.yml
```

### File responsibilities

- `index.html`: static structure, controls, accessibility attributes, footer links.
- `styles.css`: theme variables, responsive layout, header branding, interaction visuals.
- `app.js`: state, persistence, i18n, event wiring, render scheduler, drag/reorder, export pipeline.
- `assets/*`: branding assets (header logo + favicon).
- `.github/workflows/pages.yml`: deploy pipeline to GitHub Pages.

---

## 12) Deployment (GitHub Pages)

Workflow file: `.github/workflows/pages.yml`

Current behavior:

- Trigger: push to `main` (and manual dispatch).
- Publishes repository root (`path: .`) as static artifact.
- Deploy action: `actions/deploy-pages@v4`.

Required repo setting:

- **Settings → Pages → Build and deployment**
- Source must be **GitHub Actions**.

---

## 13) Local Development / Testing

- No build step required.
- Open `index.html` directly for quick smoke testing.
- Recommended manual checks:
  - upload via picker and drag/drop
  - language/theme persistence after reload
  - mobile reorder (handle + long-press)
  - near-edge dot placement and export match
  - single PNG and multi ZIP export

---

## 14) Known Constraints

- Large images can increase memory/CPU usage during export.
- No backend; all processing is in-browser.
- Images are session-only (not stored in localStorage).
- Export format selection UI includes JPEG option, but current export implementation produces PNG output (single PNG, multi PNG-in-ZIP).

---

## 15) Safe Change Guidelines

- Preserve preview/export separation.
- Keep dot geometry canonical (`xPct/yPct/sizePct/gapPct` normalized).
- Any persistence schema change must bump version and include migration logic.
- Avoid destructive DOM rewrites for interactive sections.
- For reorder behavior, validate both desktop DnD and mobile pointer flow.
- If changing export naming or format behavior, treat as a compatibility-impacting change and document clearly.
