// ============================================================
// === PAGE SWITCHING ===
function showPage(pageId) {
  // Cache toutes les sections
  const sections = document.querySelectorAll(".section");
  sections.forEach(section => section.classList.remove("active-section"));

  // Affiche la section sélectionnée
  const target = document.getElementById(pageId);
  if (target) {
    target.classList.add("active-section");
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  // Met à jour le lien actif dans le menu principal
  const menuLinks = document.querySelectorAll(".main-menu a");
  menuLinks.forEach(link => link.classList.remove("active"));
  const activeLink = Array.from(menuLinks).find(
    link => link.getAttribute("onclick") === `showPage('${pageId}')`
  );
  if (activeLink) activeLink.classList.add("active");

  // Ferme le menu mobile s'il est ouvert
  const mobileMenu = document.querySelector(".mobile-menu");
  if (mobileMenu) mobileMenu.classList.remove("open");
}

// ============================================================
// === INITIALIZATION ON LOAD ===
document.addEventListener("DOMContentLoaded", () => {
  // --- MENU BURGER TOGGLE ---
  const hamburgerButton = document.querySelector(".hamburger-button");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (hamburgerButton && mobileMenu) {
    hamburgerButton.addEventListener("click", e => {
      e.preventDefault();
      mobileMenu.classList.toggle("open");
    });

    // Ferme le menu quand on clique sur un lien du menu mobile
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach(link => {
      link.addEventListener("click", () => mobileMenu.classList.remove("open"));
    });
  }

  // --- ACTIVE PAGE PAR DÉFAUT ---
  const defaultPage = document.getElementById("home");
  if (defaultPage) defaultPage.classList.add("active-section");

  // --- FOOTER TOUJOURS VISIBLE ---
  const footer = document.querySelector("footer");
  if (footer) footer.style.display = "block";

  // --- MISE À JOUR AUTOMATIQUE DE L'ANNÉE DANS LE FOOTER ---
  const currentYear = new Date().getFullYear();
  const footerCopy = document.querySelector(".footer-copyright");
  if (footerCopy) {
    footerCopy.innerHTML = `© ${currentYear} Antony Morvan — Aerospace Engineer @ ISAE-SUPAERO. All rights reserved.`;
  }

  // --- BOUTON CV : ouverture sécurisée dans un nouvel onglet ---
  const resumeButton = document.querySelector("[data-open-resume], .hero-buttons .btn");
  if (resumeButton) {
    resumeButton.addEventListener("click", e => {
      e.preventDefault();

      // Détermine le chemin du fichier PDF (vérifie qu'il existe bien)
      const resumePath = "assets/Resume_Antony_MORVAN.pdf";
      fetch(resumePath, { method: "HEAD" })
        .then(response => {
          if (response.ok) {
            window.open(resumePath, "_blank", "noopener");
          } else {
            alert("Resume file not found. Please check the path or file name.");
          }
        })
        .catch(() => {
          // Fallback au cas où fetch échoue (ex: sur GitHub Pages)
          window.open(resumePath, "_blank", "noopener");
        });
    });
  }
});

// =========================================================
// 🔙 Gestion du retour automatique vers "Work"
// =========================================================
window.addEventListener('load', () => {
  const goToWork = sessionStorage.getItem('returnToWork');
  if (goToWork === 'true') {
    sessionStorage.removeItem('returnToWork');
    if (typeof showPage === 'function') {
      showPage('work');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }
});