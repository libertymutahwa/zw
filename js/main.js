document.addEventListener('DOMContentLoaded', () => {

    // --- HAMBURGER MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const themeToggleInMenu = document.getElementById('theme-toggle'); // Renamed to avoid confusion

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    const closeMenu = () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    };

    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    if (themeToggleInMenu) {
        // This listener is only to close the menu when the theme button is clicked inside it
        themeToggleInMenu.addEventListener('click', (event) => {
             // We check if the menu is active before closing.
             // This prevents conflicts if the button is clicked on desktop.
            if (navMenu.classList.contains('active')) {
                closeMenu();
            }
        });
    }


    // --- THEME TOGGLE LOGIC (STANDALONE) ---
    const themeToggleButton = document.getElementById('theme-toggle');
    const body = document.body;

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    if (themeToggleButton) {
        themeToggleButton.addEventListener('click', (event) => {
            event.stopPropagation(); // Prevents click from bubbling up
            body.classList.toggle('dark-theme');
            
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }


    // --- TYPEWRITER EFFECT ---
    const typingText = document.getElementById('typing-text');
    if (typingText) { // Check if the element exists before running
        const words = ["Computational Biologist", "Data Scientist", "Bioinformatician", "Researcher"];
        let wordIndex = 0;
        let charIndex = 0;
        let isDeleting = false;

        function type() {
            const currentWord = words[wordIndex];
            
            if (isDeleting) {
                charIndex--;
            } else {
                charIndex++;
            }

            typingText.textContent = currentWord.substring(0, charIndex);

            let typeSpeed = isDeleting ? 100 : 200;

            if (!isDeleting && charIndex === currentWord.length) {
                typeSpeed = 2000;
                isDeleting = true;
            } else if (isDeleting && charIndex === 0) {
                isDeleting = false;
                wordIndex = (wordIndex + 1) % words.length;
                typeSpeed = 500;
            }

            setTimeout(type, typeSpeed);
        }
        type();
    }


    // --- ACTIVE NAVIGATION LINK HIGHLIGHTER ---
    const currentPagePath = window.location.pathname;
    const allNavLinks = document.querySelectorAll('.nav-menu a.nav-link');

    allNavLinks.forEach(link => {
        // More robust check for active link
        if (link.getAttribute('href') === currentPagePath || link.getAttribute('href') === currentPagePath.replace('index.html', '')) {
            link.classList.add('active');
        }
    });


    // --- ENHANCED FADE-IN ON SCROLL ANIMATION (REPLACES OLD ONE) ---
    const fadeInElements = document.querySelectorAll('.fade-in');

    const observerOptions = {
        root: null, // viewport
        rootMargin: '0px',
        threshold: 0.1 // 10% of the element is visible
    };

    const scrollObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target); // Stop observing once visible
            }
        });
    }, observerOptions);

    fadeInElements.forEach(el => {
        scrollObserver.observe(el);
    });
    

    // --- INTERACTIVE PROJECT FILTERING ---
    const filterContainer = document.querySelector('.project-filters');
    // This 'if' check is crucial: it ensures this code only runs on the projects page
    if (filterContainer) {
        const filterButtons = filterContainer.querySelectorAll('.filter-btn');
        const projectItems = document.querySelectorAll('.project-case-study');

        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                filterButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');

                const filterValue = button.getAttribute('data-filter');

                projectItems.forEach(item => {
                    const itemCategories = item.getAttribute('data-category').split(' ');
                    
                    if (filterValue === 'all' || itemCategories.includes(filterValue)) {
                        item.style.display = 'flex';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }


    // --- DYNAMIC YEAR IN FOOTER ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});
