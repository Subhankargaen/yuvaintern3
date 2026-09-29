document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navList = document.getElementById('nav-list');

    // Remove hidden attribute on desktop to ensure visibility
    const handleResize = () => {
        if (window.innerWidth > 600) {
            navList.removeAttribute('hidden');
        } else {
            if (menuToggle.getAttribute('aria-expanded') === 'false') {
                navList.setAttribute('hidden', 'true');
            }
        }
    };

    window.addEventListener('resize', handleResize);
    
    // Initial setup
    if (window.innerWidth > 600) {
        navList.removeAttribute('hidden');
    }

    // Toggle menu visibility and ARIA states on click
    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        
        if (isExpanded) {
            // Close menu
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.setAttribute('hidden', 'true');
        } else {
            // Open menu
            menuToggle.setAttribute('aria-expanded', 'true');
            navList.removeAttribute('hidden');
            
            // Manage Focus: Set focus to the first link in the menu when opened
            const firstLink = navList.querySelector('a');
            if (firstLink) {
                firstLink.focus();
            }
        }
    });

    // Close menu on Escape key press (Accessibility best practice for modals/menus)
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && menuToggle.getAttribute('aria-expanded') === 'true' && window.innerWidth <= 600) {
            menuToggle.setAttribute('aria-expanded', 'false');
            navList.setAttribute('hidden', 'true');
            // Return focus to the toggle button
            menuToggle.focus();
        }
    });
});
