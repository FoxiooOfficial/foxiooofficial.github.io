let lastX = 0, lastY = 0;
document.addEventListener('mousemove', function(e)
{
    const dx = e.clientX - lastX;
    const dy = e.clientY - lastY;

    const distance = Math.sqrt(dx*dx + dy*dy);

    if (distance < 15) return;

    const count = 1;

    for (let i = 0; i < count; i++)
        {
        const circle = document.createElement('div');
        circle.classList.add('circles');
        const size = Math.random() * 10 + 5;

        circle.style.width = size + 'px';
        circle.style.height = size + 'px';

        circle.style.background = `hsl(${Math.random() * 360}, 100%, 72%)`;

        const offsetX = +12;//(Math.random() - 0.5) * 20;
        const offsetY = +12;//(Math.random() - 0.5) * 20;

        circle.style.left = e.clientX + offsetX - size/2 + 'px';
        circle.style.top = e.clientY + offsetY - size/2 + 'px';
        
        const fallDistance = 0  + 'px';
        const scale = 0.3 - Math.random() * 0.2;

        circle.style.setProperty('--fall-distance', fallDistance);
        circle.style.setProperty('--scale', scale);

        const duration = 0.5 + Math.random() * 1 + 's';
        circle.style.animation = `fall ${duration} linear forwards`;
        
        document.body.appendChild(circle);
        circle.addEventListener('animationend', () => circle.remove());
    }

    lastX = e.clientX;
    lastY = e.clientY;
});