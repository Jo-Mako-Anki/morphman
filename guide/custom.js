// Screenshots: a click shows the image full size, a click or Escape closes it.
document.addEventListener('click', function (event) {
    var image = event.target;
    if (image.tagName !== 'IMG' || !image.closest('.content main')) {
        return;
    }
    var zoom = document.createElement('div');
    zoom.className = 'image-zoom';
    var copy = document.createElement('img');
    copy.src = image.src;
    copy.alt = image.alt;
    zoom.appendChild(copy);
    function close() {
        zoom.remove();
        document.removeEventListener('keydown', onKey);
    }
    function onKey(e) {
        if (e.key === 'Escape') {
            close();
        }
    }
    zoom.addEventListener('click', close);
    document.addEventListener('keydown', onKey);
    document.body.appendChild(zoom);
});
