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

const links = document.querySelectorAll('.nav-link');
const indicator = document.getElementById('nav-indicator');
const sections = document.querySelectorAll('.page-section');

function moveIndicator(target) {
  const rect = target.getBoundingClientRect();
  const navRect = target.parentElement.getBoundingClientRect();
  
  // Calculate center of the link
  const leftPos = rect.left - navRect.left + (rect.width / 2) - 5;
  
  indicator.style.left = `${leftPos}px`;
}

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    
    // 1. Move Dot
    moveIndicator(link);
    
    // 2. Update Active Class
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
    
    // 3. Switch Section
    const targetId = link.getAttribute('href').replace('#', '');
    sections.forEach(sec => {
      sec.style.display = (sec.id === targetId) ? 'block' : 'none';
    });
  });
});

// Set initial position on load
window.onload = () => moveIndicator(document.querySelector('.nav-link.active'));
