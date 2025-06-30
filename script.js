// script.js

document.addEventListener('DOMContentLoaded', () => {
    console.log("Whistle Podu! CSK fan blog loaded.");

    // Smooth scrolling for navigation links
    document.querySelectorAll('.nav-menu a').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Optional: Add a subtle animation to stat numbers when they come into view
    const statNumbers = document.querySelectorAll('.stat-number');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.5 // trigger when 50% of the item is visible
    };

    const statObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const numberElement = entry.target;
                const targetNumber = parseInt(numberElement.textContent);
                let currentNumber = 0;
                const duration = 1500; // milliseconds
                const stepTime = 20; // milliseconds

                const interval = setInterval(() => {
                    currentNumber += Math.ceil(targetNumber / (duration / stepTime));
                    if (currentNumber >= targetNumber) {
                        numberElement.textContent = targetNumber;
                        clearInterval(interval);
                    } else {
                        numberElement.textContent = currentNumber;
                    }
                }, stepTime);

                observer.unobserve(numberElement); // Stop observing once animated
            }
        });
    }, observerOptions);

    statNumbers.forEach(number => {
        statObserver.observe(number);
    });

    // Handle newsletter form submission (basic example)
    const newsletterForm = document.querySelector('.newsletter-form');
    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            const emailInput = this.querySelector('input[type="email"]');
            const email = emailInput.value;

            if (email) {
                alert(Thank you for subscribing, ${email}! You're now part of the Yellow Army!);
                emailInput.value = ''; // Clear the input field
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    // Optional: Add a subtle header shrink/expand on scroll
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.padding = '0.7rem 0';
            navbar.style.borderBottom = '1px solid var(--csk-yellow)';
        } else {
            navbar.style.padding = '1rem 0';
            navbar.style.borderBottom = '2px solid var(--csk-yellow)';
        }
    });

});
