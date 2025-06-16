document.addEventListener('DOMContentLoaded', () => {

    // --- HAMBURGER MENU LOGIC ---
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    // Also grab the theme toggle to ensure it works correctly inside the mobile menu
    const themeToggle = document.getElementById('theme-toggle'); 

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            // This toggles the 'X' icon for the hamburger
            hamburger.classList.toggle('active');
            // This toggles the visibility of the mobile menu
            navMenu.classList.toggle('active');
        });
    }

    // Function to close the mobile menu
    const closeMenu = () => {
        if (hamburger && navMenu) {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    };

    // Close menu when a standard navigation link is clicked
    navLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Also close the menu if the theme toggle button is clicked inside it
    if (themeToggle) {
        themeToggle.addEventListener('click', closeMenu);
    }

    // --- THEME TOGGLE LOGIC ---
    // We already have themeToggle from above
    const body = document.body;

    // Apply the cached theme on load
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
        body.classList.add('dark-theme');
    }

    if (themeToggle) {
        // This event listener is separate from the menu closing logic
        themeToggle.addEventListener('click', (event) => {
            // We stop this click from bubbling up to avoid any conflicts
            event.stopPropagation(); 
            
            body.classList.toggle('dark-theme');
            
            // Save the user's preference
            if (body.classList.contains('dark-theme')) {
                localStorage.setItem('theme', 'dark');
            } else {
                localStorage.setItem('theme', 'light');
            }
        });
    }


    // --- TYPEWRITER EFFECT ---
    const typingText = document.getElementById('typing-text');
    const words = ["Computational Biologist", "Data Scientist", "Bioinformatician", "Researcher"];
    let wordIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function type() {
        const currentWord = words[wordIndex];
        
        if (isDeleting) {
            charIndex--; // Deleting
        } else {
            charIndex++; // Typing
        }

        if (typingText) {
            typingText.textContent = currentWord.substring(0, charIndex);
        }

        let typeSpeed = isDeleting ? 100 : 200;

        if (!isDeleting && charIndex === currentWord.length) {
            typeSpeed = 2000; // Pause at end of word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false; // Finished deleting
            wordIndex = (wordIndex + 1) % words.length;
            typeSpeed = 500;
        }

        setTimeout(type, typeSpeed);
    }

    if (typingText) {
        type();
    }


    // --- ACTIVE NAVIGATION LINK HIGHLIGHTER ---
    const currentPagePath = window.location.pathname;
    const allNavLinks = document.querySelectorAll('.nav-menu a.nav-link');

    allNavLinks.forEach(link => {
        if (link.pathname === currentPagePath) {
            link.classList.add('active');
        }
    });

    // Special case for the homepage to ensure 'Home' is highlighted
    if (currentPagePath === '/zw/' || currentPagePath === '/zw/index.html') {
        const homeLink = document.querySelector('a.nav-link[href="/zw/"]');
        if (homeLink) {
            homeLink.classList.add('active');
        }
    }


    // --- FADE-IN ON SCROLL ANIMATION ---
    const faders = document.querySelectorAll('.fade-in');
    const appearOptions = {
        threshold: 0.2,
        rootMargin: "0px 0px -50px 0px"
    };

    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.style.animation = `fadeInAnimation 0.8s ease-out forwards`;
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, appearOptions);

    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });


    // --- DYNAMIC YEAR IN FOOTER ---
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }

});