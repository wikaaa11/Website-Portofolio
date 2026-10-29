// Interaksi portofolio Novita Wika Rahmaningsih
// Vanilla JavaScript — tanpa library tambahan.

document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("#nav-toggle");
  const navLinks = document.querySelectorAll(".nav-links a");
  const sections = document.querySelectorAll("main section[id]");
  const toast = document.querySelector(".toast");
  const backToTop = document.querySelector(".back-to-top");

  // Tampilkan screenshot asli hanya jika file aset berhasil dimuat.
  document.querySelectorAll(".project-image").forEach((image) => {
    image.addEventListener("load", () => image.classList.add("is-loaded"));
    image.addEventListener("error", () => image.remove());
  });

  // Tutup menu mobile setelah salah satu tautan dipilih.
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (navToggle) navToggle.checked = false;
    });
  });

  // Tahun footer mengikuti tahun saat ini.
  const year = document.querySelector("#current-year");
  if (year) year.textContent = new Date().getFullYear();

  // Munculkan elemen saat masuk ke viewport.
  const revealTargets = document.querySelectorAll(
    ".section-heading, .about-content, .skill-card, .project-card, .timeline-item, .education-card, .organization-card, .contact-content, .contact-links"
  );
  revealTargets.forEach((element) => element.classList.add("reveal"));

  if ("IntersectionObserver" in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    revealTargets.forEach((element) => revealObserver.observe(element));

    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${entry.target.id}`;
            link.classList.toggle("active", isActive);
          });
        }
      });
    }, { rootMargin: "-35% 0px -55% 0px" });

    sections.forEach((section) => sectionObserver.observe(section));
  } else {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
  }

  // Tombol kembali ke atas muncul setelah halaman digulir.
  const updateBackToTop = () => {
    if (backToTop) backToTop.classList.toggle("visible", window.scrollY > 500);
  };
  window.addEventListener("scroll", updateBackToTop, { passive: true });
  updateBackToTop();

  // Klik alamat email untuk menyalinnya; tautan mailto tetap menjadi fallback.
  let toastTimer;
  document.querySelectorAll(".copy-email").forEach((link) => {
    link.addEventListener("click", async (event) => {
      const email = link.dataset.email;
      if (!email || !navigator.clipboard || !window.isSecureContext) return;
      event.preventDefault();
      try {
        await navigator.clipboard.writeText(email);
        if (toast) {
          toast.classList.add("show");
          clearTimeout(toastTimer);
          toastTimer = setTimeout(() => toast.classList.remove("show"), 2200);
        }
      } catch {
        window.location.href = `mailto:${email}`;
      }
    });
  });

  // Efek pointer halus pada kartu proyek untuk perangkat yang mendukung hover.
  if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) {
    document.querySelectorAll(".project-card").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const rect = card.getBoundingClientRect();
        card.style.setProperty("--pointer-x", `${event.clientX - rect.left}px`);
        card.style.setProperty("--pointer-y", `${event.clientY - rect.top}px`);
      });
    });
  }
});
