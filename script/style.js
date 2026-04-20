var _Parms = new URLSearchParams(window.location.search);
var _IsNoStyle = _Parms.get('style') === 'no';

function Fun_Check_Style()
{
    var _Switch_Style = document.getElementById("switch_style");

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
}
