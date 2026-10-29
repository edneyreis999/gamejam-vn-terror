(() => {
  'use strict';
  const theme = CoretoDesignSystem;
  if (!theme) return;
  const adapters = {
    choiceFeedback: () => 'choice', choiceBadge: () => undefined,
    interfaceHidden: () => false, consumeInput: () => {},
    picturePresentation: () => null, pictureContext: () => null,
    pictureIndicator: () => null, pictureAction: () => null, pictureState: () => null,
    pictureText: (picture, zone, text) => text
  };
  let legacyPictures = null;
  adapters.picturePresentation = (picture, sprite) => {
    const supplied = legacyPictures?.(picture, sprite);
    const role = supplied || theme.config.PictureRoles.find(item => item.Image === picture?.name());
    if (!role) return null;
    const kind = role.kind || role.Role;
    return { ...role, surface: role.surface !== false, kind,
      feedback: kind === 'primary' ? 'choice' : kind === 'secondary' ? 'secondary' : 'none',
      neutral: true };
  };
  theme.registerAdapter({pictures: () => null});
  function registerAdapter(adapter) {
    const {pictures, ...rest} = adapter;
    if (typeof pictures === 'function') legacyPictures = pictures;
    theme.registerAdapter(rest);
    for (const key of Object.keys(adapters)) if (typeof adapter[key] === 'function') adapters[key] = adapter[key];
  }
  // Consume the same press in the reading layer, even without a game adapter.
  let confirmationConsumed = false;
  const heldKeys = new Set();
  let primaryHeld = false;
  if (theme.config.Windows) {
    for (const [method, down] of [['_onKeyDown', true], ['_onKeyUp', false]]) {
      const previous = Input[method];
      Input[method] = function(event) {
        if (down) heldKeys.add(event.keyCode); else heldKeys.delete(event.keyCode);
        previous.call(this, event);
      };
    }
    for (const [method, down] of [['_onMouseDown', true], ['_onMouseUp', false]]) {
      const previous = TouchInput[method];
      TouchInput[method] = function(event) { if (event.button === 0) primaryHeld = down; previous.call(this, event); };
    }
    const lostFocus = Input._onLostFocus;
    Input._onLostFocus = function() { heldKeys.clear(); primaryHeld = false; lostFocus.call(this); };
    const updateInput = Input.update;
    Input.update = function() {
      if (confirmationConsumed && heldKeys.size === 0 && !primaryHeld) {
        confirmationConsumed = false; Input.clear(); TouchInput.clear();
      }
      updateInput.call(this);
    };
  }
  function consumeInput() { confirmationConsumed = true; Input.clear(); TouchInput.clear(); adapters.consumeInput(); }

  const tokens = Object.freeze({
    ink: theme.colors.text, focus: theme.colors.primary, muted: '#69543f',
    indicator: 24, gap: 6, line: 30, minimumTarget: 44,
    divider: '#360A0B', dividerOpacity: 0.3, novelty: '#F1B725',
    imageFocusScale: 1.1, bubbleDuration: 150
  });
  const skin = () => ImageManager.loadSystem(theme.config.PaperImage);
  const reducedMotion = () => matchMedia('(prefers-reduced-motion: reduce)').matches;
  const hidden = () => !!(adapters.interfaceHidden() || SceneManager._scene?._messageWindow?.scale.x === 0);

  function divider(bitmap, x1, y1, x2, y2) {
    const ctx = bitmap.context; ctx.save();
    ctx.strokeStyle = tokens.divider; ctx.globalAlpha = tokens.dividerOpacity; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke(); ctx.restore();
    bitmap.baseTexture.update();
  }

  function tile(bitmap, source, sx, sy, sw, sh, x, y, width, height, tileWidth = sw, tileHeight = sh) {
    for (let dy = 0; dy < height; dy += tileHeight) for (let dx = 0; dx < width; dx += tileWidth) {
      const w = Math.min(tileWidth, width - dx), h = Math.min(tileHeight, height - dy);
      bitmap.blt(source, sx, sy, sw * w / tileWidth, sh * h / tileHeight, x + dx, y + dy, w, h);
    }
  }

  function paper(bitmap, x = 0, y = 0, width = bitmap.width, height = bitmap.height, frame = true) {
    const source = skin();
    if (!source.isReady()) return;
    if (!frame) { tile(bitmap, source, 24, 24, 48, 48, x, y, width, height); return; }
    const edge = Math.min(12, Math.floor(width / 2), Math.floor(height / 2));
    tile(bitmap, source, 24, 24, 48, 48, x + edge, y + edge, width - edge * 2, height - edge * 2);
    for (const [sx, sy, dx, dy] of [[96, 0, 0, 0], [192 - edge, 0, width - edge, 0],
      [96, 96 - edge, 0, height - edge], [192 - edge, 96 - edge, width - edge, height - edge]]) {
      bitmap.blt(source, sx, sy, edge, edge, x + dx, y + dy);
    }
    const strip = 96 - edge * 2, repeat = strip * 3;
    tile(bitmap, source, 96 + edge, 0, strip, edge, x + edge, y, width - edge * 2, edge, repeat, edge);
    tile(bitmap, source, 96 + edge, 96 - edge, strip, edge, x + edge, y + height - edge, width - edge * 2, edge, repeat, edge);
    tile(bitmap, source, 96, edge, edge, strip, x, y + edge, edge, height - edge * 2, edge, repeat);
    tile(bitmap, source, 192 - edge, edge, edge, strip, x + width - edge, y + edge, edge, height - edge * 2, edge, repeat);
  }

  function quill(bitmap, x, y, color = tokens.focus, size = tokens.indicator) {
    const ctx = bitmap.context;
    ctx.save(); ctx.translate(x, y); ctx.scale(size / 24, size / 24);
    ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 1.5;
    ctx.beginPath(); ctx.moveTo(3, 22); ctx.quadraticCurveTo(9, 10, 21, 2);
    ctx.quadraticCurveTo(21, 13, 10, 17); ctx.lineTo(6, 18); ctx.fill();
    ctx.beginPath(); ctx.moveTo(2, 23); ctx.lineTo(19, 5); ctx.stroke();
    ctx.globalCompositeOperation = 'destination-out'; ctx.lineWidth = 1;
    for (const [a, b, c, d] of [[10, 11, 16, 9], [8, 14, 14, 13], [13, 8, 13, 5]]) {
      ctx.beginPath(); ctx.moveTo(a, b); ctx.lineTo(c, d); ctx.stroke();
    }
    ctx.restore(); bitmap.baseTexture.update();
  }

  function check(bitmap, x, y, color = tokens.focus) {
    const ctx = bitmap.context; ctx.save(); ctx.translate(x, y); ctx.fillStyle = color;
    // Broken wax disk with two unequal drips; the negative ring survives at 24px.
    ctx.beginPath(); ctx.moveTo(11, 1);
    ctx.bezierCurveTo(14, 0, 15, 2, 18, 2); ctx.lineTo(18, 4);
    ctx.bezierCurveTo(22, 4, 21, 7, 22, 9); ctx.lineTo(20, 11);
    ctx.lineTo(23, 13); ctx.lineTo(20, 14);
    ctx.bezierCurveTo(19, 16, 19, 17, 18, 18);
    ctx.lineTo(18, 21); ctx.quadraticCurveTo(17, 24, 16, 21); ctx.lineTo(15, 18);
    ctx.quadraticCurveTo(12, 20, 10, 18);
    ctx.lineTo(9, 22); ctx.bezierCurveTo(9, 25, 5, 24, 6, 21); ctx.lineTo(6, 17);
    ctx.lineTo(3, 16); ctx.lineTo(4, 14); ctx.lineTo(2, 12);
    ctx.bezierCurveTo(3, 9, 1, 7, 4, 5); ctx.lineTo(5, 3); ctx.lineTo(8, 3); ctx.closePath();
    ctx.moveTo(6, 12); ctx.bezierCurveTo(4, 6, 10, 3, 15, 6);
    ctx.bezierCurveTo(10, 5, 7, 8, 6, 12); ctx.closePath();
    ctx.moveTo(17, 8); ctx.bezierCurveTo(21, 14, 14, 19, 9, 15);
    ctx.bezierCurveTo(14, 17, 18, 13, 17, 8); ctx.closePath();
    ctx.fill('evenodd'); ctx.restore(); bitmap.baseTexture.update();
  }

  function brush(bitmap, left, top, right, bottom) {
    const ctx = bitmap.context, height = bottom - top, width = right - left;
    ctx.save(); ctx.globalCompositeOperation = 'destination-over'; ctx.fillStyle = theme.colors.canvas;
    ctx.translate(left, top); ctx.beginPath();
    ctx.moveTo(0, height * 0.64);
    ctx.quadraticCurveTo(6, height * 0.46, 12, 3);
    ctx.bezierCurveTo(width * 0.25, -1, width * 0.35, 3, width * 0.5, 2);
    ctx.quadraticCurveTo(width * 0.8, 0, width - 12, 2);
    ctx.quadraticCurveTo(width - 5, 4, width - 2, height * 0.33);
    ctx.lineTo(width - 8, height * 0.38); ctx.lineTo(width, height * 0.4);
    ctx.quadraticCurveTo(width - 6, height * 0.56, width - 10, height - 4);
    ctx.lineTo(width - 4, height * 0.76);
    ctx.quadraticCurveTo(width - 9, height, width - 18, height - 1);
    ctx.bezierCurveTo(width * 0.65, height + 1, width * 0.4, height - 3, 12, height - 1);
    ctx.quadraticCurveTo(5, height - 1, 2, height * 0.82);
    ctx.lineTo(8, height * 0.68); ctx.lineTo(1, height * 0.73);
    ctx.closePath(); ctx.fill(); ctx.restore(); bitmap.baseTexture.update();
  }

  function style(bitmap, role = 'Action', color = tokens.ink) {
    const font = theme.style(role);
    bitmap.fontFace = font.Face; bitmap.fontSize = font.Size;
    bitmap.fontBold = false; bitmap.fontItalic = false; bitmap.outlineWidth = 0;
    bitmap.textColor = color; bitmap.paintOpacity = 255;
  }

  function wrapText(bitmap, text, width) {
    const lines = [];
    for (const paragraph of text.split(/\n|<BR>|<LINEBREAK>/i)) {
      let line = '';
      for (const word of paragraph.split(/\s+/)) {
        const next = line ? line + ' ' + word : word;
        if (line && bitmap.measureTextWidth(next) > width) { lines.push(line); line = word; }
        else line = next;
      }
      lines.push(line);
    }
    return lines;
  }

  function underline(bitmap, run, color) {
    const ctx = bitmap.context;
    ctx.save(); ctx.strokeStyle = color; ctx.lineWidth = 2;
    const baseline = run.y + run.height / 2 + run.size * 0.35;
    const y = Math.ceil(baseline + Math.max(3, run.descent + 2));
    ctx.beginPath(); ctx.moveTo(run.x, y); ctx.lineTo(run.x + run.width, y); ctx.stroke();
    ctx.restore(); bitmap.baseTexture.update();
  }

  function control(window, rect, state, draw) {
    const bitmap = window.contents, previous = bitmap._coretoInkControl;
    const current = { runs: [], seals: [], feedback: 'none', ...state };
    bitmap._coretoInkControl = current;
    try { draw(); } finally { bitmap._coretoInkControl = previous; }
    if (!current.runs.length) return;
    const color = state.enabled === false ? tokens.muted : state.focused ? tokens.focus : tokens.ink;
    const first = current.runs[0];
    if (state.checked) {
      const x = Math.max(rect.x, first.x - tokens.indicator - tokens.gap);
      check(bitmap, x, first.y + (first.height - 24) / 2);
      current.seals.push({x, width:tokens.indicator});
    }
    if (state.focused && state.enabled !== false && ['choice', 'secondary'].includes(current.feedback)) {
      current.runs.forEach(run => underline(bitmap, run, color));
      const last = current.runs[current.runs.length - 1];
      if (current.feedback === 'choice') quill(bitmap, last.x + last.width + tokens.gap, last.y + (last.height - tokens.indicator) / 2, color);
    }
    if (state.support) {
      const marks = [...current.runs, ...current.seals];
      const left = Math.min(...marks.map(run => run.x)) - 12;
      const right = Math.max(...marks.map(run => run.x + run.width)) + 12;
      const top = Math.min(...current.runs.map(run => run.y + run.height / 2 - run.size * 0.65)) - 6;
      const bottom = Math.max(...current.runs.map(run => run.y + run.height / 2 + run.size * 0.5)) + 6;
      brush(bitmap, left, top, right, bottom);
    }
  }

  const measureTextWidth = Bitmap.prototype.measureTextWidth;
  const drawOutline = Bitmap.prototype._drawTextOutline;
  Bitmap.prototype._drawTextOutline = function() {
    // Canvas ignores lineWidth=0; skipping the stroke is what removes the outline.
    if (this.outlineWidth <= 0) return;
    return drawOutline.apply(this, arguments);
  };
  Bitmap.prototype.measureTextWidth = function(text) {
    const parts = String(text).split('✓');
    return parts.length === 1 ? measureTextWidth.apply(this, arguments) :
      parts.reduce((width, part) => width + measureTextWidth.call(this, part), (parts.length - 1) * tokens.indicator);
  };
  const drawText = Bitmap.prototype.drawText;
  Bitmap.prototype.drawText = function(text, x, y, maxWidth, lineHeight, align) {
    const state = this._coretoInkControl;
    if (!state || !String(text).trim()) return drawText.apply(this, arguments);
    if (String(text).includes('✓')) {
      const parts = String(text).split('✓'), width = this.measureTextWidth(text);
      let left = align === 'center' ? x + (maxWidth - width) / 2 : align === 'right' ? x + maxWidth - width : x;
      parts.forEach((part, index) => {
        const span = this.measureTextWidth(part);
        if (part) this.drawText(part, left, y, span, lineHeight, 'left');
        left += span;
        if (index === parts.length - 1) return;
        check(this, left, y + (lineHeight - tokens.indicator) / 2);
        state.seals.push({ x: left, width: tokens.indicator }); left += tokens.indicator;
      });
      return;
    }
    if (state.badge === String(text)) {
      const saved = { fontFace: this.fontFace, fontBold: this.fontBold, outlineWidth: this.outlineWidth, textColor: this.textColor };
      this.fontFace = theme.style('Label').Face; this.fontBold = false; this.outlineWidth = 0;
      this.textColor = tokens.ink;
      const badge = String(text).toLocaleUpperCase(), dotSpace = 14;
      const width = this.measureTextWidth(badge);
      const left = align === 'right' ? x + maxWidth - width - dotSpace : align === 'center' ? x + (maxWidth - width - dotSpace) / 2 : x;
      drawText.call(this, badge, left, y, width, lineHeight, 'left');
      this.drawCircle(left + width + 8, y + lineHeight / 2 - this.fontSize * 0.35, 3, tokens.novelty);
      Object.assign(this, saved); return;
    }
    this.textColor = state.enabled === false ? tokens.muted : state.focused && state.feedback !== 'none' ? tokens.focus : tokens.ink;
    this.outlineWidth = 0;
    const ctx = this.context; ctx.save(); ctx.font = this._makeFontNameText();
    const metrics = ctx.measureText(TextManager.parseLocalizedText(String(text))); ctx.restore();
    const width = Math.min(metrics.width, maxWidth || metrics.width);
    const left = align === 'center' ? x + (maxWidth - width) / 2 : align === 'right' ? x + maxWidth - width : x;
    const result = drawText.apply(this, arguments);
    state.runs.push({ x: left, y, width, height: lineHeight, size: this.fontSize,
      descent: metrics.actualBoundingBoxDescent || this.fontSize * 0.2 });
    return result;
  };

  function label(window, text, rect, state = {}, role = 'Action', align = 'left') {
    text = TextManager.parseLocalizedText(text);
    const b = window.contents; style(b, role);
    const inset = tokens.indicator + tokens.gap;
    const width = Math.max(1, rect.width - inset * 2);
    const lines = wrapText(b, text, width), line = Math.max(tokens.line, b.fontSize + 10);
    control(window, rect, state, () => lines.forEach((value, i) =>
      b.drawText(value, rect.x + inset, rect.y + (rect.height - lines.length * line) / 2 + i * line, width, line, align)));
  }

  if (theme.config.Windows) {
  const createOptions = Scene_Options.prototype.create;
  Scene_Options.prototype.create = function() {
    createOptions.apply(this, arguments);
    this._coretoOptionsPaper = new Sprite(new Bitmap(Graphics.boxWidth, Graphics.boxHeight));
    this.addChildAt(this._coretoOptionsPaper, this.getChildIndex(this._windowLayer));
    for (const control of this._windowLayer.children) if (control.y < 16) control.y = 18;
  };
  const updateOptions = Scene_Options.prototype.update;
  Scene_Options.prototype.update = function() {
    updateOptions.apply(this, arguments);
    const panel = this._coretoOptionsPaper;
    if (!panel) return;
    const windows = this._windowLayer.children.filter(w => w instanceof Window_Base && w.visible);
    const signature = JSON.stringify([skin().isReady(), windows.map(w => [w.x,w.y,w.width,w.height])]);
    if (signature === this._coretoOptionsPaperSignature) return;
    this._coretoOptionsPaperSignature = signature; panel.bitmap.clear();
    paper(panel.bitmap, 12, 6, Graphics.boxWidth - 24, Graphics.boxHeight - 18);
    const category = windows.find(w => globalThis.Window_OptionsCategory && w instanceof Window_OptionsCategory);
    if (category) {
      divider(panel.bitmap, 40, category.y, Graphics.boxWidth - 40, category.y);
      divider(panel.bitmap, 40, category.y + category.height + 6, Graphics.boxWidth - 40, category.y + category.height + 6);
    }
  };
  const terminateOptions = Scene_Options.prototype.terminate;
  Scene_Options.prototype.terminate = function() {
    this._coretoOptionsPaper?.bitmap.destroy();
    return terminateOptions.apply(this, arguments);
  };
  const windowSurface = w => w instanceof Window_Base && !(w instanceof Window_ScrollText) &&
    !(w instanceof Window_MapName) && !(w instanceof Window_NameBox) &&
    !(globalThis.Window_ButtonConsole && w instanceof Window_ButtonConsole) && !w._coretoPictureText &&
    (w.constructor.name !== 'Window_ButtonAssist' || SceneManager._scene instanceof Scene_MenuBase);
  for (const method of ['_refreshBack', '_refreshFrame']) {
    const previous = Window.prototype[method];
    Window.prototype[method] = function() {
      if (!windowSurface(this)) return previous.apply(this, arguments);
      const sprite = method === '_refreshBack' ? this._backSprite : this._frameSprite;
      const key = method === '_refreshBack' ? '_coretoInkPaperBack' : '_coretoInkPaperFrame';
      this[key]?.destroy();
      const bitmap = this[key] = new Bitmap(Math.max(1, this.width), Math.max(1, this.height));
      if (method === '_refreshBack' && !(SceneManager._scene instanceof Scene_Options)) {
        skin().addLoadListener(() => { if (this[key] === bitmap && !this._destroyed) paper(bitmap); });
      }
      sprite.bitmap = bitmap; sprite.setFrame(0, 0, this.width, this.height);
      sprite.move(0, 0); sprite.scale.set(1); sprite.setColorTone([0, 0, 0, 0]);
      for (const child of sprite.children) { child.bitmap = null; child.visible = false; }
    };
  }
  const destroyWindow = Window_Base.prototype.destroy;
  Window_Base.prototype.destroy = function() {
    const bitmaps = [this._coretoInkPaperBack, this._coretoInkPaperFrame];
    const result = destroyWindow.apply(this, arguments);
    bitmaps.forEach(bitmap => bitmap?.destroy()); return result;
  };

  const background = Window_Selectable.prototype.drawItemBackground;
  Window_Selectable.prototype.drawItemBackground = function(index) {
    if (!windowSurface(this)) return background.apply(this, arguments);
    const r = this.itemRect(index); this.contentsBack.clearRect(r.x, r.y, r.width, r.height);
  };
  const drawChoice = Window_ChoiceList.prototype.drawItem;
  Window_ChoiceList.prototype.drawItem = function(index) {
    if (this._pictureChoicesHidden) return drawChoice.apply(this, arguments);
    const rect = this.itemRect(index);
    const name = this.commandName(index);
    const feedback = adapters.choiceFeedback(this, index, name);
    return control(this, rect, { feedback, enabled: this.isCommandEnabled(index), focused: this.active && index === this.index(), badge: adapters.choiceBadge(this, index) },
      () => drawChoice.call(this, index));
  };
  const commandName = Window_ChoiceList.prototype.commandName;
  Window_ChoiceList.prototype.commandName = function(index) {
    const name = commandName.call(this, index);
    return SceneManager.isSceneTitleMap?.() ? name.replace(/\\FontChange<[^>]+>/gi, '\\FontChange<' + theme.style('Speaker').Face + '>') : name;
  };
  const choiceRect = Window_ChoiceList.prototype.itemRectWithPadding;
  Window_ChoiceList.prototype.itemRectWithPadding = function(index) {
    const rect = choiceRect.call(this, index); rect.width = Math.max(1, rect.width - tokens.indicator - tokens.gap); return rect;
  };
  const choiceWidth = Window_ChoiceList.prototype.maxChoiceWidth;
  Window_ChoiceList.prototype.maxChoiceWidth = function() { return Math.min(Graphics.boxWidth - 64, choiceWidth.call(this) + tokens.indicator + tokens.gap); };
  for (const prototype of [Window_Command.prototype, globalThis.Window_OptionsCategory?.prototype].filter(Boolean)) {
    const draw = prototype.drawItem;
    prototype.drawItem = function(index) {
      if (this instanceof Window_ChoiceList || this instanceof Window_Options) return draw.apply(this, arguments);
      const rect = this.itemLineRect(index);
      const name = this.convertEscapeCharacters(this.commandName(index)).replace(/\x1bI\[\d+\]/g, '');
      const category = !!globalThis.Window_OptionsCategory && this instanceof Window_OptionsCategory;
      label(this, name, rect, { feedback: this instanceof Window_TitleCommand ? 'choice' : 'secondary', enabled: this.isCommandEnabled(index),
        focused: this.active && this.index() === index && (!category || !SceneManager._scene._optionsWindow?.active) }, 'Menu', this.itemTextAlign());
      if (this.maxCols() > 1 && index % this.maxCols() > 0) {
        const item = this.itemRect(index);
        divider(this.contents, item.x - this.colSpacing() / 2, item.y + 12, item.x - this.colSpacing() / 2, item.y + item.height - 12);
      }
    };
  }

  const loadButton = Sprite_Button.prototype.loadButtonImage;
  Sprite_Button.prototype.loadButtonImage = function() {
    if (this._buttonType !== 'cancel') return loadButton.apply(this, arguments);
    const bitmap = this._coretoOwnedButtonBitmap = new Bitmap(528, 144);
    this._coretoMenuButton = true; this.bitmap = bitmap;
    const ctx = bitmap.context;
    const scale = reducedMotion() ? 1 : 1.05;
    this._coretoInkIconScale = scale;
    for (let i = 0; i < 3; i++) {
      ctx.save(); ctx.translate(34, i * 48 + 12); ctx.strokeStyle = i ? tokens.focus : tokens.ink;
      if (i) { ctx.translate(14, 10); ctx.scale(scale, scale); ctx.translate(-14, -10); }
      ctx.lineWidth = 2; ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      ctx.beginPath(); ctx.moveTo(10, 0); ctx.lineTo(0, 10); ctx.lineTo(10, 20);
      ctx.moveTo(0, 10); ctx.lineTo(20, 10); ctx.quadraticCurveTo(28, 10, 28, 20); ctx.stroke(); ctx.restore();
    }
    bitmap.baseTexture.update();
  };
  const updateButton = Sprite_Button.prototype.update;
  Sprite_Button.prototype.update = function() {
    if (this._buttonType === 'cancel' && this._coretoInkIconScale !== (reducedMotion() ? 1 : 1.05)) {
      this._coretoOwnedButtonBitmap?.destroy(); this.loadButtonImage();
    }
    updateButton.call(this);
  };

  }

  function drawOption(symbol, index) {
    const r = this.itemRect(index), focused = this.active && this.index() === index;
    const name = this.convertEscapeCharacters(this.commandName(index)).replace(/\x1bI\[\d+\]/g, '');
    const row = { ...r, width: r.width * 0.48 };
    label(this, name, row, { feedback: 'secondary', focused, checked: symbol === 'textEffects' && this.getConfigValue(symbol) }, 'Menu');
    const value = { x: r.x + r.width * 0.5, y: r.y, width: r.width * 0.5, height: r.height };
    if (symbol === 'textLocale') {
      const languages = VisuMZ.MessageCore.Settings.Localization.Languages;
      languages.forEach((language, i) => label(this, TextManager.getLanguageName(language),
        { ...value, x: value.x + i * value.width / languages.length, width: value.width / languages.length },
        { checked: language === ConfigManager.textLocale }, 'Action', 'center'));
      for (let i = 1; i < languages.length; i++) divider(this.contents, value.x + i * value.width / languages.length, value.y + 12,
        value.x + i * value.width / languages.length, value.y + value.height - 12);
    } else if (symbol !== 'textEffects') {
      style(this.contents); this.contents.drawText(this.getConfigValue(symbol) + '%', value.x + 30, value.y, value.width - 60, value.height, 'right');
    }
  }

  function drawSaveFile(id, rect) {
    label(this, id === 0 ? TextManager.autosave : TextManager.file + ' ' + id,
      { ...rect, height: 48 }, { feedback: 'choice', enabled: this.isEnabled(id), focused: this.active && this.index() === this.savefileIdToIndex(id) }, 'Speaker');
    if (id > 0 && id === DataManager.latestSavefileId()) {
      style(this.contents, 'Label');
      this.contents.drawText(TextManager.parseLocalizedText(TextManager.latestSave), rect.x + rect.width - 110, rect.y + 48, 90, 28, 'right');
    }
  }

  function drawSaveContents(info, rect) {
    const x = rect.x + 24, width = rect.width - 48, previewHeight = Math.max(0, rect.height - 170);
    const actors = info.faces?.length || info.characters?.length || info.svbattlers?.length;
    const artWidth = info.description ? Math.min(96, width * 0.35) : width;
    if (info.picture) this.drawCenteredPicture(info.picture, x, rect.y + 80, artWidth, previewHeight, true);
    if (actors) this.drawActors(info, x, rect.y + 80, artWidth, previewHeight);
    style(this.contents, 'Helper');
    const time = info.timestamp ? new Date(info.timestamp).toLocaleString(ConfigManager.textLocale === 'Portuguese' ? 'pt-BR' : 'en-US',
      { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' }) : '';
    this.contents.drawText(time, x, rect.y + rect.height - 82, width, 28);
    this.contents.drawText(info.playtime || '', x, rect.y + rect.height - 48, width, 28);
    if (info.description) {
      const dx = info.picture || actors ? artWidth + 12 : 0, wrap = this._wordWrap;
      const ctx = this.contents.context; ctx.save(); ctx.beginPath(); ctx.rect(x + dx, rect.y + 80, width - dx, previewHeight); ctx.clip();
      this.setWordWrap(true);
      try { this.drawTextEx(info.description, x + dx, rect.y + 80, width - dx); }
      finally { this.setWordWrap(wrap); ctx.restore(); }
    }
  }

  if (theme.config.Windows && globalThis.Window_ButtonConsole) {
  const alignConsole = Window_Message.prototype.alignButtonConsoleButtons;
  Window_Message.prototype.alignButtonConsoleButtons = function() {
    alignConsole.apply(this, arguments);
    const buttons = this._buttonConsoleButtons || [];
    if (!buttons.length || !SceneManager.isSceneMap()) return;
    const gap = Window_ButtonConsole.BUTTON_BUFFER;
    const width = Math.max(1, Math.min(Window_ButtonConsole.BUTTON_WIDTH,
      Math.floor((this.innerWidth - gap * (buttons.length - 1)) / buttons.length)));
    let x = Math.floor((this.width - width * buttons.length - gap * (buttons.length - 1)) / 2) + Window_ButtonConsole.BUTTON_OFFSET_X;
    for (const button of buttons) {
      if (button.width !== width) { button.width = width; button.refresh(); }
      button.x = x;
      x += width + gap;
    }
  };
  const enabled = button => button.textColorID() !== Window_ButtonConsole.TEXT_COLOR_DISABLED;
  const toggled = button => button._type === 'auto' ? $gameTemp.isMessageAutoForwardMode() :
    button._type === 'fastfwd' && SceneManager._scene?.isActivatedExtendedFastForwardMode?.();
  Window_ButtonConsole.prototype.refresh = function() {
    this.createContents(); this.opacity = 0;
    if (!this._type) return;
    label(this, TextManager.msgButtonConsole(this._type), new Rectangle(0, 0, this.innerWidth, this.innerHeight),
      { feedback: 'secondary', enabled: enabled(this), focused: !!this._coretoInkFocused, checked: !!toggled(this) }, 'Action', 'center');
    const buttons = SceneManager._scene?._messageWindow?._buttonConsoleButtons || [];
    if (buttons.indexOf(this) > 0) divider(this.contents, 0.5, 6, 0.5, this.innerHeight - 6);
  };
  const touchEnabled = Window_ButtonConsole.prototype.isTouchScrollEnabled;
  Window_ButtonConsole.prototype.isTouchScrollEnabled = function() { return !hidden() && enabled(this) && touchEnabled.call(this); };
  const activateConsole = Window_ButtonConsole.prototype.onTouchScrollStart;
  Window_ButtonConsole.prototype.onTouchScrollStart = function() {
    if (hidden() || !enabled(this)) return;
    activateConsole.call(this);
    consumeInput();
    TouchInput.clear();
  };
  const updateConsole = Window_ButtonConsole.prototype.update;
  Window_ButtonConsole.prototype.update = function() {
    updateConsole.call(this);
    const signature = [enabled(this), toggled(this), this._coretoInkFocused, ConfigManager.textLocale].join('|');
    if (signature !== this._coretoInkInkSignature) { this._coretoInkInkSignature = signature; this.refresh(); }
  };

  const messageTriggered = Window_Message.prototype.isTriggered;
  Window_Message.prototype.isTriggered = function() {
    if (confirmationConsumed || (this._coretoInkConsoleSelection && !hidden() && Input.isPressed('ok'))) return false;
    return messageTriggered.apply(this, arguments);
  };
  const updateMessage = Window_Message.prototype.update;
  Window_Message.prototype.update = function() {
    const buttons = (this._buttonConsoleButtons || []).filter(button => button.visible && button.openness === 255);
    const available = this.pause && this.isOpen() && !hidden() && !$gameMessage.isChoice() && !SceneManager._scene.isBusy();
    if (!available) this._coretoInkConsoleSelection = null;
    if (TouchInput.isMoved() || TouchInput.isHovered()) {
      this._coretoInkConsoleSelection = null;
      this._coretoInkConsolePointer = buttons.find(button => button.getBounds().contains(TouchInput.x, TouchInput.y)) || null;
    }
    if (available && (Input.isRepeated('left') || Input.isRepeated('right'))) {
      const eligible = buttons.filter(enabled), direction = Input.isRepeated('right') ? 1 : -1;
      const index = eligible.indexOf(this._coretoInkConsoleSelection || this._coretoInkConsolePointer);
      this._coretoInkConsoleSelection = eligible[(index < 0 ? (direction > 0 ? 0 : eligible.length - 1) : (index + direction + eligible.length) % eligible.length)] || null;
      this._coretoInkConsolePointer = null;
    }
    const selected = this._coretoInkConsoleSelection;
    if (available && selected && Input.isTriggered('cancel')) {
      this._coretoInkConsoleSelection = null;
      consumeInput();
    } else if (available && selected && Input.isTriggered('ok')) selected.onTouchScrollStart();
    for (const button of this._buttonConsoleButtons || []) button._coretoInkFocused = !hidden() && enabled(button) &&
      button === (this._coretoInkConsoleSelection || this._coretoInkConsolePointer);
    updateMessage.apply(this, arguments);
  };

  let hintShown = false;
  const setVisibility = Window_Message.prototype.setVisibility;
  Window_Message.prototype.setVisibility = function() {
    const wasHidden = hidden(), result = setVisibility.apply(this, arguments);
    if (!wasHidden && hidden() && !hintShown) {
      hintShown = true;
      const scene = SceneManager._scene;
      const hint = new Sprite(new Bitmap(Graphics.boxWidth, 56));
      paper(hint.bitmap, 160, 0, Graphics.boxWidth - 320, 56);
      style(hint.bitmap, 'Helper');
      hint.bitmap.drawText(TextManager.getLocalizedText('coreto.ui.restore_hint'), 184, 0, Graphics.boxWidth - 368, 56, 'center');
      hint.y = 12; scene.addChild(hint); scene._coretoInkRestoreHint = hint;
      scene._coretoInkRestoreHintFrames = 300;
    }
    return result;
  };
  const sceneUpdate = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    sceneUpdate.apply(this, arguments);
    if (this._coretoInkRestoreHint && (!hidden() || --this._coretoInkRestoreHintFrames <= 0)) {
      this._coretoInkRestoreHint.bitmap.destroy(); this._coretoInkRestoreHint.destroy(); this._coretoInkRestoreHint = null;
    }
  };

  }

  const ink = Object.freeze({ tokens, paper, quill, check, style, wrapText, control, label, divider, hidden, reducedMotion,
    drawOption, drawSaveFile, drawSaveContents, adapters });
  function drawButton(bitmap, rect, text, state='default', kind='menu', focused=false) {
    label({contents:bitmap}, text, rect, {enabled:state!=='disabled',
      focused:focused || ['hover','selectedHover','pressed','selected'].includes(state),
      feedback:['menu','choice','primary'].includes(kind)?'choice':'secondary'},kind==='menu'?'Menu':'Action');
  }
  function drawItemBackground(index) {
    if (!theme.config.Windows) return false;
    const rect = this.itemRect(index);
    this.contentsBack.clearRect(rect.x,rect.y,rect.width,rect.height); return true;
  }
  function layoutFooter(rect) {
    return ['left','center','right'].map((align,index)=>({x:rect.x+index*rect.width/3,y:rect.y,width:rect.width/3,height:rect.height,align}));
  }
  function drawCard(bitmap,rect,text='',context='paper') {
    paper(bitmap,rect.x,rect.y,rect.width,rect.height);
    label({contents:bitmap},text,{x:rect.x+12,y:rect.y+12,width:rect.width-24,height:rect.height-24},{},'Helper');
    return theme.measure(bitmap,text,rect.width-84,'Helper').height+24;
  }
  globalThis.CoretoDesignSystem = Object.freeze({ ...theme, registerAdapter, ink, drawButton, drawCard, drawItemBackground, layoutFooter,
    drawParchment: paper, drawBrush: brush, drawQuill: quill, drawSeal: check, drawDivider: divider,
    drawControl: control, drawLabel: label, drawOption, drawSaveFile, drawSaveContents });
})();
