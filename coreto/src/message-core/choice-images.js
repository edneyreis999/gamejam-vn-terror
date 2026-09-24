function installChoiceImages() {
    const window = Window_ChoiceList.prototype;
    const colors = {red:'#f26c4f',orange:'#fbaf5d',yellow:'#fff799',green:'#7cc576',blue:'#6dcff6',purple:'#a186be',violet:'#a186be',brown:'#c69c6d',pink:'#ffc8e0',white:'#ffffff',gray:'#acacac',grey:'#acacac',black:'#707070'};
    window.drawCustomBackgroundColor = function(rect, color1, color2, single) {
        const border = ColorManager.itemBackColor1();
        color1 ??= border; color2 ??= color1;
        this.contentsBack.gradientFillRect(rect.x,rect.y,rect.width,rect.height,color1,color2,true);
        if (single) this.contentsBack.gradientFillRect(rect.x,rect.y,rect.width,rect.height,border,color2,true);
        this.contentsBack.strokeRect(rect.x,rect.y,rect.width,rect.height,border);
    };
    window.changeChoiceBackgroundColor = function(index) {
        const text = this.commandName(index);
        const gradients = [...text.matchAll(/<(?:BGCOLOR|BG COLOR): (.*?),(.*?)>/gi)];
        const singles = [...text.matchAll(/<(?:BGCOLOR|BG COLOR): (.*?)>/gi)];
        if (!gradients.length && !singles.length) return;
        let first, second;
        if (gradients.length) {
            const match = gradients.at(-1);
            first = ColorManager.getColor(match[1]).trim(); second = ColorManager.getColor(match[2]).trim();
        } else {
            const name = singles.at(-1)[1].toLowerCase().trim();
            const dynamic = {yes:'powerUpColor',no:'powerDownColor',system:'systemColor',crisis:'crisisColor'}[name];
            first = second = colors[name] ?? (dynamic ? ColorManager[dynamic]() : ColorManager.getColor(name));
        }
        const rect = this.itemRect(index);
        this.contentsBack.clearRect(rect.x,rect.y,rect.width,rect.height);
        this.drawCustomBackgroundColor(rect,first,second,!gradients.length);
    };
    function imageTag(text, layer) {
        const plain = text.match(new RegExp(`<${layer} ?(?:IMG|IMAGE|PIC|PICTURE): (.*?)>`, 'i'));
        if (plain) return {name:plain[1].trim(),position:''};
        const anchored = text.match(new RegExp(`<${layer} ?(?:PICTURE|IMAGE|IMG|PIC) *(.*?): (.*?)>`, 'i'));
        return anchored ? {name:anchored[2].trim(),position:anchored[1].trim().toLowerCase()} : null;
    }
    const anchors = [[],['lowerleft','lower-left','lower left','downleft','down-left','down left'],
        ['lowercenter','lower-center','lower center','downcenter','down-center','down center','down'],
        ['lowerright','lower-right','lower right','downright','down-right','down right'],
        ['midleft','middleleft','left'],['midcenter','middlecenter','center','centered'],['midright','middleright','right'],
        ['upperleft','upper-left','upper left','upleft','up-left','up left'],
        ['uppercenter','upper-center','upper center','upcenter','up-center','up center','up'],
        ['upperright','upper-right','upper right','upright','up-right','up right']];
    window.requestChoiceForegroundImage = function(index) { return imageTag(this.choiceAlignText()+this.commandName(index),'FG')?.name || ''; };
    window.requestChoiceBackgroundImage = function(index, text, rect) {
        const tag = imageTag(text,'BG');
        if (tag?.name) this.withMessagePicture(tag.name, (owner,bitmap) => owner.drawChoiceLocationImage(index,false,text,rect,bitmap));
    };
    window.drawChoiceLocationImage = function(index, foreground, text, snapshot, bitmap) {
        if (this._destroyed || this.choiceAlignText()+this.commandName(index) !== text) return;
        const current = this.itemRectWithPadding(index);
        if (['x','y','width','height'].some(key => snapshot[key] !== current[key])) return;
        const tag = imageTag(text,foreground?'FG':'BG');
        // The reference gives an unpositioned BG precedence over a positioned FG.
        const position = foreground && /<BG ?(?:IMG|IMAGE|PIC|PICTURE): (.*?)>/i.test(text) ? '' : tag?.position || '';
        const anchor = anchors.findIndex((names,index) => index > 0 && (names.includes(position) || String(index) === position));
        const rect = this.itemRect(index), contents = foreground ? this.contents : this.contentsBack;
        if (!foreground) contents.clearRect(rect.x-1,rect.y-1,rect.width+2,rect.height+2);
        let x=rect.x+2,y=rect.y+2,width=rect.width-4,height=rect.height-4;
        if (anchor > 0) {
            const scale = Math.min(width/bitmap.width,height/bitmap.height,foreground?1:Infinity);
            const w=Math.round(bitmap.width*scale),h=Math.round(bitmap.height*scale);
            const column=(anchor-1)%3,row=Math.floor((anchor-1)/3);
            x += column===1?Math.round((width-w)/2):column===2?width-w:0;
            y += row===1?Math.round((height-h)/2):row===0?height-h:0;
            width=w;height=h;
        }
        contents.blt(bitmap,0,0,bitmap.width,bitmap.height,x,y,width,height);
        if (foreground) this.drawItemContents(index);
    };
    const drawContents = window.drawItemContents;
    window.drawItemContents = function(index) {
        drawContents.call(this,index);
        this.changeChoiceBackgroundColor(index);
        this.requestChoiceBackgroundImage(index,this.choiceAlignText()+this.commandName(index),this.itemRectWithPadding(index));
    };
    window.drawItem = function(index) {
        const name = this.requestChoiceForegroundImage(index);
        if (!name) return this.drawItemContents(index);
        const text = this.choiceAlignText()+this.commandName(index),rect=this.itemRectWithPadding(index);
        this.withMessagePicture(name,(owner,bitmap)=>owner.drawChoiceLocationImage(index,true,text,rect,bitmap));
    };
}
installChoiceImages();
