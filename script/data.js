const _Year_Copyright = "2025-2026";

const _Posts = [
    {
        title: "New website design!",
        date: "19.04.2026 16:41",
        content: "Say hi to new website look!<br><br>The site is being built from scratch and is designed to run more smoothly (my computer used to lag ;w;) and work on old browsers :D",
        img: "/media/posts/0/artworks-000641319277-1qrgjn-t500x500.jpg",
        imgalt: "Senko-san!"
    },
    {
        title: "Test",
        date: "19.04.2026 16:20",
        content: "hello world",
    },
];

function Fun_Loaded()
{
    var _Switch_Style = document.getElementById("switch_style");
    var _Parms = new URLSearchParams(window.location.search);
    var _IsNoStyle = _Parms.get('style') === 'no';

    if (!_IsNoStyle)
    {
        /* css */
        var _Link = document.createElement('link');
        _Link.rel = 'stylesheet';
        _Link.href = 'script/style.css';
        document.head.appendChild(_Link);

        _Switch_Style.innerHTML = '<strong>Is this page too heavy for your device?</strong> <a href="?style=no">Load the plain HTML version</a>.'
    
        var _Script = document.createElement('script');
        _Script.src = 'script/particles.js';
        document.body.appendChild(_Script);
    }
    else
    {
        _Switch_Style.innerHTML = '<strong>Is this page too lightweight for your device?</strong> <a href="?style=yes">View the HTML version with CSS</a> <em>(only if your browser supports it)</em>.';

        var _Links = document.querySelectorAll('div.window-content ul li a');
        for (var i = 0; i < _Links.length; i++)
        {
            var _Href = _Links[i].getAttribute('href');
            if (_Href && _Href.indexOf('http') !== 0)
            {
                _Links[i].href = _Href + "?style=no";
            }
        }
    }

        /* updates */
        var _Updates = document.getElementById('updates');
        _Updates.innerHTML = "";

        if (_Updates && typeof _Posts !== undefined)
        {
            _Posts.forEach((item, idx) =>
            {
                var _Post = document.createElement('div');
                _Post.className = 'updates-post';

                var _img = "";
                if (item.img && item.img !== "")
                {
                    _img = `<img src="${item.img}" alt="${item.imgalt}" style="max-width: 100%; height: auto; margin-top: 10px;">`;
                }

                _Post.innerHTML = 
                `
                    <p><strong>${item.title}</strong> <em style="color: gray; font-size: 12px;">(${item.date} <strong>#${idx}</strong>)</em></p>
                    <p>${item.content}</p>
                    ${_img}
                    <hr>
                `;

                _Updates.appendChild(_Post);
            });
        }

    /* Footer */
    var _Footer = document.getElementById("footer_copyright");
    _Footer.innerHTML = "<p>" + _Year_Copyright + " &copy; Foxioo<p>";
}

window.addEventListener('DOMContentLoaded', Fun_Loaded);