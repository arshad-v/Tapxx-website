// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.querySelector('nav');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll <= 0) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        return;
    }
    
    if (currentScroll > lastScroll) {
        // Scrolling down
        navbar.style.transform = 'translateY(-100%)';
    } else {
        // Scrolling up
        navbar.style.transform = 'translateY(0)';
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
    }
    
    lastScroll = currentScroll;
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData.entries());
    
    // Basic form validation
    if (!data.name || !data.email) {
        alert('Please fill in all required fields');
        return;
    }
    
    // Disable submit button during submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    
    try {
        // Here you would typically send the data to your backend
        // For now, we'll simulate a successful submission
        await new Promise(resolve => setTimeout(resolve, 1500));
        
        // Show success message
        alert('Thank you for your interest! We will contact you soon.');
        contactForm.reset();
    } catch (error) {
        alert('An error occurred. Please try again later.');
    } finally {
        submitButton.disabled = false;
        submitButton.textContent = 'Send Message';
    }
});

// WhatsApp Form Submission
function sendToWhatsApp(event) {
    event.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const product = document.getElementById('product').value;
    const message = document.getElementById('message').value;
    
    // Create WhatsApp message
    let whatsappMessage = `*New Inquiry from TAPXX Website*\n\n`;
    whatsappMessage += `*Name:* ${name}\n`;
    whatsappMessage += `*Phone:* ${phone}\n`;
    whatsappMessage += `*Product:* ${product}\n`;
    if (message) {
        whatsappMessage += `*Message:* ${message}\n`;
    }
    
    // Encode the message for URL
    const encodedMessage = encodeURIComponent(whatsappMessage);
    
    // WhatsApp business link with your number
    const whatsappLink = `https://wa.me/918157964542?text=${encodedMessage}`;
    
    // Open WhatsApp in new tab
    window.open(whatsappLink, '_blank');
    
    // Reset form
    document.getElementById('whatsappForm').reset();
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.2,
    rootMargin: '0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.feature-card, .product-card, .pricing-card, .step').forEach(element => {
    observer.observe(element);
});

// Mobile menu setup
function setupMobileMenu() {
    const menuButton = document.createElement('button');
    menuButton.classList.add('mobile-menu-button');
    menuButton.innerHTML = '<i class="fas fa-bars"></i>';
    
    const nav = document.querySelector('nav .container');
    const navLinks = document.querySelector('.nav-links');
    
    nav.insertBefore(menuButton, navLinks);
    
    menuButton.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        menuButton.innerHTML = navLinks.classList.contains('active') 
            ? '<i class="fas fa-times"></i>' 
            : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!nav.contains(e.target) && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        }
    });

    // Close menu when clicking on a link
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            menuButton.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });
}

// Call setup function when DOM is loaded
document.addEventListener('DOMContentLoaded', setupMobileMenu);
