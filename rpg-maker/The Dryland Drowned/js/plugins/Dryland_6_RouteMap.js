/*:
 * @target MZ
 * @plugindesc Event-authored route graphs, arrival actions and a moving pawn.
 * @author Dryland
 * @orderAfter Coreto_5_DesignSystem
 * @param NodeSize
 * @type number
 * @min 24
 * @default 78
 * @param StepSize
 * @type number
 * @min 2
 * @default 9
 * @param StepGap
 * @type number
 * @min 1
 * @default 5
 * @param Duration
 * @text Travel duration (milliseconds)
 * @type number
 * @min 0
 * @default 650
 * @param MoveSe
 * @text Movement sound
 * @type file
 * @dir audio/se/
 * @desc Loops only during pawn travel. Empty disables sound; no extension.
 * @default
 * @param MoveSeVolume
 * @type number
 * @min 0
 * @max 100
 * @desc Percentage, multiplied by the player's SE volume.
 * @default 90
 * @param MoveSePitch
 * @type number
 * @min 50
 * @max 150
 * @desc Playback speed percentage; 100 is original speed.
 * @default 100
 * @param MoveSePan
 * @type number
 * @min -100
 * @max 100
 * @desc Stereo position: -100 left, 0 center, 100 right.
 * @default 0
 * @param Ink
 * @default #360a0b
 * @param Accent
 * @default #62365f
 * @param Paper
 * @default #ead3ae
 * @param Pawn
 * @type file
 * @dir img/pictures/
 * @default Dryland_Route_Pawn
 * @param ReducedMotionVariable
 * @type variable
 * @default 0
 * @command Begin
 * @desc Start a new attempt, resetting visits. The start node does not fire.
 * @arg node
 * @default start
 * @command Restore
 * @desc Restore position without firing an arrival or resetting visits.
 * @arg node
 * @default start
 * @command SetNode
 * @desc Configure a node's availability and public appearance for this attempt.
 * @arg node
 * @arg enabled
 * @type boolean
 * @default true
 * @arg revealed
 * @type boolean
 * @default true
 * @arg label
 * @arg image
 * @type file
 * @dir img/pictures/
 * @command Query
 * @arg node
 * @arg kind
 * @type select
 * @option current
 * @option visited
 * @arg variable
 * @type variable
 * @default 0
 * @arg switch
 * @type switch
 * @default 0
 * @help
 * Map note: <RouteMap>. Event notes: <RouteNode: stable-id>,
 * <RouteLinks: other-id,third-id>, <RouteReturn: false>,
 * <RouteArrival: first> (default) or <RouteArrival: always>.
 * Optional <RouteImage: picture-name> and <RouteLabel: $[translation.key]>.
 * Without RouteImage, the active page's character/tile graphic is used.
 * Positions come from events (tile centers); only active event pages count.
 * Connections are undirected, orthogonal and have maximum degree four.
 * Declare each edge once or on both ends. Crossings do not create junctions.
 * Return=false forbids movement into already visited nodes from that node.
 * Arrival runs the destination's active native event list after travel.
 * First means once per Begin; returning from another map never fires arrival.
 * Visits and configuration persist in native saves. Travel itself does not.
 * Disable this plugin to remove route interaction; boot remains available.
 * Authoring guide: rpg-maker/docs/route-map.md
 */
(function(global) {
  'use strict';
  function tag(note, name) {
    const match = String(note || '').match(new RegExp('<' + name + ':\\s*([^>]+)>', 'i'));
    return match ? match[1].trim() : '';
  }
  function graph(events) {
    const nodes = events.filter(Boolean).filter(e => tag(e.note, 'RouteNode')).map(e => ({
      id: tag(e.note, 'RouteNode'), eventId: e.id, x: e.x, y: e.y,
      links: tag(e.note, 'RouteLinks').split(',').map(x => x.trim()).filter(Boolean),
      returnAllowed: tag(e.note, 'RouteReturn') !== 'false',
      arrival: tag(e.note, 'RouteArrival') || 'first',
      label: tag(e.note, 'RouteLabel'), image: tag(e.note, 'RouteImage')
    }));
    const byId = new Map();
    for (const node of nodes) {
      if (byId.has(node.id)) throw new Error('RouteMap duplicate node: ' + node.id);
      if (!['first','always'].includes(node.arrival)) throw new Error('RouteMap invalid arrival: ' + node.id);
      byId.set(node.id, node);
    }
    for (const node of nodes) for (const id of [...node.links]) {
      const target = byId.get(id);
      if (!target || target === node) throw new Error('RouteMap invalid link: ' + node.id + ' -> ' + id);
      if (target.x !== node.x && target.y !== node.y) throw new Error('RouteMap diagonal link: ' + node.id + ' -> ' + id);
      if (target.x === node.x && target.y === node.y) throw new Error('RouteMap overlapping nodes: ' + node.id + ' -> ' + id);
      if (!target.links.includes(node.id)) target.links.push(node.id);
    }
    for (const node of nodes) {
      node.links = [...new Set(node.links)];
      if (node.links.length > 4) throw new Error('RouteMap more than four links: ' + node.id);
    }
    return nodes;
  }
  function begin(nodes, id) {
    if (!nodes.some(n => n.id === id)) throw new Error('RouteMap unknown start: ' + id);
    return {current:id, visited:[id], nodes:{}};
  }
  function canMove(nodes, state, id) {
    const from = nodes.find(n => n.id === state.current);
    return !!from && from.links.includes(id) && state.nodes[id]?.enabled !== false &&
      (from.returnAllowed || !state.visited.includes(id));
  }
  function arrive(nodes, state, id) {
    if (!canMove(nodes,state,id)) throw new Error('RouteMap unavailable node: ' + id);
    const node = nodes.find(n => n.id === id);
    const fire = node.arrival === 'always' || !state.visited.includes(id);
    state.current = id;
    if (!state.visited.includes(id)) state.visited.push(id);
    return fire;
  }
  global.DrylandRouteMap = {graph, begin, canMove, arrive, tag};
  if (typeof PluginManager === 'undefined') return;
  const name = 'Dryland_6_RouteMap';
  const params = PluginManager.parameters(name);
  const moveSe = {name:params.MoveSe || '', volume:Number(params.MoveSeVolume ?? 90), pitch:Number(params.MoveSePitch ?? 100), pan:Number(params.MoveSePan ?? 0)};
  const size = Number(params.NodeSize || 78), step = Number(params.StepSize || 9), gap = Number(params.StepGap || 5);
  const ink = params.Ink || '#360a0b', accent = params.Accent || '#62365f', paper = params.Paper || '#ead3ae';
  const active = () => /<RouteMap>/i.test($dataMap?.note || '');
  const nodes = () => graph($gameMap.events().filter(e => e.page() && !e.list().some(c => c.code === 108 && c.parameters[0] === '<RouteHidden>')).map(e => e.event()));
  const state = () => $gameSystem._routeMaps?.[$gameMap.mapId()];
  const saveState = value => { ($gameSystem._routeMaps ||= {})[$gameMap.mapId()] = value; };
  const text = raw => String(raw || '').replace(/\$\[([^\]]+)\]/g, (_, key) => TextManager.getLocalizedText ? TextManager.getLocalizedText(key) : key);
  Object.assign(global.DrylandRouteMap, {active, nodes, state, saveState, text});
  PluginManager.registerCommand(name,'Begin', args => saveState(begin(nodes(), args.node)));
  PluginManager.registerCommand(name,'Restore', args => {
    if (!nodes().some(n => n.id === args.node)) throw new Error('RouteMap unknown node: ' + args.node);
    state().current = args.node;
  });
  PluginManager.registerCommand(name,'SetNode', args => {
    if (!nodes().some(n => n.id === args.node)) throw new Error('RouteMap unknown node: ' + args.node);
    state().nodes[args.node] = {enabled:args.enabled !== 'false', revealed:args.revealed !== 'false', label:args.label, image:args.image};
  });
  PluginManager.registerCommand(name,'Query', args => {
    const value = args.kind === 'visited' ? state().visited.includes(args.node) : state().current;
    if (Number(args.variable)) $gameVariables.setValue(Number(args.variable),value);
    if (Number(args.switch)) $gameSwitches.setValue(Number(args.switch),!!value);
  });
  const canPlayerMove = Game_Player.prototype.canMove;
  Game_Player.prototype.canMove = function() { return !active() && canPlayerMove.call(this); };
  const processTouch = Scene_Map.prototype.processMapTouch;
  Scene_Map.prototype.processMapTouch = function() { if (!active()) processTouch.call(this); };
  const saveEnabled = Game_System.prototype.isSaveEnabled;
  Game_System.prototype.isSaveEnabled = function() { return !SceneManager._scene?._routeTravel && saveEnabled.call(this); };
  const menuEnabled = Scene_Map.prototype.isMenuEnabled;
  Scene_Map.prototype.isMenuEnabled = function() { return !this._routeTravel && menuEnabled.call(this); };
  const characterVisibility = Sprite_Character.prototype.updateVisibility;
  Sprite_Character.prototype.updateVisibility = function() {
    characterVisibility.call(this);
    if (active() && (this._character === $gamePlayer || this._character instanceof Game_Follower ||
      (this._character instanceof Game_Event && tag(this._character.event().note,'RouteNode')))) this.visible=false;
  };
  const createDisplay = Scene_Map.prototype.createDisplayObjects;
  Scene_Map.prototype.createDisplayObjects = function() {
    createDisplay.call(this);
    if (!active()) return;
    this._routeMoveAudio = moveSe.name ? AudioManager.createBuffer('se/',moveSe.name) : null;
    this._routeCanvas = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    this._routeIcons = new Sprite();
    this._routePawn = new Sprite(ImageManager.loadPicture(params.Pawn || 'Dryland_Route_Pawn'));
    this._routePawn.anchor.set(0.5,1);
    this._routeOverlay = new Sprite(new Bitmap(Graphics.width, Graphics.height));
    for (const layer of [this._routeCanvas,this._routeIcons,this._routePawn,this._routeOverlay]) this.addChildAt(layer,this.getChildIndex(this._windowLayer));
    this._routeFocus = null;
    this._routeLastPointer = [-1,-1];
  };
  const stop = Scene_Map.prototype.stop;
  Scene_Map.prototype.stop = function() {
    if (this._routeMoveAudio) this._routeMoveAudio.stop();
    stop.call(this);
  };
  const terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    if (this._routeMoveAudio) this._routeMoveAudio.destroy();
    terminate.call(this);
  };
  const point = n => ({x:($gameMap.adjustX(n.x)+0.5)*$gameMap.tileWidth(), y:($gameMap.adjustY(n.y)+0.5)*$gameMap.tileHeight()});
  function rect(b,x,y,w,h,color) { b.fillRect(Math.round(x),Math.round(y),w,h,color); }
  function frame(b,x,y,w,h,color,thickness) {
    rect(b,x,y,w,thickness,color); rect(b,x,y+h-thickness,w,thickness,color);
    rect(b,x,y,thickness,h,color); rect(b,x+w-thickness,y,thickness,h,color);
  }
  function nodeIcon(node, info) {
    const event=$gameMap.event(node.eventId), sprite=new Sprite();
    if(info.image) {
      sprite.bitmap=ImageManager.loadPicture(info.image);
      sprite.visible=false;
      sprite.update=function() {
        if(!this.bitmap.isReady() || this._routeFitted) return;
        this.scale.set((size-12)/Math.max(this.bitmap.width,this.bitmap.height));
        this._routeFitted=true;
        this.visible=true;
      };
    } else if(event.tileId()>0) {
      const tile=event.tileId(), width=$gameMap.tileWidth(), height=$gameMap.tileHeight();
      sprite.bitmap=ImageManager.loadTileset($gameMap.tileset().tilesetNames[5+Math.floor(tile/256)]);
      sprite.setFrame((Math.floor(tile/128)%2*8+tile%8)*width,Math.floor(tile%256/8)%16*height,width,height);
      sprite.scale.set((size-12)/Math.max(width,height));
    } else if(event.characterName()) {
      sprite.bitmap=ImageManager.loadCharacter(event.characterName());
      sprite.visible=false;
      sprite.update=function() {
        if(!this.bitmap.isReady() || this._routeFitted) return;
        const big=ImageManager.isBigCharacter(event.characterName()), index=event.characterIndex();
        const width=this.bitmap.width/(big?3:12),height=this.bitmap.height/(big?4:8);
        this.setFrame(((big?0:index%4)*3+event.pattern())*width,((big?0:Math.floor(index/4))*4+(event.direction()-2)/2)*height,width,height);
        this.scale.set((size-12)/Math.max(width,height));
        this._routeFitted=true;
        this.visible=true;
      };
    }
    sprite.update();
    return sprite;
  }
  const update = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    update.call(this);
    if (!this._routeCanvas || !state()) return;
    const parallax = this._spriteset._parallax;
    if (parallax.bitmap?.isReady()) {
      parallax.move(0,0,parallax.bitmap.width,parallax.bitmap.height);
      parallax.scale.set(Graphics.width/parallax.bitmap.width,Graphics.height/parallax.bitmap.height);
      parallax.origin.set(0,0);
    }
    const list = nodes(), data = state(), current = list.find(n => n.id === data.current);
    if (!current) return;
    const busy = !this.isActive() || $gameMap.isEventRunning() || $gameMessage.isBusy() || this.isBusy();
    if (this._routeTravel) {
      const travel = this._routeTravel;
      travel.elapsed += Graphics.app.ticker.deltaMS;
      if (travel.elapsed >= travel.duration) {
        const target = list.find(n => n.id === travel.id);
        this._routeTravel = null;
        if (this._routeMoveAudio) this._routeMoveAudio.stop();
        if (canMove(list,data,travel.id)) {
          const fire = arrive(list,data,travel.id);
          if (fire) $gameMap.event(target.eventId).start();
        }
      }
    } else if (!busy) {
      if (TouchInput.isTriggered() || TouchInput.x !== this._routeLastPointer[0] || TouchInput.y !== this._routeLastPointer[1]) {
        this._routeLastPointer = [TouchInput.x,TouchInput.y];
        this._routeFocus = list.find(n => {const p=point(n);return Math.abs(p.x-TouchInput.x)<=size/2 && Math.abs(p.y-TouchInput.y)<=size/2;})?.id || null;
      }
      const direction = ['right','down','left','up'].find(key => Input.isRepeated(key));
      if (direction) {
        const index = list.findIndex(n => n.id === (this._routeFocus || data.current));
        this._routeFocus = list[(index + (['right','down'].includes(direction)?1:list.length-1)) % list.length].id;
      }
      if ((TouchInput.isTriggered() || Input.isTriggered('ok')) && this._routeFocus && canMove(list,data,this._routeFocus)) {
        const reduced = Number(params.ReducedMotionVariable) ? $gameVariables.value(Number(params.ReducedMotionVariable)) : matchMedia('(prefers-reduced-motion: reduce)').matches;
        const duration = reduced ? 0 : Number(params.Duration ?? 650);
        if (duration > 0) {
          this._routeTravel = {id:this._routeFocus,from:point(current),elapsed:0,duration};
          if (this._routeMoveAudio) {
            AudioManager.updateSeParameters(this._routeMoveAudio,moveSe);
            this._routeMoveAudio.play(true);
          }
        } else {
          const target = list.find(n => n.id === this._routeFocus);
          if (arrive(list,data,target.id)) $gameMap.event(target.eventId).start();
        }
      }
    }
    const signature = JSON.stringify([data, list, this._routeFocus, Graphics.width, Graphics.height, ConfigManager.textLocale]);
    if (this._routeSignature !== signature) {
      this._routeSignature = signature;
      const b=this._routeCanvas.bitmap, overlay=this._routeOverlay.bitmap;
      b.clear(); overlay.clear(); this._routeIcons.removeChildren().forEach(sprite=>sprite.destroy());
      b.fontFace=$gameSystem.mainFontFace(); b.fontSize=20; b.textColor=ink; b.outlineWidth=0;
      for (const n of list) {
        const p=point(n);
        for (const id of n.links.filter(id=>id>n.id)) {
          const q=point(list.find(x=>x.id===id)), distance=Math.hypot(q.x-p.x,q.y-p.y), available=distance-size-2*gap;
          const count=Math.max(0,Math.floor(available/(step+gap)));
          for(let i=1;i<=count;i++) {
            const t=(size/2+gap+i*available/(count+1))/distance;
            const x=p.x+(q.x-p.x)*t-step/2,y=p.y+(q.y-p.y)*t-step/2;
            if(data.visited.includes(n.id)&&data.visited.includes(id))rect(b,x,y,step,step,ink);else frame(b,x,y,step,step,ink,1);
          }
        }
      }
      for(const n of list) {
        const p=point(n), info={...n,...data.nodes[n.id]}, revealed=info.revealed!==false;
        const selected=n.id===data.current||n.id===this._routeFocus;
        rect(b,p.x-size/2,p.y-size/2,size,size,revealed?paper:ink);
        frame(b,p.x-size/2,p.y-size/2,size,size,selected?accent:ink,selected?3:1);
        if(canMove(list,data,n.id))frame(b,p.x-size/2-4,p.y-size/2-4,size+8,size+8,'#b88c49',2);
        if(revealed) {
          const sprite=nodeIcon(n,info); sprite.anchor.set(0.5); sprite.x=p.x;sprite.y=p.y;
          this._routeIcons.addChild(sprite);
        } else if(!revealed) {b.fontSize=36;b.textColor=paper;b.drawText('?',p.x-size/2,p.y-24,size,48,'center');b.fontSize=20;b.textColor=ink;}
        if(data.visited.includes(n.id)&&n.id!==data.current)b.drawText('✓',p.x+size/2-22,p.y-size/2,20,24,'center');
        b.drawText(text(info.caption || ''),p.x-60,p.y+size/2+8,120,30,'center');
        b.fontSize=15;b.textColor=accent;
        b.drawText(text(info.status || ''),p.x-70,p.y+size/2+37,140,24,'center');
        b.fontSize=20;b.textColor=ink;
      }
      if(data.title){b.fontFace=$gameSystem.numberFontFace();b.fontSize=38;b.drawText(text(data.title),60,45,Graphics.width-120,60,'center');b.fontSize=20;b.fontFace=$gameSystem.mainFontFace();}
      if(data.instruction)b.drawText(text(data.instruction),60,Graphics.height-65,Graphics.width-120,40,'center');
      const focus=list.find(n=>n.id===this._routeFocus);
      if(focus) {
        const info={...focus,...data.nodes[focus.id]}, p=point(focus), width=Math.min(430,Graphics.width-40),x=Math.min(Graphics.width-width-20,Math.max(20,p.x-width/2));
        const above=p.y-size/2-190, y=above>=20?above:Math.min(Graphics.height-100,p.y+size/2+20);
        rect(overlay,x,y,width,80,paper);frame(overlay,x,y,width,80,accent,2);
        overlay.fontFace=$gameSystem.mainFontFace();overlay.fontSize=22;overlay.textColor=ink;overlay.outlineWidth=0;
        overlay.drawText(info.revealed===false?'?':text(info.label),x+12,y+10,width-24,32,'center');
        overlay.fontSize=17;overlay.drawText(text(info.detail||''),x+12,y+43,width-24,25,'center');
      }
    }
    const p=point(list.find(n=>n.id===data.current)), travel=this._routeTravel;
    if(travel){const q=point(list.find(n=>n.id===travel.id)),t=travel.duration?Math.min(1,travel.elapsed/travel.duration):1;p.x=travel.from.x+(q.x-travel.from.x)*t;p.y=travel.from.y+(q.y-travel.from.y)*t;}
    this._routePawn.x=p.x;this._routePawn.y=p.y-size/2+8;
    if(this._routePawn.bitmap.isReady())this._routePawn.scale.set(92/this._routePawn.bitmap.height);
  };
})(globalThis);
