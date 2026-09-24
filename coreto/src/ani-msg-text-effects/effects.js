function aniWave(frame,index,offset=0,speed=0){
    return Math.cos((frame+offset*index)*speed);
}
function aniCycle(value,length){
    while(value>=length)value-=length;
    while(value<0)value+=length;
    return value;
}
function updateAniEffects(glyph){
    const data=glyph.effectData(),frame=Graphics.frameCount,index=glyph._offset;
    const horizontal=data.ShakeStrengthHorz??0,vertical=data.ShakeStrengthVert??0;
    if(horizontal!==0||vertical!==0){
        glyph.x+=Math.randomInt(horizontal+1)*(Math.random()<0.5?-1:1);
        glyph.y+=Math.randomInt(vertical+1)*(Math.random()<0.5?-1:1);
    }
    for(const axis of ['X','Y']){
        const distance=data['WaveDistance'+axis]??0,speed=data['WaveSpeed'+axis]??0;
        if(distance!==0&&speed!==0)glyph[axis.toLowerCase()]+=Math.round(aniWave(frame,index,data['WaveOffset'+axis],speed)*distance);
    }
    const arc=data.PendulumArc??0,pendulumSpeed=data.PendulumSpeed??0;
    const pendulum=arc!==0&&pendulumSpeed!==0?Math.round(aniWave(frame,index,data.PendulumOffset,pendulumSpeed)*arc):0;
    const rotationSpeed=data.RotationSpeed??0;
    if(rotationSpeed!==0){
        glyph._rotationAngle??=(data.RotationOffset??0)*index;
        glyph._rotationAngle-=rotationSpeed;
        while(glyph._rotationAngle>360)glyph._rotationAngle-=360;
        while(glyph._rotationAngle<0)glyph._rotationAngle+=360;
    }
    glyph.angle=pendulum+(glyph._rotationAngle??0);
    const base=Math.max(glyph._msgWindow.scale.x,glyph._msgWindow.scale.y);
    for(const axis of ['X','Y']){
        const flipSpeed=data['FlipSpeed'+axis]??0,pulseSpeed=data['PulseSpeed'+axis]??0,growth=(data['PulseGrowth'+axis]??0)/2;
        const flip=flipSpeed!==0?aniWave(frame,index,data['FlipOffset'+axis],flipSpeed):1;
        const pulse=growth!==0&&pulseSpeed!==0?1+aniWave(frame,index,data['PulseOffset'+axis],pulseSpeed)*growth:1;
        glyph.scale[axis.toLowerCase()]=base*flip*pulse;
    }
    let opacity=data.InitialOpacity??255;
    const pattern=(data.pattern??'').toLowerCase().trim();
    if(pattern!==''){
        const delay=Math.max(data.patternDelay??1,1);
        glyph._patternIndex??=(data.patternOffset??0)*index;
        glyph._patternIndex=aniCycle(glyph._patternIndex,pattern.length);
        opacity*=Math.max(0,Math.min(25,pattern.charCodeAt(glyph._patternIndex)-97))/25;
        if(frame%delay===0)glyph._patternIndex=aniCycle(glyph._patternIndex+1,pattern.length);
    }
    const glow=(data.glowRate??0)/2*255,glowSpeed=data.glowSpeed??0;
    if(glow!==0&&glowSpeed!==0)opacity+=Math.round(aniWave(frame,index,data.glowOffset,glowSpeed)*glow-glow);
    glyph.opacity=opacity;
    const hueShift=data.HueShift??0;
    if(hueShift!==0){
        glyph._hueValue??=(data.InitialHueOffset??0)*index;
        glyph._hueValue+=hueShift;
        // Ani 1.05 normalizes to the next turn; preserve its public Sprite hue value.
        while(glyph._hueValue>360)glyph._hueValue-=360;
        while(glyph._hueValue<360)glyph._hueValue+=360;
    }
    const tones=data.colorTones??[],delay=Math.max(data.toneDelay??1,1);
    if(tones.length){
        if(glyph._currentTone===undefined){
            glyph._toneIndex=aniCycle((data.InitialToneOffset??0)*index+Math.floor(frame/delay),tones.length);
            glyph._currentTone=tones[glyph._toneIndex].slice();
        }
        if(tones.length>1){
            if(frame%delay===0){
                glyph._toneIndex=aniCycle(glyph._toneIndex+1,tones.length);
                glyph._currentTone=tones[glyph._toneIndex].slice();
            }else if(data.SmoothToneChange){
                const remaining=delay-frame%delay,next=tones[aniCycle(glyph._toneIndex+1,tones.length)];
                for(let channel=0;channel<4;channel++)glyph._currentTone[channel]=(glyph._currentTone[channel]*(remaining-1)+next[channel])/remaining;
            }
        }
    }
    if(glyph._hueValue!==undefined)glyph.setHue(glyph._hueValue);
    if(glyph._currentTone!==undefined)glyph.setColorTone(glyph._currentTone);
}
