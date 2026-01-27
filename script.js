// ===================
// CONFIG
// ===================
const WA_NUMBER = "50257435226";
const WA_TEXT_BASE = "Hola, me gustaría cotizar esta estructura:";

// Helper: detectar móvil (igual que tu breakpoint)
function isMobile() {
  return window.matchMedia("(max-width: 900px)").matches;
}

// ===================
// DATA
// ===================
const catalogo = [
  { file:"img01.jpg", code:"M1",  meta:"luna pequeña 210cm · luna grande 240cm" },
  { file:"img02.jpg", code:"M2",  meta:"Alto 80 cm · Ancho 200 cm" },
  { file:"img03.jpg", code:"M3",  meta:"Arco pequeño 45×150 · Arco grande 120×240" },
  { file:"img04.jpg", code:"M4",  meta:"Alto 200 cm · Ancho 200 cm" },
  { file:"img05.jpg", code:"M5",  meta:"Cubos panel centro 40×200 cm" },
  { file:"img06.jpg", code:"M6",  meta:"Puertas arco 100×200 · Cuad 160×200" },
  { file:"img07.jpg", code:"M7",  meta:"Alto 220 cm · Ancho 240 cm" },
  { file:"img08.jpg", code:"M8",  meta:"C/U · Diámetro 180 cm" },
  { file:"img09.jpg", code:"M9",  meta:"Laterales 120×200 · Centro 200×220" },
  { file:"img10set.jpg", code:"M10 SET", meta:"Alto 260 cm" },
  { file:"img10.jpg", code:"M10", meta:"Alto 220 cm · Ancho 220 cm" },
  { file:"img11.jpg", code:"M11 SET", meta:"Diámetro 180×254 cm" },
  { file:"img12.jpg", code:"M12", meta:"Alto 300 cm · Ancho 200 cm" },
  { file:"img13.jpg", code:"M13", meta:"Alto 250 cm · Ancho 500 cm" },
  { file:"img14.jpg", code:"M14", meta:"C/U · Alto 240 cm" },
  { file:"img15.jpg", code:"M15", meta:"Jaula individual 78×200 cm" },
  { file:"img16.jpg", code:"M16", meta:"Laterales 120×220 · Centro 150×240" },
  { file:"img17.jpg", code:"M17", meta:"Alto 240 cm · Ancho 120 cm" },
  { file:"img18.jpg", code:"M18", meta:"Diámetro 200 cm" },
  { file:"img19.jpg", code:"M19", meta:"Alto 180 cm · Ancho 180 cm" },
  { file:"img20.jpg", code:"M30", meta:"Alto 320 cm · Ancho 280 cm" },
  { file:"img21.jpg", code:"M33", meta:"Alto 3 mts · Ancho 3 mts" },
  { file:"img22.jpg", code:"M21", meta:"Alto 3 mts · Ancho 3 mts" },
];

const backdrop = [
  { file:"bd07.jpg", code:"M23", meta:"Alto 275 cm · Ancho 552 cm" },
  { file:"bd01.jpg", code:"M24", meta:"Alto 480 cm · Ancho 240 cm" },
  { file:"bd02.jpg", code:"M25", meta:"Alto 40 cm · Ancho 90 cm · Total 280 cm" },
  { file:"bd03.jpg", code:"M26", meta:"Alto 300 cm · Ancho 400 cm" },
  { file:"bd04.jpg", code:"M27", meta:"Alto 240 cm · Ancho 500 cm" },
  { file:"bd05.jpg", code:"M28", meta:"Alto 240 cm · Ancho 400 cm" },
  { file:"bd06.jpg", code:"M29", meta:"Puerta 60×280 · 55×260 · 50×200" },
  { file:"bd08.jpg", code:"M31", meta:"Alto 60 cm · Ancho 120 cm" },
  { file:"bd09.jpg", code:"M32", meta:"Alto 600 cm · Ancho 275 cm" },
];

// ===================
// BASIC
// ===================
const year = document.getElementById("year");
if (year) year.textContent = new Date().getFullYear();

function waLink(message) {
  const clean = String(WA_NUMBER).replace(/\D/g, "");
  const msg = encodeURIComponent(message);
  return `https://wa.me/${clean}?text=${msg}`;
}

function setWhatsAppTop() {
  const link = waLink("Hola, me gustaría cotizar estructuras para un evento.");
  ["waBtn", "waBtnTop"].forEach((id) => {
    const el = document.getElementById(id);
    if (!el) return;
    el.href = link;
    el.target = "_blank";
    el.rel = "noopener";
    el.title = "Abrir WhatsApp";
  });
}

// ===================
// DOOR FX (Backdrop) - SOLO PC
// (se dispara SOLO cuando ya estás entrando a Backdrop)
// ===================
function initDoorFx(){
  if (isMobile()) return;

  const section = document.getElementById("backdrop");
  if (!section) return;

  // Armamos antes de llegar (evita pop-in)
  const trigger = document.getElementById("backdropTrigger") || section;

  let armed = false;
  let played = false;
  let pendingFromClick = false;

  // 1) armar un poco antes
  const armObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (en.isIntersecting && !armed){
        armed = true;
        section.classList.add("is-door");
      }
    });
  }, { threshold: 0.1, rootMargin: "0px 0px 25% 0px" });

  // 2) abrir al llegar
  const openObs = new IntersectionObserver((entries) => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      if (!armed || played) return;

      played = true;

      // “cerrada” un momento y luego abre
      const HOLD = pendingFromClick ? 600 : 250;
      pendingFromClick = false;

      setTimeout(() => section.classList.add("door-open"), HOLD);

      // limpiar al final
      setTimeout(() => {
        section.classList.remove("is-door");
        // section.classList.remove("door-open"); // opcional
      }, HOLD + 5200);
    });
  }, { threshold: 0.15, rootMargin: "0px 0px -30% 0px" });

  armObs.observe(trigger);
  openObs.observe(section);

  // Click: solo marcar pendiente (no abrir arriba)
  document.querySelectorAll('a[href="#backdrop"], a[data-door="1"]').forEach(a => {
    a.addEventListener("click", () => {
      pendingFromClick = true;
      played = false;
      // arma de una vez para que al llegar ya esté puesta
      if (!armed){
        armed = true;
        section.classList.add("is-door");
      }
    });
  });
}




// ===================
// LIGHTBOX
// ===================
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const lbCode = document.getElementById("lbCode");
const lbMeta = document.getElementById("lbMeta");
const lbWa = document.getElementById("lbWa");

function openLightbox(src, item) {
  lbImg.src = src;
  lbCode.textContent = item.code;
  lbMeta.textContent = item.meta;

  const msg = `${WA_TEXT_BASE} ${item.code}. ${item.meta}.`;
  lbWa.href = waLink(msg);
  lbWa.target = "_blank";
  lbWa.rel = "noopener";

  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden", "false");
}

function closeLightbox() {
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden", "true");
  lbImg.src = "";
}

lbClose?.addEventListener("click", closeLightbox);
lightbox?.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ===================
// GALLERY RENDER (solo código)
// ===================
function createCard(item, folder, galleryEl) {
  const file = `assets/${folder}/${item.file}`;

  const card = document.createElement("div");
  card.className = "cardImg reveal";
  card.tabIndex = 0;
  card.setAttribute("role", "button");
  card.setAttribute("aria-label", `Abrir ${item.code}`);

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = file;
  img.alt = `${item.code} - ${item.meta}`;

  img.addEventListener("error", () => {
    card.style.outline = "2px solid rgba(255,0,0,.45)";
  });

  const tag = document.createElement("div");
  tag.className = "cardTag";

  const code = document.createElement("p");
  code.className = "cardTag__code";
  code.textContent = item.code;

  tag.appendChild(code);

  card.appendChild(img);
  card.appendChild(tag);

  card.addEventListener("click", () => openLightbox(file, item));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openLightbox(file, item);
  });

  galleryEl.appendChild(card);
}

function renderGallery(items, folder, galleryId) {
  const galleryEl = document.getElementById(galleryId);
  if (!galleryEl) return;
  galleryEl.innerHTML = "";
  items.forEach((it) => createCard(it, folder, galleryEl));
}

// ===================
// REVEAL
// ===================
const io = new IntersectionObserver(
  (entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting) en.target.classList.add("in");
    });
  },
  { threshold: 0.12 }
);

function observeReveals() {
  document.querySelectorAll(".reveal").forEach((el) => io.observe(el));
}

// ===================
// MOBILE INTRO (NO BLACK FLASH) - SOLO MÓVIL
// ===================
function initMobileIntro() {
  const intro = document.getElementById("mobileIntro");
  if (!intro) return;

  if (!isMobile()) {
    intro.remove();
    return;
  }

  requestAnimationFrame(() => intro.classList.add("is-play"));

  intro.addEventListener(
    "animationend",
    () => {
      intro.style.background = "transparent";
      intro.style.pointerEvents = "none";
      intro.style.transition = "opacity 260ms ease";
      intro.style.opacity = "0";
      setTimeout(() => intro.remove(), 280);
    },
    { once: true }
  );
}

// ===================
// INIT
// ===================
document.addEventListener("DOMContentLoaded", () => {
  setWhatsAppTop();

  renderGallery(catalogo, "fotos", "galleryCatalogo");
  renderGallery(backdrop, "backdrop", "galleryBackdrop");

  observeReveals();
  initDoorFx();
  initMobileIntro();
});

