const STORAGE_KEY = "dotten:v2";
const LEGACY_STORAGE_KEYS = ["dotten:v1", "dotfolio:v1"];
const STORAGE_SCHEMA = 2;
const ZIP_BASE_NAME = "dotfolio-ruhiddin.github.io-dotfolio.zip";
const DOT_SIZE_MIN = 0.006;
const DOT_SIZE_MAX = 0.04;
const DOT_GAP_MIN = 0.002;
const DOT_GAP_MAX = 0.03;
console.log("[Dotten] app.js loaded", new Date().toISOString());

applyInitialTheme();

const I18N = {
  en: {
    app: {
      title: "Dotten",
      subtitle: "Design pixel-perfect carousel dots and export fast.",
    },
    sections: {
      images: "Images",
      carousel: "Carousel",
      dots: "Dots",
      export: "Export",
    },
    preview: {
      title: "Preview",
      empty: "Add images to start designing.",
      noImages: "No images yet",
      metaCount: "{current} / {total} images",
    },
    actions: {
      addImages: "Add Images",
      reset: "Reset",
    },
    images: {
      dropTitle: "Drag & drop images",
      dropSub: "or tap to browse",
    },
    carousel: {
      showArrows: "Show arrows",
      infiniteLoop: "Infinite loop",
      transition: "Transition",
      slide: "Slide",
      fade: "Fade",
      fitMode: "Fit mode",
      contain: "Contain",
      cover: "Cover",
    },
    dots: {
      style: "Style",
      outlined: "Outlined",
      filled: "Filled",
      numbered: "Numbered",
      activeBehavior: "Active behavior",
      behaviorFilled: "Filled contrast",
      behaviorLarger: "Larger active",
      behaviorOpacity: "Stronger opacity",
      size: "Size",
      spacing: "Spacing",
      inactive: "Inactive",
      active: "Active",
      backgroundPill: "Background pill",
      position: "Position",
      snapToGuides: "Snap to guides",
      resetPosition: "Reset position",
    },
    export: {
      formatLabel: "Format (ZIP contents when multiple)",
      png: "PNG",
      jpeg: "JPEG",
      buttonDefault: "Export",
      buttonDownloadPng: "Download PNG",
      buttonDownloadZip: "Download ZIP",
      disabled: "Add at least one image to enable export.",
      singleSummary: "Exports one PNG at original image resolution.",
      multiSummary: "Downloads {zipName}",
      renderingPng: "Rendering PNG...",
      renderingZip: "Rendering ZIP...",
      renderingProgress: "Rendering {current}/{total}...",
    },
    footer: {
      copyright: "© {year} Dotten. All rights reserved.",
      made: "Made with heart by BITHERD",
    },
    aria: {
      languageSwitcher: "Language switcher",
      toggleTheme: "Toggle theme",
      previewArea: "Preview area",
      carouselPreview: "Carousel preview",
      prevSlide: "Previous slide",
      nextSlide: "Next slide",
      dotsOverlay: "Pagination dots overlay",
      carouselPagination: "Carousel pagination",
      scrollThumbsLeft: "Scroll thumbnails left",
      scrollThumbsRight: "Scroll thumbnails right",
      imageThumbnails: "Image thumbnails",
      settingsPanel: "Settings panel",
      inactiveColorPicker: "Inactive color picker",
      inactiveColorHex: "Inactive color hex",
      activeColorPicker: "Active color picker",
      activeColorHex: "Active color hex",
      footer: "Footer",
      instagram: "Instagram @bit_herd",
      telegram: "Telegram @bit_herd",
      slideOf: "Slide {current} of {total}",
      goToSlide: "Go to slide {current}",
      thumbnail: "Thumbnail {current}",
      dragThumbnail: "Drag thumbnail",
      removeThumbnail: "Remove thumbnail",
    },
    toast: {
      imageRemoved: "Image removed",
      pngDownloaded: "PNG downloaded",
      zipDownloaded: "ZIP downloaded",
      resetDone: "Settings reset",
    },
  },
  uz: {
    app: {
      title: "Dotten",
      subtitle: "Karusel nuqtalarini aniq sozlang va tez export qiling.",
    },
    sections: {
      images: "Rasmlar",
      carousel: "Karusel",
      dots: "Nuqtalar",
      export: "Export",
    },
    preview: {
      title: "Ko'rinish",
      empty: "Dizaynni boshlash uchun rasmlar qo'shing.",
      noImages: "Hali rasm yo'q",
      metaCount: "{current} / {total} rasm",
    },
    actions: {
      addImages: "Rasm qo'shish",
      reset: "Qayta sozlash",
    },
    images: {
      dropTitle: "Rasmlarni sudrab tashlang",
      dropSub: "yoki tanlash uchun bosing",
    },
    carousel: {
      showArrows: "Strelkalarni ko'rsatish",
      infiniteLoop: "Cheksiz aylanish",
      transition: "O'tish",
      slide: "Sirpanish",
      fade: "Xiralashish",
      fitMode: "Moslash usuli",
      contain: "Ichiga sig'dirish",
      cover: "To'liq yopish",
    },
    dots: {
      style: "Uslub",
      outlined: "Kontur",
      filled: "To'ldirilgan",
      numbered: "Raqamli",
      activeBehavior: "Faol holat",
      behaviorFilled: "To'liq kontrast",
      behaviorLarger: "Faol nuqta kattaroq",
      behaviorOpacity: "Kuchliroq shaffoflik",
      size: "Hajmi",
      spacing: "Oraliq",
      inactive: "Nofaol",
      active: "Faol",
      backgroundPill: "Fon kapsulasi",
      position: "Joylashuv",
      snapToGuides: "Qo'llanmalarga yopishtirish",
      resetPosition: "Joylashuvni tiklash",
    },
    export: {
      formatLabel: "Format (ko'p bo'lsa ZIP ichidagi fayllar)",
      png: "PNG",
      jpeg: "JPEG",
      buttonDefault: "Export",
      buttonDownloadPng: "PNG yuklab olish",
      buttonDownloadZip: "ZIP yuklab olish",
      disabled: "Export uchun kamida bitta rasm qo'shing.",
      singleSummary: "Bitta PNG asl o'lchamda yuklanadi.",
      multiSummary: "{zipName} yuklab olinadi",
      renderingPng: "PNG tayyorlanmoqda...",
      renderingZip: "ZIP tayyorlanmoqda...",
      renderingProgress: "{current}/{total} tayyorlanmoqda...",
    },
    footer: {
      copyright: "© {year} Dotten. Barcha huquqlar himoyalangan.",
      made: "BITHERD tomonidan mehr bilan yaratildi",
    },
    aria: {
      languageSwitcher: "Til almashtirgich",
      toggleTheme: "Mavzuni almashtirish",
      previewArea: "Ko'rinish maydoni",
      carouselPreview: "Karusel ko'rinishi",
      prevSlide: "Oldingi slayd",
      nextSlide: "Keyingi slayd",
      dotsOverlay: "Sahifalash nuqtalari qatlami",
      carouselPagination: "Karusel sahifalash",
      scrollThumbsLeft: "Miniatyuralarni chapga surish",
      scrollThumbsRight: "Miniatyuralarni o'ngga surish",
      imageThumbnails: "Rasm miniatyuralari",
      settingsPanel: "Sozlamalar paneli",
      inactiveColorPicker: "Nofaol rang tanlagich",
      inactiveColorHex: "Nofaol rang hex",
      activeColorPicker: "Faol rang tanlagich",
      activeColorHex: "Faol rang hex",
      footer: "Pastki qism",
      instagram: "Instagram @bit_herd",
      telegram: "Telegram @bit_herd",
      slideOf: "{total} dan {current}-slayd",
      goToSlide: "{current}-slaydga o'tish",
      thumbnail: "{current}-miniatyura",
      dragThumbnail: "Miniatyurani sudrash",
      removeThumbnail: "Miniatyurani o'chirish",
    },
    toast: {
      imageRemoved: "Rasm o'chirildi",
      pngDownloaded: "PNG yuklab olindi",
      zipDownloaded: "ZIP yuklab olindi",
      resetDone: "Sozlamalar tiklandi",
    },
  },
};

function applyInitialTheme() {
  const theme = readStoredThemeEarly();
  if (!theme) return;
  document.documentElement.setAttribute("data-theme", theme);
  if (document.body) {
    document.body.setAttribute("data-theme", theme);
  }
}

function readStoredThemeEarly() {
  try {
    const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      const saved = JSON.parse(raw);
      if (saved?.theme === "light" || saved?.theme === "dark") return saved.theme;
    }
  } catch {
    // Ignore blocked storage / parse errors.
  }
  return null;
}

function detectDefaultLanguage() {
  const browserLang = (navigator.language || "en").toLowerCase();
  return browserLang.startsWith("uz") ? "uz" : "en";
}

function createDefaultState(language = detectDefaultLanguage()) {
  return {
    language: language === "uz" ? "uz" : "en",
    images: [],
    activeIndex: 0,
    theme: "dark",
    exportFormat: "png",
    carousel: {
      showArrows: true,
      infinite: true,
      transition: "slide",
      fit: "contain",
    },
    dots: {
      style: "outlined",
      activeBehavior: "filled",
      sizePct: 0.014,
      gapPct: 0.011,
      inactiveColor: "#d1d5db",
      activeColor: "#2563eb",
      pill: false,
      snap: true,
      xPct: 0.5,
      yPct: 0.88,
    },
  };
}

const state = createDefaultState();

const els = {
  body: document.body,
  previewCard: document.getElementById("previewCard"),
  themeToggle: document.getElementById("themeToggle"),
  languageToggle: document.getElementById("languageToggle"),
  langEnBtn: document.getElementById("langEnBtn"),
  langUzBtn: document.getElementById("langUzBtn"),
  imageInput: document.getElementById("imageInput"),
  pickImagesBtn: document.getElementById("pickImagesBtn"),
  dropZone: document.getElementById("dropZone"),

  carouselViewport: document.getElementById("carouselViewport"),
  carouselTrack: document.getElementById("carouselTrack"),
  prevArrow: document.getElementById("prevArrow"),
  nextArrow: document.getElementById("nextArrow"),
  dotsOverlay: document.getElementById("dotsOverlay"),
  dotsContainer: document.getElementById("dotsContainer"),
  snapGuides: document.getElementById("snapGuides"),
  emptyState: document.getElementById("emptyState"),
  previewMeta: document.getElementById("previewMeta"),

  thumbStrip: document.getElementById("thumbStrip"),
  thumbScrollLeft: document.getElementById("thumbScrollLeft"),
  thumbScrollRight: document.getElementById("thumbScrollRight"),

  exportBtn: document.getElementById("exportBtn"),
  exportBtnPanel: document.getElementById("exportBtnPanel"),
  exportBtnMobile: document.getElementById("exportBtnMobile"),
  mobileExportBar: document.getElementById("mobileExportBar"),

  showArrows: document.getElementById("showArrows"),
  infiniteLoop: document.getElementById("infiniteLoop"),
  activeBehavior: document.getElementById("activeBehavior"),
  dotSize: document.getElementById("dotSize"),
  dotGap: document.getElementById("dotGap"),
  dotSizeOut: document.getElementById("dotSizeOut"),
  dotGapOut: document.getElementById("dotGapOut"),
  dotInactive: document.getElementById("dotInactive"),
  dotActive: document.getElementById("dotActive"),
  dotInactiveHex: document.getElementById("dotInactiveHex"),
  dotActiveHex: document.getElementById("dotActiveHex"),
  dotPill: document.getElementById("dotPill"),
  snapToGuides: document.getElementById("snapToGuides"),
  resetPositionBtn: document.getElementById("resetPositionBtn"),

  exportSummary: document.getElementById("exportSummary"),
  exportProgress: document.getElementById("exportProgress"),
  resetBtn: document.getElementById("resetBtn"),

  footerCopyright: document.getElementById("footerCopyright"),
  footerMade: document.getElementById("footerMade"),

  toastRoot: document.getElementById("toastRoot"),
};

const drag = {
  swipe: null,
  dots: null,
  thumb: null,
};
// Mobile reorder thresholds:
// - Long press activates drag from thumbnail body.
// - Small movement before hold means "scroll", not reorder.
const THUMB_REORDER = {
  longPressMs: 220,
  cancelMovePx: 8,
  startMovePx: 4,
  autoScrollEdgePx: 56,
  autoScrollMaxSpeed: 18,
};
const missingDomWarnings = new Set();

const debouncedSaveSettings = debounce(saveSettings, 200);
// Preview-performance path: collapse rapid UI updates into one paint per animation frame.
const renderQueue = {
  scheduled: false,
  preview: false,
  thumbs: false,
  controls: false,
};

// Internal regression checklist:
// 1) Upload (picker + drag/drop), 2) thumbnail scroll/reorder/select,
// 3) swipe/arrows/loop/transition/fit, 4) dots style + drag/snap,
// 5) export (single PNG, multi ZIP with PNGs), 6) i18n + footer,
// 7) settings persistence + reset clearing saved settings.
document.addEventListener("DOMContentLoaded", () => {
  try {
    init();
  } catch (error) {
    console.error("[Dotten] init() failed", error);
  }
});

function init() {
  console.log("[Dotten] init()");
  validateCriticalElements();
  loadSettings();
  bindEvents();
  syncControlsFromState();
  applyTheme();
  applyI18n();
  requestRender({ preview: true, thumbs: true, controls: true });
}

function validateCriticalElements() {
  const required = [
    ["imageInput", els.imageInput],
    ["dropZone", els.dropZone],
    ["thumbStrip", els.thumbStrip],
    ["carouselTrack", els.carouselTrack],
    ["themeToggle", els.themeToggle],
    ["langEnBtn", els.langEnBtn],
    ["langUzBtn", els.langUzBtn],
  ];

  required.forEach(([name, node]) => {
    if (!node) {
      console.error(`[Dotten] Missing required DOM node: #${name}`);
    }
  });
}

function bindEvents() {
  addSafeListener(els.themeToggle, "themeToggle", "click", () => {
    state.theme = state.theme === "light" ? "dark" : "light";
    applyTheme();
    queueSaveSettings();
  });

  addSafeListener(els.langEnBtn, "langEnBtn", "click", () => setLanguage("en"));
  addSafeListener(els.langUzBtn, "langUzBtn", "click", () => setLanguage("uz"));

  addSafeListener(els.pickImagesBtn, "pickImagesBtn", "click", () => {
    if (!els.imageInput) {
      warn("Missing #imageInput. Image picker cannot open.");
      return;
    }
    els.imageInput.click();
  });

  addSafeListener(els.imageInput, "imageInput", "change", (e) =>
    handleFiles(e.target.files),
  );

  ["dragenter", "dragover"].forEach((type) => {
    addSafeListener(els.dropZone, "dropZone", type, (e) => {
      e.preventDefault();
      els.dropZone.classList.add("dragover");
    });
  });
  ["dragleave", "drop"].forEach((type) => {
    addSafeListener(els.dropZone, "dropZone", type, () =>
      els.dropZone.classList.remove("dragover"),
    );
  });
  addSafeListener(els.dropZone, "dropZone", "drop", (e) => {
    e.preventDefault();
    handleFiles(e.dataTransfer?.files);
  });

  addSafeListener(els.prevArrow, "prevArrow", "click", () =>
    goToSlide(state.activeIndex - 1),
  );
  addSafeListener(els.nextArrow, "nextArrow", "click", () =>
    goToSlide(state.activeIndex + 1),
  );

  addSafeListener(els.carouselViewport, "carouselViewport", "keydown", (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      goToSlide(state.activeIndex - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      goToSlide(state.activeIndex + 1);
    }
  });

  addSafeListener(els.carouselViewport, "carouselViewport", "pointerdown", onSwipeStart);
  window.addEventListener("pointermove", onSwipeMove, { passive: false });
  window.addEventListener("pointerup", onSwipeEnd);
  window.addEventListener("pointercancel", onSwipeEnd);

  addSafeListener(els.dotsOverlay, "dotsOverlay", "pointerdown", onDotsDragStart);
  window.addEventListener("pointermove", onDotsDragMove, { passive: false });
  window.addEventListener("pointerup", onDotsDragEnd);
  window.addEventListener("pointercancel", onDotsDragEnd);

  addSafeListener(els.showArrows, "showArrows", "change", (e) => {
    state.carousel.showArrows = e.target.checked;
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });

  addSafeListener(els.infiniteLoop, "infiniteLoop", "change", (e) => {
    state.carousel.infinite = e.target.checked;
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });

  addSafeListener(els.activeBehavior, "activeBehavior", "change", (e) => {
    state.dots.activeBehavior = e.target.value;
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });

  addSafeListener(els.dotSize, "dotSize", "input", (e) => {
    state.dots.sizePct = clamp(Number(e.target.value) / 100, DOT_SIZE_MIN, DOT_SIZE_MAX);
    els.dotSizeOut.value = (state.dots.sizePct * 100).toFixed(1);
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });

  addSafeListener(els.dotGap, "dotGap", "input", (e) => {
    state.dots.gapPct = clamp(Number(e.target.value) / 100, DOT_GAP_MIN, DOT_GAP_MAX);
    els.dotGapOut.value = (state.dots.gapPct * 100).toFixed(1);
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });

  bindColorPair(els.dotInactive, els.dotInactiveHex, (val) => {
    state.dots.inactiveColor = val;
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });
  bindColorPair(els.dotActive, els.dotActiveHex, (val) => {
    state.dots.activeColor = val;
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });

  addSafeListener(els.dotPill, "dotPill", "change", (e) => {
    state.dots.pill = e.target.checked;
    requestRender({ preview: true, controls: false });
    queueSaveSettings();
  });

  addSafeListener(els.snapToGuides, "snapToGuides", "change", (e) => {
    state.dots.snap = e.target.checked;
    queueSaveSettings();
  });

  addSafeListener(els.resetPositionBtn, "resetPositionBtn", "click", () => {
    state.dots.xPct = 0.5;
    state.dots.yPct = 0.88;
    applyDotsPosition();
    queueSaveSettings();
  });

  document.querySelectorAll(".seg").forEach((btn) => {
    btn.addEventListener("click", () => {
      setSegment(btn.dataset.segment, btn.dataset.value);
      requestRender({ preview: true, controls: false });
      queueSaveSettings();
    });
  });

  [els.exportBtn, els.exportBtnPanel, els.exportBtnMobile].forEach((btn, index) =>
    addSafeListener(btn, `exportBtn${index}`, "click", exportAction),
  );

  addSafeListener(els.resetBtn, "resetBtn", "click", resetAll);

  addSafeListener(els.thumbScrollLeft, "thumbScrollLeft", "click", () => {
    els.thumbStrip.scrollBy({ left: -240, behavior: "smooth" });
  });
  addSafeListener(els.thumbScrollRight, "thumbScrollRight", "click", () => {
    els.thumbStrip.scrollBy({ left: 240, behavior: "smooth" });
  });

  addSafeListener(els.thumbStrip, "thumbStrip", "scroll", updateThumbOverflowButtons);
  addSafeListener(els.thumbStrip, "thumbStrip", "wheel",
    (e) => {
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        els.thumbStrip.scrollLeft += e.deltaY;
      }
    },
    { passive: false });

  window.addEventListener("resize", () => {
    applyDotsPosition();
    updateThumbOverflowButtons();
  });

  window.addEventListener("beforeunload", revokeAllImageUrls);
}

function addSafeListener(el, name, event, handler, options) {
  if (!el) {
    warnMissingDom(name);
    return;
  }
  el.addEventListener(event, handler, options);
}

function setLanguage(nextLanguage) {
  const language = nextLanguage === "uz" ? "uz" : "en";
  if (state.language === language) return;
  state.language = language;
  applyI18n();
  requestRender({ preview: true, thumbs: true, controls: true });
  queueSaveSettings();
}

function warn(message) {
  console.warn(`[Dotten] ${message}`);
}

function warnMissingDom(name) {
  if (missingDomWarnings.has(name)) return;
  missingDomWarnings.add(name);
  warn(`Missing DOM target: #${name}`);
}

function t(key, vars = {}) {
  const current = getByPath(I18N[state.language], key);
  const fallback = getByPath(I18N.en, key);
  const template =
    typeof current === "string"
      ? current
      : typeof fallback === "string"
        ? fallback
        : key;

  return template.replace(/\{(\w+)\}/g, (_, name) => {
    const value = vars[name];
    return value === undefined || value === null ? "" : String(value);
  });
}

function getByPath(obj, path) {
  return path.split(".").reduce((acc, key) => acc?.[key], obj);
}

function applyI18n() {
  // Key fix: i18n updates are non-destructive (textContent/attributes only),
  // so existing DOM nodes/listeners for upload, drag, reorder, and export stay intact.
  document.documentElement.lang = state.language;
  document.title = t("app.title");
  const isEn = state.language === "en";
  if (els.langEnBtn) els.langEnBtn.setAttribute("aria-pressed", String(isEn));
  if (els.langUzBtn) els.langUzBtn.setAttribute("aria-pressed", String(!isEn));

  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    el.textContent = t(key);
  });

  document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
    const map = el.dataset.i18nAttr || "";
    map
      .split(";")
      .map((entry) => entry.trim())
      .filter(Boolean)
      .forEach((entry) => {
        const [attr, key] = entry.split(":").map((v) => v.trim());
        if (!attr || !key) return;
        el.setAttribute(attr, t(key));
      });
  });

  const year = new Date().getFullYear();
  els.footerCopyright.textContent = t("footer.copyright", { year });
  els.footerMade.textContent = t("footer.made");

  renderPreviewMeta();
  renderExportSummary();
}

function applyTheme() {
  document.documentElement.setAttribute("data-theme", state.theme);
  if (els.body) {
    els.body.setAttribute("data-theme", state.theme);
  } else {
    warn("Missing <body> reference while applying theme.");
  }
}

function bindColorPair(colorEl, hexEl, onChange) {
  colorEl.addEventListener("input", (e) => {
    const val = normalizeHex(e.target.value);
    hexEl.value = val;
    onChange(val);
  });

  hexEl.addEventListener("change", (e) => {
    const val = normalizeHex(e.target.value);
    hexEl.value = val;
    colorEl.value = val;
    onChange(val);
  });
}

function normalizeHex(value) {
  const raw = String(value || "").trim();
  if (/^#([0-9a-f]{3}){1,2}$/i.test(raw)) {
    if (raw.length === 4) {
      return `#${raw[1]}${raw[1]}${raw[2]}${raw[2]}${raw[3]}${raw[3]}`.toLowerCase();
    }
    return raw.toLowerCase();
  }
  return "#000000";
}

function setSegment(group, value) {
  if (group === "transition") state.carousel.transition = value;
  if (group === "fit") state.carousel.fit = value;
  if (group === "format") state.exportFormat = value;
  if (group === "dotStyle") state.dots.style = value;

  document.querySelectorAll(`[data-segment="${group}"]`).forEach((el) => {
    el.classList.toggle("active", el.dataset.value === value);
  });
}

async function handleFiles(fileList) {
  console.log("[Dotten] handleFiles", fileList?.length || 0);
  if (!fileList) {
    warn("No files received by handleFiles(files).");
    return;
  }

  const files = Array.from(fileList).filter(
    (file) => file && typeof file.type === "string" && file.type.startsWith("image/"),
  );

  if (!files.length) {
    warn("No image/* files were processed from upload/drop.");
    return;
  }

  const loaded = files.map(fileToRecord);
  if (!loaded.length) {
    warn("No images were loaded after processing selected files.");
    return;
  }

  state.images.push(...loaded);
  state.activeIndex = clampIndex(state.activeIndex);

  if (els.imageInput) {
    els.imageInput.value = "";
  } else {
    warn("Missing #imageInput while clearing selected file value.");
  }

  requestRender({ preview: true, thumbs: true, controls: true });
}

function fileToRecord(file) {
  // Preview-performance path: keep lightweight object URLs for instant on-screen rendering.
  const record = {
    id: crypto.randomUUID(),
    file,
    name: file.name,
    objectUrl: URL.createObjectURL(file),
    naturalWidth: 0,
    naturalHeight: 0,
  };
  warmImageNaturalSize(record);
  return record;
}

function warmImageNaturalSize(record) {
  const img = new Image();
  img.onload = () => {
    if (!record.naturalWidth || !record.naturalHeight) {
      record.naturalWidth = img.naturalWidth;
      record.naturalHeight = img.naturalHeight;
      requestRender({ preview: true, controls: false });
    }
  };
  img.src = record.objectUrl;
}

function requestRender(parts = {}) {
  if (parts.preview !== false) renderQueue.preview = true;
  if (parts.thumbs === true) renderQueue.thumbs = true;
  if (parts.controls !== false) renderQueue.controls = true;

  if (renderQueue.scheduled) return;
  renderQueue.scheduled = true;
  requestAnimationFrame(flushRenderQueue);
}

function flushRenderQueue() {
  renderQueue.scheduled = false;

  if (!els.previewCard || !els.emptyState || !els.thumbStrip || !els.carouselTrack) {
    if (!els.previewCard) warnMissingDom("previewCard");
    if (!els.emptyState) warnMissingDom("emptyState");
    if (!els.thumbStrip) warnMissingDom("thumbStrip");
    if (!els.carouselTrack) warnMissingDom("carouselTrack");
    renderQueue.preview = false;
    renderQueue.thumbs = false;
    renderQueue.controls = false;
    return;
  }

  if (renderQueue.preview) renderPreview();
  if (renderQueue.thumbs) renderThumbs();
  if (renderQueue.controls) renderControls();
  if (renderQueue.thumbs) updateThumbOverflowButtons();

  renderQueue.preview = false;
  renderQueue.thumbs = false;
  renderQueue.controls = false;
}

function renderPreview() {
  state.activeIndex = clampIndex(state.activeIndex);
  const hasImages = state.images.length > 0;
  els.previewCard.classList.toggle("has-images", hasImages);
  els.emptyState.setAttribute("aria-hidden", String(hasImages));
  renderCarousel();
  renderDots();
  renderPreviewMeta();
  applyDotsPosition();
}

function renderControls() {
  const hasImages = state.images.length > 0;
  renderExportSummary();
  els.mobileExportBar.hidden = !hasImages;
}

function renderPreviewMeta() {
  const count = state.images.length;
  els.previewMeta.textContent = count
    ? t("preview.metaCount", { current: state.activeIndex + 1, total: count })
    : t("preview.noImages");
}

function renderCarousel() {
  const count = state.images.length;

  els.prevArrow.hidden = !state.carousel.showArrows || count < 2;
  els.nextArrow.hidden = !state.carousel.showArrows || count < 2;

  els.carouselTrack.classList.toggle(
    "fade",
    state.carousel.transition === "fade",
  );
  els.carouselTrack.innerHTML = "";

  state.images.forEach((img, index) => {
    const slide = document.createElement("div");
    slide.className = `slide ${state.carousel.fit === "cover" ? "cover" : ""} ${index === state.activeIndex ? "active" : ""}`;
    slide.setAttribute("role", "group");
    slide.setAttribute("aria-roledescription", "slide");
    slide.setAttribute(
      "aria-label",
      t("aria.slideOf", { current: index + 1, total: count }),
    );
    slide.innerHTML = `<img src="${img.objectUrl}" alt="${escapeHtml(img.name)}">`;
    els.carouselTrack.appendChild(slide);
  });

  if (state.carousel.transition === "slide") {
    els.carouselTrack.style.transform = `translate3d(${-state.activeIndex * 100}%, 0, 0)`;
  } else {
    els.carouselTrack.style.transform = "translate3d(0, 0, 0)";
  }
}

function renderDots() {
  const count = state.images.length;
  const showDots = count > 1;
  els.dotsOverlay.hidden = !showDots;
  if (!showDots) return;

  const imageRect = getCurrentRenderedImageRect();
  if (!imageRect) return;

  const minPreview = Math.min(imageRect.w, imageRect.h);
  const dotSizePx = Math.max(1, minPreview * state.dots.sizePct);
  const dotGapPx = Math.max(0, minPreview * state.dots.gapPct);

  els.dotsContainer.style.setProperty(
    "--dot-size",
    `${dotSizePx.toFixed(2)}px`,
  );
  els.dotsContainer.style.setProperty("--dot-gap", `${dotGapPx.toFixed(2)}px`);
  els.dotsContainer.style.setProperty(
    "--dot-inactive",
    state.dots.inactiveColor,
  );
  els.dotsContainer.style.setProperty("--dot-active", state.dots.activeColor);
  els.dotsContainer.classList.toggle("pill", state.dots.pill);

  els.dotsContainer.innerHTML = "";
  state.images.forEach((_, i) => {
    const dot = document.createElement("button");
    dot.type = "button";
    dot.className = `dot style-${state.dots.style} behavior-${state.dots.activeBehavior} ${i === state.activeIndex ? "active" : ""}`;
    dot.setAttribute("role", "tab");
    dot.setAttribute("aria-selected", String(i === state.activeIndex));
    dot.setAttribute("aria-label", t("aria.goToSlide", { current: i + 1 }));
    dot.textContent = state.dots.style === "numbered" ? String(i + 1) : "";
    dot.addEventListener("click", () => {
      if (drag.dots?.moved) return;
      goToSlide(i);
    });
    els.dotsContainer.appendChild(dot);
  });
}

function getCurrentRenderedImageRect() {
  const active = state.images[state.activeIndex];
  if (!active || !els.carouselViewport) return null;

  let naturalW = active.naturalWidth;
  let naturalH = active.naturalHeight;

  // Fallback to active DOM image natural size if not yet cached in state.
  if (!naturalW || !naturalH) {
    const activeImg = els.carouselTrack?.querySelector(".slide.active img");
    if (activeImg?.naturalWidth && activeImg?.naturalHeight) {
      naturalW = activeImg.naturalWidth;
      naturalH = activeImg.naturalHeight;
      active.naturalWidth = naturalW;
      active.naturalHeight = naturalH;
    }
  }

  if (!naturalW || !naturalH) {
    naturalW = 1;
    naturalH = 1;
  }

  return getRenderedImageRect(
    els.carouselViewport.clientWidth,
    els.carouselViewport.clientHeight,
    naturalW,
    naturalH,
    state.carousel.fit,
  );
}

function getRenderedImageRect(
  containerW,
  containerH,
  imgNaturalW,
  imgNaturalH,
  fitMode,
) {
  const cW = Math.max(1, containerW);
  const cH = Math.max(1, containerH);
  const iW = Math.max(1, imgNaturalW);
  const iH = Math.max(1, imgNaturalH);
  const imageRatio = iW / iH;
  const containerRatio = cW / cH;

  let w;
  let h;

  if (fitMode === "cover") {
    if (imageRatio > containerRatio) {
      h = cH;
      w = cH * imageRatio;
    } else {
      w = cW;
      h = cW / imageRatio;
    }
  } else {
    if (imageRatio > containerRatio) {
      w = cW;
      h = cW / imageRatio;
    } else {
      h = cH;
      w = cH * imageRatio;
    }
  }

  return {
    x: (cW - w) / 2,
    y: (cH - h) / 2,
    w,
    h,
  };
}

function renderThumbs() {
  const oldScroll = els.thumbStrip.scrollLeft;
  els.thumbStrip.innerHTML = "";
  const desktopDraggable = !isCoarsePointer();

  state.images.forEach((img, idx) => {
    const thumb = document.createElement("article");
    thumb.className = `thumb ${idx === state.activeIndex ? "active" : ""}`;
    thumb.dataset.index = String(idx);
    thumb.dataset.imageId = img.id;
    thumb.draggable = desktopDraggable;

    thumb.innerHTML = `
      <img src="${img.objectUrl}" alt="${escapeHtml(t("aria.thumbnail", { current: idx + 1 }))}">
      <div class="thumb-meta">
        <span class="thumb-name">${idx + 1}. ${escapeHtml(img.name)}</span>
        <div class="thumb-actions">
          <button class="drag-handle" type="button" aria-label="${escapeHtml(t("aria.dragThumbnail"))}">⋮⋮</button>
          <button class="thumb-icon" type="button" aria-label="${escapeHtml(t("aria.removeThumbnail"))}">×</button>
        </div>
      </div>
    `;

    const removeBtn = thumb.querySelector(".thumb-icon");
    const handleBtn = thumb.querySelector(".drag-handle");

    thumb.addEventListener("click", (e) => {
      if (thumb.dataset.suppressClick === "1") {
        thumb.dataset.suppressClick = "";
        return;
      }
      if (e.target.closest("button")) return;
      state.activeIndex = idx;
      requestRender({ preview: true, controls: false });
    });

    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      removeImage(idx);
    });

    handleBtn.addEventListener("mousedown", () => {
      thumb.dataset.dragAllowed = "1";
    });

    thumb.addEventListener("dragstart", (e) => {
      if (isCoarsePointer()) {
        e.preventDefault();
        return;
      }
      if (thumb.dataset.dragAllowed !== "1") {
        e.preventDefault();
        return;
      }
      e.dataTransfer.setData("text/plain", String(idx));
      thumb.classList.add("dragging");
    });

    thumb.addEventListener("dragend", () => {
      thumb.dataset.dragAllowed = "";
      thumb.classList.remove("dragging");
      clearThumbDropTargets();
    });

    thumb.addEventListener("dragover", (e) => {
      e.preventDefault();
      thumb.classList.add("drop-target");
    });

    thumb.addEventListener("dragleave", () => {
      thumb.classList.remove("drop-target");
    });

    thumb.addEventListener("drop", (e) => {
      e.preventDefault();
      const from = Number(e.dataTransfer.getData("text/plain"));
      thumb.classList.remove("drop-target");
      reorderImages(from, idx);
    });

    thumb.addEventListener("pointerdown", (e) =>
      onThumbPointerDown(e, thumb, idx),
    );

    els.thumbStrip.appendChild(thumb);
  });

  els.thumbStrip.scrollLeft = oldScroll;
}

function onThumbPointerDown(event, thumb, index) {
  const isTouchPointer =
    event.pointerType === "touch" || event.pointerType === "pen";
  if (!isTouchPointer) return;
  if (event.button !== undefined && event.button !== 0) return;

  const fromHandle = Boolean(event.target.closest(".drag-handle"));
  const session = {
    pointerId: event.pointerId,
    thumbEl: thumb,
    fromIndex: index,
    startX: event.clientX,
    startY: event.clientY,
    lastX: event.clientX,
    lastY: event.clientY,
    dragOffsetX: 0,
    baseLeft: 0,
    baseTop: 0,
    active: false,
    startedFromHandle: fromHandle,
    longPressReady: fromHandle,
    holdTimer: null,
    placeholderEl: null,
    autoScrollRaf: 0,
  };

  drag.thumb = session;

  // Dedicated handle starts reorder immediately.
  if (fromHandle) {
    startThumbReorder(session, event.clientX, event.clientY);
    event.preventDefault();
    return;
  }

  session.holdTimer = setTimeout(() => {
    // Long-press path for touch: user can hold then drag anywhere on thumbnail.
    session.longPressReady = true;
    startThumbReorder(session, session.lastX, session.lastY);
  }, THUMB_REORDER.longPressMs);
}

window.addEventListener("pointermove", onThumbPointerMove, { passive: false });
window.addEventListener("pointerup", onThumbPointerEnd);
window.addEventListener("pointercancel", onThumbPointerEnd);

function onThumbPointerMove(event) {
  const d = drag.thumb;
  if (!d || event.pointerId !== d.pointerId) return;

  d.lastX = event.clientX;
  d.lastY = event.clientY;

  if (!d.active) {
    const dx = Math.abs(event.clientX - d.startX);
    const dy = Math.abs(event.clientY - d.startY);
    if (!d.startedFromHandle && !d.longPressReady) {
      if (dx > THUMB_REORDER.cancelMovePx || dy > THUMB_REORDER.cancelMovePx) {
        clearTimeout(d.holdTimer);
        drag.thumb = null;
      }
    }
    return;
  }

  event.preventDefault();
  updateDraggedThumbPosition(d, event.clientX);
  updateThumbPlaceholder(d, event.clientX);
}

function onThumbPointerEnd(event) {
  const d = drag.thumb;
  if (!d || event.pointerId !== d.pointerId) return;

  clearTimeout(d.holdTimer);
  if (d.active) {
    finishThumbReorder(d, true, event.pointerId);
  }

  drag.thumb = null;
}

function startThumbReorder(session, clientX, clientY) {
  if (session.active || !session.thumbEl?.isConnected) return;

  const moveDistance = Math.hypot(clientX - session.startX, clientY - session.startY);
  if (
    !session.startedFromHandle &&
    moveDistance < THUMB_REORDER.startMovePx &&
    !session.longPressReady
  ) {
    return;
  }

  const thumbRect = session.thumbEl.getBoundingClientRect();
  session.baseLeft = thumbRect.left;
  session.baseTop = thumbRect.top;
  session.dragOffsetX = clientX - thumbRect.left;

  const placeholder = document.createElement("article");
  placeholder.className = "thumb-placeholder";
  placeholder.style.width = `${thumbRect.width}px`;
  placeholder.style.height = `${thumbRect.height}px`;
  placeholder.setAttribute("aria-hidden", "true");
  session.placeholderEl = placeholder;

  els.thumbStrip.insertBefore(placeholder, session.thumbEl.nextSibling);

  session.thumbEl.classList.add("dragging-pointer");
  session.thumbEl.style.width = `${thumbRect.width}px`;
  session.thumbEl.style.height = `${thumbRect.height}px`;
  session.thumbEl.style.left = `${thumbRect.left}px`;
  session.thumbEl.style.top = `${thumbRect.top}px`;
  session.thumbEl.style.transform = "translate3d(0,0,0)";

  document.body.classList.add("thumb-reordering");
  els.thumbStrip.classList.add("reorder-active");

  try {
    session.thumbEl.setPointerCapture(session.pointerId);
  } catch {
    // Safari can throw if capture state changes unexpectedly.
  }

  session.active = true;
  updateDraggedThumbPosition(session, clientX);
  updateThumbPlaceholder(session, clientX);
  startThumbAutoScroll(session);
}

function updateDraggedThumbPosition(session, clientX) {
  const targetLeft = clientX - session.dragOffsetX;
  const dx = targetLeft - session.baseLeft;
  session.thumbEl.style.transform = `translate3d(${dx}px, 0, 0)`;
}

function updateThumbPlaceholder(session, clientX) {
  const siblings = Array.from(els.thumbStrip.querySelectorAll(".thumb")).filter(
    (el) => el !== session.thumbEl,
  );

  let insertBefore = null;
  for (const sibling of siblings) {
    const rect = sibling.getBoundingClientRect();
    if (clientX < rect.left + rect.width / 2) {
      insertBefore = sibling;
      break;
    }
  }

  if (insertBefore) {
    els.thumbStrip.insertBefore(session.placeholderEl, insertBefore);
  } else {
    els.thumbStrip.appendChild(session.placeholderEl);
  }
}

function startThumbAutoScroll(session) {
  const loop = () => {
    if (!session.active) return;
    const stripRect = els.thumbStrip.getBoundingClientRect();
    const edge = THUMB_REORDER.autoScrollEdgePx;

    let velocity = 0;
    // Edge-proximity speed ramp keeps auto-scroll controllable with long strips.
    if (session.lastX < stripRect.left + edge) {
      const closeness = (stripRect.left + edge - session.lastX) / edge;
      velocity = -THUMB_REORDER.autoScrollMaxSpeed * clamp(closeness, 0, 1);
    } else if (session.lastX > stripRect.right - edge) {
      const closeness = (session.lastX - (stripRect.right - edge)) / edge;
      velocity = THUMB_REORDER.autoScrollMaxSpeed * clamp(closeness, 0, 1);
    }

    if (velocity !== 0) {
      const prev = els.thumbStrip.scrollLeft;
      els.thumbStrip.scrollLeft += velocity;
      if (els.thumbStrip.scrollLeft !== prev) {
        updateThumbPlaceholder(session, session.lastX);
      }
    }

    session.autoScrollRaf = requestAnimationFrame(loop);
  };

  session.autoScrollRaf = requestAnimationFrame(loop);
}

function finishThumbReorder(session, commit, pointerId) {
  if (!session.active) return;
  session.active = false;

  if (session.autoScrollRaf) {
    cancelAnimationFrame(session.autoScrollRaf);
    session.autoScrollRaf = 0;
  }

  try {
    session.thumbEl.releasePointerCapture(pointerId);
  } catch {
    // Pointer may already be released by browser.
  }

  if (session.placeholderEl?.isConnected) {
    els.thumbStrip.insertBefore(session.thumbEl, session.placeholderEl);
    session.placeholderEl.remove();
  }

  session.thumbEl.classList.remove("dragging-pointer");
  session.thumbEl.style.width = "";
  session.thumbEl.style.height = "";
  session.thumbEl.style.left = "";
  session.thumbEl.style.top = "";
  session.thumbEl.style.transform = "";

  document.body.classList.remove("thumb-reordering");
  els.thumbStrip.classList.remove("reorder-active");

  if (commit) {
    syncStateOrderFromThumbDom();
    session.thumbEl.dataset.suppressClick = "1";
    requestAnimationFrame(() => {
      session.thumbEl.dataset.suppressClick = "";
    });
  }
}

function syncStateOrderFromThumbDom() {
  const order = Array.from(els.thumbStrip.querySelectorAll(".thumb")).map(
    (el) => el.dataset.imageId,
  );
  if (!order.length || order.length !== state.images.length) return;

  const activeId = state.images[state.activeIndex]?.id;
  const map = new Map(state.images.map((img) => [img.id, img]));
  state.images = order
    .map((id) => map.get(id))
    .filter(Boolean);
  state.activeIndex = Math.max(
    0,
    state.images.findIndex((img) => img.id === activeId),
  );

  requestRender({ preview: true, thumbs: true, controls: false });
}

function isCoarsePointer() {
  return window.matchMedia?.("(pointer: coarse)").matches ?? false;
}

function clearThumbDropTargets() {
  els.thumbStrip
    .querySelectorAll(".drop-target")
    .forEach((el) => el.classList.remove("drop-target"));
}

function updateThumbOverflowButtons() {
  const overflow = els.thumbStrip.scrollWidth > els.thumbStrip.clientWidth + 4;
  const atLeft = els.thumbStrip.scrollLeft <= 1;
  const atRight =
    els.thumbStrip.scrollLeft + els.thumbStrip.clientWidth >=
    els.thumbStrip.scrollWidth - 1;

  els.thumbScrollLeft.classList.toggle("show", overflow && !atLeft);
  els.thumbScrollRight.classList.toggle("show", overflow && !atRight);
}

function reorderImages(from, to) {
  if (
    from === to ||
    from < 0 ||
    to < 0 ||
    from >= state.images.length ||
    to >= state.images.length
  )
    return;

  const [moved] = state.images.splice(from, 1);
  state.images.splice(to, 0, moved);

  if (state.activeIndex === from) state.activeIndex = to;
  else if (from < state.activeIndex && to >= state.activeIndex)
    state.activeIndex -= 1;
  else if (from > state.activeIndex && to <= state.activeIndex)
    state.activeIndex += 1;

  requestRender({ preview: true, thumbs: true, controls: true });
}

function removeImage(index) {
  const [removed] = state.images.splice(index, 1);
  if (removed?.objectUrl) URL.revokeObjectURL(removed.objectUrl);
  state.activeIndex = clampIndex(state.activeIndex);
  requestRender({ preview: true, thumbs: true, controls: true });
  showToast("toast.imageRemoved");
}

function revokeAllImageUrls() {
  state.images.forEach((img) => {
    if (img?.objectUrl) URL.revokeObjectURL(img.objectUrl);
  });
}

function onDotsDragStart(event) {
  if (state.images.length < 2) return;
  const viewport = els.carouselViewport.getBoundingClientRect();
  const imageRect = getCurrentRenderedImageRect();
  if (!imageRect) return;
  const rowMetrics = getDotsRowMetrics();
  const dotRadius = getDotRadiusFromRect(imageRect);
  const currentCenter = getAnchoredCenterFromPct(
    state.dots.xPct,
    state.dots.yPct,
    imageRect,
    dotRadius,
  );

  drag.dots = {
    pointerId: event.pointerId,
    moved: false,
    viewport,
    imageRect,
    dotRadius,
    rowHalfW: rowMetrics.halfW,
    rowHalfH: rowMetrics.halfH,
    offsetX: event.clientX - (viewport.left + currentCenter.x),
    offsetY: event.clientY - (viewport.top + currentCenter.y),
    xPct: state.dots.xPct,
    yPct: state.dots.yPct,
  };
  try {
    els.dotsOverlay.setPointerCapture(event.pointerId);
  } catch {
    // Ignore capture errors on unsupported browsers.
  }
  els.snapGuides.classList.toggle("visible", state.dots.snap);
}

function onDotsDragMove(event) {
  const d = drag.dots;
  if (!d || event.pointerId !== d.pointerId) return;

  event.preventDefault();
  d.moved = true;

  let centerX = event.clientX - d.offsetX - d.viewport.left;
  let centerY = event.clientY - d.offsetY - d.viewport.top;

  centerX = clampCenterAxis(
    centerX,
    d.imageRect.x + d.dotRadius,
    d.imageRect.x + d.imageRect.w - d.dotRadius,
  );
  centerY = clampCenterAxis(
    centerY,
    d.imageRect.y + d.dotRadius,
    d.imageRect.y + d.imageRect.h - d.dotRadius,
  );

  let xPct = (centerX - d.imageRect.x) / d.imageRect.w;
  let yPct = (centerY - d.imageRect.y) / d.imageRect.h;

  if (state.dots.snap) {
    xPct = snapValue(xPct, [0.05, 0.5, 0.95], 0.026);
    yPct = snapValue(yPct, [0.08, 0.5, 0.92], 0.026);
  }

  xPct = clamp(xPct, 0, 1);
  yPct = clamp(yPct, 0, 1);

  d.xPct = roundFour(xPct);
  d.yPct = roundFour(yPct);
  applyDotsPosition(d.xPct, d.yPct);
}

function onDotsDragEnd(event) {
  const d = drag.dots;
  if (!d || event.pointerId !== d.pointerId) return;
  try {
    els.dotsOverlay.releasePointerCapture(event.pointerId);
  } catch {
    // Ignore when pointer was already released.
  }
  els.snapGuides.classList.remove("visible");
  state.dots.xPct = d.xPct;
  state.dots.yPct = d.yPct;
  queueSaveSettings();
  requestRender({ preview: true, controls: false });
  setTimeout(() => {
    drag.dots = null;
  }, 0);
}

function applyDotsPosition(xPct = state.dots.xPct, yPct = state.dots.yPct) {
  const rect = getCurrentRenderedImageRect();
  if (!rect) return;
  const rowMetrics = getDotsRowMetrics();
  const dotRadius = getDotRadiusFromRect(rect);
  const center = getAnchoredCenterFromPct(
    xPct,
    yPct,
    rect,
    dotRadius,
  );

  const overlayLeft = center.x - rowMetrics.halfW;
  const overlayTop = center.y - rowMetrics.halfH;
  els.dotsOverlay.style.left = `${overlayLeft}px`;
  els.dotsOverlay.style.top = `${overlayTop}px`;
}

function getDotsRowMetrics() {
  if (!els.dotsContainer) return { width: 0, height: 0, halfW: 0, halfH: 0 };
  const box = els.dotsContainer.getBoundingClientRect();
  const width = box.width || 0;
  const height = box.height || 0;
  return {
    width,
    height,
    halfW: width / 2,
    halfH: height / 2,
  };
}

function getDotRadiusFromRect(imageRect) {
  const minDim = Math.min(imageRect.w, imageRect.h);
  const dotDiameter = Math.max(1, minDim * state.dots.sizePct);
  return dotDiameter / 2;
}

function getAnchoredCenterFromPct(xPct, yPct, imageRect, dotRadius) {
  let centerX = imageRect.x + xPct * imageRect.w;
  let centerY = imageRect.y + yPct * imageRect.h;

  centerX = clampCenterAxis(
    centerX,
    imageRect.x + dotRadius,
    imageRect.x + imageRect.w - dotRadius,
  );
  centerY = clampCenterAxis(
    centerY,
    imageRect.y + dotRadius,
    imageRect.y + imageRect.h - dotRadius,
  );

  return { x: centerX, y: centerY };
}

function clampCenterAxis(value, minValue, maxValue) {
  if (maxValue < minValue) return (minValue + maxValue) / 2;
  return clamp(value, minValue, maxValue);
}

function onSwipeStart(event) {
  if (state.images.length < 2) return;
  if (
    event.target.closest(".dot") ||
    event.target.closest(".nav-arrow") ||
    event.target.closest("#dotsOverlay")
  )
    return;

  drag.swipe = {
    pointerId: event.pointerId,
    startX: event.clientX,
    startY: event.clientY,
    dx: 0,
    lock: null,
  };
}

function onSwipeMove(event) {
  const s = drag.swipe;
  if (!s || event.pointerId !== s.pointerId) return;

  s.dx = event.clientX - s.startX;
  const dy = event.clientY - s.startY;

  if (!s.lock) {
    if (Math.abs(s.dx) > 8 || Math.abs(dy) > 8) {
      s.lock = Math.abs(s.dx) > Math.abs(dy) ? "x" : "y";
    } else {
      return;
    }
  }

  if (s.lock === "y") return;
  event.preventDefault();

  if (state.carousel.transition === "slide") {
    const shift =
      -state.activeIndex * 100 +
      (s.dx / els.carouselViewport.clientWidth) * 100;
    els.carouselTrack.style.transition = "none";
    els.carouselTrack.style.transform = `translate3d(${shift}%, 0, 0)`;
  }
}

function onSwipeEnd(event) {
  const s = drag.swipe;
  if (!s || event.pointerId !== s.pointerId) return;

  if (state.carousel.transition === "slide") {
    els.carouselTrack.style.transition =
      "transform 260ms cubic-bezier(0.2, 0.8, 0.2, 1)";
  }

  if (s.lock === "x" && Math.abs(s.dx) > 44) {
    goToSlide(state.activeIndex + (s.dx < 0 ? 1 : -1));
  } else {
    renderCarousel();
  }

  drag.swipe = null;
}

function goToSlide(nextIndex) {
  const len = state.images.length;
  if (len < 2) return;

  if (state.carousel.infinite) state.activeIndex = (nextIndex + len) % len;
  else state.activeIndex = clamp(nextIndex, 0, len - 1);

  requestRender({ preview: true, controls: false });
}

function renderExportSummary() {
  let label = t("export.buttonDefault");
  let message = t("export.disabled");
  let disabled = true;

  if (state.images.length === 1) {
    label = t("export.buttonDownloadPng");
    message = t("export.singleSummary");
    disabled = false;
  } else if (state.images.length > 1) {
    label = t("export.buttonDownloadZip");
    message = t("export.multiSummary", { zipName: ZIP_BASE_NAME });
    disabled = false;
  }

  [els.exportBtn, els.exportBtnPanel, els.exportBtnMobile].forEach((btn) => {
    btn.textContent = label;
    btn.disabled = disabled;
  });

  els.exportSummary.textContent = message;
}

async function exportAction() {
  if (!state.images.length) return;

  if (state.images.length === 1) {
    await exportSinglePng();
    return;
  }

  await exportZip();
}

async function exportSinglePng() {
  setExportBusy(true, t("export.renderingPng"));
  try {
    const blob = await renderSlideToBlob(0, "png");
    downloadBlob(blob, "dotfolio-01.png");
    showToast("toast.pngDownloaded");
  } finally {
    setExportBusy(false);
  }
}

async function exportZip() {
  setExportBusy(true, t("export.renderingZip"));
  try {
    const zip = new JSZip();

    for (let i = 0; i < state.images.length; i += 1) {
      setExportBusy(
        true,
        t("export.renderingProgress", {
          current: i + 1,
          total: state.images.length,
        }),
      );
      // Non-negotiable baseline: ZIP always contains processed PNG files.
      const blob = await renderSlideToBlob(i, "png");
      zip.file(`${String(i + 1).padStart(2, "0")}.png`, blob);
      await nextFrame();
    }

    const zipBlob = await zip.generateAsync({ type: "blob" });
    downloadBlob(zipBlob, buildZipFilename());
    showToast("toast.zipDownloaded");
  } finally {
    setExportBusy(false);
  }
}

function buildZipFilename() {
  return ZIP_BASE_NAME;
}

function setExportBusy(busy, text = "") {
  [els.exportBtn, els.exportBtnPanel, els.exportBtnMobile].forEach((btn) => {
    btn.disabled = busy;
  });

  if (busy && text) {
    els.exportSummary.textContent = text;
    if (els.exportProgress) {
      els.exportProgress.hidden = false;
      els.exportProgress.textContent = text;
    }
  } else {
    if (els.exportProgress) {
      els.exportProgress.hidden = true;
      els.exportProgress.textContent = "";
    }
    renderExportSummary();
  }
}

async function renderSlideToBlob(index, format = "png") {
  const item = state.images[index];
  if (!item) throw new Error("Image not found");

  // Export-quality path: render at native pixel dimensions on an offscreen/native canvas.
  const img = await loadImage(item.objectUrl);
  const w = img.naturalWidth;
  const h = img.naturalHeight;

  item.naturalWidth = w;
  item.naturalHeight = h;

  const canvas = createNativeCanvas(w, h);
  const ctx = canvas.getContext("2d", { alpha: true });

  ctx.save();
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(img, 0, 0, w, h);

  if (state.images.length > 1) {
    drawDotsToCanvas(ctx, w, h, index);
  }
  ctx.restore();

  const mime = format === "jpeg" ? "image/jpeg" : "image/png";
  const quality = format === "jpeg" ? 1.0 : undefined;
  const blob = await canvasToBlob(canvas, mime, quality);

  if ("width" in canvas) canvas.width = 1;
  if ("height" in canvas) canvas.height = 1;
  return blob;
}

function drawDotsToCanvas(ctx, width, height, activeIndex) {
  const count = state.images.length;
  if (count < 2) return;

  const dots = state.dots;
  const minDim = Math.min(width, height);

  const dotSize = Math.max(1, minDim * dots.sizePct);
  const gap = Math.max(0, minDim * dots.gapPct);
  const radius = dotSize / 2;
  const totalWidth = count * dotSize + (count - 1) * gap;

  const centerX = clampCenterAxis(dots.xPct * width, radius, width - radius);
  const centerY = clampCenterAxis(dots.yPct * height, radius, height - radius);
  const startX = centerX - totalWidth / 2;

  ctx.save();
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.lineWidth = Math.max(1, dotSize * 0.12);
  ctx.font = `600 ${Math.max(1, dotSize * 0.55)}px -apple-system,BlinkMacSystemFont,Segoe UI,Roboto,Arial,sans-serif`;

  if (dots.pill) {
    const padX = Math.max(6, dotSize * 0.66);
    const padY = Math.max(5, dotSize * 0.5);
    const pillX = startX - padX;
    const pillY = centerY - dotSize / 2 - padY;
    const pillW = totalWidth + padX * 2;
    const pillH = dotSize + padY * 2;

    ctx.save();
    roundedRectPath(ctx, pillX, pillY, pillW, pillH, pillH / 2);
    ctx.fillStyle = "rgba(15,23,42,0.34)";
    ctx.fill();
    ctx.strokeStyle = "rgba(255,255,255,0.24)";
    ctx.lineWidth = Math.max(1, dotSize * 0.05);
    ctx.stroke();
    ctx.restore();
  }

  for (let i = 0; i < count; i += 1) {
    const cx = startX + i * (dotSize + gap) + radius;
    const isActive = i === activeIndex;

    let drawRadius = radius;
    if (isActive && dots.activeBehavior === "larger")
      drawRadius = radius * 1.16;

    ctx.save();
    ctx.globalAlpha = isActive ? 1 : 0.7;

    ctx.beginPath();
    ctx.arc(cx, centerY, drawRadius, 0, Math.PI * 2);

    if (dots.style === "filled") {
      ctx.fillStyle =
        isActive && dots.activeBehavior === "filled"
          ? dots.activeColor
          : dots.inactiveColor;
      ctx.fill();
      if (isActive && dots.activeBehavior !== "filled") {
        ctx.strokeStyle = dots.activeColor;
        ctx.stroke();
      }
    } else if (dots.style === "outlined") {
      ctx.strokeStyle = isActive ? dots.activeColor : dots.inactiveColor;
      ctx.stroke();
      if (isActive && dots.activeBehavior === "filled") {
        ctx.fillStyle = dots.activeColor;
        ctx.fill();
      }
    } else {
      ctx.strokeStyle = isActive ? dots.activeColor : dots.inactiveColor;
      if (isActive && dots.activeBehavior === "filled") {
        ctx.fillStyle = dots.activeColor;
        ctx.fill();
      }
      ctx.stroke();
      ctx.fillStyle =
        isActive && dots.activeBehavior === "filled"
          ? "#ffffff"
          : isActive
            ? dots.activeColor
            : dots.inactiveColor;
      ctx.fillText(String(i + 1), cx, centerY + drawRadius * 0.03);
    }

    if (isActive && dots.activeBehavior === "opacity") {
      ctx.globalAlpha = 1;
      ctx.strokeStyle = dots.activeColor;
      ctx.lineWidth = Math.max(1, dotSize * 0.14);
      ctx.beginPath();
      ctx.arc(cx, centerY, drawRadius, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.restore();
  }

  ctx.restore();
}

function roundedRectPath(ctx, x, y, w, h, r) {
  const rr = Math.min(r, w / 2, h / 2);
  ctx.beginPath();
  ctx.moveTo(x + rr, y);
  ctx.arcTo(x + w, y, x + w, y + h, rr);
  ctx.arcTo(x + w, y + h, x, y + h, rr);
  ctx.arcTo(x, y + h, x, y, rr);
  ctx.arcTo(x, y, x + w, y, rr);
  ctx.closePath();
}

function createNativeCanvas(w, h) {
  if (typeof OffscreenCanvas !== "undefined") return new OffscreenCanvas(w, h);
  const c = document.createElement("canvas");
  c.width = w;
  c.height = h;
  return c;
}

function canvasToBlob(canvas, type, quality) {
  if (typeof canvas.convertToBlob === "function") {
    return canvas.convertToBlob({ type, quality });
  }
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (!blob) {
          reject(new Error("Canvas export failed"));
          return;
        }
        resolve(blob);
      },
      type,
      quality,
    );
  });
}

function downloadBlob(blob, filename) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 3000);
}

async function loadImage(src) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(img);
    img.onerror = reject;
    img.src = src;
  });
}

function showToast(messageKey) {
  const el = document.createElement("div");
  el.className = "toast";
  el.textContent = t(messageKey);
  els.toastRoot.appendChild(el);
  setTimeout(() => {
    el.remove();
  }, 1600);
}

function nextFrame() {
  return new Promise((resolve) => requestAnimationFrame(resolve));
}

function resetAll() {
  // Keep language and theme preference on reset, but clear all design/export settings.
  const keepLanguage = state.language;
  const keepTheme = state.theme;

  const defaults = createDefaultState(keepLanguage);
  revokeAllImageUrls();
  state.images = [];
  state.activeIndex = 0;
  state.exportFormat = defaults.exportFormat;
  state.carousel = defaults.carousel;
  state.dots = defaults.dots;
  state.theme = keepTheme;
  state.language = keepLanguage;

  clearSavedSettings();
  syncControlsFromState();
  applyTheme();
  applyI18n();
  requestRender({ preview: true, thumbs: true, controls: true });
  queueSaveSettings();
  showToast("toast.resetDone");
}

function syncControlsFromState() {
  els.showArrows.checked = state.carousel.showArrows;
  els.infiniteLoop.checked = state.carousel.infinite;
  els.activeBehavior.value = state.dots.activeBehavior;
  els.dotSize.value = String((state.dots.sizePct * 100).toFixed(1));
  els.dotGap.value = String((state.dots.gapPct * 100).toFixed(1));
  els.dotSizeOut.value = (state.dots.sizePct * 100).toFixed(1);
  els.dotGapOut.value = (state.dots.gapPct * 100).toFixed(1);
  els.dotInactive.value = state.dots.inactiveColor;
  els.dotInactiveHex.value = state.dots.inactiveColor;
  els.dotActive.value = state.dots.activeColor;
  els.dotActiveHex.value = state.dots.activeColor;
  els.dotPill.checked = state.dots.pill;
  els.snapToGuides.checked = state.dots.snap;

  setSegment("transition", state.carousel.transition);
  setSegment("fit", state.carousel.fit);
  setSegment("format", state.exportFormat);
  setSegment("dotStyle", state.dots.style);
}

function queueSaveSettings() {
  debouncedSaveSettings();
}

function loadSettings() {
  const raw = readStorage();
  if (!raw) return;

  const merged = mergeSettings(raw);
  state.language = merged.language;
  state.theme = merged.theme;
  state.exportFormat = merged.exportFormat;
  state.carousel = merged.carousel;
  state.dots = merged.dots;
}

function saveSettings() {
  const payload = {
    version: STORAGE_SCHEMA,
    language: state.language,
    theme: state.theme,
    exportFormat: state.exportFormat,
    carousel: {
      showArrows: state.carousel.showArrows,
      infinite: state.carousel.infinite,
      transition: state.carousel.transition,
      fit: state.carousel.fit,
    },
    dots: {
      style: state.dots.style,
      activeBehavior: state.dots.activeBehavior,
      sizePct: state.dots.sizePct,
      gapPct: state.dots.gapPct,
      inactiveColor: state.dots.inactiveColor,
      activeColor: state.dots.activeColor,
      pill: state.dots.pill,
      snap: state.dots.snap,
      xPct: state.dots.xPct,
      yPct: state.dots.yPct,
    },
  };

  writeStorage(payload);
}

function clearSavedSettings() {
  if (!isStorageAvailable()) return;
  try {
    localStorage.removeItem(STORAGE_KEY);
    LEGACY_STORAGE_KEYS.forEach((key) => localStorage.removeItem(key));
  } catch {
    // Ignore storage errors.
  }
}

function readStorage() {
  if (!isStorageAvailable()) return null;
  try {
    const keys = [STORAGE_KEY, ...LEGACY_STORAGE_KEYS];
    for (const key of keys) {
      const raw = localStorage.getItem(key);
      if (!raw) continue;
      return JSON.parse(raw);
    }
    return null;
  } catch {
    return null;
  }
}

function writeStorage(payload) {
  if (!isStorageAvailable()) return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch {
    // Ignore quota/privacy errors.
  }
}

function mergeSettings(saved) {
  // Validate persisted settings and migrate legacy dot geometry to normalized ratios.
  const defaults = createDefaultState();

  if (!saved || typeof saved !== "object") return defaults;

  const language = saved.language === "uz" ? "uz" : defaults.language;
  const theme = saved.theme === "light" || saved.theme === "dark"
    ? saved.theme
    : defaults.theme;
  const exportFormat = saved.exportFormat === "jpeg" ? "jpeg" : "png";

  const transition =
    saved.carousel?.transition === "fade" ? "fade" : "slide";
  const fit = saved.carousel?.fit === "cover" ? "cover" : "contain";

  const dotStyle = ["outlined", "filled", "numbered"].includes(saved.dots?.style)
    ? saved.dots.style
    : defaults.dots.style;
  const activeBehavior = ["filled", "larger", "opacity"].includes(
    saved.dots?.activeBehavior,
  )
    ? saved.dots.activeBehavior
    : defaults.dots.activeBehavior;

  const previewMinDim = getPreviewReferenceMinDim();
  const xPct = normalizeDotRatio(saved.dots?.xPct, saved.dots?.x, defaults.dots.xPct);
  const yPct = normalizeDotRatio(saved.dots?.yPct, saved.dots?.y, defaults.dots.yPct);
  const sizePct = normalizeDotRatio(
    saved.dots?.sizePct,
    saved.dots?.sizePx,
    defaults.dots.sizePct,
    previewMinDim,
  );
  const gapPct = normalizeDotRatio(
    saved.dots?.gapPct,
    saved.dots?.gapPx,
    defaults.dots.gapPct,
    previewMinDim,
  );

  return {
    ...defaults,
    language,
    theme,
    exportFormat,
    carousel: {
      showArrows: saved.carousel?.showArrows !== false,
      infinite: saved.carousel?.infinite !== false,
      transition,
      fit,
    },
    dots: {
      style: dotStyle,
      activeBehavior,
      sizePct: clamp(sizePct, DOT_SIZE_MIN, DOT_SIZE_MAX),
      gapPct: clamp(gapPct, DOT_GAP_MIN, DOT_GAP_MAX),
      inactiveColor: normalizeHex(saved.dots?.inactiveColor || defaults.dots.inactiveColor),
      activeColor: normalizeHex(saved.dots?.activeColor || defaults.dots.activeColor),
      pill: Boolean(saved.dots?.pill),
      snap: saved.dots?.snap !== false,
      xPct: clamp(xPct, 0, 1),
      yPct: clamp(yPct, 0, 1),
    },
  };
}

function normalizeDotRatio(primary, legacyPx, fallback, pxBase = 1) {
  const val = Number(primary);
  if (Number.isFinite(val)) {
    if (val > 1) return val / 100;
    if (val >= 0) return val;
  }

  const px = Number(legacyPx);
  if (Number.isFinite(px) && px >= 0 && pxBase > 0) {
    return px / pxBase;
  }

  return fallback;
}

function getPreviewReferenceMinDim() {
  const width = els.carouselViewport?.clientWidth || 1000;
  const height = els.carouselViewport?.clientHeight || 1000;
  return Math.max(1, Math.min(width, height));
}

function toNumber(value, fallback) {
  const n = Number(value);
  return Number.isFinite(n) ? n : fallback;
}

let storageAvailability;
function isStorageAvailable() {
  if (typeof storageAvailability === "boolean") return storageAvailability;
  try {
    const testKey = "dotten-storage-test";
    localStorage.setItem(testKey, "1");
    localStorage.removeItem(testKey);
    storageAvailability = true;
  } catch {
    storageAvailability = false;
  }
  return storageAvailability;
}

function debounce(fn, wait) {
  let timer = null;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), wait);
  };
}

function clampIndex(index) {
  if (!state.images.length) return 0;
  return clamp(index, 0, state.images.length - 1);
}

function clamp(v, min, max) {
  return Math.min(max, Math.max(min, v));
}

function snapValue(v, points, threshold) {
  for (const p of points) {
    if (Math.abs(v - p) <= threshold) return p;
  }
  return v;
}

function roundTwo(v) {
  return Math.round(v * 100) / 100;
}

function roundFour(v) {
  return Math.round(v * 10000) / 10000;
}

function escapeHtml(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

class JSZip {
  constructor() {
    this.files = [];
  }

  file(name, data) {
    this.files.push({ name, data });
    return this;
  }

  async generateAsync(options = { type: "blob" }) {
    const files = [];
    for (const f of this.files) {
      let bytes;
      if (f.data instanceof Blob)
        bytes = new Uint8Array(await f.data.arrayBuffer());
      else if (f.data instanceof Uint8Array) bytes = f.data;
      else if (f.data instanceof ArrayBuffer) bytes = new Uint8Array(f.data);
      else bytes = new TextEncoder().encode(String(f.data));
      files.push({ name: f.name, bytes });
    }

    const blob = createStoredZip(files);
    if (options.type === "blob") return blob;
    return new Uint8Array(await blob.arrayBuffer());
  }
}

function createStoredZip(files) {
  const local = [];
  const central = [];
  let offset = 0;

  files.forEach((f) => {
    const name = new TextEncoder().encode(f.name);
    const crc = crc32(f.bytes);
    const len = f.bytes.length;

    const l = new Uint8Array(30 + name.length + len);
    const lv = new DataView(l.buffer);
    lv.setUint32(0, 0x04034b50, true);
    lv.setUint16(4, 20, true);
    lv.setUint16(6, 0x0800, true);
    lv.setUint16(8, 0, true);
    lv.setUint16(10, 0, true);
    lv.setUint16(12, 0, true);
    lv.setUint32(14, crc, true);
    lv.setUint32(18, len, true);
    lv.setUint32(22, len, true);
    lv.setUint16(26, name.length, true);
    lv.setUint16(28, 0, true);
    l.set(name, 30);
    l.set(f.bytes, 30 + name.length);
    local.push(l);

    const c = new Uint8Array(46 + name.length);
    const cv = new DataView(c.buffer);
    cv.setUint32(0, 0x02014b50, true);
    cv.setUint16(4, 20, true);
    cv.setUint16(6, 20, true);
    cv.setUint16(8, 0x0800, true);
    cv.setUint16(10, 0, true);
    cv.setUint16(12, 0, true);
    cv.setUint16(14, 0, true);
    cv.setUint32(16, crc, true);
    cv.setUint32(20, len, true);
    cv.setUint32(24, len, true);
    cv.setUint16(28, name.length, true);
    cv.setUint16(30, 0, true);
    cv.setUint16(32, 0, true);
    cv.setUint16(34, 0, true);
    cv.setUint16(36, 0, true);
    cv.setUint32(38, 0, true);
    cv.setUint32(42, offset, true);
    c.set(name, 46);
    central.push(c);

    offset += l.length;
  });

  const centralSize = central.reduce((sum, arr) => sum + arr.length, 0);
  const end = new Uint8Array(22);
  const ev = new DataView(end.buffer);
  ev.setUint32(0, 0x06054b50, true);
  ev.setUint16(4, 0, true);
  ev.setUint16(6, 0, true);
  ev.setUint16(8, files.length, true);
  ev.setUint16(10, files.length, true);
  ev.setUint32(12, centralSize, true);
  ev.setUint32(16, offset, true);
  ev.setUint16(20, 0, true);

  return new Blob([...local, ...central, end], { type: "application/zip" });
}

const CRC_TABLE = (() => {
  const table = new Uint32Array(256);
  for (let i = 0; i < 256; i += 1) {
    let c = i;
    for (let j = 0; j < 8; j += 1) {
      c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    }
    table[i] = c >>> 0;
  }
  return table;
})();

function crc32(bytes) {
  let crc = 0xffffffff;
  for (let i = 0; i < bytes.length; i += 1) {
    crc = CRC_TABLE[(crc ^ bytes[i]) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}
