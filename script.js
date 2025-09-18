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
const portfolioGroup = ['portfolio', 'reviews', 'counter', 'certifications'];

window.addEventListener("scroll", () => {
    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 120;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + section.clientHeight) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        const linkHref = link.getAttribute("href").substring(1);

        if (portfolioGroup.includes(current) && linkHref === 'portfolio') {
            link.classList.add('active');
        } else if (linkHref === current) {
            link.classList.add("active");
        }
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
    if (!typingEl) return;
    const currentText = texts[count];
    if (index < currentText.length) {
        typingEl.textContent += currentText.charAt(index);
        index++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(() => {
            index = 0;
            count = (count + 1) % texts.length;
            typingEl.textContent = '';
            typeText();
        }, 5000);
    }
}
if (typingEl) {
    typeText();
}

// ================= COUNTER ANIMATION =================
const counterSection = document.querySelector("#counter");
if (counterSection) {
    const counters = document.querySelectorAll(".counter-box h3");
    const speed = 200;

    const animateCounter = (counter) => {
        const updateCount = () => {
            const target = +counter.getAttribute("data-target");
            const count = +counter.innerText;
            const inc = target / speed;

            if (count < target) {
                counter.innerText = Math.ceil(count + inc);
                setTimeout(updateCount, 1);
            } else {
                counter.innerText = target;
            }
        };
        updateCount();
    };

    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                counters.forEach(animateCounter);
                obs.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterSection);
}

// ================= REVIEWS SLIDER =================
let currentReview = 0;
const reviews = document.querySelectorAll(".review");
const reviewsSection = document.querySelector('.reviews');
let sliderInterval;

const showReview = i => reviews.forEach((r, idx) => r.classList.toggle("active", idx === i));

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
    }, { threshold: 0.5 });
    sliderObserver.observe(reviewsSection);
}

// ================= CERTIFICATE SCROLLING =================
const certContainer = document.querySelector('.certificates-container');
const scrollLeftBtn = document.getElementById('cert-scroll-left');
const scrollRightBtn = document.getElementById('cert-scroll-right');
const certsDotsContainer = document.querySelector('.cert-dots');

const updateActiveDot = () => {
    if (!certsDotsContainer || !certContainer) return;
    const certs = Array.from(certContainer.children);
    const dots = Array.from(certsDotsContainer.children);
    const containerScrollLeft = certContainer.scrollLeft;
    
    certs.forEach((cert, index) => {
        const certPosition = cert.offsetLeft;
        if (certPosition <= containerScrollLeft + certContainer.offsetWidth / 2 && certPosition + cert.offsetWidth >= containerScrollLeft + certContainer.offsetWidth / 2) {
            dots.forEach(d => d.classList.remove('active'));
            if (dots[index]) {
                dots[index].classList.add('active');
            }
        }
    });
};

const generateDots = () => {
    if (!certsDotsContainer || !certContainer) return;
    certsDotsContainer.innerHTML = '';
    const totalCerts = certContainer.children.length;
    for (let i = 0; i < totalCerts; i++) {
        const dot = document.createElement('div');
        dot.classList.add('cert-dot');
        dot.dataset.index = i;
        certsDotsContainer.appendChild(dot);
    }
};

if (certContainer && scrollLeftBtn && scrollRightBtn) {
    generateDots();
    updateActiveDot();
    
    const checkScroll = () => {
        scrollLeftBtn.disabled = certContainer.scrollLeft <= 0;
        scrollRightBtn.disabled = certContainer.scrollLeft + certContainer.clientWidth >= certContainer.scrollWidth;
        updateActiveDot();
    };

    certContainer.addEventListener('scroll', checkScroll);
    window.addEventListener('resize', checkScroll);
    checkScroll();

    scrollRightBtn.addEventListener('click', () => {
        certContainer.scrollBy({ left: 300, behavior: 'smooth' });
    });
    scrollLeftBtn.addEventListener('click', () => {
        certContainer.scrollBy({ left: -300, behavior: 'smooth' });
    });

    if (certsDotsContainer) {
        certsDotsContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('cert-dot')) {
                const dotIndex = e.target.dataset.index;
                const certElement = certContainer.children[dotIndex];
                if (certElement) {
                    certContainer.scrollTo({
                        left: certElement.offsetLeft,
                        behavior: 'smooth'
                    });
                }
            }
        });
    }
}
