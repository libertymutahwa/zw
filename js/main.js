/*
* ===================================================================
*                             MAIN JS
*
* This file contains all the JavaScript logic for the site's interactivity.
* ===================================================================
*/

document.addEventListener('DOMContentLoaded', () => {

    /* =================================
       1. MOBILE NAVIGATION TOGGLE
       ================================= */
    const hamburger = document.getElementById("hamburger");
    const navMenu = document.getElementById("nav-menu");

    if (hamburger && navMenu) {
        hamburger.addEventListener("click", () => {
            hamburger.classList.toggle("active");
            navMenu.classList.toggle("active");
            const isExpanded = hamburger.getAttribute('aria-expanded') === 'true';
            hamburger.setAttribute('aria-expanded', !isExpanded);
        });

        document.querySelectorAll(".nav-link").forEach(link => {
            link.addEventListener("click", () => {
                if (hamburger.classList.contains('active')) {
                    hamburger.classList.remove("active");
                    navMenu.classList.remove("active");
                    hamburger.setAttribute('aria-expanded', 'false');
                }
            });
        });
    }


    /* =================================
       2. THEME TOGGLE (LIGHT/DARK MODE)
       ================================= */
    const themeToggle = document.getElementById('theme-toggle');
    const body = document.body;

    if (themeToggle) {
        const applyTheme = () => {
            const savedTheme = localStorage.getItem('theme');
            if (savedTheme === 'dark') {
                body.classList.add('dark-mode');
            } else {
                body.classList.remove('dark-mode');
            }
        };

        const toggleTheme = () => {
            if (body.classList.contains('dark-mode')) {
                body.classList.remove('dark-mode');
                localStorage.setItem('theme', 'light');
            } else {
                body.classList.add('dark-mode');
                localStorage.setItem('theme', 'dark');
            }
        };
        
        themeToggle.addEventListener('click', toggleTheme);
        applyTheme();
    }


    /* =================================
       3. SCROLL-IN ANIMATIONS
       ================================= */
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            }
        });
    }, {
        threshold: 0.1
    });

    const elementsToAnimate = document.querySelectorAll('.fade-in');
    elementsToAnimate.forEach(el => observer.observe(el));


    /* =================================
       4. ACTIVE NAVIGATION LINK ON PAGE LOAD
       ================================= */
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    const currentPath = window.location.pathname.split('/').pop();

    navLinks.forEach(link => {
        const linkPath = link.getAttribute('href');
        if (currentPath === '' || currentPath === 'index.html') {
            if (linkPath === 'index.html') {
                link.classList.add('active');
            }
        } else {
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        }
    });


    /* =================================
       5. AUTOMATIC YEAR IN FOOTER
       ================================= */
    const yearSpan = document.getElementById("year");
    if (yearSpan) {
        const currentYear = new Date().getFullYear();
        yearSpan.textContent = currentYear;
    }


    /* =================================
       6. HERO TYPEWRITER EFFECT (UPDATED)
       ================================= */
    const typingTextElement = document.getElementById('typing-text');
    if (typingTextElement) {
        const phrases = [
            "computational biologist",
            "data scientist",
            "public health advocate",
            "bioinformatician",
            "biotechnologist" // NEWLY ADDED
        ];
        const typeColors = ['#0056b3', '#212529', '#4682b4', '#007bff', '#6c757d'];
        
        let phraseIndex = 0;
        let letterIndex = 0;
        let currentLetters = [];
        const typingSpeed = 100;
        const erasingSpeed = 50;
        const pauseBetweenPhrases = 2000;

        function type() {
            if (letterIndex < phrases[phraseIndex].length) {
                const char = phrases[phraseIndex].charAt(letterIndex);
                const color = typeColors[letterIndex % typeColors.length];
                currentLetters.push(`<span style="color: ${color}">${char}</span>`);
                typingTextElement.innerHTML = currentLetters.join('');
                
                letterIndex++;
                setTimeout(type, typingSpeed);
            } else {
                setTimeout(erase, pauseBetweenPhrases);
            }
        }

        function erase() {
            if (letterIndex > 0) {
                currentLetters.pop();
                typingTextElement.innerHTML = currentLetters.join('');
                
                letterIndex--;
                setTimeout(erase, erasingSpeed);
            } else {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                setTimeout(type, typingSpeed + 500);
            }
        }
        
        setTimeout(type, 1000);
    }

    
    /* =================================
       7. ARTISTIC NAME STYLING
       ================================= */
    const artisticNameElement = document.getElementById('artistic-name');
    if (artisticNameElement) {
        const colors = [
            '#0056b3', '#007bff', '#1e90ff', '#4682b4', 
            '#212529', '#495057', '#6c757d'
        ];
        
        const text = artisticNameElement.innerText;
        const characters = text.split('');
        
        artisticNameElement.innerHTML = '';
        
        characters.forEach((char) => {
            const span = document.createElement('span');
            span.textContent = char;
            
            if (char !== ' ') {
                span.style.color = colors[Math.floor(Math.random() * colors.length)];
                span.style.transition = 'transform 0.3s ease';
                span.addEventListener('mouseover', () => {
                    span.style.transform = 'translateY(-5px) scale(1.1)';
                });
                span.addEventListener('mouseout', () => {
                    span.style.transform = 'translateY(0) scale(1)';
                });
            }
            
            artisticNameElement.appendChild(span);
        });
    }

    
    /* =================================
       8. PAGE TITLE TYPEWRITER (WITH COLORS)
       ================================= */
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement && pageTitleElement.dataset.title) {
        
        const textToType = pageTitleElement.dataset.title;
        let i = 0;
        const speed = 75;
        const titleColors = ['#0056b3', '#212529', '#4682b4', '#007bff', '#6c757d'];

        function typePageTitle() {
            if (i < textToType.length) {
                const char = textToType.charAt(i);
                const color = titleColors[i % titleColors.length];
                const coloredChar = `<span style="color: ${color}">${char}</span>`;
                pageTitleElement.innerHTML += coloredChar;
                i++;
                setTimeout(typePageTitle, speed);
            } else {
                pageTitleElement.classList.remove('typewriter-cursor');
            }
        }

        pageTitleElement.classList.add('typewriter-cursor');
        setTimeout(typePageTitle, 500);
    }


}); // END OF DOMContentLoaded