// Menu Mobile Functionality
document.addEventListener('DOMContentLoaded', () => {
    const header = document.querySelector('.header');
    const menuButton = document.querySelector('.header__button');
    const menuOverlay = document.querySelector('.header__menu-overlay');
    const menuLinks = document.querySelectorAll('.cta-header');
    const body = document.body;

    if (!header || !menuButton || !menuOverlay) return;

    // Abrir / Fechar menu
    menuButton.addEventListener('click', () => {
        const isOpen = header.classList.toggle('menu-open');

        // trava / libera scroll
        body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Fechar ao clicar no overlay
    menuOverlay.addEventListener('click', () => {
        closeMenu();
    });

    // Fechar ao clicar em um link
    menuLinks.forEach(link => {
        link.addEventListener('click', () => {
            closeMenu();
        });
    });

    function closeMenu() {
        header.classList.remove('menu-open');
        body.style.overflow = '';
    }
});
