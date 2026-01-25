document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to the clicked link
            this.classList.add('active');
        });
    });
});

document.addEventListener('DOMContentLoaded', () => {
    // 1. Navigation Active State (The Traveling Dot)
    const navLinks = document.querySelectorAll('.nav-links a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // 2. Privacy Policy Slide Logic
    const openPrivacy = document.getElementById('open-privacy');
    const closePrivacy = document.getElementById('close-privacy');
    const privacyPanel = document.getElementById('privacy-panel');
    const body = document.body;

    openPrivacy.addEventListener('click', () => {
        privacyPanel.classList.add('active');
        body.classList.add('no-scroll');
    });

    closePrivacy.addEventListener('click', () => {
        privacyPanel.classList.remove('active');
        body.classList.remove('no-scroll');
    });
});