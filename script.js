document.addEventListener('DOMContentLoaded', () => {
    // 1. Setup Elements
    const navLinks = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('.spa-section');
    const body = document.body;
    const header = document.getElementById('main-header');
    
    // Auto-Create the Dot if it doesn't exist (safety check)
    let dot = document.getElementById('nav-dot');
    if (!dot) {
        const navContainer = document.querySelector('nav');
        if (navContainer) {
            dot = document.createElement('div');
            dot.id = 'nav-dot';
            navContainer.appendChild(dot);
        }
    }

    // 2. Navigation Switch Logic
    function switchView(targetId) {
        // Remove active class from all links and sections
        navLinks.forEach(l => l.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        // Add active class to target link and section
        const targetLink = document.querySelector(`.nav-links a[href="#${targetId}"]`);
        const targetSection = document.getElementById(targetId);

        if (targetLink) targetLink.classList.add('active');
        if (targetSection) targetSection.classList.add('active');

        // Change Body Class to match original pages
        body.className = ''; 
        if (header) header.className = ''; 

        if (targetId === 'about') {
            body.classList.add('about-page-body');
        } else if (targetId === 'roadmap') {
            body.classList.add('roadmap-page-body');
            if (header) header.classList.add('roadmap-header');
        } else if (targetId === 'reachout') {
            body.classList.add('reachout-page');
        }
        
        // Ensure dot color updates (handled via CSS variables based on body class)
    }

    // 3. THE BULLET ANIMATION LOGIC
    function moveDot(targetLink) {
        if (!targetLink || !dot) return;
        
        const navContainer = document.querySelector('nav');
        const navRect = navContainer.getBoundingClientRect();
        const linkRect = targetLink.getBoundingClientRect();
        
        // Calculate the center of the target link relative to the nav container
        const targetCenter = (linkRect.left - navRect.left) + (linkRect.width / 2);
        
        // Get the current position of the dot 
        // We use computed style or default to the target center if it's the first load
        const computedStyle = window.getComputedStyle(dot);
        // The transform 'translateX(-50%)' in CSS handles the centering, 
        // so 'left' corresponds exactly to the center point.
        // If the dot hasn't moved yet (left is 'auto'), we assume it starts at the target.
        let currentLeft = parseFloat(computedStyle.left);
        if (isNaN(currentLeft)) currentLeft = targetCenter;
        
        // Calculate Distance to travel
        const distance = Math.abs(targetCenter - currentLeft);
        
        // STRETCH FORMULA:
        // Base width is 6px. We add to it based on distance.
        // We clamp it so it doesn't get wider than 50px regardless of distance.
        const stretchFactor = 0.15; // Lower number = less stretch
        const maxStretch = 50; 
        const stretchWidth = Math.min(6 + (distance * stretchFactor), maxStretch); 
        
        // --- STEP 1: STRETCH & MOVE ---
        // We expand the width and move the 'left' property.
        // CSS 'transform: translateX(-50%)' keeps it centered on that 'left' coordinate.
        dot.style.width = `${stretchWidth}px`;
        dot.style.left = `${targetCenter}px`;

        // --- STEP 2: SNAP BACK ---
        // We wait for the movement transition (0.4s) to finish, then snap width back to 6px.
        setTimeout(() => {
            dot.style.width = '6px';
        }, 400); // Matches the 0.4s CSS transition time
    }

    // 4. Event Listeners
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            
            moveDot(this);      // Trigger animation
            switchView(targetId); // Change content
        });
    });

    // 5. Initial Load Logic
    const initialHash = window.location.hash.substring(1);
    const startId = (initialHash && document.getElementById(initialHash)) ? initialHash : 'home';
    const startLink = document.querySelector(`.nav-links a[href="#${startId}"]`);

    if (startLink) {
        // Set initial position instantly without animation
        dot.style.transition = 'none'; 
        switchView(startId);
        moveDot(startLink);
        
        // Restore animation capabilities after a brief moment
        setTimeout(() => {
            dot.style.transition = ''; 
        }, 100);
    }

    // 6. Privacy Policy Logic
    const openPrivacy = document.getElementById('open-privacy');
    const closePrivacy = document.getElementById('close-privacy');
    const privacyPanel = document.getElementById('privacy-panel');

    if (openPrivacy && closePrivacy && privacyPanel) {
        openPrivacy.addEventListener('click', () => {
            privacyPanel.classList.add('active');
            body.classList.add('no-scroll');
        });

        closePrivacy.addEventListener('click', () => {
            privacyPanel.classList.remove('active');
            body.classList.remove('no-scroll');
        });
    }
});
