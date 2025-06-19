document.addEventListener('DOMContentLoaded', () => {
    // --- Mobile Navigation Toggle ---
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close nav links when a link is clicked (for single-page navigation)
    navLinks.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                hamburger.classList.remove('active');
            }
        });
    });

    // --- Smooth Scrolling for Navigation Links ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // --- Simple Testimonial Carousel ---
    const carousel = document.querySelector('.testimonial-carousel');
    const prevBtn = document.querySelector('.carousel-nav .prev-btn');
    const nextBtn = document.querySelector('.carousel-nav .next-btn');
    const testimonialItems = document.querySelectorAll('.testimonial-item');

    let currentIndex = 0;

    function updateCarousel() {
        // Calculate the scroll position for the current item
        // Each item takes 100% of the carousel width + its margin-right
        const itemWidth = testimonialItems[0].offsetWidth + parseFloat(getComputedStyle(testimonialItems[0]).marginRight);
        carousel.scrollLeft = currentIndex * itemWidth;
    }

    prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex > 0) ? currentIndex - 1 : testimonialItems.length - 1;
        updateCarousel();
    });

    nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex < testimonialItems.length - 1) ? currentIndex + 1 : 0;
        updateCarousel();
    });

    // Optional: Auto-play carousel
    // setInterval(() => {
    //     nextBtn.click();
    // }, 5000); // Change slide every 5 seconds

    // --- Creative Enhancement: Lazy Loading Images and Videos ---
    // This improves performance by only loading media when it's near the viewport.
    const lazyMedia = document.querySelectorAll('img[data-src], video[data-src]');

    const mediaObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const media = entry.target;
                if (media.tagName === 'IMG') {
                    media.src = media.dataset.src;
                } else if (media.tagName === 'VIDEO') {
                    // For videos, setting src alone might not be enough for all browsers.
                    // You might need to load multiple sources or use a more robust lazy load library.
                    // For simplicity, here we'll just set the first source.
                    const source = media.querySelector('source');
                    if (source && source.dataset.src) {
                        source.src = source.dataset.src;
                        media.load(); // Reload the video element to pick up the new source
                    }
                }
                media.removeAttribute('data-src'); // Remove data-src attribute once loaded
                observer.unobserve(media); // Stop observing once loaded
            }
        });
    }, {
        rootMargin: '0px 0px 100px 0px', // Load when 100px before entering viewport
        threshold: 0.01 // Trigger when even a small part is visible
    });

    lazyMedia.forEach(media => {
        mediaObserver.observe(media);
    });

    // To use lazy loading, modify your HTML for images and videos like this:
    // <img data-src="images/your-image.jpg" alt="Description" class="lazy-load">
    // <video controls poster="images/video-poster.jpg" data-src="videos/your-video.mp4" class="lazy-load">
    //     <source data-src="videos/your-video.mp4" type="video/mp4">
    // </video>
    // Note: For background videos or videos that need to play immediately, do NOT lazy load them.
    // The hero background video in the example HTML is not lazy loaded for this reason.

    // --- Creative Enhancement: Scroll-based Animations (Example) ---
    // Fade in sections as they come into view
    const sections = document.querySelectorAll('section');

    const sectionObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px 0px -50px 0px' // Adjust to trigger a bit earlier
    });

    sections.forEach(section => {
        section.style.opacity = 0; // Start invisible
        section.style.transform = 'translateY(20px)'; // Start slightly below
        section.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        sectionObserver.observe(section);
    });
});