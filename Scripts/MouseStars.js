let _LastCallTime = 0;
const _ThrottleTime = 30;
const _MaxStars = 50;
const _Stars = new Set();

const _Colors = ["#ff66cc", "#66ccff", "#ffff66", "#ccff66", "#ff9966", "#cc99ff"];
const _ColorsLength = _Colors.length;

document.addEventListener("mousemove", function (e) {
    const now = performance.now();
    if (now - _LastCallTime >= _ThrottleTime && _Stars.size < _MaxStars) {
        _LastCallTime = now;
        Fun_CreateStar(e.clientX, e.clientY);
    }
});

function Fun_CreateStar(x, y) {
    const _Star = document.createElement("div");
    _Star.className = "_Mouse_Stars";

    _Star.style.left = `${x + (Math.random() * 20 - 10)}px`;
    _Star.style.top = `${y + (Math.random() * 20 - 10)}px`;
    
    _Star.style.backgroundColor = Fun_StarRandomColor();
    document.body.appendChild(_Star);
    
    _Stars.add(_Star);

    setTimeout(() => {
        _Star.remove();
        _Stars.delete(_Star);
    }, 1500);
}

function Fun_StarRandomColor() {
    return _Colors[Math.floor(Math.random() * _ColorsLength)];
}
