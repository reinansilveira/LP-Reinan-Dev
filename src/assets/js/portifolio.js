document.addEventListener('DOMContentLoaded', function () {

    // document.querySelectorAll('.faq-question').forEach(question => {
    //     question.addEventListener('click', () => {
    //         const faqItem = question.parentElement;
    //         const isActive = faqItem.classList.contains('active');

    //         document.querySelectorAll('.faq-item').forEach(item => {
    //             item.classList.remove('active');
    //         });

    //         if (!isActive) {
    //             faqItem.classList.add('active');
    //         }
    //     });
    // });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(element => {
        observer.observe(element);
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    const isMobile = window.innerWidth <= 768;

    if (isMobile) {
        const portfolioCards = document.querySelectorAll('.portfolio__card');

        portfolioCards.forEach(card => {
            card.addEventListener('click', function (e) {
                if (!e.target.closest('.portfolio__info-tag')) {
                    e.preventDefault();
                }

                if (this.classList.contains('active')) {
                    this.classList.remove('active');
                } else {
                    portfolioCards.forEach(c => c.classList.remove('active'));
                    this.classList.add('active');

                    const image = this.querySelector('.portfolio-image');
                    const isLongImage = image.classList.contains('long-image');
                    const duration = isLongImage ? 16000 : 12000;

                    setTimeout(() => {
                        this.classList.remove('active');
                    }, duration);
                }
            });
        });
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            const nowMobile = window.innerWidth <= 768;
            if (nowMobile !== isMobile) {
                location.reload();
            }
        }, 250);
    });

    if (isMobile) {
        document.querySelectorAll('.scroll-indicator').forEach(indicator => {
            indicator.textContent = '↓ Passe o mouse';
        });
    }

    const firstCard = document.querySelector('.portfolio__card.first-card');

    if (firstCard && !isMobile) {
        firstCard.addEventListener('mouseenter', function () {
            this.classList.add('hovered');
        });
    }

});