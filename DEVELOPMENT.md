## 1) Project Overview

Dotten is a client-side image stylization tool that overlays configurable halftone-style dots on uploaded images and exports the result.

### What Dotten does

- Accepts one or multiple image uploads (picker or drag/drop).
- Shows an interactive preview with per-image navigation/reorder.
- Lets users adjust dot settings (size, spacing, opacity, color, blend mode, position).
- Exports:
  - Single image as PNG.
  - Multiple images as ZIP of PNG files.

### Core features

- Multi-image workflow with thumbnail strip and active preview.
- Drag-and-drop + file picker upload.
- Reordering thumbnails (desktop and touch/mobile).
- Bilingual UI (EN/UZ) with persistent language selection.
- Light/dark theme with persistent preference.
- Full-quality export pipeline separate from fast preview pipeline.

### Design philosophy

- Vanilla HTML/CSS/JS only (no framework).
- Mobile-first, touch-friendly interaction.
- Fast, responsive preview interactions.
- Export quality prioritized at native image resolution.
- Minimal dependencies and no build step.

---

## 2) Tech Stack

- **UI**: HTML + CSS + Vanilla JavaScript
- **Rendering**:
  - Preview: DOM/CSS + lightweight overlay logic
  - Export: Canvas 2D (`<canvas>` in JS at native image size)
- **Archive download**: JSZip (implemented directly in `app.js`)
- **Persistence**: `localStorage`
- **Deployment**: GitHub Pages via GitHub Actions
- **Tooling**: No bundler, no transpiler, no build pipeline

---

## 3) Architecture Overview

Dotten is organized around a single app state and targeted render functions.

### State object

State includes:

- `images`: ordered array of uploaded image records (`id`, `name`, `objectUrl`, etc.)
- `activeIndex`: current previewed image
- `settings`: dot/render settings (size, spacing, opacity, blend mode, color, position)
- `theme`: `"light"` or `"dark"`
- `language`: `"en"` or `"uz"`
- UI/runtime flags for drag/export status

Not persisted:

- Raw file binaries
- Rendered canvases/blobs
- Transient drag pointers/bounds
- Temporary progress internals

### Persistence

- Versioned storage key: `dotten:v1`
- Settings/language/theme are restored from localStorage.
- Defaults are merged to protect against missing/old fields.

### i18n structure

- `I18N` dictionary object keyed by language and string key.
- `t(key)` resolves current language string with fallback.
- `applyI18n()` updates text nodes via `data-i18n` / `data-i18n-attr`.
- Avoids destructive container replacement (`innerHTML`) for interactive controls.

### Theme system

- Theme state applied via `data-theme` on root element.
- CSS variables define semantic colors and are swapped by theme.
- Toggle updates state + persists preference.

### Rendering strategy

- `requestAnimationFrame` scheduler batches render requests.
- Render split by responsibility:
  - `renderPreview()`
  - `renderThumbs()`
  - `renderControls()`
- Avoids full DOM rebuild for unrelated changes.

### ASCII architecture diagram

```text
User Input (upload / sliders / drag / theme / lang)
                |
                v
         State Update Functions
                |
                v
          requestRender(parts)
                |
        requestAnimationFrame
                |
                v
   +------------+------------+
   |                         |
renderPreview()         renderThumbs()/renderControls()
   |                         |
Fast DOM/CSS preview     Targeted UI updates
                |
                v
         Export Action Trigger
                |
                v
 Full-res offscreen Canvas 2D render
                |
                v
     PNG download / ZIP download
```

---

## 4) Core Rendering Pipeline

### Upload flow

1. User selects files or drops files.
2. `handleFiles(files)` converts `FileList` -> array.
3. Filters to `image/*`.
4. Creates per-file record with `URL.createObjectURL(file)`.
5. Pushes records to `state.images`.
6. Sets `activeIndex` if needed.
7. Calls render scheduler.

### State update

- All interactions update `state` through controlled handlers.
- Rendering is requested after mutation, not inline-heavy processing per event.

### `renderAll()` behavior (via scheduled parts)

- Hide empty overlay when `images.length > 0`.
- Show active preview image.
- Render/update thumbnail strip.
- Update control labels/toggles.
- Enable/disable export buttons as appropriate.

### `renderPreview()`

- Shows current image using cached object URL.
- Applies dot overlay position/settings for interactive preview.
- Keeps operations lightweight (no full native-resolution canvas pass here).

### `renderThumbs()`

- Updates strip only when image list/order changes.
- Maintains active state and interaction hooks.

### Export flow

1. User clicks export.
2. For each image, load source and render to offscreen/full-size canvas using natural dimensions.
3. Bake dot layer into final pixels.
4. Output PNG blob(s).
5. Single => direct PNG download.
6. Multiple => ZIP archive download (PNG files inside).

### Why preview/export are separated

- Preview prioritizes interaction speed.
- Export prioritizes final output fidelity.
- Mixing both would cause UI lag and unnecessary CPU/memory use during editing.

---

## 5) Performance Strategy

### No full-res preview rendering

- Full native-resolution render is export-only.
- Preview uses display-sized elements and object URLs.

### RAF batching

- `requestRender()` coalesces rapid updates into one frame.
- Slider drags and repeated UI events avoid redundant render calls.

### Drag optimization

- Cache bounds on pointerdown.
- During pointermove, update only visual transform/position.
- Commit to state once on pointerup.

### Debounced persistence

- Persist settings/theme/language with debounce to avoid write spam.

### DOM safety/perf

- Avoid large `innerHTML` rewrites for app containers.
- Update only needed nodes and text bindings.
- Rebuild thumbnails only when image/order changes.

---

## 6) i18n System

### Where translations live

- `I18N` dictionary in `app.js`, keyed by language and message key.

### How text binding works

- UI nodes use `data-i18n="key"` for text.
- Optional `data-i18n-attr="aria-label:key"` style mapping for attributes.
- `applyI18n()` applies `textContent`/attribute updates only.

### Add a new language

1. Add new language object in `I18N` with complete key coverage.
2. Extend language toggle UI/state options.
3. Ensure `setLanguage()` accepts new code.
4. Verify all `data-i18n` keys resolve.

### Language persistence

- Current language saved in `dotten:v1`.
- Restored on init, then `applyI18n()` runs.

---

## 7) Theme System

### Toggle logic

- User toggles theme control.
- `setTheme()`/`toggleTheme()` updates state and root `data-theme`.
- Preference is saved in localStorage.

### CSS variable structure

- Semantic variables (`--bg`, `--text`, `--surface`, etc.).
- Theme-specific variable values under `[data-theme="light"]` / `[data-theme="dark"]`.

### Extending themes

1. Add new theme token block in CSS.
2. Update theme state validation.
3. Expose control in UI.
4. Keep semantic variable names stable to avoid component-level rewrites.

---

## 8) File Structure

```text
dotten/
├── index.html
├── styles.css
├── app.js
├── DEVELOPMENT.md
└── .github/
    └── workflows/
        └── pages.yml
```

### Responsibilities

- `index.html`: App structure, controls, upload zone, preview area, thumbnail strip, footer, script/style includes.
- `styles.css`: Layout, responsive behavior, theme tokens, component styling, transitions.
- `app.js`: State, event wiring, i18n, theme, upload handling, rendering scheduler, drag/reorder logic, export pipeline, persistence.
- `.github/workflows/pages.yml`: GitHub Pages deployment workflow.

---

## 9) Deployment (GitHub Pages)

### Workflow file

- Deployment is defined in `.github/workflows/pages.yml`.

### Required repository setting

- In GitHub repo: **Settings → Pages**
- Source must be **GitHub Actions**.

### Deployment behavior

- On push to `main`, workflow builds/deploys static files to Pages environment.
- No build artifacts are required since project is static.

### Local testing

- Open `index.html` directly in browser for basic checks.
- For stricter browser behavior, optionally use a local static server (not required by project).

---

## 10) How to Add New Features Safely

- Do not rebuild large DOM sections unless necessary.
- Preserve preview/export separation:
  - Preview remains lightweight.
  - Export remains native-resolution canvas.
- Update state through controlled setters/handlers, then request render.
- Add all new user-facing strings to `I18N` and bind via `data-i18n`.
- Avoid `innerHTML` replacement on interactive containers.
- When changing persistence:
  - Maintain backward-safe defaults merge.
  - Bump/handle schema version intentionally.
- Verify both mouse and touch behavior for drag/reorder features.

---

## 11) Known Constraints / Limitations

- Large images can increase memory/CPU usage during export.
- Output format is PNG-only (lossless, larger file sizes than JPEG).
- No backend: all processing is client-side in-browser.
- Uploaded image binaries are not persisted in localStorage (session-only object URLs/state).

---

## 12) Roadmap Ideas (Optional)

- Presets system for reusable dot style profiles.
- Per-image dot position/settings override.
- Animation export sequence support.
- PWA mode for installable offline experience.
