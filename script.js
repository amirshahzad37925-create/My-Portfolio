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

// ===== Typing Text Effect =====
const texts = ["Lead Generation Specialist", "Web Research Expert", "Freelancer"];
let count = 0;
let index = 0;
let currentText = "";
let letter = "";

(function type() {
  if (count === texts.length) count = 0;
  currentText = texts[count];
  letter = currentText.slice(0, ++index);

  document.querySelector(".typing-text").textContent = letter;

  if (letter.length === currentText.length) {
    count++;
    index = 0;
    setTimeout(type, 1500);
  } else {
    setTimeout(type, 100);
  }
})();

// ===== Counter Animation (IntersectionObserver) =====
const counters = document.querySelectorAll(".counter");

const startCounter = (counter) => {
  let target = +counter.getAttribute("data-target");
  let count = 0;
  let speed = target / 60;

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
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

counters.forEach(counter => observer.observe(counter));

// ===== Reviews Slider =====
let currentReview = 0;
const reviews = document.querySelectorAll(".review");

function showReview(index) {
  reviews.forEach((review, i) => {
    review.style.display = i === index ? "block" : "none";
  });
}

function nextReview() {
  currentReview = (currentReview + 1) % reviews.length;
  showReview(currentReview);
}

function prevReview() {
  currentReview = (currentReview - 1 + reviews.length) % reviews.length;
  showReview(currentReview);
}

// Auto-slide every 5s
setInterval(nextReview, 5000);

// First review visible
if (reviews.length > 0) {
  showReview(currentReview);
}
