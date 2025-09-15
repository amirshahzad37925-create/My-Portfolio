// ================= PRELOADER =================
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
      preloader.classList.add('fade-out');
      setTimeout(() => preloader.remove(), 1000);
    }, 4000);
  }
}
window.addEventListener('load', hidePreloader);

// ================= PARTICLES BACKGROUND =================
tsParticles.load("particles-js", {
  background: { color: { value: "#000080" } },
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

// ================= SCROLL ACTIVE LINK =================
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
window.addEventListener("scroll", () => {
  let current = "";
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 120;
    if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.clientHeight) {
      current = section.getAttribute("id");
    }
  });
  navLinks.forEach(link => {
    link.classList.toggle("active", link.getAttribute("href") === "#" + current);
  });
});

// ================= SMOOTH SCROLL =================
navLinks.forEach(link => {
  link.addEventListener("click", e => {
    e.preventDefault();
    const id = link.getAttribute("href");
    const target = document.querySelector(id);
    if (target) {
      target.scrollIntoView({ behavior: "smooth" });
      history.pushState(null, null, id);
    }
  });
});

// ================= TYPING TEXT =================
const texts = ["Lead Generation Specialist", "Web Research Expert", "Freelancer"];
let count = 0, index = 0;
const typingEl = document.querySelector(".typing-text");
function typeText() {
  if (!typingEl) return;
  typingEl.textContent = texts[count].slice(0, ++index);
  if (index === texts[count].length) {
    setTimeout(() => { index = 0; count = (count + 1) % texts.length; typeText(); }, 5000);
  } else setTimeout(typeText, 100);
}
if (typingEl) typeText();

// ================= COUNTER ANIMATION =================
const counters = document.querySelectorAll(".counter");
const startCounter = counter => {
  let target = +counter.dataset.target;
  let count = 0;
  let speed = Math.max(10, target / 100);
  const update = () => {
    if (count < target) {
      count += speed;
      counter.innerText = Math.floor(count);
      requestAnimationFrame(update);
    } else {
      counter.innerText = target;
    }
  };
  update();
};
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => { 
    if (entry.isIntersecting) { 
      startCounter(entry.target); 
      observer.unobserve(entry.target); 
    } 
  });
}, { threshold: 0.5 });
counters.forEach(counter => observer.observe(counter));

// ================= REVIEWS SLIDER =================
let currentReview = 0;
const reviews = document.querySelectorAll(".review");
const showReview = i => reviews.forEach((r, idx) => r.classList.toggle("active", idx === i));
const nextReview = () => { currentReview = (currentReview + 1) % reviews.length; showReview(currentReview); };
if (reviews.length) { showReview(currentReview); setInterval(nextReview, 5000); }
