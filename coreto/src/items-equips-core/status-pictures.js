function installItemsStatusPictures() {
    const proto = Window_ShopStatus.prototype;
    proto.drawCustomShopGraphic = function() {
        if (!this._item) return;
        const pattern = /<SHOP (?:PICTURE|IMAGE|PICTURE NAME|PICTURE FILENAME|IMAGE NAME|IMAGE FILENAME): (.*)>/gi;
        for (const match of (this._item.note || '').matchAll(pattern)) {
            const name = match[1].trim();
            if (!name) continue;
            const bitmap = ImageManager.loadPicture(name);
            bitmap.addLoadListener(this.drawCustomShopGraphicLoad.bind(this, bitmap, this._item));
        }
    };
    proto.drawCustomShopGraphicLoad = function(bitmap, item) {
        if (this._item !== item || !bitmap || bitmap.width <= 0 || bitmap.height <= 0) return;
        const note = item.note || '';
        const target = /<SHOP (?:PICTURE|IMAGE) LAYER: FOREGROUND>/i.test(note) ? this.contents : this.contentsBack;
        const width = /<SHOP (?:PICTURE|IMAGE) MAX WIDTH: (\d+)>/i.exec(note);
        const height = /<SHOP (?:PICTURE|IMAGE) MAX HEIGHT: (\d+)>/i.exec(note);
        const dimensions = /<SHOP (?:PICTURE|IMAGE) MAX DIMENSIONS: (\d+), *(\d+)>/i.exec(note);
        const maxWidth = dimensions ? Number(dimensions[1]) : width ? Number(width[1]) : this.innerWidth;
        const maxHeight = dimensions ? Number(dimensions[2]) : height ? Number(height[1]) : this.innerHeight;
        const scale = Math.min(1, maxWidth / bitmap.width, maxHeight / bitmap.height);
        const drawWidth = Math.floor(bitmap.width * scale), drawHeight = Math.floor(bitmap.height * scale);
        const align = (/<SHOP (?:PICTURE|IMAGE) (?:ALIGN|ALIGNMENT): (LEFT|CENTER|RIGHT)>/i.exec(note) || [null, 'center'])[1].toLowerCase();
        const position = (/<SHOP (?:PICTURE|IMAGE) POSITION: (TOP|MIDDLE|BOTTOM)>/i.exec(note) || [null, 'middle'])[1].toLowerCase();
        let x = align === 'left' ? 0 : align === 'right' ? this.innerWidth - drawWidth : Math.round((this.innerWidth - drawWidth) / 2);
        let y = position === 'top' ? 0 : position === 'bottom' ? this.innerHeight - drawHeight : Math.round((this.innerHeight - drawHeight) / 2);
        const offsetX = /<SHOP (?:PICTURE|IMAGE) OFFSET X: ([+\-]\d+)>/i.exec(note);
        const offsetY = /<SHOP (?:PICTURE|IMAGE) OFFSET Y: ([+\-]\d+)>/i.exec(note);
        const offset = /<SHOP (?:PICTURE|IMAGE) OFFSET: ([+\-]\d+), *([+\-]\d+)>/i.exec(note);
        x += (offsetX ? Number(offsetX[1]) : 0) + (offset ? Number(offset[1]) : 0);
        y += (offsetY ? Number(offsetY[1]) : 0) + (offset ? Number(offset[2]) : 0);
        const opacity = /<SHOP (?:PICTURE|IMAGE) OPACITY: (\d+)>/i.exec(note);
        const percent = /<SHOP (?:PICTURE|IMAGE) OPACITY: (\d+)[%％]>/i.exec(note);
        target.paintOpacity = opacity ? Number(opacity[1]) : percent ? Math.round(Number(percent[1]) * 0.01 * 255).clamp(0, 255) : 255;
        target.blt(bitmap, 0, 0, bitmap.width, bitmap.height, x, y, drawWidth, drawHeight);
        target.paintOpacity = 255;
    };
}
