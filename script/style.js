var _IsNoStyle = window.location.search.indexOf('style=no') !== -1;

function Fun_Check_Style()
{
    var _Switch_Style = document.getElementById("switch_style");
    var _LightStyle = document.getElementById("style_light");

    if (!_IsNoStyle)
    {
        /* css */
        _LightStyle.setAttribute("disabled","disabled");
        
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
        _Switch_Style.innerHTML = '<strong>Is this page too lightweight for your device?</strong> <a href="?style=yes">View the HTML version with CSS</a>.';

        var _Links = document.querySelectorAll('a.self_link, .self_link a');
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
