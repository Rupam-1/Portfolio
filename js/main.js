document.addEventListener('DOMContentLoaded', function() {
    'use strict';
    
    // ===== Navbar =====
    const navbar = document.querySelector('.navbar');
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Toggle mobile menu
    if (navToggle) {
        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a nav link
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });
    
    // Add scrolled class to navbar on scroll
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
    // ===== Smooth Scrolling =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // ===== Active Navigation Link on Scroll =====
    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPosition = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.add('active');
            } else {
                document.querySelector(`.nav-link[href="#${sectionId}"]`).classList.remove('active');
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNavLink);
    
    // ===== Back to Top Button =====
    const backToTopBtn = document.querySelector('.back-to-top');
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });
    
    // ===== Initialize Progress Bars =====
    function initProgressBars() {
        const skillProgressBars = document.querySelectorAll('.progress');
        
        skillProgressBars.forEach(progressBar => {
            const width = progressBar.style.width;
            progressBar.style.width = '0';
            
            setTimeout(() => {
                progressBar.style.width = width;
            }, 300);
        });
    }
    
    // ===== Initialize Skill Tags Animation =====
    function animateSkillTags() {
        const skillTags = document.querySelectorAll('.skill-tag');
        
        skillTags.forEach((tag, index) => {
            tag.style.opacity = '0';
            tag.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                tag.style.transition = 'all 0.5s ease';
                tag.style.opacity = '1';
                tag.style.transform = 'translateY(0)';
            }, 100 + (index * 50));
        });
    }
    
    // ===== Contact Form Submission =====
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Simple form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For this demo, we'll just show a success message
            alert(`Thank you, ${name}! Your message has been sent. I'll get back to you soon.`);
            contactForm.reset();
        });
    }
    
    // ===== External Links =====
    document.querySelectorAll('a[href^="http"]').forEach(link => {
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
    
    // ===== Scroll Reveal Animation =====
    function revealOnScroll() {
        const revealElements = document.querySelectorAll('.skill-category-wrapper, .project-card, .timeline-item, .education-card, .cert-item, .contact-info-item');
        
        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementVisible = 150;
            
            if (elementTop < window.innerHeight - elementVisible) {
                element.classList.add('visible');
            }
        });
    }
    
    // Add CSS for scroll reveal animation
    const styleElement = document.createElement('style');
    styleElement.textContent = `
        .skill-category-wrapper, .project-card, .timeline-item, .education-card, .cert-item, .contact-info-item {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .skill-category-wrapper.visible, .project-card.visible, .timeline-item.visible, .education-card.visible, .cert-item.visible, .contact-info-item.visible {
            opacity: 1;
            transform: translateY(0);
        }
    `;
    document.head.appendChild(styleElement);
    
    // Add print functionality
    const addPrintButton = () => {
        const printBtn = document.createElement('button');
        printBtn.innerText = 'Print Resume';
        printBtn.classList.add('print-button');
        printBtn.addEventListener('click', () => {
            window.print();
        });
        
        document.body.appendChild(printBtn);
        
        // Style for the print button
        const style = document.createElement('style');
        style.textContent = `
            .print-button {
                position: fixed;
                bottom: 20px;
                right: 20px;
                background-color: #2874a6;
                color: white;
                border: none;
                padding: 10px 15px;
                border-radius: 5px;
                cursor: pointer;
                box-shadow: 0 2px 5px rgba(0,0,0,0.2);
                transition: all 0.3s ease;
                z-index: 1000;
            }
            
            .print-button:hover {
                background-color: #1a5276;
                transform: translateY(-3px);
                box-shadow: 0 4px 15px rgba(40, 116, 166, 0.3);
            }
            
            @media print {
                .print-button {
                    display: none;
                }
            }
        `;
        document.head.appendChild(style);
    };
    
    // Initialize all functions
    function init() {
        updateActiveNavLink();
        initProgressBars();
        animateSkillTags();
        revealOnScroll();
        addPrintButton();
        
        // Listen for scroll events for scroll reveal animations
        window.addEventListener('scroll', revealOnScroll);
    }
    
    // Run initialization
    init();
});
