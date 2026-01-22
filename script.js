// ===============================
// CONFIGURACIÓN
// ===============================
const TOTAL = 23;
const TOTAL_BACKDROP = 9;

// WhatsApp
const WA_NUMBER = "50257435226";
const WA_TEXT = "Hola, me gustaría cotizar estructuras para un evento.";

// ===============================
// ELEMENTOS
// ===============================
const gallery = document.getElementById("gallery");
const galleryBackdrop = document.getElementById("galleryBackdrop");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const year = document.getElementById("year");

if (year) year.textContent = new Date().getFullYear();

// ===============================
// UTIL
// ===============================
function pad(n){
  return String(n).padStart(2,"0");
}

// ===============================
// CATÁLOGO PRINCIPAL
// ===============================
for (let i = 1; i <= TOTAL; i++){
  const file = `assets/fotos/img${pad(i)}.jpg`;

  const card = document.createElement("div");
  card.className = "cardImg reveal";
  card.tabIndex = 0;

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = file;
  img.alt = `Estructura MONARCA ${i}`;

  card.appendChild(img);
  card.addEventListener("click", () => openLightbox(file));
  gallery.appendChild(card);
}

// ===============================
// BACKDROP (SIN PUERTA EN MÓVIL)
// ===============================
for (let i = 1; i <= TOTAL_BACKDROP; i++){
  const file = `assets/backdrop/bd${pad(i)}.jpg`;

  const card = document.createElement("div");
  card.className = "cardImg reveal";
  card.tabIndex = 0;

  const img = document.createElement("img");
  img.loading = "lazy";
  img.src = file;
  img.alt = `Backdrop MONARCA ${i}`;

  card.appendChild(img);
  card.addEventListener("click", () => openLightbox(file));
  galleryBackdrop.appendChild(card);
}

// ===============================
// LIGHTBOX
// ===============================
function openLightbox(src){
  lbImg.src = src;
  lightbox.classList.add("is-open");
}
function closeLightbox(){
  lightbox.classList.remove("is-open");
  lbImg.src = "";
}

lbClose.addEventListener("click", closeLightbox);
lightbox.addEventListener("click", e => {
  if (e.target === lightbox) closeLightbox();
});
window.addEventListener("keydown", e => {
  if (e.key === "Escape") closeLightbox();
});

// ===============================
// SCROLL REVEAL
// ===============================
const io = new IntersectionObserver(entries => {
  entries.forEach(en => {
    if (en.isIntersecting) en.target.classList.add("in");
  });
},{ threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// ===============================
// WHATSAPP
// ===============================
function setWhatsApp(num, text){
  const link = `https://wa.me/${num}?text=${encodeURIComponent(text)}`;
  ["waBtn","waBtn2"].forEach(id => {
    const btn = document.getElementById(id);
    if (!btn) return;
    btn.href = link;
    btn.target = "_blank";
  });
}
setWhatsApp(WA_NUMBER, WA_TEXT);

// ===============================
// DOOR FX BACKDROP (SOLO PC)
// ===============================
if (window.matchMedia("(min-width: 901px)").matches){

  const backdropSection = document.querySelector("#backdrop");
  const backdropTrigger = document.querySelector("#backdropTrigger");

  if (backdropSection && backdropTrigger){
    let armed = false;
    let played = false;

    const DOOR_DURATION = 7000;
    const DOOR_PREVIEW = 1500;

    const armObserver = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && !armed){
          armed = true;
          backdropSection.classList.add("is-door");
        }
      });
    }, { threshold: 0.1 });

    const openObserver = new IntersectionObserver(entries => {
      entries.forEach(en => {
        if (en.isIntersecting && armed && !played){
          played = true;

          setTimeout(() => {
            backdropSection.classList.add("door-open");
          }, DOOR_PREVIEW);

          setTimeout(() => {
            backdropSection.classList.remove("is-door");
            armObserver.disconnect();
            openObserver.disconnect();
          }, DOOR_PREVIEW + DOOR_DURATION + 200);
        }
      });
    }, { threshold: 0.15 });

    armObserver.observe(backdropTrigger);
    openObserver.observe(backdropSection);
  }
}

// ===============================
// INTRO SOLO MÓVIL (FULLSCREEN)
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const intro = document.getElementById("mobileIntro");
  if (!intro) return;

  if (!window.matchMedia("(max-width: 900px)").matches) return;

  intro.classList.add("is-play");

  setTimeout(() => {
    intro.classList.add("is-hide");
  }, 4800);
});



