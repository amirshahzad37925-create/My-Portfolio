// ================= PRELOADER =================
        window.addEventListener("load", () => {
            const preloader = document.getElementById("preloader");
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
            }, 800);
        });

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
                if (pageYOffset >= sectionTop) {
                    current = section.getAttribute("id");
                }
            });
            navLinks.forEach(link => {
                link.classList.remove("active");
                if (link.getAttribute("href") === "#" + current) {
                    link.classList.add("active");
                }
            });
        });

        // ================= SMOOTH SCROLL =================
        navLinks.forEach(link => {
            link.addEventListener("click", e => {
                e.preventDefault();
                const targetId = link.getAttribute("href").substring(1);
                const target = document.getElementById(targetId);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            });
        });
        function refreshPage() {
            window.location.reload();
        }

        // ================= TYPING TEXT =================
        const texts = ["Lead Generation Specialist", "Outreach Expert", "Marketing Expert", "SEO Specialist"];
        let count = 0, index = 0, currentText = "", letter = "";
        const typingEl = document.querySelector(".typing-text");
        (function type() {
            if (count === texts.length) {
                count = 0;
            }
            currentText = texts[count];
            letter = currentText.slice(0, ++index);
            if (typingEl) {
                typingEl.textContent = letter;
            }
            if (letter.length === currentText.length) {
                count++;
                index = 0;
                setTimeout(type, 1500);
            } else {
                setTimeout(type, 100);
            }
        })();

        // ================= COUNTERS =================
        const counters = document.querySelectorAll(".counter");
        const startCounter = (counter) => {
            let target = +counter.getAttribute("data-target");
            let count = 0;
            let speed = target / 60;
            const updateCount = () => {
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
        const observer = new IntersectionObserver((entries, obs) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    startCounter(entry.target);
                    obs.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        counters.forEach(counter => observer.observe(counter));

        // ================= CERTIFICATE SCROLLING =================
        const certsContainer = document.querySelector('.certificates-container');
        const certsDotsContainer = document.querySelector('.cert-dots');
        const scrollLeftBtn = document.getElementById('cert-scroll-left');
        const scrollRightBtn = document.getElementById('cert-scroll-right');
        const scrollAmount = 300; 

        function generateDots() {
            if (!certsDotsContainer) return;
            certsDotsContainer.innerHTML = '';
            const totalCerts = certsContainer.children.length;
            for (let i = 0; i < totalCerts; i++) {
                const dot = document.createElement('div');
                dot.classList.add('cert-dot');
                dot.dataset.index = i;
                certsDotsContainer.appendChild(dot);
            }
        }

        function updateActiveDot() {
            if (!certsContainer || !certsDotsContainer) return;
            const certs = Array.from(certsContainer.children);
            const dots = Array.from(certsDotsContainer.children);
            const containerScrollLeft = certsContainer.scrollLeft;
            
            dots.forEach(d => d.classList.remove('active'));

            certs.forEach((cert, index) => {
                const certPosition = cert.offsetLeft;
                const certWidth = cert.offsetWidth;
                
                if (certPosition <= containerScrollLeft + certsContainer.offsetWidth / 2 && certPosition + certWidth >= containerScrollLeft + certsContainer.offsetWidth / 2) {
                    dots[index].classList.add('active');
                }
            });
        }

        if (certsContainer && certsDotsContainer) {
            generateDots();
            updateActiveDot();
            certsContainer.addEventListener('scroll', updateActiveDot);

            scrollLeftBtn.addEventListener('click', () => {
                certsContainer.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
            });
            scrollRightBtn.addEventListener('click', () => {
                certsContainer.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            });

            certsDotsContainer.addEventListener('click', (e) => {
                if (e.target.classList.contains('cert-dot')) {
                    const dotIndex = e.target.dataset.index;
                    const certElement = certsContainer.children[dotIndex];
                    if (certElement) {
                        certsContainer.scrollTo({
                            left: certElement.offsetLeft,
                            behavior: 'smooth'
                        });
                    }
                }
            });
        }

        
        // This is the extra Nav Link Highlighting code you had. It is now properly integrated.
        document.addEventListener("DOMContentLoaded", function() {
            const sections = document.querySelectorAll('section[id]');
            const navLinks = document.querySelectorAll('nav a');
            const portfolioGroup = ['portfolio', 'reviews', 'counter'];

            window.addEventListener('scroll', () => {
                let current = '';
                sections.forEach(section => {
                    const sectionTop = section.offsetTop;
                    if (window.scrollY >= sectionTop - 100) {
                        current = section.getAttribute('id');
                    }
                });

                navLinks.forEach(link => {
                    link.classList.remove('active');
                    const linkHref = link.getAttribute('href');

                    if (portfolioGroup.includes(current)) {
                        if (linkHref.includes('portfolio')) {
                            link.classList.add('active');
                        }
                    } else if (linkHref.includes(current)) {
                        link.classList.add('active');
                    }
                });
            });
        });
// Preloader: Hides the preloader overlay when the page is fully loaded.
window.addEventListener("load", () => {
    document.getElementById("preloader").style.display = "none";
});

// GSAP Animations
// Animate hero section elements on page load.
gsap.from(".hero-text h1", {opacity: 0, y: -50, duration: 1});
gsap.from(".hero-text p", {opacity: 0, y: 50, duration: 1, delay: 0.5});
gsap.from(".hero-text .btn", {opacity: 0, scale: 0.8, duration: 1, delay: 1});

// Animate skill progress bars when they come into view.
document.addEventListener("DOMContentLoaded", () => {
    const skillBars = document.querySelectorAll(".progress-bar");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const level = bar.getAttribute("data-skill-level");
                gsap.to(bar, {
                    width: level,
                    duration: 1.5,
                    ease: "power2.out"
                });
                observer.unobserve(bar);
            }
        });
    }, { threshold: 0.5 });

    skillBars.forEach(bar => observer.observe(bar));

    // Service box hover animation.
    const serviceBoxes = document.querySelectorAll(".service-box");
    serviceBoxes.forEach((box) => {
        box.addEventListener("mouseenter", () => {
            gsap.to(box, { scale: 1.05, duration: 0.3, ease: "power1.out" });
        });
        box.addEventListener("mouseleave", () => {
            gsap.to(box, { scale: 1, duration: 0.3, ease: "power1.out" });
        });
    });
});

// Counter Animation for achievements section
document.addEventListener("DOMContentLoaded", function() {
    const counters = document.querySelectorAll('.counter');
    let started = false;

    function startCounting() {
        if (!started) {
            counters.forEach(counter => {
                const target = +counter.getAttribute("data-target");
                const countUp = new CountUp(counter, target, { duration: 2 });
                if (!countUp.error) {
                    countUp.start();
                }
            });
            started = true;
        }
    }

    window.addEventListener("scroll", function() {
        const section = document.querySelector("#counter");
        if (section) {
            const sectionTop = section.getBoundingClientRect().top;
            const screenPos = window.innerHeight / 1.2;
            if (sectionTop < screenPos) {
                startCounting();
            }
        }
    });
});

// AOS (Animate on Scroll) Initialization
AOS.init({
    once: true,
    offset: 120,
    duration: 1000,
    easing: 'ease-in-out'
});

// Certificate Slider
const certContainer = document.querySelector('.certificates-container');
const scrollLeftBtn = document.getElementById('cert-scroll-left');
const scrollRightBtn = document.getElementById('cert-scroll-right');
const dotsContainer = document.querySelector('.cert-dots');
const scrollStep = 300;

// Scroll Buttons
if (scrollLeftBtn && scrollRightBtn && certContainer) {
    scrollLeftBtn.addEventListener('click', () => {
        certContainer.scrollBy({ left: -scrollStep, behavior: 'smooth' });
    });
    scrollRightBtn.addEventListener('click', () => {
        certContainer.scrollBy({ left: scrollStep, behavior: 'smooth' });
    });
}

// Dots Navigation (Dynamic)
function updateDots() {
    if (!certContainer || !dotsContainer) return;
    const containerWidth = certContainer.scrollWidth;
    const viewWidth = certContainer.clientWidth;
    const dotsCount = Math.ceil(containerWidth / viewWidth);
    dotsContainer.innerHTML = '';

    for (let i = 0; i < dotsCount; i++) {
        const dot = document.createElement('span');
        dot.classList.add('dot');
        if (i === 0) dot.classList.add('active');
        dot.addEventListener('click', () => {
            certContainer.scrollTo({ left: i * viewWidth, behavior: 'smooth' });
            document.querySelectorAll('.dot').forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
        });
        dotsContainer.appendChild(dot);
    }
}
updateDots();

// Active Dot on Scroll
if (certContainer) {
    certContainer.addEventListener('scroll', () => {
        const viewWidth = certContainer.clientWidth;
        const index = Math.round(certContainer.scrollLeft / viewWidth);
        document.querySelectorAll('.dot').forEach((d, i) => {
            d.classList.toggle('active', i === index);
        });
    });
}

// Contact Form Validation & Submit Animation
document.getElementById("contact-form").addEventListener("submit", function(e) {
    const name = document.querySelector('input[name="name"]').value.trim();
    const email = document.querySelector('input[name="email"]').value.trim();
    const message = document.querySelector('textarea[name="message"]').value.trim();
    const btn = document.querySelector('button[type="submit"]');

    // Basic Validation
    if (!name || !email || !message) {
        alert("Please fill out all fields!");
        e.preventDefault();
        return;
    }

    // Email Validation
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
        alert("Please enter a valid email address!");
        e.preventDefault();
        return;
    }

    // Button Loading Animation
    btn.innerHTML = "Sending...";
    btn.disabled = true;
});

// Typing Effect for Hero Section
const typing = document.querySelector(".typing-text");
const textArray = ["Lead Generation Expert", "Freelancer", "Sourcing Expert", "List Building Specialist"];
let textIndex = 0, charIndex = 0;

function typeText() {
    if (charIndex < textArray[textIndex].length) {
        typing.textContent += textArray[textIndex].charAt(charIndex);
        charIndex++;
        setTimeout(typeText, 100);
    } else {
        setTimeout(eraseText, 1500);
    }
}

function eraseText() {
    if (charIndex > 0) {
        typing.textContent = textArray[textIndex].substring(0, charIndex - 1);
        charIndex--;
        setTimeout(eraseText, 50);
    } else {
        textIndex = (textIndex + 1) % textArray.length;
        setTimeout(typeText, 500);
    }
}

document.addEventListener("DOMContentLoaded", () => {
    typeText();
});
