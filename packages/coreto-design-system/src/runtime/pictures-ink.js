(() => {
  'use strict';
  const ui = globalThis.CoretoDesignSystem?.ink;
  if (!ui || !globalThis.Sprite_Picture) return;
  const presentation = sprite => ui.adapters.picturePresentation(sprite?.picture?.(), sprite) || {};
  const indicator = sprite => ui.adapters.pictureIndicator(sprite);
  const surface = sprite => !!presentation(sprite).surface;
  const kindOf = sprite => presentation(sprite).kind;
  const loadBitmap = Sprite_Picture.prototype.loadBitmap;
  Sprite_Picture.prototype.loadBitmap = function() {
    const old = this._coretoInkSurfaceBitmap;
    if (old) { this.bitmap = null; old.destroy(); this._coretoInkSurfaceBitmap = null; }
    const result = loadBitmap.apply(this, arguments);
    if (!surface(this)) return result;
    const name = this._pictureName, source = this.bitmap;
    source.addLoadListener(() => {
      if (this._pictureName !== name || this._destroyed) return;
      const role = presentation(this);
      const width = role.width || source.width, height = role.height || source.height;
      const bitmap = new Bitmap(width, height);
      this._coretoInkSurfaceBitmap = bitmap; this.bitmap = bitmap;
      if (role.image) {
        const art = ImageManager.loadPicture(role.image);
        art.addLoadListener(() => {
          if (this._coretoInkSurfaceBitmap !== bitmap) return;
          const scale = Math.min((width - 48) / art.width, (height - 112) / art.height);
          bitmap.blt(art, 0, 0, art.width, art.height, (width - art.width * scale) / 2, 12, art.width * scale, art.height * scale);
        });
      }
    });
    return result;
  };
  const destroy = Sprite_Picture.prototype.destroy;
  Sprite_Picture.prototype.destroy = function() {
    const bitmap = this._coretoInkSurfaceBitmap; this._coretoInkSurfaceBitmap = null;
    if (bitmap) this.bitmap = null;
    const result = destroy.apply(this, arguments); bitmap?.destroy(); return result;
  };

  function binding(sprite) {
    const action = ui.adapters.pictureAction(sprite);
    if (Number.isInteger(action)) return action;
    const linked = presentation(sprite).interactionPictureId;
    if (linked) return $gameScreen.getPictureChoiceBinding(linked);
    if (sprite._coretoInkActionOwner) return binding(sprite._coretoInkActionOwner);
    for (let current = sprite; current; current = current.parent) {
      if (!current._pictureId) continue;
      const index = $gameScreen.getPictureChoiceBinding(current._pictureId);
      if (index >= 0) return index;
    }
    return -1;
  }
  function state(sprite) {
    const choices = SceneManager._scene?._choiceListWindow, index = binding(sprite);
    const bound = index >= 0 && !!choices?._list?.[index];
    const supplied = ui.adapters.pictureState(sprite, presentation(sprite)) || {};
    return { checked: !!supplied.checked,
      enabled: supplied.enabled ?? (supplied.disabled === undefined ? !bound || choices.isCommandEnabled(index) : !supplied.disabled),
      focused: !ui.hidden() && (supplied.focused ?? supplied.selected ?? (bound && choices.isOpenAndActive() && choices.index() === index)) };
  }
  const feedback = sprite => kindOf(sprite) === 'approach' ||
    (ui.adapters.pictureContext(SceneManager._scene) === 'sacrifice' && kindOf(sprite) === 'card') ? 'none' : presentation(sprite).feedback || 'none';
  const hitTest = Sprite_Picture.prototype.hitTest;
  const isBeingTouched = Sprite_Picture.prototype.isBeingTouched;
  Sprite_Picture.prototype.isBeingTouched = function() {
    const scene = SceneManager._scene;
    if (!ui.hidden() && scene?._choiceListWindow?.isOpenAndActive() && binding(this) >= 0) {
      const point = new Point(TouchInput.x, TouchInput.y);
      const owner = collect(scene._spriteset._pictureContainer).find(sprite => {
        const bubble = indicator(sprite);
        if (!bubble?.worldVisible || !state(sprite).enabled) return false;
        const local = sprite.worldTransform.applyInverse(point);
        return new Rectangle(bubble.x - 22, bubble.y - 22, 44, 44).contains(local.x, local.y);
      });
      if (owner) return this === owner;
    }
    return isBeingTouched.apply(this, arguments);
  };
  Sprite_Picture.prototype.hitTest = function(x, y) {
    // Game_Picture can already name the next asset before Sprite_Picture loads it.
    if (surface(this) && (!this.bitmap?.isReady() || this._pictureName !== this.picture()?.name())) return false;
    if (!surface(this) || binding(this) < 0) return hitTest.call(this, x, y);
    if (ui.hidden() || !state(this).enabled) return false;
    const bubble = indicator(this);
    if (bubble?.visible && SceneManager._scene._choiceListWindow?.isOpenAndActive() &&
      new Rectangle(bubble.x - 22, bubble.y - 22, 44, 44).contains(x, y)) return true;
    const width = this.bitmap.width, height = this.bitmap.height;
    const extraX = Math.max(0, ui.tokens.minimumTarget / Math.abs(this.worldTransform.a) - width) / 2;
    const extraY = Math.max(0, ui.tokens.minimumTarget / Math.abs(this.worldTransform.d) - height) / 2;
    return new Rectangle(-this.anchor.x * width - extraX, -this.anchor.y * height - extraY,
      width + extraX * 2, height + extraY * 2).contains(x, y);
  };
  const zones = ['upperleft', 'up', 'upperright', 'left', 'center', 'right', 'lowerleft', 'down', 'lowerright'];
  const pictureText = Sprite_Picture.prototype.drawPictureText;
  Sprite_Picture.prototype.drawPictureText = function() {
    if (!surface(this) || !this.anyPictureTextChanges()) return pictureText.apply(this, arguments);
    this._pictureTextWindow.createContents();
    const window = this._pictureTextWindow;
    const kind = feedback(this);
    ui.control(window, new Rectangle(0, 0, window.innerWidth, window.innerHeight),
      { ...state(this), feedback: kind, support: !!presentation(this).support },
      () => zones.forEach(zone => this.drawPictureTextZone(zone)));
    $gameScreen.clearPictureTextRefresh(this._pictureId);
  };
  const pictureZone = Sprite_Picture.prototype.drawPictureTextZone;
  Sprite_Picture.prototype.drawPictureTextZone = function(zone) {
    if (!surface(this)) return pictureZone.apply(this, arguments);
    const raw = $gameScreen.getPictureText(this._pictureId, zone);
    const text = ui.adapters.pictureText(this.picture(), zone, raw);
    const window = this._pictureTextWindow;
    this._pictureTextCache[zone] = raw;
    if (!text || kindOf(this) === 'approach') return;
    if (kindOf(this) === 'heading' && ui.adapters.pictureContext(SceneManager._scene) === 'approaches') return;
    const kind = feedback(this), inset = kind === 'choice' ? 30 : 12;
    const width = Math.max(1, window.innerWidth - inset * 2), size = window.textSizeEx(text);
    const column = zones.indexOf(zone) % 3, row = Math.floor(zones.indexOf(zone) / 3);
    const x = column === 1 ? Math.max(inset, (window.innerWidth - size.width) / 2) : column === 2 ? window.innerWidth - size.width - inset : inset;
    const y = row === 1 ? (window.innerHeight - size.height) / 2 : row === 2 ? window.innerHeight - size.height - 8 : 8;
    const ctx = window.contents.context;
    ctx.save();
    if (kind === 'icon' && state(this).focused && state(this).enabled && !ui.reducedMotion()) {
      ctx.translate(x + size.width / 2, y + size.height / 2);
      ctx.scale(1.05, 1.05); ctx.translate(-x - size.width / 2, -y - size.height / 2);
    }
    window.drawTextEx(text, x, y, width);
    ctx.restore();
  };
  const update = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    update.apply(this, arguments);
    if (!surface(this) || !this.bitmap?.isReady()) return;
    const current = state(this), signature = JSON.stringify([current, ui.adapters.pictureContext(SceneManager._scene), ConfigManager.textLocale, ui.reducedMotion(),
      zones.map(zone => ui.adapters.pictureText(this.picture(), zone, $gameScreen.getPictureText(this._pictureId, zone)))]);
    const bubble = indicator(this);
    if (bubble) {
      bubble.anchor.set(0.5, 0.5); bubble.y = -this.bitmap.height * this.anchor.y - 20;
      const target = bubble.visible && current.enabled && current.focused && !ui.reducedMotion() ? 1.05 : 1;
      const now = performance.now();
      if (this._coretoInkBubbleTween?.target !== target) {
        this._coretoInkBubbleTween = { from: bubble.scale.x, target, start: now };
      }
      const tween = this._coretoInkBubbleTween, progress = Math.min(1, (now - tween.start) / ui.tokens.bubbleDuration);
      bubble.scale.set(ui.reducedMotion() ? 1 : tween.from + (target - tween.from) * (1 - (1 - progress) ** 2));
      bubble.setBlendColor([85, 32, 112, current.focused && current.enabled && ui.reducedMotion() ? 64 : 0]);
    }
    this.setColorTone([0, 0, 0, 0]);
    if (signature !== this._coretoInkInkState && this._pictureTextWindow) {
      this._coretoInkInkState = signature;
      $gameScreen.requestPictureTextRefresh(this._pictureId);
      this.drawPictureText(); this.attachPictureText();
    }
  };
  const applySettings = Game_Picture.prototype.applyPictureChoiceSettings;
  Game_Picture.prototype.applyPictureChoiceSettings = function(settings, instant) {
    if (!ui.adapters.picturePresentation(this)?.neutral) return applySettings.call(this, settings, instant);
    const neutral = { ...settings };
    for (const key of ['TargetScaleX', 'TargetScaleY']) neutral[key] = 'Unchanged';
    for (const key of ['TargetToneRed', 'TargetToneGreen', 'TargetToneBlue', 'TargetToneGray']) neutral[key] = '0';
    return applySettings.call(this, neutral, instant);
  };

  const plain = (choices, raw) => choices.convertEscapeCharacters(raw)
    .replace(/\x1b[A-Za-z]+(?:\[[^\]]*\]|<[^>]*>)/g, '').replace(/<[^>]*>/g, '').trim();
  function pictureRect(sprite, container) {
    sprite.getBounds();
    const width = sprite.bitmap.width, height = sprite.bitmap.height;
    const origin = sprite.worldTransform.apply(new Point(-sprite.anchor.x * width, -sprite.anchor.y * height));
    const end = sprite.worldTransform.apply(new Point((1 - sprite.anchor.x) * width, (1 - sprite.anchor.y) * height));
    const point = container.worldTransform.applyInverse(origin), corner = container.worldTransform.applyInverse(end);
    return new Rectangle(point.x, point.y, corner.x - point.x, corner.y - point.y);
  }

  const alphaBounds = new WeakMap();
  function artworkBounds(bitmap) {
    if (alphaBounds.has(bitmap)) return alphaBounds.get(bitmap);
    const {width, height} = bitmap, data = bitmap.context.getImageData(0, 0, width, height).data;
    let left = width, top = height, right = -1, bottom = -1;
    for (let y = 0; y < height; y++) for (let x = 0; x < width; x++) {
      if (data[(y * width + x) * 4 + 3] < 16) continue;
      left = Math.min(left, x); right = Math.max(right, x); top = Math.min(top, y); bottom = Math.max(bottom, y);
    }
    const rect = right < 0 ? null : new Rectangle(left, top, right - left + 1, bottom - top + 1);
    alphaBounds.set(bitmap, rect); return rect;
  }
  function artworkRect(sprite, container, bounds) {
    const full = pictureRect(sprite, container);
    return new Rectangle(full.x + bounds.x * full.width / sprite.bitmap.width, full.y + bounds.y * full.height / sprite.bitmap.height,
      bounds.width * full.width / sprite.bitmap.width, bounds.height * full.height / sprite.bitmap.height);
  }
  function associateArtwork(pictures, container, kind) {
    for (const sprite of pictures) sprite._coretoInkActionOwner = null;
    if (kind !== 'roster') return;
    const targets = pictures.filter(s => !surface(s) && binding(s) >= 0 && !artworkBounds(s.bitmap));
    const art = pictures.filter(s => !surface(s) && binding(s) < 0);
    for (const sprite of art) {
      const bounds = artworkBounds(sprite.bitmap);
      if (!bounds || bounds.width * bounds.height > sprite.bitmap.width * sprite.bitmap.height * 0.8) continue;
      const rect = artworkRect(sprite, container, bounds);
      const matches = targets.filter(target => {
        const r = pictureRect(target, container);
        const intersection = Math.max(0, Math.min(r.x + r.width, rect.x + rect.width) - Math.max(r.x, rect.x)) *
          Math.max(0, Math.min(r.y + r.height, rect.y + rect.height) - Math.max(r.y, rect.y));
        return intersection / (r.width * r.height + rect.width * rect.height - intersection) > 0.8;
      });
      if (matches.length === 1) sprite._coretoInkActionOwner = matches[0];
    }
  }
  const vertices = Sprite_Picture.prototype.calculateVertices;
  Sprite_Picture.prototype.calculateVertices = function() {
    vertices.call(this);
    if (!this._coretoInkImageScale || this._coretoInkImageScale === 1) return;
    const bounds = this._coretoInkArtBounds || new Rectangle(0, 0, this.bitmap.width, this.bitmap.height);
    const center = this.worldTransform.apply(new Point(bounds.x + bounds.width / 2 - this.anchor.x * this.bitmap.width,
      bounds.y + bounds.height / 2 - this.anchor.y * this.bitmap.height));
    for (let i = 0; i < this.vertexData.length; i += 2) {
      this.vertexData[i] = center.x + (this.vertexData[i] - center.x) * this._coretoInkImageScale;
      this.vertexData[i + 1] = center.y + (this.vertexData[i + 1] - center.y) * this._coretoInkImageScale;
    }
    this._transformID = -1;
  };
  function updateArtwork(pictures, kind) {
    for (const sprite of pictures) {
      const interactive = !surface(sprite) && binding(sprite) >= 0 && ['roster', 'approaches', 'sacrifice'].includes(kind);
      const focused = interactive && state(sprite).enabled && state(sprite).focused;
      sprite._coretoInkImageScale = focused ? ui.tokens.imageFocusScale : 1;
      sprite._transformID = -1;
      if (interactive) {
        sprite._coretoInkArtBounds = kind === 'roster' ? artworkBounds(sprite.bitmap) : null;
        sprite.setColorTone([0, 0, 0, 0]);
      }
    }
  }
  function movePicture(sprite, x, y, container) {
    if (sprite.parent !== container) {
      const point = sprite.parent.worldTransform.applyInverse(container.worldTransform.apply(new Point(x, y)));
      x = point.x; y = point.y;
    }
    sprite._coretoInkLayoutPosition = { x, y, name:sprite._pictureName, context:ui.adapters.pictureContext(SceneManager._scene) };
    sprite.x = x; sprite.y = y;
    sprite.getBounds();
  }
  const updatePosition = Sprite_Picture.prototype.updatePosition;
  const updateScale = Sprite_Picture.prototype.updateScale;
  Sprite_Picture.prototype.updateScale = function() {
    updateScale.apply(this, arguments);
    if (presentation(this).slot === 'footer-start') this.scale.set(1);
  };
  Sprite_Picture.prototype.updatePosition = function() {
    updatePosition.apply(this, arguments);
    const position = this._coretoInkLayoutPosition;
    if (!position) return;
    if (position.name !== this._pictureName || position.context !== ui.adapters.pictureContext(SceneManager._scene)) {
      delete this._coretoInkLayoutPosition; return;
    }
    this.x = position.x; this.y = position.y;
  };
  function arrangeApproaches(pictures, preview, container, choices) {
    const cards = pictures.filter(s => kindOf(s) === 'approach').sort((a, b) => a.x - b.x);
    if (!cards.length) return null;
    const width = Math.min(Graphics.boxWidth - 48, Math.max(880, cards.length * 280 + 48));
    const left = (Graphics.boxWidth - width) / 2, bottom = Graphics.boxHeight - 18;
    const descriptions = choices._list.map(item => plain(choices, item.name));
    const descriptionHeight = Math.max(...cards.map(s => CoretoDesignSystem.measure(preview.bitmap, descriptions[binding(s)] || '', width - 96, 'Body').lines.length)) * 30 + 12;
    const headings = pictures.filter(s => kindOf(s) === 'heading');
    const title = headings.flatMap(s => zones.map(zone => $gameScreen.getPictureText(s._pictureId, zone)).filter(Boolean)).map(text => plain(choices, text)).join(' ');
    const titleLines = CoretoDesignSystem.measure(preview.bitmap, title, width - 340, 'Speaker').lines.length;
    const headerHeight = Math.max(60, titleLines * Math.max(30, CoretoDesignSystem.style('Speaker').Size + 10) + 12);
    const rowHeight = 150, height = 24 + headerHeight + rowHeight + descriptionHeight + 12;
    const top = bottom - height, rowTop = top + 12 + headerHeight;
    const actions = pictures.filter(s => kindOf(s) === 'button');
    for (const heading of headings) {
      movePicture(heading, left + (width - 256) / 2, top + 42, container);
    }
    for (const action of actions) movePicture(action, left + width - 128, top + 12 + headerHeight / 2, container);
    cards.forEach((card, index) => {
      const x = left + 24 + (index + 0.5) * (width - 48) / cards.length;
      movePicture(card, x, rowTop + rowHeight / 2, container);
      for (const art of pictures.filter(s => !surface(s) && binding(s) === binding(card))) movePicture(art, x, rowTop + rowHeight / 2, container);
    });
    return {rect:new Rectangle(left, top, width, height), title, heading:new Rectangle(left + 12, top + 12, width - 268, headerHeight), descriptions,
      description:new Rectangle(left + 18, rowTop + rowHeight, width - 36, descriptionHeight),
      row:new Rectangle(left + 24, rowTop, width - 48, rowHeight), cards};
  }
  function arrangeSlots(pictures, container) {
    for (const sprite of pictures) {
      const slot = presentation(sprite).slot;
      if (!slot) continue;
      if (slot.startsWith('footer-')) {
        const x = slot === 'footer-start' ? 144 : slot === 'footer-end' ? Graphics.width - 144 : Graphics.width / 2;
        movePicture(sprite, x, Graphics.height - 56, container);
      } else if (slot === 'panel-heading') {
        const cards = pictures.filter(s => kindOf(s) === 'card');
        if (!cards.length) continue;
        const top = Math.min(...cards.map(s => pictureRect(s, container).y));
        movePicture(sprite, Graphics.width / 2, top - 24 - sprite.height / 2, container);
      }
    }
  }
  function union(rects) {
    const left = Math.min(...rects.map(r => r.x)), top = Math.min(...rects.map(r => r.y));
    return new Rectangle(left, top, Math.max(...rects.map(r => r.x + r.width)) - left,
      Math.max(...rects.map(r => r.y + r.height)) - top);
  }
  function collect(container, result = []) {
    for (const child of container.children || []) {
      if (child instanceof Sprite_Picture && child.visible && child.bitmap?.isReady() && child.opacity > 0) result.push(child);
      collect(child, result);
    }
    return result;
  }
  const create = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    create.apply(this, arguments);
    this._coretoInkGroupPaper = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this._spriteset._pictureContainer.addChildAt(this._coretoInkGroupPaper, 0);
    this._coretoInkApproachText = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this.addChild(this._coretoInkApproachText);
  };
  const sceneUpdate = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    const result = sceneUpdate.apply(this, arguments);
    const panel = this._coretoInkGroupPaper, preview = this._coretoInkApproachText;
    if (!panel) return result;
    const choices = this._choiceListWindow, container = this._spriteset._pictureContainer;
    const kind = ui.adapters.pictureContext(this);
    const visible = !ui.hidden(); panel.visible = visible; preview.visible = visible;
    const pictures = collect(container);
    arrangeSlots(pictures, container);
    associateArtwork(pictures, container, kind);
    updateArtwork(pictures, kind);
    const approachLayout = kind === 'approaches' && choices?.isOpenAndActive() ? arrangeApproaches(pictures, preview, container, choices) : null;
    const sprites = pictures.filter(sprite => presentation(sprite).group !== 'none' && (surface(sprite) || presentation(sprite).group));
    if (sprites.length) {
      const roots = sprites.map(sprite => { while (sprite.parent !== container) sprite = sprite.parent; return sprite; });
      const first = Math.min(...roots.map(sprite => container.getChildIndex(sprite)));
      const current = container.getChildIndex(panel);
      container.setChildIndex(panel, current < first ? first - 1 : first);
    }
    const signature = JSON.stringify([ImageManager.loadSystem(CoretoDesignSystem.config.PaperImage).isReady(), visible, kind, choices?.isOpenAndActive(), choices?.index(), ConfigManager.textLocale,
      sprites.map(sprite => [sprite._pictureId, sprite._pictureName, sprite.width, sprite.height,
        sprite.worldTransform.a, sprite.worldTransform.d, sprite.worldTransform.tx, sprite.worldTransform.ty])]);
    if (this._coretoInkGroupSignature === signature) return result;
    this._coretoInkGroupSignature = signature; panel.bitmap.clear(); preview.bitmap.clear();
    if (!visible || SceneManager.isSceneTitleMap?.()) return result;
    const bases = sprites.filter(sprite => !['panel', 'heading'].includes(kindOf(sprite)));
    const existingPanel = sprites.find(sprite => kindOf(sprite) === 'panel');
    const rects = bases.map(sprite => pictureRect(sprite, container));
    let regions = [];
    if (existingPanel) regions = [union([pictureRect(existingPanel, container), ...rects])];
    else if (kind === 'roster') {
      const actions = bases.filter(sprite => pictureRect(sprite, container).y > Graphics.boxHeight / 2);
      if (actions.length) regions.push(union(actions.map(sprite => pictureRect(sprite, container))));
    }
    else if (kind === 'sacrifice' && rects.length) {
      const heading = sprites.find(sprite => kindOf(sprite) === 'heading');
      regions = [union([...rects, ...(heading ? [pictureRect(heading, container)] : [])])];
    }
    else if (rects.length) {
      // Nearby labels share a strip while the stage portraits remain exposed.
      for (const rect of rects) {
        const nearby = regions.find(r => Math.abs(r.y - rect.y) < 24);
        if (nearby) Object.assign(nearby, union([nearby, rect])); else regions.push(rect);
      }
    }
    if (approachLayout) {
      regions = [approachLayout.rect];
      ui.label({contents:preview.bitmap}, approachLayout.title, approachLayout.heading, {}, 'Speaker', 'center');
      const index = choices.index();
      const illustration = approachLayout.cards.find(sprite => binding(sprite) === index);
      if (illustration && choices.isCommandEnabled(index)) {
        ui.label({ contents: preview.bitmap }, approachLayout.descriptions[index], approachLayout.description, {}, 'Body', 'center');
      }
    }
    const padding = kind === 'sacrifice' ? 12 : 6;
    for (const rect of regions) ui.paper(panel.bitmap, Math.max(0, rect.x - padding), Math.max(0, rect.y - padding), rect.width + padding * 2, rect.height + padding * 2);
    const rows = approachLayout ? [approachLayout.cards.map(s => pictureRect(s, container))] : [];
    if (!approachLayout) for (const rect of rects) {
      const row = rows.find(row => Math.abs(row[0].y - rect.y) < 24);
      if (row) row.push(rect); else rows.push([rect]);
    }
    for (const row of rows) {
      row.sort((a,b) => a.x-b.x);
      for (let i = 1; i < row.length; i++) {
        const a = row[i-1], b = row[i], x = (a.x+a.width+b.x)/2;
        if (a.x+a.width > b.x+2) continue;
        const y = approachLayout ? approachLayout.row.y : Math.max(a.y,b.y);
        const bottom = approachLayout ? y+approachLayout.row.height : Math.min(a.y+a.height,b.y+b.height);
        ui.divider(panel.bitmap,x,y+12,x,bottom-12);
      }
    }
    for (const title of sprites.filter(sprite => kindOf(sprite) === 'heading' && !['approaches', 'sacrifice'].includes(kind))) {
      const rect = pictureRect(title, container); ui.paper(panel.bitmap, rect.x, rect.y, rect.width, rect.height);
    }
    return result;
  };
  const terminate = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    this._coretoInkGroupPaper?.bitmap.destroy(); this._coretoInkApproachText?.bitmap.destroy();
    return terminate.apply(this, arguments);
  };
})();
