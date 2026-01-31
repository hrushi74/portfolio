const canvas = document.getElementById('starCanvas');
const ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let stars = [];

function init() {
    stars = [];
    for (let i = 0; i < 200; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            size: Math.random() * 1.5,
            opacity: Math.random(),
            blink: Math.random() * 0.02
        });
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    stars.forEach(star => {
        ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fill();
        
        star.opacity += star.blink;
        if (star.opacity > 1 || star.opacity < 0) star.blink *= -1;
    });
    requestAnimationFrame(animate);
}

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});
// Project card expand/overlay handling
const projectCards = document.querySelectorAll('.project-card');
const overlay = document.querySelector('.card-overlay');

projectCards.forEach(card => {
    const expandBtn = card.querySelector('.expand-btn');
    if (!expandBtn) return;

    expandBtn.addEventListener('click', () => {
        const currentlyActive = document.querySelector('.project-card.active');
        const isOpening = !card.classList.contains('active');

        // If opening a new card, close any other active card first
        if (isOpening && currentlyActive && currentlyActive !== card) {
            const otherBtn = currentlyActive.querySelector('.expand-btn');
            if (otherBtn) otherBtn.textContent = 'View More';
            currentlyActive.classList.remove('active');
        }

        const isActive = card.classList.toggle('active');
        const parentSection = card.closest('section');

        if (isActive) {
            expandBtn.textContent = 'Close Project';
            document.body.style.overflow = 'hidden';
            if (parentSection) {
                parentSection.style.zIndex = '10000';
                parentSection.style.position = 'relative';
            }
            if (overlay) overlay.style.display = 'block';
        } else {
            expandBtn.textContent = 'View More';
            document.body.style.overflow = 'auto';
            if (parentSection) {
                parentSection.style.zIndex = '';
                parentSection.style.position = '';
            }
            if (overlay) overlay.style.display = 'none';
        }
    });
});

// Overlay click closes the active card
if (overlay) {
    overlay.addEventListener('click', () => {
        const activeCard = document.querySelector('.project-card.active');
        if (activeCard) {
            const btn = activeCard.querySelector('.expand-btn');
            if (btn) btn.click();
        }
    });
}

// Single Escape key handler to close any active card
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        const activeCard = document.querySelector('.project-card.active');
        if (activeCard) {
            const btn = activeCard.querySelector('.expand-btn');
            if (btn) btn.click();
        }
    }
});


init();
animate();