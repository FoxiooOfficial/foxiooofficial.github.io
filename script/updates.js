function Fun_Post_And_Updates() {
    var _Updates = document.getElementById('updates');
    
    if (_Updates) {
        _Updates.innerHTML = ""; 

        _Posts.forEach((item, idx) => {
            var _Post = document.createElement('div');
            _Post.className = 'updates-post';

            var _img = "";
            if (item.img && item.img !== "") {
                _img = `<img src="${item.img}" alt="${item.imgalt}" style="max-width: 100%; height: auto; margin-top: 10px;">`;
            }
            var _PostID = _Posts.length - idx - 1;

            _Post.innerHTML = `
                <p><strong>${item.title}</strong> <em style="color: gray; font-size: 12px;">(${item.date} <strong>#${_PostID}</strong>)</em></p>
                <p>${item.content}</p>
                ${_img}
                <hr>
            `;

            _Updates.appendChild(_Post);
        });
    }
}