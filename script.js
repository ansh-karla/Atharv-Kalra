/* =========================================================
   QUANTUM WEB — PORTFOLIO JAVASCRIPT
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       ELEMENTS
       ===================================================== */

    const navbar = document.querySelector(".navbar");
    const mobileMenuButton = document.querySelector(".mobile-menu-button");
    const navLinks = document.querySelector(".nav-links");

    /* =====================================================
       NAVBAR SCROLL EFFECT
       ===================================================== */

    const handleNavbarScroll = () => {

        if (!navbar) return;

        if (window.scrollY > 40) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    };

    window.addEventListener("scroll", handleNavbarScroll);
    handleNavbarScroll();


    /* =====================================================
       MOBILE MENU
       ===================================================== */

    if (mobileMenuButton && navLinks) {

        mobileMenuButton.addEventListener("click", () => {

            navLinks.classList.toggle("mobile-open");
            mobileMenuButton.classList.toggle("active");

        });


        /* Close menu after clicking a link */

        const links = navLinks.querySelectorAll("a");

        links.forEach(link => {

            link.addEventListener("click", () => {

                navLinks.classList.remove("mobile-open");
                mobileMenuButton.classList.remove("active");

            });

        });

    }


    /* =====================================================
       SMOOTH SCROLL
       ===================================================== */

    document.querySelectorAll('a[href^="#"]').forEach(link => {

        link.addEventListener("click", function (event) {

            const targetId = this.getAttribute("href");

            if (!targetId || targetId === "#") return;

            const target = document.querySelector(targetId);

            if (!target) return;

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       SCROLL REVEAL
       ===================================================== */

    const revealElements = document.querySelectorAll(
        ".reveal, .project-card, .service-card, .about-content, .stat-card"
    );

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add("revealed");

                        observer.unobserve(entry.target);

                    }

                });

            },
            {
                threshold: 0.12,
                rootMargin: "0px 0px -50px 0px"
            }
        );


        revealElements.forEach(element => {

            element.classList.add("reveal");

            revealObserver.observe(element);

        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("revealed");
        });

    }


    /* =====================================================
       STAGGER PROJECT CARDS
       ===================================================== */

    const projectCards = document.querySelectorAll(".project-card");

    projectCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 80}ms`;

    });


    /* =====================================================
       STAGGER SERVICE CARDS
       ===================================================== */

    const serviceCards = document.querySelectorAll(".service-card");

    serviceCards.forEach((card, index) => {

        card.style.transitionDelay = `${index * 70}ms`;

    });


    /* =====================================================
       ACTIVE NAVIGATION
       ===================================================== */

    const sections = document.querySelectorAll("section[id]");
    const navigationLinks = document.querySelectorAll(
        '.nav-links a[href^="#"]'
    );

    const updateActiveNavigation = () => {

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop = section.offsetTop - 160;
            const sectionHeight = section.offsetHeight;

            if (
                window.scrollY >= sectionTop &&
                window.scrollY < sectionTop + sectionHeight
            ) {

                currentSection = section.getAttribute("id");

            }

        });


        navigationLinks.forEach(link => {

            link.classList.remove("active");

            const href = link.getAttribute("href");

            if (href === `#${currentSection}`) {
                link.classList.add("active");
            }

        });

    };

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );

    updateActiveNavigation();


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.scrollY > 500) {
                    backToTop.classList.add("show");
                } else {
                    backToTop.classList.remove("show");
                }

            },
            { passive: true }
        );


        backToTop.addEventListener("click", () => {

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       PROJECT LINKS
       ===================================================== */

    const projectButtons = document.querySelectorAll(
        ".project-link, .project-card a[data-project]"
    );

    projectButtons.forEach(button => {

        button.addEventListener("click", event => {

            const url = button.dataset.project;

            if (url) {

                event.preventDefault();

                window.open(
                    url,
                    "_blank",
                    "noopener,noreferrer"
                );

            }

        });

    });


    /* =====================================================
       IMAGE LAZY LOADING
       ===================================================== */

    const images = document.querySelectorAll("img");

    images.forEach(image => {

        image.setAttribute("loading", "lazy");

        image.addEventListener("error", () => {

            image.classList.add("image-error");

        });

    });


    /* =====================================================
       PREMIUM BUTTON RIPPLE
       ===================================================== */

    const buttons = document.querySelectorAll(
        ".btn, .auth-button, .project-link"
    );

    buttons.forEach(button => {

        button.addEventListener("click", function (event) {

            const ripple = document.createElement("span");

            ripple.classList.add("button-ripple");

            const rect = this.getBoundingClientRect();

            const size = Math.max(
                rect.width,
                rect.height
            );

            ripple.style.width = `${size}px`;
            ripple.style.height = `${size}px`;

            ripple.style.left =
                `${event.clientX - rect.left - size / 2}px`;

            ripple.style.top =
                `${event.clientY - rect.top - size / 2}px`;

            this.appendChild(ripple);

            setTimeout(() => {
                ripple.remove();
            }, 650);

        });

    });


    /* =====================================================
       CURSOR GLOW
       ===================================================== */

    const cursorGlow = document.querySelector(".cursor-glow");

    if (
        cursorGlow &&
        window.matchMedia("(pointer: fine)").matches
    ) {

        window.addEventListener(
            "mousemove",
            event => {

                cursorGlow.style.transform =
                    `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;

            },
            { passive: true }
        );

    }


    /* =====================================================
       PROJECT CARD 3D TILT
       ===================================================== */

    if (window.matchMedia("(pointer: fine)").matches) {

        const tiltCards = document.querySelectorAll(
            ".project-card, .service-card"
        );

        tiltCards.forEach(card => {

            card.addEventListener("mousemove", event => {

                const rect = card.getBoundingClientRect();

                const x =
                    event.clientX - rect.left;

                const y =
                    event.clientY - rect.top;

                const centerX =
                    rect.width / 2;

                const centerY =
                    rect.height / 2;

                const rotateX =
                    ((y - centerY) / centerY) * -3;

                const rotateY =
                    ((x - centerX) / centerX) * 3;

                card.style.transform =
                    `perspective(900px)
                     rotateX(${rotateX}deg)
                     rotateY(${rotateY}deg)
                     translateY(-6px)`;

            });


            card.addEventListener("mouseleave", () => {

                card.style.transform = "";

            });

        });

    }


    /* =====================================================
       NUMBER COUNTER
       ===================================================== */

    const counters = document.querySelectorAll(
        "[data-count]"
    );

    const animateCounter = counter => {

        const target =
            Number(counter.dataset.count);

        const duration = 1500;

        const startTime = performance.now();

        const update = currentTime => {

            const elapsed =
                currentTime - startTime;

            const progress =
                Math.min(elapsed / duration, 1);

            const eased =
                1 - Math.pow(1 - progress, 3);

            counter.textContent =
                Math.floor(target * eased);

            if (progress < 1) {

                requestAnimationFrame(update);

            } else {

                counter.textContent = target;

            }

        };

        requestAnimationFrame(update);

    };


    if ("IntersectionObserver" in window) {

        const counterObserver =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (entry.isIntersecting) {

                            animateCounter(entry.target);

                            counterObserver.unobserve(
                                entry.target
                            );

                        }

                    });

                },
                {
                    threshold: 0.7
                }
            );


        counters.forEach(counter => {

            counterObserver.observe(counter);

        });

    }


    /* =====================================================
       CONTACT FORM
       ===================================================== */

    const contactForm =
        document.querySelector(".contact-form");

    if (contactForm) {

        contactForm.addEventListener("submit", event => {

            event.preventDefault();

            const submitButton =
                contactForm.querySelector(
                    'button[type="submit"]'
                );

            if (!submitButton) return;

            const originalText =
                submitButton.textContent;

            submitButton.disabled = true;

            submitButton.textContent =
                "Sending...";


            /*
              Frontend-only portfolio form.

              Later we can connect this to:
              - Formspree
              - EmailJS
              - Netlify Forms
              - Your own backend
            */

            setTimeout(() => {

                submitButton.textContent =
                    "Message Sent ✓";

                contactForm.reset();

                setTimeout(() => {

                    submitButton.disabled = false;

                    submitButton.textContent =
                        originalText;

                }, 1800);

            }, 900);

        });

    }


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    const yearElements =
        document.querySelectorAll("[data-year]");

    yearElements.forEach(element => {

        element.textContent =
            new Date().getFullYear();

    });


    /* =====================================================
       ESC KEY — CLOSE MOBILE MENU
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {

            if (navLinks) {
                navLinks.classList.remove(
                    "mobile-open"
                );
            }

            if (mobileMenuButton) {
                mobileMenuButton.classList.remove(
                    "active"
                );
            }

        }

    });


    /* =====================================================
       PAGE LOADED
       ===================================================== */

    document.body.classList.add("page-loaded");

});