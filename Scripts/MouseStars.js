document.addEventListener("mousemove", function (e)
{
    Fun_CreateStar(e.clientX, e.clientY);
});

function Fun_CreateStar(x, y)
{
    const _Star = document.createElement("div");
    _Star.className = "_Mouse_Stars";

    _Star.style.left = `${x + (Math.random() * 20 - 10)}px`;
    _Star.style.top  = `${y + (Math.random() * 20 - 10)}px`;
    
    _Star.style.backgroundColor = Fun_StarRandomColor();
    document.body.appendChild(_Star);

    setTimeout(() => {  _Star.remove(); }, 1500);
}

function Fun_StarRandomColor()
{
    const colors = ["#ff66cc", "#66ccff", "#ffff66", "#ccff66", "#ff9966", "#cc99ff"];
    return colors[Math.floor(Math.random() * colors.length)];
}
