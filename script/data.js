const _Year_Copyright = "2025-2026";

function Fun_Loaded() {
    var _Switch_Style = document.getElementById("switch_style");
    var _Parms = new URLSearchParams(window.location.search);
    var _IsNoStyle = _Parms.get('style') === 'no';

    if (!_IsNoStyle)
    {
        var _Link = document.createElement('link');
        _Link.rel = 'stylesheet';
        _Link.href = 'script/style.css';
        document.head.appendChild(_Link);

        _Switch_Style.innerHTML = '<b>Is this page too heavy for your device?</b> <a href="?style=no">Load the plain HTML version</a>.'
    
        var _Script = document.createElement('script');
        _Script.src = 'script/particles.js';
        document.body.appendChild(_Script);
    }
    else
    {
        _Switch_Style.innerHTML = '<b>Is this page too lightweight for your device?</b> <a href="?style=yes">View the HTML version with CSS</a> <i>(only if your browser supports it)</i>.';

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

    /* Footer */
    var _Footer = document.getElementById("footer_copyright");
    _Footer.innerHTML = "<p>" + _Year_Copyright + " &copy; Foxioo<p>";
}

window.addEventListener('DOMContentLoaded', Fun_Loaded);