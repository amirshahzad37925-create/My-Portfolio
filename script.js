document.addEventListener('DOMContentLoaded', () => {

    // ================= PRELOADER LOGIC =================
    const preloader = document.getElementById('preloader');
    if (preloader) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                preloader.classList.add('fade-out');
            }, 500); // 0.5-second delay before fading out
            setTimeout(() => {
                preloader.style.display = 'none';
            }, 1300); // Wait for the fade-out transition (0.8s) to finish
        });
    }

    // ================= PARTICLES BACKGROUND =================
    // This part runs automatically because the tsParticles.load function is a global function
    // as long as the library is included correctly in the HTML.
    // So, no need to wrap it in a function.
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

    // ================= SCROLL ACTIVE LINK & SMOOTH SCROLL =================
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav a");
    const portfolioGroup = ['portfolio', 'reviews', 'counter', 'certifications'];

    function setActiveNavLink() {
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                currentSectionId = section.getAttribute("id");
            }
        });

        navLinks.forEach(link => {
            link.classList.remove("active");
            const linkHref = link.getAttribute("href").substring(1);

            if (portfolioGroup.includes(currentSectionId) && linkHref === 'portfolio') {
                link.classList.add('active');
            } else if (linkHref === currentSectionId) {
                link.classList.add("active");
            }
        });
    }

    // Attach event listeners
    window.addEventListener("scroll", setActiveNavLink);
    window.addEventListener("load", setActiveNavLink); // Call on load too

    navLinks.forEach(link => {
        link.addEventListener("click", e => {
            e.preventDefault();
            const id = link.getAttribute("href");
            const target = document.querySelector(id);
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
                // Optional: Update URL without reloading
                history.pushState(null, null, id);
            }
        });
    });

    // ================= TYPING TEXT =================
    const texts = ["Lead Generation Specialist", "Outreach Expert", "Marketing Expert", "SEO Specialist"];
    let count = 0;
    let index = 0;
    let isDeleting = false;
    const typingEl = document.querySelector(".typing-text");

    function typeText() {
        if (!typingEl) return;
        const currentText = texts[count];
        const currentString = currentText.substring(0, index);
        
        typingEl.textContent = currentString;
        typingEl.classList.add('cursor');

        if (!isDeleting && index < currentText.length) {
            // Typing
            index++;
            setTimeout(typeText, 100);
        } else if (isDeleting && index > 0) {
            // Deleting
            index--;
            setTimeout(typeText, 50);
        } else {
            // End of typing or deleting cycle
            isDeleting = !isDeleting;
            typingEl.classList.remove('cursor');
            count = isDeleting ? count : (count + 1) % texts.length;
            setTimeout(typeText, 1000);
        }
    }

    if (typingEl) {
        typeText();
    }

    // ================= INTERSECTION OBSERVER FOR SECTIONS =================
    // A single observer to handle all scroll-based animations
    const observer = new IntersectionObserver((entries, obs) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.id === 'counter') {
                    startCounterAnimation();
                }
                if (entry.target.id === 'reviews') {
                    startReviewsSlider();
                }
                if (entry.target.id === 'certifications') {
                    setupCertificationsSlider();
                }
                obs.unobserve(entry.target); // Stop observing after activation
            }
        });
    }, { threshold: 0.4 }); // Trigger when 40% of the section is visible

    // Observe the specific sections
    const counterSection = document.querySelector("#counter");
    const reviewsSection = document.querySelector('.reviews');
    const certificationsSection = document.querySelector('.certifications');

    if (counterSection) observer.observe(counterSection);
    if (reviewsSection) observer.observe(reviewsSection);
    if (certificationsSection) observer.observe(certificationsSection);

    // ================= COUNTER ANIMATION =================
    function startCounterAnimation() {
        const counters = document.querySelectorAll(".counter-box h3");
        const speed = 200;

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute("data-target");
                const currentCount = +counter.innerText;
                const increment = target / speed;

                if (currentCount < target) {
                    counter.innerText = Math.ceil(currentCount + increment);
                    setTimeout(updateCount, 1);
                } else {
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    }

    // ================= REVIEWS SLIDER =================
    let currentReview = 0;
    const reviews = document.querySelectorAll(".review");
    const reviewsDotsContainer = document.querySelector('.review-dots');
    let sliderInterval;

    const showReview = (i) => {
        reviews.forEach((r, idx) => {
            const isActive = idx === i;
            r.classList.toggle("active", isActive);
        });

        const dots = document.querySelectorAll('.review-dot');
        if (dots.length > 0) {
            dots.forEach((d, idx) => d.classList.toggle('active', idx === i));
        }
    };

    const startReviewsSlider = () => {
        if (!reviews.length) return;
        reviewsDotsContainer.innerHTML = ''; // Clear previous dots
        reviews.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('review-dot');
            dot.addEventListener('click', () => {
                showReview(index);
                stopSlider();
            });
            reviewsDotsContainer.appendChild(dot);
        });

        // Set up the interval for auto-sliding
        stopSlider(); // Clear any existing interval first
        sliderInterval = setInterval(() => {
            currentReview = (currentReview + 1) % reviews.length;
            showReview(currentReview);
        }, 5000); // Slide every 5 seconds
        
        // Initial state
        showReview(currentReview);
    };

    const stopSlider = () => {
        clearInterval(sliderInterval);
    };

    // ================= CERTIFICATE SCROLLING =================
    const certContainer = document.querySelector('.certificates-container');
    const scrollLeftBtn = document.getElementById('cert-scroll-left');
    const scrollRightBtn = document.getElementById('cert-scroll-right');
    const certsDotsContainer = document.querySelector('.cert-dots');

    const updateCertDots = () => {
        if (!certsDotsContainer || !certContainer) return;
        const certs = Array.from(certContainer.children);
        const dots = Array.from(certsDotsContainer.children);
        
        const scrollPosition = certContainer.scrollLeft;
        const certWidth = certs[0].offsetWidth + 20; // 20px is the gap

        const activeIndex = Math.floor(scrollPosition / certWidth + 0.5);
        
        dots.forEach((dot, index) => dot.classList.toggle('active', index === activeIndex));
    };

    const setupCertificationsSlider = () => {
        if (!certContainer) return;
        
        // Generate dots dynamically
        if (certsDotsContainer) {
            certsDotsContainer.innerHTML = '';
            Array.from(certContainer.children).forEach((_, index) => {
                const dot = document.createElement('div');
                dot.classList.add('cert-dot');
                dot.dataset.index = index;
                dot.addEventListener('click', () => {
                    const certElement = certContainer.children[index];
                    certContainer.scrollTo({
                        left: certElement.offsetLeft,
                        behavior: 'smooth'
                    });
                });
                certsDotsContainer.appendChild(dot);
            });
        }
        
        // Initial update of buttons and dots
        const checkScroll = () => {
            if (scrollLeftBtn) scrollLeftBtn.disabled = certContainer.scrollLeft <= 0;
            if (scrollRightBtn) scrollRightBtn.disabled = certContainer.scrollLeft + certContainer.clientWidth >= certContainer.scrollWidth - 1;
            updateCertDots();
        };

        // Attach event listeners for buttons and scrolling
        if (scrollLeftBtn) {
            scrollLeftBtn.addEventListener('click', () => {
                certContainer.scrollBy({ left: -300, behavior: 'smooth' });
            });
        }
        if (scrollRightBtn) {
            scrollRightBtn.addEventListener('click', () => {
                certContainer.scrollBy({ left: 300, behavior: 'smooth' });
            });
        }
        
        certContainer.addEventListener('scroll', checkScroll);
        window.addEventListener('resize', checkScroll);
        checkScroll();
    };

});
