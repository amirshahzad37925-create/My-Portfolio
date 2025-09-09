// tsParticles config
tsParticles.load("particles-js", {
  background: {
    color: { value: "#000080" } // same blue background like Hunarmand Punjab
  },
  particles: {
    number: { value: 90, density: { enable: true, area: 800 } },
    color: { value: "#ffffff" },
    links: {
      enable: true,
      distance: 150,
      color: "#ffffff",
      opacity: 0.5,
      width: 1
    },
    move: {
      enable: true,
      speed: 2,
      direction: "none",
      outModes: { default: "out" },
      attract: { enable: true, rotateX: 600, rotateY: 1200 }
    },
    size: { value: { min: 1, max: 3 } }
  },
  interactivity: {
    events: {
      onHover: { enable: true, mode: "grab" }, // cursor ke pass lines kheenchengi
      onClick: { enable: true, mode: "push" }  // click karne pe naye particles aayenge
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.8 } }
    }
  }
});

// ===== Scroll Active Link Highlight =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 120; // navbar ki height adjust
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
// Typing Text Effect
const texts = ["Lead Generation Specialist", "Web Research Expert", "Freelancer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === texts.length) {
    count = 0;
  }
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.querySelector(".typing-text").textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500); // ruk kar next text start hoga
  } else {
    setTimeout(type, 100);
  }
})();

// ===== Counter Animation =====
const counters = document.querySelectorAll(".counter");
let counterStarted = false;

window.addEventListener("scroll", () => {
  const counterSection = document.querySelector("#counter");
  const sectionTop = counterSection.offsetTop - window.innerHeight + 100;

  if (!counterStarted && window.scrollY > sectionTop) {
    counters.forEach(counter => {
      let target = +counter.getAttribute("data-target");
      let count = 0;
      let speed = target / 60; // 60 frames ≈ 1 second
      let updateCount = () => {
        if (count < target) {
          count += speed;
          counter.innerText = Math.floor(count);
          requestAnimationFrame(updateCount);
        } else {
          counter.innerText = target;
        }
      };
      updateCount();
    });
    counterStarted = true;
  }
});

// ===== Counter Animation (with IntersectionObserver) =====
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  let target = +counter.getAttribute("data-target");
  let count = 0;
  let speed = target / 60; // ~1 second animation

  let updateCount = () => {
    if (count < target) {
      count += speed;
      counter.innerText = Math.floor(count);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
};

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        startCounter(entry.target);
        observer.unobserve(entry.target); // ek bar run hoga
      }
    });
  },
  { threshold: 0.5 } // jab 50% section screen me hoga tab run karega
);

counters.forEach(counter => {
  observer.observe(counter);
});

