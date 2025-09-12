// ================= PARTICLES BACKGROUND =================
tsParticles.load("particles-js", {
  background: {
    color: { value: "#000080" } // navy blue background
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
      onHover: { enable: true, mode: "grab" },
      onClick: { enable: true, mode: "push" }
    },
    modes: {
      grab: { distance: 200, links: { opacity: 0.8 } }
    }
  }
});

// ================= PRELOADER =================
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");
  preloader.style.display = "none";
});

// ================= SCROLL ACTIVE LINK =================
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

// ================= SMOOTH SCROLL =================
navLinks.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute("href"));
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ================= TYPING TEXT EFFECT =================
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

// ================= COUNTER ANIMATION =================
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

// ================= REVIEWS SLIDER =================
let currentReview = 0;
const reviews = document.querySelectorAll(".review");

function showReview(index) {
  reviews.forEach((review, i) => {
    review.classList.toggle("active", i === index);
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

// ================= PORTFOLIO LIGHTBOX =================
const portfolioImages = document.querySelectorAll(".portfolio-container img");

portfolioImages.forEach((img) => {
  img.addEventListener("click", () => {
    const lightbox = document.createElement("div");
    lightbox.classList.add("lightbox");
    lightbox.innerHTML = `
      <div class="lightbox-content">
        <img src="${img.src}" alt="Portfolio Image">
      </div>
    `;
    document.body.appendChild(lightbox);

    lightbox.addEventListener("click", () => {
      document.body.removeChild(lightbox);
    });
  });
});
