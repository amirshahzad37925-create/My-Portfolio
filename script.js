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

