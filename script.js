// ===============================
// CONFIGURACIÓN
// ===============================

// Total de fotos del catálogo
// assets/fotos/img01.jpg ... img18.jpg
const TOTAL = 23;

// WhatsApp MONARCA (Guatemala +502)
const WA_NUMBER = "50257435226";
const WA_TEXT = "Hola, me gustaría cotizar estructuras para un evento.";

// ===============================
// ELEMENTOS
// ===============================
const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const year = document.getElementById("year");

// Año automático en footer
if (year) year.textContent = new Date().getFullYear();

// ===============================
// CATÁLOGO
// ===============================
function pad(n){ 
  return String(n).padStart(2,"0"); 
}

for (let i = 1; i <= TOTAL; i++){
  const file = `assets/fotos/img${pad(i)}.jpg`;

  const card = document.createElement("div");
  card.className = "cardImg reveal";
  card.tabIndex = 0;
  card.setAttribute("role","button");
  card.setAttribute("aria-label", `Abrir foto ${i}`);

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = file;
  img.alt = `Estructura MONARCA ${i}`;

  card.appendChild(img);

  card.addEventListener("click", () => openLightbox(file));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openLightbox(file);
  });

  gallery.appendChild(card);

}


  // ===== BACKDROP GALLERY =====
const TOTAL_BACKDROP = 7; // <-- cambia según tus fotos
const galleryBackdrop = document.getElementById("galleryBackdrop");

for (let i = 1; i <= TOTAL_BACKDROP; i++){
  const file = `assets/backdrop/bd${pad(i)}.jpg`;

  const card = document.createElement("div");
  card.className = "cardImg reveal";
  card.tabIndex = 0;
  card.setAttribute("role","button");
  card.setAttribute("aria-label", `Abrir backdrop ${i}`);

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = file;
  img.alt = `Backdrop MONARCA ${i}`;

  card.appendChild(img);

  card.addEventListener("click", () => openLightbox(file));
  card.addEventListener("keydown", (e) => {
    if (e.key === "Enter" || e.key === " ") openLightbox(file);
  });

  galleryBackdrop.appendChild(card);
}

// ===============================
// LIGHTBOX
// ===============================
function openLightbox(src){
  lbImg.src = src;
  lightbox.classList.add("is-open");
  lightbox.setAttribute("aria-hidden","false");
}

function closeLightbox(){
  lightbox.classList.remove("is-open");
  lightbox.setAttribute("aria-hidden","true");
  lbImg.src = "";
}

lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", (e) => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeLightbox();
});

// ===============================
// SCROLL REVEAL
// ===============================
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) en.target.classList.add("in");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ===============================
// WHATSAPP
// ===============================
function setWhatsApp(numberE164, text){
  const link = `https://wa.me/${numberE164.replace(/\D/g,"")}?text=${encodeURIComponent(text)}`;
  const wa1 = document.getElementById("waBtn");
  const wa2 = document.getElementById("waBtn2");

  [wa1, wa2].forEach(btn => {
    if (!btn) return;
    btn.href = link;
    btn.removeAttribute("aria-disabled");
    btn.title = "Abrir WhatsApp";
  });
}

// Activar WhatsApp
setWhatsApp("50257435226", "Hola, me gustaría cotizar estructuras para un evento.");

// ===== DOOR FX: activar antes (al final del catálogo) =====
const backdropSection = document.querySelector("#backdrop");
const backdropTrigger = document.querySelector("#backdropTrigger");

if (backdropSection && backdropTrigger) {
  let armed = false;   // puerta cerrada lista
  let played = false;  // ya se abrió una vez

  const DOOR_DURATION = 7000;  // apertura (ms)
  const DOOR_PREVIEW  = 1500;  // tiempo cerrada antes de abrir (ms)

  // 1) Armamos la puerta ANTES (cuando se llega al final del catálogo)
  const armObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && !armed) {
        armed = true;
        backdropSection.classList.add("is-door"); // puerta cerrada lista
      }
    });
  }, { threshold: 0.1 });

  // 2) Cuando ya entramos al Backdrop, ahora sí se abre
  const openObserver = new IntersectionObserver((entries) => {
    entries.forEach((en) => {
      if (en.isIntersecting && armed && !played) {
        played = true;

        // deja un momento la puerta cerrada (se percibe)
        setTimeout(() => {
          backdropSection.classList.add("door-open");
        }, DOOR_PREVIEW);

        // al final la quitamos (ya abrió)
        setTimeout(() => {
          backdropSection.classList.remove("is-door");
          openObserver.disconnect();
          armObserver.disconnect();
        }, DOOR_PREVIEW + DOOR_DURATION + 150);
      }
    });
  }, { threshold: 0.15 });

  armObserver.observe(backdropTrigger);
  openObserver.observe(backdropSection);
}







