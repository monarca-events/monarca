// Genera el catálogo con 18 fotos: assets/fotos/img01.jpg ... img18.jpg
const TOTAL = 18;

const gallery = document.getElementById("gallery");
const lightbox = document.getElementById("lightbox");
const lbImg = document.getElementById("lbImg");
const lbClose = document.getElementById("lbClose");
const year = document.getElementById("year");

year.textContent = new Date().getFullYear();

function pad(n){ return String(n).padStart(2,"0"); }

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

// Scroll reveal
const io = new IntersectionObserver((entries) => {
  entries.forEach((en) => {
    if (en.isIntersecting) en.target.classList.add("in");
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach(el => io.observe(el));

// WhatsApp: lo activamos mañana con tu número
function setWhatsApp(numberE164){
  const link = `https://wa.me/${numberE164.replace(/\D/g,"")}`;
  const wa1 = document.getElementById("waBtn");
  const wa2 = document.getElementById("waBtn2");
  [wa1, wa2].forEach(btn => {
    btn.href = link;
    btn.removeAttribute("aria-disabled");
    btn.title = "Abrir WhatsApp";
  });
}
// Ejemplo Guatemala: setWhatsApp("50212345678");
