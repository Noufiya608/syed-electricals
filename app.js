// PowerTech Electrical Solutions - Interactive JavaScript

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile Navigation Toggle
    initMobileNavigation();
    
    // Smooth Scrolling Navigation
    initSmoothScrolling();
    
    // Active Navigation Highlighting
    initActiveNavigation();
    
    // Fade-in Animations
    initFadeInAnimations();
    
    // Navbar scroll effect
    initNavbarScrollEffect();
    
    // Initialize parallax effect
    initParallaxEffect();
    
    // Initialize image loading
    initImageLoading();
    
    // Initialize accessibility features
    initAccessibility();
});

// Global scroll to section function for buttons
function scrollToSection(sectionId) {
    const targetSection = document.getElementById(sectionId);
    if (targetSection) {
        const navbarHeight = document.getElementById('navbar').offsetHeight || 80;
        const offsetTop = targetSection.offsetTop - navbarHeight;
        
        window.scrollTo({
            top: offsetTop,
            behavior: 'smooth'
        });
        
        // Update active navigation after a short delay to ensure scroll completes
        setTimeout(() => {
            updateActiveNavigation(sectionId);
        }, 300);
    }
}

// Make scrollToSection globally available
window.scrollToSection = scrollToSection;

// Mobile Navigation Toggle
function initMobileNavigation() {
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function(e) {
            e.preventDefault();
            navMenu.classList.toggle('active');
            
            // Animate hamburger menu
            const spans = navToggle.querySelectorAll('span');
            if (navMenu.classList.contains('active')) {
                spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
                spans[1].style.opacity = '0';
                spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
                
                // Add aria-expanded for accessibility
                navToggle.setAttribute('aria-expanded', 'true');
            } else {
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
                
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });

        // Close mobile menu when clicking on nav links
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navToggle.contains(e.target) && !navMenu.contains(e.target) && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                const spans = navToggle.querySelectorAll('span');
                spans[0].style.transform = 'rotate(0) translate(0, 0)';
                spans[1].style.opacity = '1';
                spans[2].style.transform = 'rotate(0) translate(0, 0)';
                navToggle.setAttribute('aria-expanded', 'false');
            }
        });
    }
}

// Smooth Scrolling Navigation
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('.nav-link');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const sectionId = targetId.substring(1); // Remove the #
                scrollToSection(sectionId);
            }
        });
    });
    
    // Also handle footer links
    const footerLinks = document.querySelectorAll('.footer-section a[href^="#"]');
    footerLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const sectionId = targetId.substring(1); // Remove the #
                scrollToSection(sectionId);
            }
        });
    });
}

// Active Navigation Highlighting - Enhanced version
function initActiveNavigation() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    function updateActiveNav() {
        const scrollPos = window.scrollY + 150; // Increased offset for better detection
        let activeSection = null;
        
        // Find the current section
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                activeSection = sectionId;
            }
        });
        
        // Special handling for sections that might be missed
        if (!activeSection && sections.length > 0) {
            // If we're at the very top, make home active
            if (scrollPos < sections[0].offsetTop + 200) {
                activeSection = 'home';
            }
            // If we're at the bottom, make the last section active
            else if (scrollPos + window.innerHeight >= document.documentElement.scrollHeight - 10) {
                activeSection = sections[sections.length - 1].getAttribute('id');
            }
        }
        
        if (activeSection) {
            updateActiveNavigation(activeSection);
        }
    }
    
    // Update on scroll with throttling
    window.addEventListener('scroll', throttle(updateActiveNav, 50));
    
    // Update on load
    setTimeout(updateActiveNav, 100);
}

// Helper function to update active navigation - Enhanced version
function updateActiveNavigation(sectionId) {
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Remove active class from all nav links
    navLinks.forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current section's nav link
    const activeLink = document.querySelector(`.nav-link[href="#${sectionId}"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    // Debug logging to help track navigation highlighting
    console.log(`Active section: ${sectionId}`);
}

// Fade-in Animations
function initFadeInAnimations() {
    const fadeElements = document.querySelectorAll(
        '.service-category, .product-category, .value-prop, .contact-item, .about-text > div, .overview-text > div'
    );
    
    // Add fade-in class to elements
    fadeElements.forEach(element => {
        element.classList.add('fade-in');
    });
    
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -50px 0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    fadeElements.forEach(element => {
        observer.observe(element);
    });
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.getElementById('navbar');
    
    if (navbar) {
        window.addEventListener('scroll', throttle(function() {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add/remove scrolled class based on scroll position
            if (scrollTop > 100) {
                navbar.style.background = 'rgba(30, 58, 138, 0.98)';
                navbar.style.backdropFilter = 'blur(15px)';
                navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(30, 58, 138, 0.95)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        }, 100));
    }
}

// Parallax Effect for Hero Section
function initParallaxEffect() {
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        window.addEventListener('scroll', throttle(function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.3; // Reduced for better performance
            
            if (scrolled < window.innerHeight) { // Only apply when hero is visible
                heroBg.style.transform = `translateY(${rate}px)`;
            }
        }, 16)); // ~60fps
    }
}

// Initialize Image Loading
function initImageLoading() {
    const images = document.querySelectorAll('img');
    
    images.forEach(img => {
        // Set initial state
        img.style.opacity = '0';
        img.style.transition = 'opacity 0.3s ease';
        
        // Create a new image to preload
        const imageLoader = new Image();
        imageLoader.onload = function() {
            img.style.opacity = '1';
        };
        
        imageLoader.onerror = function() {
            img.style.opacity = '0.5';
            img.alt = 'Image failed to load';
            console.warn('Failed to load image:', img.src);
        };
        
        // Start loading
        imageLoader.src = img.src;
        
        // If image is already loaded (cached)
        if (img.complete && img.naturalHeight !== 0) {
            img.style.opacity = '1';
        }
    });
}

// Initialize Accessibility Features
function initAccessibility() {
    // Add keyboard navigation support
    document.addEventListener('keydown', function(e) {
        // Handle escape key to close mobile menu
        if (e.key === 'Escape') {
            const navMenu = document.getElementById('nav-menu');
            const navToggle = document.getElementById('nav-toggle');
            
            if (navMenu && navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                if (navToggle) {
                    const spans = navToggle.querySelectorAll('span');
                    spans[0].style.transform = 'rotate(0) translate(0, 0)';
                    spans[1].style.opacity = '1';
                    spans[2].style.transform = 'rotate(0) translate(0, 0)';
                    navToggle.setAttribute('aria-expanded', 'false');
                }
            }
        }
        
        // Handle arrow keys for navigation (optional enhancement)
        if (e.key === 'ArrowDown' && e.ctrlKey) {
            e.preventDefault();
            scrollToNextSection();
        } else if (e.key === 'ArrowUp' && e.ctrlKey) {
            e.preventDefault();
            scrollToPrevSection();
        }
    });
    
    // Add focus management
    const focusableElements = document.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    focusableElements.forEach(element => {
        element.addEventListener('focus', function() {
            this.style.outline = '2px solid #f97316';
            this.style.outlineOffset = '2px';
        });
        
        element.addEventListener('blur', function() {
            this.style.outline = '';
            this.style.outlineOffset = '';
        });
    });
    
    // Add ARIA labels for better screen reader support
    const navToggle = document.getElementById('nav-toggle');
    if (navToggle) {
        navToggle.setAttribute('aria-label', 'Toggle navigation menu');
        navToggle.setAttribute('aria-expanded', 'false');
    }
}

// Scroll to next section
function scrollToNextSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentScrollPos = window.scrollY + 100;
    
    for (let i = 0; i < sections.length; i++) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (sectionTop > currentScrollPos) {
            scrollToSection(section.id);
            break;
        }
    }
}

// Scroll to previous section
function scrollToPrevSection() {
    const sections = document.querySelectorAll('section[id]');
    const currentScrollPos = window.scrollY + 100;
    
    for (let i = sections.length - 1; i >= 0; i--) {
        const section = sections[i];
        const sectionTop = section.offsetTop;
        
        if (sectionTop < currentScrollPos) {
            scrollToSection(section.id);
            break;
        }
    }
}

// Enhanced button event handling
document.addEventListener('DOMContentLoaded', function() {
    // Handle all buttons with onclick attributes
    const buttons = document.querySelectorAll('button[onclick]');
    buttons.forEach(button => {
        const onclickValue = button.getAttribute('onclick');
        if (onclickValue) {
            button.removeAttribute('onclick'); // Remove inline onclick
            
            button.addEventListener('click', function(e) {
                e.preventDefault();
                
                // Extract function call and execute
                if (onclickValue.includes('scrollToSection')) {
                    const match = onclickValue.match(/scrollToSection\(['"]([^'"]+)['"]\)/);
                    if (match && match[1]) {
                        scrollToSection(match[1]);
                    }
                }
            });
        }
    });
});

// Utility function to throttle scroll events for better performance
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Debounce function for resize events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    // Override scrollToSection for older browsers
    window.scrollToSection = function(sectionId) {
        const targetSection = document.getElementById(sectionId);
        if (targetSection) {
            const navbarHeight = document.getElementById('navbar').offsetHeight || 80;
            const offsetTop = targetSection.offsetTop - navbarHeight;
            smoothScrollTo(offsetTop, 800);
        }
    };
    
    function smoothScrollTo(targetY, duration) {
        const startY = window.scrollY;
        const difference = targetY - startY;
        const startTime = performance.now();
        
        function step() {
            const progress = (performance.now() - startTime) / duration;
            const amount = easeInOutCubic(progress);
            window.scrollTo(0, startY + amount * difference);
            
            if (progress < 0.99) {
                window.requestAnimationFrame(step);
            }
        }
        
        step();
    }
    
    function easeInOutCubic(t) {
        return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
    }
}

// Performance optimization: Intersection Observer for better performance
function initPerformanceOptimizations() {
    // Lazy load non-critical animations
    if ('IntersectionObserver' in window) {
        const lazyElements = document.querySelectorAll('.service-category, .product-category');
        
        const lazyObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.style.transform = 'translateY(0)';
                    entry.target.style.opacity = '1';
                    lazyObserver.unobserve(entry.target);
                }
            });
        }, {
            rootMargin: '50px'
        });
        
        lazyElements.forEach(element => {
            element.style.transform = 'translateY(20px)';
            element.style.opacity = '0';
            element.style.transition = 'all 0.6s ease';
            lazyObserver.observe(element);
        });
    }
}

// Initialize performance optimizations
document.addEventListener('DOMContentLoaded', initPerformanceOptimizations);

// Handle window resize events
window.addEventListener('resize', debounce(function() {
    // Recalculate positions if needed
    const navMenu = document.getElementById('nav-menu');
    if (window.innerWidth > 768 && navMenu && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        const navToggle = document.getElementById('nav-toggle');
        if (navToggle) {
            const spans = navToggle.querySelectorAll('span');
            spans[0].style.transform = 'rotate(0) translate(0, 0)';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'rotate(0) translate(0, 0)';
            navToggle.setAttribute('aria-expanded', 'false');
        }
    }
}, 250));

// Error handling for any JavaScript issues
window.addEventListener('error', function(e) {
    console.error('JavaScript error occurred:', e.error);
    // Graceful degradation - ensure basic functionality still works
});

// Page visibility API for performance optimization
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // Page is hidden, pause non-essential animations
        document.body.style.animationPlayState = 'paused';
    } else {
        // Page is visible, resume animations
        document.body.style.animationPlayState = 'running';
    }
});

// Preload critical images for better performance
function preloadCriticalImages() {
    const criticalImages = [
        'https://pplx-res.cloudinary.com/image/upload/v1753507165/pplx_project_search_images/ffef46dff7736bb39acc261ed5f42f5d8c269945.jpg',
        'https://pplx-res.cloudinary.com/image/upload/v1753171017/pplx_project_search_images/4be637b98334ca1ee981e72c4c7ab360bfe308aa.jpg',
        'https://i0.wp.com/civillane.com/wp-content/uploads/2017/12/Top-5-Modular-Switches-Brand-In-India-2024.jpg?fit=800%2C600&ssl=1'
    ];
    
    criticalImages.forEach(src => {
        const img = new Image();
        img.src = src;
    });
}

// Initialize image preloading when page loads
document.addEventListener('DOMContentLoaded', preloadCriticalImages);

// Add smooth hover effects for interactive elements
document.addEventListener('DOMContentLoaded', function() {
    const hoverElements = document.querySelectorAll('.service-category, .product-category, .value-prop, .contact-item');
    
    hoverElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.3s ease';
        });
    });
});

// Initialize scroll-to-top functionality (optional)
function initScrollToTop() {
    let scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '↑';
    scrollToTopBtn.className = 'scroll-to-top';
    scrollToTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: #f97316;
        color: white;
        border: none;
        font-size: 20px;
        cursor: pointer;
        opacity: 0;
        transition: opacity 0.3s ease;
        z-index: 1000;
    `;
    
    document.body.appendChild(scrollToTopBtn);
    
    window.addEventListener('scroll', throttle(function() {
        if (window.scrollY > 300) {
            scrollToTopBtn.style.opacity = '1';
        } else {
            scrollToTopBtn.style.opacity = '0';
        }
    }, 100));
    
    scrollToTopBtn.addEventListener('click', function() {
        scrollToSection('home');
    });
}

// Initialize scroll to top button
document.addEventListener('DOMContentLoaded', initScrollToTop);

// Analytics and tracking (placeholder for future implementation)
function trackSectionView(sectionId) {
    // This could be used to track which sections users view most
    console.log(`Section viewed: ${sectionId}`);
}

// Enhanced mobile touch support
if ('ontouchstart' in window) {
    document.addEventListener('touchstart', function() {}, {passive: true});
    document.addEventListener('touchmove', function() {}, {passive: true});
}

// Final initialization check
document.addEventListener('DOMContentLoaded', function() {
    console.log('PowerTech Electrical Solutions website loaded successfully');
    
    // Ensure all critical elements are present
    const criticalElements = ['navbar', 'home', 'overview', 'services', 'highlights', 'about', 'contact'];
    criticalElements.forEach(id => {
        if (!document.getElementById(id)) {
            console.warn(`Critical element missing: ${id}`);
        }
    });
    
    // Force an initial navigation update after all elements are loaded
    setTimeout(() => {
        const sections = document.querySelectorAll('section[id]');
        if (sections.length > 0) {
            updateActiveNavigation('home'); // Start with home as active
        }
    }, 500);
});