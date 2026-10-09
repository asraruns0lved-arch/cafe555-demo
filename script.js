
const filters = document.querySelectorAll(".filter");
const foodCards = document.querySelectorAll(".food-card");

filters.forEach((button) => {
  button.addEventListener("click", () => {
    const category = button.dataset.filter;

    filters.forEach((item) => item.classList.remove("active"));
    button.classList.add("active");

    foodCards.forEach((card) => {
      const matches =
        category === "all" || card.dataset.category === category;

      card.hidden = !matches;
    });
  });
});

const menuToggle = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
  menuToggle.textContent = isOpen ? "✕" : "☰";
});

navLinks.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.textContent = "☰";
  });
});

/* ===== SCROLL REVEAL ANIMATIONS ===== */

const revealElements = document.querySelectorAll(
  "section, .menu-card, .menu-item, .food-card, .dish-card"
);

revealElements.forEach((element, index) => {
  element.setAttribute("data-reveal", "");

  // Stagger nearby menu cards slightly
  if (
    element.matches(
      ".menu-card, .menu-item, .food-card, .dish-card"
    )
  ) {
    element.style.setProperty(
      "--reveal-delay",
      `${(index % 4) * 100}ms`
    );
  }
});

if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("revealed");
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -35px 0px"
    }
  );

  revealElements.forEach((element) => {
    revealObserver.observe(element);
  });
} else {
  revealElements.forEach((element) => {
    element.classList.add("revealed");
  });
}
