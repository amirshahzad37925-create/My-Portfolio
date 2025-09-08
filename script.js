// tsParticles config
tsParticles.load("particles-js", {
  background: {
    color: { value: "#000080" }
  },
  particles: {
    number: { value: 90, density: { enable: true, area: 800 } },
    color: { value: "#ffffff" },
    links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.5, width: 1 },
    move: { enable: true, speed: 2, direction: "none", outModes: { default: "out" } },
    size: { value: { min: 1, max: 3 } }
  },
  interactivity: {
    events: { onHover: { enable: true, mode: "grab" }, onClick: { enable: true, mode: "push" } },
    modes: { grab: { distance: 200, links: { opacity: 0.8 } } }
  }
});

// ===== Scroll Active Link Highlight (only if sections exist) =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

if (sections.length > 0) {
  window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      const sectionHeight = section.clientHeight;
      if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  });
}

// Typing Text Effect
const texts = ["Lead Generation Specialist", "Web Research Expert", "Freelancer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  const typingTextElement = document.querySelector(".typing-text");
  if (typingTextElement) typingTextElement.textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500);
  } else {
    setTimeout(type, 100);
  }
})();
