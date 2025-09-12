// ===== tsParticles config =====
tsParticles.load("particles-js", {
  background: { color: { value: "#000080" } },
  particles: {
    number: { value: 90, density: { enable: true, area: 800 } },
    color: { value: "#ffffff" },
    links: { enable: true, distance: 150, color: "#ffffff", opacity: 0.5, width: 1 },
    move: { enable: true, speed: 2, outModes: { default: "out" } },
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

// ===== Scroll Active Link Highlight =====
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav a");
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
    if (link.getAttribute("href") === "#" + current) link.classList.add("active");
  });
});

// ===== Typing Text Effect =====
const texts = ["Lead Generation Specialist", "Web Research Expert", "Freelancer"];
let count = 0, index = 0, currentText = "", letter = "";
(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);
  document.querySelector(".typing-text").textContent = letter;
  if (letter.length === currentText.length) {
    count++; index = 0; setTimeout(type, 1500);
  } else setTimeout(type, 100);
})();

// ===== Counter Animation =====
const counters = document.querySelectorAll(".counter");
const startCounter = (counter) => {
  let target = +counter.getAttribute("data-target");
  let count = 0, speed = target / 60;
  let updateCount = () => {
    if (count < target) { count += speed; counter.innerText = Math.floor(count); requestAnimationFrame(updateCount); }
    else counter.innerText = target;
  };
  updateCount();
};
const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) { startCounter(entry.target); observer.unobserve(entry.target); }
  });
}, { threshold: 0.5 });
counters.forEach(counter => observer.observe(counter));

// ===== Reviews Slider =====
let currentReview = 0;
const reviews = document.querySelectorAll(".review");
const dotsContainer = document.querySelector(".review-dots");
reviews.forEach((_, i) => {
  let dot = document.createElement("span");
  dot.classList.add("dot");
  dot.addEventListener("click", () => { currentReview = i; showReview(currentReview); });
  dotsContainer.appendChild(dot);
});
function showReview(index) {
  reviews.forEach((review, i) => { review.style.display = i === index ? "block" : "none"; });
  document.querySelectorAll(".dot").forEach((dot, i) => {
    dot.style.background = i === index ? "#ff9800" : "#ccc";
  });
}
function nextReview() { currentReview = (currentReview + 1) % reviews.length; showReview(currentReview); }
function prevReview() { currentReview = (currentReview - 1 + reviews.length) % reviews.length; showReview(currentReview); }
setInterval(nextReview, 5000);
if (reviews.length > 0) showReview(currentReview);

// ===== Lightbox for Portfolio =====
const portfolioItems = document.querySelectorAll(".portfolio-item");
const lightbox = document.createElement("div");
lightbox.id = "lightbox";
document.body.appendChild(lightbox);
portfolioItems.forEach(item => {
  item.addEventListener("click", () => {
    lightbox.classList.add("active");
    const img = document.createElement("img");
    img.src = item.src;
    while (lightbox.firstChild) lightbox.removeChild(lightbox.firstChild);
    lightbox.appendChild(img);
  });
});
lightbox.addEventListener("click", () => { lightbox.classList.remove("active"); });
