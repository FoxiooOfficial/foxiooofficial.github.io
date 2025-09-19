
function Fun_WindowFloat() {
    const _Windows = document.querySelectorAll('._Window_Side');
    _Windows.forEach(window => {

        const _Angle = (Math.random() * Math.PI * 2);
        const _Radius = Math.round(10);
        
        window.style.setProperty('--initial-angle', _Angle);
        window.style.setProperty('--orbit-radius', `${_Radius}px`);
        
        window.classList.add('_Window_Floating');
        
        const _Off = Math.round(200 + Math.random() * 1000);
        window.style.animationDelay = `-${_Off}s`;
        
        window.style.transform = 'translate3d(0, 0, 0)';
    });
}

// Uruchom inicjalizację po załadowaniu strony
document.addEventListener('DOMContentLoaded', Fun_WindowFloat);