// ========================================
// COFFEE SHOP LANDING PAGE - JAVASCRIPT
// ========================================

// ============================
// 1. DARK MODE TOGGLE
// ============================

const themeToggle = document.getElementById('theme-toggle');
const htmlElement = document.documentElement;
const body = document.body;

// Initialize theme from localStorage
function initializeTheme() {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
        body.classList.add('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
    } else {
        body.classList.remove('dark-mode');
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }
}

// Toggle between dark and light mode
themeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    
    // Update icon
    if (body.classList.contains('dark-mode')) {
        themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        localStorage.setItem('theme', 'dark');
    } else {
        themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        localStorage.setItem('theme', 'light');
    }
});

// Initialize theme on page load
initializeTheme();

// ============================
// 2. STICKY NAVIGATION
// ============================

const navbar = document.getElementById('navbar');

// Add shadow to navbar when scrolling
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
});

// ============================
// 3. MOBILE MENU TOGGLE
// ============================

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav-link');

// Toggle menu on hamburger click
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Close menu when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ============================
// 4. SMOOTH SCROLLING
// ============================

// Add smooth scroll behavior via CSS and smooth navigation
navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href');
        const targetSection = document.querySelector(targetId);
        
        if (targetSection) {
            // Calculate the offset for sticky navbar
            const navHeight = navbar.offsetHeight;
            const targetPosition = targetSection.offsetTop - navHeight;
            
            // Smooth scroll with animation
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// 5. MENU FILTERING
// ============================

const filterButtons = document.querySelectorAll('.filter-btn');
const menuItems = document.querySelectorAll('.menu-item');

// Add click listeners to filter buttons
filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to clicked button
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        // Filter menu items with animation
        menuItems.forEach(item => {
            const category = item.getAttribute('data-category');
            
            if (filterValue === 'all' || filterValue === category) {
                // Show item with fade-in animation
                item.classList.remove('hidden');
                item.style.animation = 'fadeIn 0.5s ease-in-out';
            } else {
                // Hide item
                item.classList.add('hidden');
            }
        });
    });
});

// ============================
// 6. FORM VALIDATION
// ============================

const contactForm = document.getElementById('contactForm');
const successMessage = document.getElementById('successMessage');

// Validation rules
const validationRules = {
    name: {
        validate: (value) => value.trim().length >= 2,
        message: 'Name must be at least 2 characters'
    },
    email: {
        validate: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
        message: 'Please enter a valid email address'
    },
    phone: {
        validate: (value) => /^[\d+\-\s()]{10,}$/.test(value),
        message: 'Please enter a valid phone number'
    },
    subject: {
        validate: (value) => value.trim().length >= 5,
        message: 'Subject must be at least 5 characters'
    },
    message: {
        validate: (value) => value.trim().length >= 10,
        message: 'Message must be at least 10 characters'
    }
};

// Function to validate a single field
function validateField(fieldName, fieldValue) {
    const rule = validationRules[fieldName];
    const isValid = rule.validate(fieldValue);
    const errorElement = document.getElementById(`${fieldName}Error`);
    const inputElement = document.getElementById(fieldName);
    
    if (!isValid) {
        errorElement.textContent = rule.message;
        errorElement.classList.add('show');
        inputElement.classList.add('invalid');
        return false;
    } else {
        errorElement.textContent = '';
        errorElement.classList.remove('show');
        inputElement.classList.remove('invalid');
        return true;
    }
}

// Real-time validation on input
Object.keys(validationRules).forEach(fieldName => {
    const inputElement = document.getElementById(fieldName);
    if (inputElement) {
        inputElement.addEventListener('blur', (e) => {
            validateField(fieldName, e.target.value);
        });
        
        inputElement.addEventListener('input', (e) => {
            // Remove error styling as user types
            const errorElement = document.getElementById(`${fieldName}Error`);
            if (e.target.value.length > 0) {
                errorElement.classList.remove('show');
                e.target.classList.remove('invalid');
            }
        });
    }
});

// Form submission handler
contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isFormValid = true;
    Object.keys(validationRules).forEach(fieldName => {
        const fieldValue = document.getElementById(fieldName).value;
        if (!validateField(fieldName, fieldValue)) {
            isFormValid = false;
        }
    });
    
    // If form is valid, show success message
    if (isFormValid) {
        // Show success message
        contactForm.style.display = 'none';
        successMessage.style.display = 'flex';
        
        // Reset form after 2 seconds
        setTimeout(() => {
            contactForm.reset();
            contactForm.style.display = 'block';
            successMessage.style.display = 'none';
        }, 2000);
        
        // Log form data (in production, this would send to a server)
        const formData = new FormData(contactForm);
        console.log('Form submitted with data:', Object.fromEntries(formData));
    }
});

// ============================
// 7. SCROLL ANIMATIONS
// ============================

// Intersection Observer for fade-in animations on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation class when element enters viewport
            entry.target.style.opacity = '1';
            entry.target.style.animation = 'fadeInDown 0.6s ease-in-out';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all sections for animation
const sections = document.querySelectorAll('section');
sections.forEach(section => {
    section.style.opacity = '0';
    observer.observe(section);
});

// ============================
// 8. SCROLL TO TOP BUTTON
// ============================

// Create scroll to top button
const scrollTopBtn = document.createElement('button');
scrollTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
scrollTopBtn.id = 'scrollTopBtn';
scrollTopBtn.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background: linear-gradient(135deg, #8B4513, #FF6B35);
    color: white;
    border: none;
    cursor: pointer;
    display: none;
    align-items: center;
    justify-content: center;
    font-size: 1.2rem;
    z-index: 999;
    transition: all 0.3s ease-in-out;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
`;

document.body.appendChild(scrollTopBtn);

// Show/hide scroll to top button based on scroll position
window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
        scrollTopBtn.style.display = 'flex';
    } else {
        scrollTopBtn.style.display = 'none';
    }
});

// Scroll to top on button click
scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Hover effects for scroll top button
scrollTopBtn.addEventListener('mouseenter', () => {
    scrollTopBtn.style.transform = 'translateY(-5px)';
    scrollTopBtn.style.boxShadow = '0 10px 25px rgba(0, 0, 0, 0.3)';
});

scrollTopBtn.addEventListener('mouseleave', () => {
    scrollTopBtn.style.transform = 'translateY(0)';
    scrollTopBtn.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.2)';
});

// ============================
// 9. ACTIVE NAV LINK ON SCROLL
// ============================

window.addEventListener('scroll', () => {
    let current = '';
    
    // Check which section is in view
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    // Update active nav link
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// ============================
// 10. LAZY LOADING IMAGES
// ============================

// Use native lazy loading (works in modern browsers)
const images = document.querySelectorAll('img');
images.forEach(img => {
    // Skip if image already has loading attribute
    if (!img.hasAttribute('loading')) {
        img.setAttribute('loading', 'lazy');
    }
});

// ============================
// 11. PRELOADER (Optional)
// ============================

window.addEventListener('load', () => {
    // Page has fully loaded
    console.log('Page fully loaded');
});

// ============================
// 12. CONSOLE MESSAGES
// ============================

console.log('%c🔥 Welcome to BrewHaven! ☕', 'color: #8B4513; font-size: 20px; font-weight: bold;');
console.log('%cEnjoy browsing our coffee shop!', 'color: #FF6B35; font-size: 14px;');