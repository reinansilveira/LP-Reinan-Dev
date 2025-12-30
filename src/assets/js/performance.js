document.addEventListener('DOMContentLoaded', () => {
    const circles = document.querySelectorAll('.performance__circle');

    const animateCircle = (circle) => {
        const score = parseInt(circle.dataset.score);
        const span = circle.querySelector('span');
        const duration = 2000;
        const steps = 60;
        const increment = score / steps;
        let current = 0;

        const interval = setInterval(() => {
            current += increment;
            if (current >= score) {
                current = score;
                clearInterval(interval);
            }
            span.textContent = Math.floor(current);
        }, duration / steps);
    };

    // Intersection Observer para animar quando aparecer na tela
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCircle(entry.target);
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    circles.forEach(circle => observer.observe(circle));
});