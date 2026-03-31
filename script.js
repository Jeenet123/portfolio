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
    
    // Apply saved theme or default to dark mode
    if (savedTheme === 'light') {
        document.body.classList.replace('dark-mode', 'light-mode');
        themeIcon.classList.replace('fa-sun', 'fa-moon');
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
    const roles = ['Software Engineer', 'Java Developer', 'Microservices Expert', 'Apache Camel Developer', 'API Integration Specialist'];
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

    /* =========================================
       Particles.js Initialization
       ========================================= */
    if (typeof particlesJS !== 'undefined') {

        // Hero: blue connected network (nodes & lines)
        const heroConfig = {
            "particles": {
                "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": "#3b82f6" },
                "shape": { "type": "circle" },
                "opacity": { "value": 0.5, "random": false },
                "size": { "value": 3, "random": true },
                "line_linked": {
                    "enable": true, "distance": 150,
                    "color": "#3b82f6", "opacity": 0.4, "width": 1
                },
                "move": {
                    "enable": true, "speed": 2, "direction": "none",
                    "random": false, "straight": false, "out_mode": "out", "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "grab" },
                    "onclick": { "enable": true, "mode": "push" },
                    "resize": true
                },
                "modes": {
                    "grab": { "distance": 140, "line_linked": { "opacity": 1 } },
                    "push": { "particles_nb": 4 }
                }
            },
            "retina_detect": true
        };

        // Skills: blue & black bubble particles — glowing circles, no lines, bubble hover
        const skillsConfig = {
            "particles": {
                "number": { "value": 70, "density": { "enable": true, "value_area": 800 } },
                "color": { "value": ["#3b82f6", "#1e3a5f", "#60a5fa"] },
                "shape": { "type": "circle" },
                "opacity": {
                    "value": 0.7, "random": true,
                    "anim": { "enable": true, "speed": 1, "opacity_min": 0.1, "sync": false }
                },
                "size": {
                    "value": 8, "random": true,
                    "anim": { "enable": true, "speed": 2, "size_min": 2, "sync": false }
                },
                "line_linked": { "enable": false },
                "move": {
                    "enable": true, "speed": 1.2, "direction": "none",
                    "random": true, "straight": false, "out_mode": "out", "bounce": false
                }
            },
            "interactivity": {
                "detect_on": "canvas",
                "events": {
                    "onhover": { "enable": true, "mode": "bubble" },
                    "onclick": { "enable": true, "mode": "repulse" },
                    "resize": true
                },
                "modes": {
                    "bubble": { "distance": 200, "size": 20, "duration": 2, "opacity": 1, "speed": 3 },
                    "repulse": { "distance": 180, "duration": 0.4 }
                }
            },
            "retina_detect": true
        };

        if (document.getElementById('particles-js')) {
            particlesJS('particles-js', heroConfig);
        }
        if (document.getElementById('particles-skills')) {
            particlesJS('particles-skills', skillsConfig);
        }
    }

/* =========================================
   Classic Hobby: Dropping Balls Animation
   ========================================= */
const initBallDrop = () => {
    const container = document.getElementById('balls-bg-container');
    if (!container) return;

    const canvas = document.createElement('canvas');
    container.appendChild(canvas);
    const ctx = canvas.getContext('2d');

    let w, h, balls = [];
    const ballCount = 40;

    const resize = () => {
        w = canvas.width = container.offsetWidth;
        h = canvas.height = container.offsetHeight;
    };

    class Ball {
        constructor() {
            this.init();
        }

        init() {
            this.r = Math.random() * 10 + 5;
            this.x = Math.random() * w;
            this.y = -Math.random() * h;
            this.vy = Math.random() * 2 + 1;
            this.vx = (Math.random() - 0.5) * 1;
            this.gravity = 0.15;
            this.friction = 0.8;
            this.opacity = Math.random() * 0.5 + 0.3;
        }

        update() {
            this.vy += this.gravity;
            this.x += this.vx;
            this.y += this.vy;

            if (this.y + this.r > h) {
                this.y = h - this.r;
                this.vy *= -this.friction;
                
                // Add some horizontal dispersion on bounce
                this.vx += (Math.random() - 0.5) * 2;
            }

            if (this.x + this.r > w || this.x - this.r < 0) {
                this.vx *= -1;
            }

            // Reset if out of bounds or stopped
            if (this.y < -h * 2) this.init(); 
        }

        draw() {
            const gradient = ctx.createRadialGradient(
                this.x - this.r * 0.3, this.y - this.r * 0.3, this.r * 0.1,
                this.x, this.y, this.r
            );
            gradient.addColorStop(0, `rgba(255, 255, 255, ${this.opacity + 0.2})`);
            gradient.addColorStop(1, `rgba(200, 200, 200, ${this.opacity})`);

            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            ctx.closePath();
        }
    }

    const createBalls = () => {
        balls = [];
        for (let i = 0; i < ballCount; i++) {
            balls.push(new Ball());
        }
    };

    const animate = () => {
        ctx.clearRect(0, 0, w, h);
        balls.forEach(ball => {
            ball.update();
            ball.draw();
        });
        requestAnimationFrame(animate);
    };

    window.addEventListener('resize', resize);
    resize();
    createBalls();
    animate();
};

initBallDrop();
});
