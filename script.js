// ================= PRELOADER =================
function hidePreloader() {
  const preloader = document.getElementById('preloader');
  if (preloader) {
    setTimeout(() => {
    preloader.classList.add('fade-out');
    preloader.addEventListener('transitionend', () => {
        preloader.remove();
    });
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
const texts = ["Lead Generation Specialist", "Outreach Expert", "Marketing Expert", "SEO Specialist"];
let count = 0;
let index = 0;
const typingEl = document.querySelector(".typing-text");

function typeText() {
    if (!typingEl) {
        return; // Exit if the element is not found
    }

    if (index < texts[count].length) {
        // Typing logic
        typingEl.textContent += texts[count].charAt(index);
        index++;
        setTimeout(typeText, 100); // Continue typing
    } else {
        // Wait for 5 seconds after a text is fully typed
        setTimeout(() => {
            index = 0;
            count = (count + 1) % texts.length;
            typingEl.textContent = ''; // Clear text before typing next one
            typeText(); // Start typing the next text
        }, 5000);
    }
}
if (typingEl) {
    typeText();
}

// ================= REVIEWS SLIDER =================
let currentReview = 0;
const reviews = document.querySelectorAll(".review");
const dotsContainer = document.querySelector(".review-dots");
const reviewsSection = document.querySelector('.reviews');
let sliderInterval;

// Create dots and add listeners
reviews.forEach((review, index) => {
    const dot = document.createElement('div');
    dot.classList.add('dot');
    if (index === 0) {
        dot.classList.add('active');
    }
    dot.addEventListener('click', () => {
        showReview(index);
        stopSlider();
        startSlider();
    });
    dotsContainer.appendChild(dot);
});

const dots = document.querySelectorAll('.dot');

const showReview = (index) => {
    currentReview = index;
    reviews.forEach((r, idx) => r.classList.toggle("active", idx === index));
    dots.forEach((d, idx) => d.classList.toggle("active", idx === index));
};

const startSlider = () => {
    if (sliderInterval) return;
    sliderInterval = setInterval(() => {
        currentReview = (currentReview + 1) % reviews.length;
        showReview(currentReview);
    }, 5000);
};

const stopSlider = () => {
    clearInterval(sliderInterval);
    sliderInterval = null;
};

// Start/Stop slider on section visibility
if (reviewsSection && reviews.length) {
    const sliderObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                showReview(currentReview);
                startSlider();
            } else {
                stopSlider();
            }
        });
    }, {
        threshold: 0.5
    });
    sliderObserver.observe(reviewsSection);
}


// ================= CERTIFICATE SCROLLING =================
const certContainer = document.querySelector('.certificates-container');
const scrollLeftBtn = document.getElementById('cert-scroll-left');
const scrollRightBtn = document.getElementById('cert-scroll-right');

if (certContainer && scrollLeftBtn && scrollRightBtn) {
  const checkScroll = () => {
    scrollLeftBtn.disabled = certContainer.scrollLeft <= 0;
    scrollRightBtn.disabled = certContainer.scrollLeft + certContainer.clientWidth >= certContainer.scrollWidth;
  };

  certContainer.addEventListener('scroll', checkScroll);
  window.addEventListener('resize', checkScroll); // Check on resize
  checkScroll(); // Initial check

  scrollRightBtn.addEventListener('click', () => {
    certContainer.scrollBy({
      left: 300, // Scroll distance (adjust as needed)
      behavior: 'smooth'
    });
  });

  scrollLeftBtn.addEventListener('click', () => {
    certContainer.scrollBy({
      left: -300, // Scroll distance (adjust as needed)
      behavior: 'smooth'
    });
  });
}

