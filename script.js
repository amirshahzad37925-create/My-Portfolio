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
const reviewsSection = document.querySelector('.reviews-section'); // Assumed class for the parent section
let sliderInterval;

const showReview = i => reviews.forEach((r, idx) => r.classList.toggle("active", idx === i));

const startSlider = () => {
    // If the slider is already running, do nothing
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

// Use IntersectionObserver to start/stop the slider
if (reviewsSection && reviews.length) {
    const sliderObserver = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // The reviews section is visible, start the slider
                showReview(currentReview); // Show the initial review
                startSlider();
            } else {
                // The reviews section is not visible, stop the slider
                stopSlider();
            }
        });
    }, {
        // threshold: 0.5 means the callback will fire when 50% of the element is visible
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
