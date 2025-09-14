// ================= PRELOADER =================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.classList.add("hidden"); // smooth fade-out
  setTimeout(() => {
    preloader.style.display = "none"; // completely remove after fade
  }, 800); // matches CSS transition
});

// ================= PARTICLES BACKGROUND =================
tsParticles.load("particles-js", {
  background: { color: { value: "#000080" } },
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
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" }
    },
    modes: { grab: { distance: 200, links: { opacity: 0.8 } } }
  }
});

// ================= SCROLL ACTIVE LINK =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");

window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    const sectionHeight = section.clientHeight;
    if (pageYOffset >= sectionTop && pageYOffset < sectionTop + sectionHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
});

// ================= SMOOTH SCROLL =================
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

// ================= TYPING TEXT EFFECT WITH 5S INTERVAL =================
const texts = ["Lead Generation Specialist", "Web Research Expert", "Freelancer"];
let count = 0;
let index = 0;
let currentText = "";
const typingEl = document.querySelector(".typing-text");

function typeText() {
  if (!typingEl) return;
  currentText = texts[count];
  typingEl.textContent = currentText.slice(0, index + 1);
  index++;

  if (index === currentText.length) {
    setTimeout(() => {
      index = 0;
      count = (count + 1) % texts.length;
      typeText();
    }, 5000); // 5-second pause
  } else {
    setTimeout(typeText, 100); // typing speed
  }
}

if (typingEl) typeText();

// ================= COUNTER ANIMATION =================
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  let target = +counter.getAttribute("data-target");
  let countNum = 0;
  let speed = target / 60;
  const updateCount = () => {
    if (countNum < target) {
      countNum += speed;
      counter.innerText = Math.floor(countNum);
      requestAnimationFrame(updateCount);
    } else {
      counter.innerText = target;
    }
  };
  updateCount();
};

const observer = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      startCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

counters.forEach(counter => observer.observe(counter));

// ================= REVIEWS SLIDER =================
let currentReview = 0;
const reviews = document.querySelectorAll(".review");

function showReview(index) {
  reviews.forEach((review, i) => review.classList.toggle("active", i === index));
}

function nextReview() {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
}

// Auto-slide every 5s
setInterval(nextReview, 5000);
if (reviews.length > 0) showReview(currentReview);

// ===== Portfolio See More Button =====
const seeMoreBtn = document.getElementById("seeMoreBtn");
const hiddenProjects = document.querySelectorAll(".portfolio-item.hidden");

if (seeMoreBtn) {
  seeMoreBtn.addEventListener("click", () => {
    hiddenProjects.forEach(item => item.classList.toggle("hidden"));
    seeMoreBtn.textContent =
      seeMoreBtn.textContent === "See More" ? "See Less" : "See More";
  });
}

// ===== Portfolio Modal =====
const modal = document.getElementById("portfolioModal");
const modalTitle = document.getElementById("modalTitle");
const modalDesc = document.getElementById("modalDesc");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal .close");

if (modal && closeBtn) {
  document.querySelectorAll(".portfolio-item").forEach(item => {
    item.addEventListener("click", () => {
      modalTitle.textContent = item.getAttribute("data-title");
      modalDesc.textContent = item.getAttribute("data-desc");
      modalImg.src = item.querySelector("img").src;
      modal.classList.add("active");
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}
