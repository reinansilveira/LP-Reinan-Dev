'use strict'

class FAQAccordion {
    constructor(selector = '.faq__item') {
        this.items = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.items.forEach((item, i) => this.setupItem(item, i));
        this.setupIntersectionObserver();
        this.setupResizeHandler();
    }

    setupItem(item, index) {
        const question = item.querySelector('.faq__question');
        const answer = item.querySelector('.faq__answer');

        if (!question || !answer) return;

        this.setAccessibility(question, answer, index);
        this.setInitialState(item, answer, index);
        this.attachEvents(item, question, answer);
    }

    setAccessibility(question, answer, index) {
        Object.assign(question, {
            role: 'button',
            tabIndex: 0
        });
        question.setAttribute('aria-controls', `faq-content-${index}`);
        question.setAttribute('aria-expanded', index === 0);
        answer.id = `faq-content-${index}`;
    }

    setInitialState(item, answer, index) {
        if (index === 0) {
            item.classList.add('active');
            setTimeout(() => answer.style.maxHeight = `${answer.scrollHeight}px`, 100);
        }
        Object.assign(item.style, {
            opacity: '0',
            transform: 'translateY(30px)',
            transition: 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
        });
    }

    attachEvents(item, question, answer) {
        question.addEventListener('click', e => this.toggle(e, item, question, answer));
        question.addEventListener('keydown', e => this.handleKeyboard(e, item, question, answer));
    }

    toggle(e, item, question, answer) {
        e.preventDefault();
        const isActive = item.classList.contains('active');

        this.closeAll();

        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
            answer.style.maxHeight = `${answer.scrollHeight + 20}px`;
        }
    }

    closeAll() {
        this.items.forEach(item => {
            const q = item.querySelector('.faq__question');
            const a = item.querySelector('.faq__answer');

            item.classList.remove('active');
            if (q) q.setAttribute('aria-expanded', 'false');
            if (a) a.style.maxHeight = null;
        });
    }

    handleKeyboard(e, item, question, answer) {
        const actions = {
            'Enter': () => this.toggle(e, item, question, answer),
            ' ': () => this.toggle(e, item, question, answer),
            'ArrowDown': () => this.focusItem(this.getNextIndex(item)),
            'ArrowUp': () => this.focusItem(this.getPrevIndex(item)),
            'Home': () => this.focusItem(0),
            'End': () => this.focusItem(this.items.length - 1)
        };

        if (actions[e.key]) {
            e.preventDefault();
            actions[e.key]();
        }
    }

    getNextIndex(item) {
        const current = Array.from(this.items).indexOf(item);
        return current === this.items.length - 1 ? 0 : current + 1;
    }

    getPrevIndex(item) {
        const current = Array.from(this.items).indexOf(item);
        return current === 0 ? this.items.length - 1 : current - 1;
    }

    focusItem(index) {
        this.items[index]?.querySelector('.faq__question')?.focus();
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver(
            entries => entries.forEach((entry, i) => {
                if (entry.isIntersecting) {
                    const index = Array.from(this.items).indexOf(entry.target);
                    setTimeout(() => {
                        Object.assign(entry.target.style, {
                            opacity: '1',
                            transform: 'translateY(0)'
                        });
                    }, index * 100);
                    observer.unobserve(entry.target);
                }
            }),
            { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
        );

        this.items.forEach(item => observer.observe(item));
    }

    setupResizeHandler() {
        let timer;
        window.addEventListener('resize', () => {
            clearTimeout(timer);
            timer = setTimeout(() => this.recalculateHeights(), 250);
        });
    }

    recalculateHeights() {
        this.items.forEach(item => {
            if (!item.classList.contains('active')) return;

            const answer = item.querySelector('.faq__answer');
            if (!answer) return;

            answer.style.transition = 'none';
            answer.style.maxHeight = 'none';

            requestAnimationFrame(() => {
                answer.style.transition = '';
                answer.style.maxHeight = `${answer.scrollHeight}px`;
            });
        });
    }
}

document.addEventListener('DOMContentLoaded', () => new FAQAccordion());