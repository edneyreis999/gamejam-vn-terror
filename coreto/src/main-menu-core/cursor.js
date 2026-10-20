function installMainMenuCursor(settings) {
    const api = VisuMZ.MainMenuCore;
    api.IsCustomCursorEnabled = function() { return !Utils.isMobileDevice() && settings.MouseCursor.Enable && !!settings.MouseCursor.idleFilenameIcon; };
    api.SetupCustomCursor = function() {
        const options = settings.MouseCursor;
        const idle = 'icon/' + options.idleFilenameIcon;
        const pressed = 'icon/' + (options.clickFilenameIcon || options.idleFilenameIcon);
        const image = new Image();
        image.onload = function() {
            const cursor = document.createElement('div');
            Object.assign(cursor.style, {position: 'absolute', width: image.width + 'px', height: image.height + 'px',
                backgroundImage: 'url(' + idle + ')', pointerEvents: 'none', zIndex: '1000', display: 'none'});
            document.body.appendChild(cursor);
            document.body.style.cursor = 'none';
            document.body.style.overflow = 'hidden';
            function position(x, y) {
                cursor.style.left = (x - Math.round(options.anchorX * image.width)) + 'px';
                cursor.style.top = (y - Math.round(options.anchorY * image.height)) + 'px';
            }
            document.addEventListener('mousemove', event => {
                cursor.style.display = '';
                let x = event.pageX, y = event.pageY;
                if (x <= 0 && y <= 0) { x += Graphics.width * 10; y += Graphics.height * 10; }
                position(x, y);
            });
            document.addEventListener('touchmove', event => position(event.touches[0].pageX, event.touches[0].pageY));
            document.addEventListener('mousedown', () => { cursor.style.backgroundImage = 'url(' + pressed + ')'; });
            document.addEventListener('mouseup', () => { cursor.style.backgroundImage = 'url(' + idle + ')'; });
        };
        image.onerror = function() { console.error('Custom cursor image failed to load.'); };
        image.src = idle;
    };
    const loadSystemImages = Scene_Boot.prototype.loadSystemImages;
    Scene_Boot.prototype.loadSystemImages = function() {
        loadSystemImages.call(this);
        if (api.IsCustomCursorEnabled()) api.SetupCustomCursor();
    };
}
