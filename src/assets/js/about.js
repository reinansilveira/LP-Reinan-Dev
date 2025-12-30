// Adicione este código JavaScript ao seu projeto 

document.addEventListener('DOMContentLoaded', () => {
    const googleLogo = document.querySelector('.about__google-logo');
    const aboutSection = document.querySelector('.about');

    if (!googleLogo || !aboutSection) return;

    function updateGoogleLogoEffect() {
        const sectionTop = aboutSection.offsetTop;
        const scrollY = window.scrollY;

        const scrollProgress = Math.max(0, Math.min(1,
            (scrollY - sectionTop + window.innerHeight * 0.5) / 300
        ));

        const blurAmount = 25 - (scrollProgress * 25);
        const opacity = 0.2 + (scrollProgress * 0.7);
        const translateY = -150 + (scrollProgress * 350);
        const scale = 0.5 + (scrollProgress * 0.7);

        // Rotate bem leve (0° até ~6°)
        const rotate = scrollProgress * 15;

        googleLogo.style.filter = `blur(${blurAmount}px)`;
        googleLogo.style.opacity = opacity;
        googleLogo.style.transform = `
            translate(-50%, ${translateY}px)
            scale(${scale})
            rotate(${rotate}deg)
        `;
    }

    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                updateGoogleLogoEffect();
                ticking = false;
            });
            ticking = true;
        }
    });

    updateGoogleLogoEffect();
});


document.addEventListener('DOMContentLoaded', () => {
    // Registra o plugin ScrollTrigger
    gsap.registerPlugin(ScrollTrigger);

    const ctaSection = document.querySelector('.cta');
    const icons = {
        wordpress: document.querySelector('#icon-wordpress'),
        react: document.querySelector('#icon-react'),
        photoshop: document.querySelector('#icon-photoshop'),
    };

    // Verifica se os elementos existem
    if (!ctaSection || !icons.wordpress || !icons.react || !icons.photoshop) return;

    // WordPress - começa no centro, "abre" na diagonal esquerda/cima quando scrolla
    gsap.fromTo(icons.wordpress,
        {
            y: 0,  // Começa no centro
            x: 0,
            rotation: 0
        },
        {
            y: -150,  // Vai pra cima
            x: -180,  // Vai pra esquerda
            rotation: -10,  // Rotação leve
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
                // markers: true // descomente para debug
            }
        }
    );

    // React - começa no centro, "abre" na diagonal direita/cima quando scrolla
    gsap.fromTo(icons.react,
        {
            y: 0,
            x: 0,
            rotation: 0
        },
        {
            y: -130,  // Vai pra cima
            x: 170,   // Vai pra direita
            rotation: 12,  // Rotação leve
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        }
    );

    // Photoshop - começa no centro, "abre" na diagonal esquerda/baixo quando scrolla
    gsap.fromTo(icons.photoshop,
        {
            y: 0,
            x: 0,
            rotation: 0
        },
        {
            y: 160,   // Vai pra baixo
            x: -140,  // Vai pra esquerda
            rotation: 8,  // Rotação leve
            scrollTrigger: {
                trigger: ctaSection,
                start: 'top bottom',
                end: 'bottom top',
                scrub: 1.5,
            }
        }
    );

});