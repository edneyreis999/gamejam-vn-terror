(() => {
  'use strict';
  const theme = globalThis.CoretoDesignSystem;
  if (!theme) return;
  function layoutPanel(rects, padding=12) {
    if (!rects.length) return null;
    const x=Math.min(...rects.map(r=>r.x))-padding, y=Math.min(...rects.map(r=>r.y))-padding;
    return {x,y,width:Math.max(...rects.map(r=>r.x+r.width))+padding-x,height:Math.max(...rects.map(r=>r.y+r.height))+padding-y};
  }
  function layoutTitleOptions(rect,titleHeight,gap=24,padding=12) {
    return {title:{x:rect.x+padding,y:rect.y+padding,width:rect.width-2*padding,height:titleHeight},
      options:{x:rect.x+padding,y:rect.y+padding+titleHeight+gap,width:rect.width-2*padding,height:Math.max(0,rect.height-2*padding-titleHeight-gap)}};
  }
  function measureSharedDescription(bitmap,texts,width,role='Action') {
    const layouts=texts.map(text=>theme.measure(bitmap,TextManager.parseLocalizedText(text),width,role));
    return {height:Math.max(0,...layouts.map(layout=>layout.height)),layouts};
  }
  function drawChoiceCard(bitmap,rect,{title,description,cta,state={},image=null}) {
    const content={x:rect.x+12,y:rect.y+12,width:rect.width-24,height:rect.height-24};
    let y=content.y;
    if(image?.isReady()) {
      const scale=Math.min(content.width/image.width,rect.height*0.35/image.height);
      bitmap.blt(image,0,0,image.width,image.height,content.x+(content.width-image.width*scale)/2,y,image.width*scale,image.height*scale);
      y+=image.height*scale+12;
    }
    theme.drawLabel({contents:bitmap},title,{...content,y,height:48},{},'Speaker'); y+=60;
    theme.drawLabel({contents:bitmap},description,{...content,y,height:Math.max(48,content.y+content.height-y-72)},{},'Helper');
    theme.drawLabel({contents:bitmap},cta,{...content,y:content.y+content.height-48,height:48},{...state,feedback:'choice'},'Action','center');
  }
  function drawIconControl(bitmap,name,rect,state={}) {
    const focused=state.enabled!==false&&state.focused, scale=focused&&!theme.ink.reducedMotion()?1.05:1;
    const size=Math.min(rect.width,rect.height), ctx=bitmap.context;
    ctx.save();ctx.translate(rect.x+rect.width/2,rect.y+rect.height/2);ctx.scale(scale,scale);
    theme.drawIcon(bitmap,name,-size/2,-size/2,size,state.enabled===false?theme.ink.tokens.muted:focused?theme.colors.primary:theme.colors.text);
    ctx.restore();
  }
  globalThis.CoretoDesignSystem=Object.freeze({...theme,layoutPanel,layoutTitleOptions,measureSharedDescription,drawChoiceCard,drawIconControl});
})();
