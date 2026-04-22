function Fun_Post_And_Updates()
{
    var _Updates = document.getElementById('updates');
    if (!_Updates) return;

    var _Content = "";

    for (var i = 0; i < _Posts.length; i++) {
        var _item = _Posts[i];
        var _PostID = _Posts.length - i - 1;
        
        var _img = "";
        if (_item.img && _item.img !== "")
        {
            _img = '<img src="' + _item.img + '" alt="' + _item.imgalt + '" style="max-width: 100%; height: auto; margin-top: 10px;">';
        }

        _Content += '<div class="updates-post">' +
                        '<p><strong>' + _item.title + '</strong> ' +
                        '<em style="color: gray; font-size: 12px;">(' + _item.date + ' <strong>#' + _PostID + '</strong>)</em></p>' +
                        '<p>' + _item.content + '</p>' +
                        _img +
                        '<hr>' +
                     '</div>';
    }

    _Updates.innerHTML = _Content;
}