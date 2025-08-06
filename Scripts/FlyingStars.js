(function()
{
    const _Count = 20;

    const _Life = 8000;

    const _SizeMin = 12;
    const _SizeMax = 96;

    const _SpeedMin = 5;
    const _SpeedMax = 20;

            const _ID = Array.from({length: 9}, (_, i) => `Media/Background/Star${i}.png`);

    function Fun_Lerp(a, b) {   return a + Math.random() * (b - a); }

    function Fun_Star()
    {
        const _Star = document.createElement('img');
        _Star.src = _ID[Math.floor(Math.random() * _ID.length)];
        _Star.className = '_Flying_Star';

        _Star.style.position = 'fixed';
        _Star.style.pointerEvents = 'none';

        const _Size = Fun_Lerp(_SizeMin, _SizeMax);
            _Star.style.width = `${_Size}px`;     _Star.style.height = `${_Size}px`;    _Star.style.zIndex = '9999';

        _Star.style.left = `${Fun_Lerp(0, window.innerWidth - _Size)}px`;
        _Star.style.top = `${Fun_Lerp(0, window.innerHeight - _Size)}px`;

        _Star.style.opacity = '0';
        _Star.style.mixBlendMode = 'screen';
        _Star.style.imageRendering = 'pixelated';

        let _Rot = Fun_Lerp(0, 360);
            const _RotSpeed = Fun_Lerp(-0.2, 0.2);
            _Star.style.transform = `rotate(${_Rot}deg)`;

        const _Prx = Fun_Lerp(0.1, 0.7);

            const _BLeft = parseFloat(_Star.style.left);
            const _BTop = parseFloat(_Star.style.top);

        document.body.appendChild(_Star);


        
        setTimeout(() => { _Star.style.transition = 'opacity 2s'; _Star.style.opacity = '0.75'; }, 10);

        const _XD = Fun_Lerp(-1, 1) * Fun_Lerp(_SpeedMin, _SpeedMax) / 60;
        const _YD = Fun_Lerp(-1, 1) * Fun_Lerp(_SpeedMin, _SpeedMax) / 60;
        let _LLife = 0;

            function Fun_Prx()
            {
                const _Scrool = window.scrollY || window.pageYOffset;
                _Star.style.top = `${_BTop + _YD * (_LLife / 16) - _Scrool * _Prx}px`;
            }

        const _Int = setInterval(() => {

            const left = parseFloat(_Star.style.left);
                _Star.style.left = `${left + _XD}px`;

            _Rot += _RotSpeed;
                _Star.style.transform = `rotate(${_Rot}deg)`;

            _LLife += 16;

            Fun_Prx();

            if (_LLife > _Life - 2000) { _Star.style.opacity = '0' };
                if (_LLife > _Life)
                {
                    clearInterval(_Int);
                    _Star.remove();
                }
        }, 16);

        window.addEventListener('scroll', Fun_Prx);

        _Star._removeParallax = () => window.removeEventListener('scroll', Fun_Prx);
        _Star.addEventListener('transitionend', function cleanup()
        {
                if (_Star.style.opacity === '0')
                {
                    _Star._removeParallax();
                        _Star.removeEventListener('transitionend', cleanup);
                }
        });
    }

    function Fun_Spawn()
    {
        function Fun_SpawnX()
        {
            const current = document.querySelectorAll('._Flying_Star').length;

            if (current < _Count) Fun_Star();   setTimeout(Fun_SpawnX, Math.random() * 400 + 100);
        }
        Fun_SpawnX();
    }

    window.addEventListener('DOMContentLoaded', Fun_Spawn);
})();
