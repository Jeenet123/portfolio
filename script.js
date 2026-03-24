/**
 * Portfolio Interactive Scripts
 */

document.addEventListener('DOMContentLoaded', () => {
    
    /* =========================================
       Theme Toggle (Dark/Light Mode)
       ========================================= */
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn.querySelector('i');
    
    // Check for saved theme preference in localStorage
    const savedTheme = localStorage.getItem('portfolio-theme');
    
    // Apply saved theme or default to light mode
    if (savedTheme === 'dark') {
        document.body.classList.replace('light-mode', 'dark-mode');
        themeIcon.classList.replace('fa-moon', 'fa-sun');
    }

    themeToggleBtn.addEventListener('click', () => {
        if (document.body.classList.contains('light-mode')) {
            // Switch to Dark Mode
            document.body.classList.replace('light-mode', 'dark-mode');
            themeIcon.classList.replace('fa-moon', 'fa-sun');
            localStorage.setItem('portfolio-theme', 'dark');
        } else {
            // Switch to Light Mode
            document.body.classList.replace('dark-mode', 'light-mode');
            themeIcon.classList.replace('fa-sun', 'fa-moon');
            localStorage.setItem('portfolio-theme', 'light');
        }
    });

    /* =========================================
       Mobile Navigation Menu
       ========================================= */
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const navLinksItems = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
    });

    // Close mobile menu when a link is clicked
    navLinksItems.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navLinks.classList.remove('active');
        });
    });

    /* =========================================
       Sticky Navbar on Scroll
       ========================================= */
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    /* =========================================
       Scroll Animations (Intersection Observer)
       ========================================= */
    const revealElements = document.querySelectorAll('.reveal');
    
    const revealOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -50px 0px"
    };

    const revealOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('active');
                // Optional: Stop observing once revealed
                // observer.unobserve(entry.target);
            }
        });
    }, revealOptions);

    revealElements.forEach(el => {
        revealOnScroll.observe(el);
    });

    /* =========================================
       Active Navigation Link Highlighting
       ========================================= */
    const sections = document.querySelectorAll('section');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            // Add offset for fixed navbar
            if (pageYOffset >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinksItems.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });

    /* =========================================
       Project Filtering
       ========================================= */
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to current button
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    /* =========================================
       Typing Effect for Hero Banner
       ========================================= */
    const typingText = document.querySelector('.typing-text');
    const roles = ['Software Engineer', 'Java Developer', 'Microservices Expert', 'Backend Developer'];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingDelay = 100;

    function typeEffect() {
        const currentRole = roles[roleIndex];
        
        if (isDeleting) {
            typingText.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;
            typingDelay = 50; // Faster when deleting
        } else {
            typingText.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;
            typingDelay = 100; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentRole.length) {
            // Pause at the end of word
            isDeleting = true;
            typingDelay = 1500;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            // Move to next role
            roleIndex = (roleIndex + 1) % roles.length;
            typingDelay = 500; // Pause before typing new word
        }

        setTimeout(typeEffect, typingDelay);
    }

    // Start typing effect
    if(typingText) setTimeout(typeEffect, 1000);

    /* =========================================
       Set Current Year in Footer
       ========================================= */
    document.getElementById('year').textContent = new Date().getFullYear();

    /* =========================================
       Form Submission Prevention
       ========================================= */
    const contactForm = document.getElementById('contact-form');
    if(contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // In a real application, you would send the form data here
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            
            btn.innerHTML = 'Sent Successfully! <i class="fa-solid fa-check"></i>';
            btn.style.backgroundColor = 'var(--clr-secondary)';
            
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        });
    }
});
