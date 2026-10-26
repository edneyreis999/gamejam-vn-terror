/*:
 * @target MZ
 * @plugindesc [Dryland] Editable paper artwork for native and picture choices.
 * @author Dryland
 * @base Coreto_5_DesignSystem
 * @orderAfter Coreto_5_DesignSystem
 * @orderAfter Dryland_Presentation
 * @param Paper
 * @type file
 * @dir img/pictures/
 * @default Dryland_ChoicePaper
 * @param Approach
 * @type file
 * @dir img/pictures/
 * @default Dryland_ApproachPaper
 * @param Destination
 * @type file
 * @dir img/pictures/
 * @default Dryland_DestinationPaper
 * @param Sacrifice
 * @type file
 * @dir img/pictures/
 * @default Dryland_SacrificePaper
 * @param Reunite
 * @type file
 * @dir img/pictures/
 * @default Dryland_FinalReunite
 * @param Destroy
 * @type file
 * @dir img/pictures/
 * @default Dryland_FinalDestroy
 * @help
 * Replace the configured PNGs to edit the artwork. Text remains in Languages.tsv.
 * Source images are fitted to logical picture sizes; transparent outer margins
 * are ignored. No campaign state is stored. Load after the Coreto design system.
 * The associated events own picture placement, labels, eligibility and actions.
 */
(() => {
  'use strict';
  const parameters = PluginManager.parameters('Dryland_6_IllustratedChoices');
  const skins = {
    Dryland_Button: { file: parameters.Paper, width: 208, height: 54 },
    Dryland_DestinationCard: { file: parameters.Destination, width: 330, height: 212 },
    Dryland_DestinationLabel: { file: parameters.Paper, width: 330, height: 48 },
    Dryland_SacrificeCard: { file: parameters.Sacrifice, width: 400, height: 440 },
    Dryland_ApproachPaper: { file: parameters.Approach, width: 256, height: 144 },
    Dryland_FinalReunite: { file: parameters.Reunite, width: 480, height: 570 },
    Dryland_FinalDestroy: { file: parameters.Destroy, width: 480, height: 570 }
  };
  const focusStyle = { glow: '#ffe2a3', padding: 24, blur: 12, growth: 0.08, frames: 10, dim: 0.24 };
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const bounds = new WeakMap();

  function focusStep(value, focused) {
    const target = focused ? 1 : 0;
    if (reducedMotion.matches) return target;
    return value + Math.sign(target - value) * Math.min(Math.abs(target - value), 1 / focusStyle.frames);
  }

  function focusEase(value) {
    return value * value * (3 - 2 * value);
  }

  function createPaperGlow(source) {
    const pad = focusStyle.padding;
    const bitmap = new Bitmap(source.width + pad * 2, source.height + pad * 2);
    const ctx = bitmap.context;
    ctx.shadowColor = focusStyle.glow;
    ctx.shadowBlur = focusStyle.blur;
    for (let i = 0; i < 3; i++) ctx.drawImage(source.canvas, pad, pad);
    ctx.shadowBlur = 0;
    ctx.globalCompositeOperation = 'destination-out';
    ctx.drawImage(source.canvas, pad, pad);
    ctx.globalCompositeOperation = 'source-over';
    bitmap.baseTexture.update();
    return bitmap;
  }

  function paperBounds(bitmap) {
    if (bounds.has(bitmap)) return bounds.get(bitmap);
    const { width, height } = bitmap;
    const pixels = bitmap.context.getImageData(0, 0, width, height).data;
    let left = width, top = height, right = -1, bottom = -1;
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        if (pixels[(y * width + x) * 4 + 3] < 32) continue;
        left = Math.min(left, x); right = Math.max(right, x);
        top = Math.min(top, y); bottom = Math.max(bottom, y);
      }
    }
    const rect = right < left ? [0, 0, width, height] : [left, top, right - left + 1, bottom - top + 1];
    bounds.set(bitmap, rect);
    return rect;
  }

  function drawPaper(target, source, x, y, width, height) {
    target.blt(source, ...paperBounds(source), x, y, width, height);
  }

  const loadSystemImages = Scene_Boot.prototype.loadSystemImages;
  Scene_Boot.prototype.loadSystemImages = function() {
    const result = loadSystemImages.apply(this, arguments);
    for (const file of new Set(Object.values(skins).map(skin => skin.file))) ImageManager.loadPicture(file);
    return result;
  };

  function releasePaper(sprite) {
    if (sprite._drylandPaperGlow) {
      const glow = sprite._drylandPaperGlow;
      sprite.removeChild(glow);
      glow.bitmap.destroy();
      glow.destroy();
      sprite._drylandPaperGlow = null;
    }
    if (!sprite._drylandPaperBitmap) return;
    if (sprite.bitmap === sprite._drylandPaperBitmap) sprite.bitmap = null;
    sprite._drylandPaperBitmap.destroy();
    sprite._drylandPaperBitmap = null;
  }

  const loadBitmap = Sprite_Picture.prototype.loadBitmap;
  Sprite_Picture.prototype.loadBitmap = function() {
    releasePaper(this);
    this._drylandChoiceFocus = 0;
    const result = loadBitmap.apply(this, arguments);
    const skin = skins[this._pictureName];
    if (!skin) return result;
    const target = new Bitmap(skin.width, skin.height);
    this._drylandPaperBitmap = target;
    this.bitmap = target;
    const source = ImageManager.loadPicture(skin.file);
    source.addLoadListener(() => {
      if (this._drylandPaperBitmap !== target) return;
      drawPaper(target, source, 0, 0, skin.width, skin.height);
      this._drylandPaperGlow = new Sprite(createPaperGlow(target));
      this._drylandPaperGlow.alpha = 0;
      this.addChildAt(this._drylandPaperGlow, 0);
    });
    return result;
  };

  const updatePicture = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    const result = updatePicture.apply(this, arguments);
    const skin = skins[this._pictureName];
    const choices = SceneManager._scene?._choiceListWindow;
    let owner = this, binding = -1;
    while (owner && binding < 0) {
      if (owner._pictureId) binding = $gameScreen.getPictureChoiceBinding(owner._pictureId);
      owner = owner.parent;
    }
    const active = binding >= 0 && !!choices?.isOpenAndActive();
    const focused = active &&
      choices.index() === binding && choices.isCommandEnabled(binding);
    const root = !(this instanceof Sprite_AttachPicture) && !(this instanceof Sprite_MessagePicture);
    const scalable = !!skin || this._pictureName === 'Dryland_DestinationGroup' ||
      this._pictureName.startsWith('Dryland_Vignette_');
    if (scalable) {
      this._drylandChoiceFocus = focusStep(this._drylandChoiceFocus || 0, focused);
      const amount = focusEase(this._drylandChoiceFocus);
      if (skin) this.setColorTone([0, 0, 0, 0]);
      if (root && scalable && this.visible && this.bitmap?.isReady()) {
        const scale = 1 + focusStyle.growth * amount;
        const dx = (0.5 - this.anchor.x) * this.bitmap.width * this.scale.x * (scale - 1);
        const dy = (0.5 - this.anchor.y) * this.bitmap.height * this.scale.y * (scale - 1);
        this.x -= dx * Math.cos(this.rotation) - dy * Math.sin(this.rotation);
        this.y -= dx * Math.sin(this.rotation) + dy * Math.cos(this.rotation);
        this.scale.x *= scale;
        this.scale.y *= scale;
        if (active) {
          const light = Math.round(-255 * focusStyle.dim * (1 - amount) + 16 * amount);
          this.setColorTone([light, light, light, 0]);
        }
      }
      const glow = this._drylandPaperGlow;
      if (glow) {
        glow.x = -this.anchor.x * skin.width - focusStyle.padding;
        glow.y = -this.anchor.y * skin.height - focusStyle.padding;
        glow.alpha = amount;
      }
    }
    return result;
  };

  const destroyPicture = Sprite_Picture.prototype.destroy;
  Sprite_Picture.prototype.destroy = function() {
    releasePaper(this);
    return destroyPicture.apply(this, arguments);
  };

  function paperChoices(window) {
    return SceneManager._scene instanceof Scene_Map && !SceneManager.isSceneTitleMap?.() &&
      !window._pictureChoicesHidden;
  }

  const drawPictureText = Sprite_Picture.prototype.drawPictureText;
  Sprite_Picture.prototype.drawPictureText = function() {
    this._pictureTextWindow._drylandPaperText = !!skins[this._pictureName] ||
      (this._pictureName === 'Dryland_Tag' && !this._pictureTextWindow._coretoPictureInk);
    return drawPictureText.apply(this, arguments);
  };

  const pictureTextColor = Window_Base.prototype.changeTextColor;
  Window_Base.prototype.changeTextColor = function() {
    const result = pictureTextColor.apply(this, arguments);
    if (this._drylandPaperText) this.contents.textColor = '#30261f';
    return result;
  };

  const background = Window_ChoiceList.prototype.drawItemBackground;
  Window_ChoiceList.prototype.drawItemBackground = function(index) {
    if (!paperChoices(this)) return background.apply(this, arguments);
    const rect = this.itemRect(index);
    const source = ImageManager.loadPicture(parameters.Paper);
    if (!source.isReady()) { source.addLoadListener(() => { if (!this._destroyed) this.refresh(); }); return; }
    const amount = focusEase(this._drylandChoiceLevels?.[index] || 0);
    const scale = (1 + focusStyle.growth * amount) / (1 + focusStyle.growth);
    const width = (rect.width - 8) * scale, height = (rect.height - 8) * scale;
    const ctx = this.contentsBack.context;
    this.contentsBack.clearRect(rect.x, rect.y, rect.width, rect.height);
    ctx.save();
    ctx.beginPath();
    ctx.rect(rect.x, rect.y, rect.width, rect.height);
    ctx.clip();
    ctx.shadowColor = focusStyle.glow;
    ctx.shadowBlur = focusStyle.blur * amount;
    ctx.filter = `brightness(${1 - focusStyle.dim * (1 - amount)})`;
    this.contentsBack.paintOpacity = this.isCommandEnabled(index) ? 255 : 150;
    drawPaper(this.contentsBack, source, rect.x + (rect.width - width) / 2,
      rect.y + (rect.height - height) / 2, width, height);
    ctx.restore();
    this.contentsBack.paintOpacity = 255;
  };

  const drawChoice = Window_ChoiceList.prototype.drawItem;
  Window_ChoiceList.prototype.drawItem = function(index) {
    if (!paperChoices(this)) return drawChoice.apply(this, arguments);
    const rect = this.itemRect(index), ctx = this.contents.context;
    const amount = focusEase(this._drylandChoiceLevels?.[index] || 0);
    const scale = (1 + focusStyle.growth * amount) / (1 + focusStyle.growth);
    const x = rect.x + rect.width / 2, y = rect.y + rect.height / 2;
    ctx.save();
    ctx.translate(x, y);
    ctx.scale(scale, scale);
    ctx.translate(-x, -y);
    const result = drawChoice.apply(this, arguments);
    ctx.restore();
    return result;
  };

  const updateChoices = Window_ChoiceList.prototype.update;
  Window_ChoiceList.prototype.update = function() {
    const result = updateChoices.apply(this, arguments);
    if (!paperChoices(this) || !this.isOpen()) return result;
    this._drylandChoiceLevels ||= [];
    for (let index = 0; index < this.maxItems(); index++) {
      const previous = this._drylandChoiceLevels[index] || 0;
      const focused = this.active && index === this.index() && this.isCommandEnabled(index);
      const next = focusStep(previous, focused);
      if (previous !== next) {
        this._drylandChoiceLevels[index] = next;
        this.redrawItem(index);
      }
    }
    return result;
  };

  const startChoices = Window_ChoiceList.prototype.start;
  Window_ChoiceList.prototype.start = function() {
    this._drylandChoiceLevels = [];
    return startChoices.apply(this, arguments);
  };

  const changeTextColor = Window_ChoiceList.prototype.changeTextColor;
  Window_ChoiceList.prototype.changeTextColor = function() {
    const result = changeTextColor.apply(this, arguments);
    if (paperChoices(this)) this.contents.textColor = '#30261f';
    return result;
  };
  const resetTextColor = Window_ChoiceList.prototype.resetTextColor;
  Window_ChoiceList.prototype.resetTextColor = function() {
    const result = resetTextColor.apply(this, arguments);
    if (paperChoices(this)) this.contents.textColor = '#30261f';
    return result;
  };

  class Window_IllustratedChoicePreview extends Window_Base {
    constructor() {
      super(new Rectangle(80, 166, Graphics.boxWidth - 160, 76));
      this.hide();
      this._previewText = '';
    }

    setPreview(text, kind) {
      if (text !== this._previewText) {
        this._previewText = text;
        this.contents.fontFace = 'CoretoOutfitMedium';
        this.contents.fontSize = 22;
        const lines = [];
        let line = '';
        for (const word of text.split(/\s+/)) {
          const next = line ? line + ' ' + word : word;
          if (line && this.textWidth(next) > this.innerWidth - 24) { lines.push(line); line = word; }
          else line = next;
        }
        if (line) lines.push(line);
        this.height = lines.length * 30 + this.padding * 2 + 8;
        this.createContents();
        this.contents.fillAll('#f9eacf');
        this.contents.fontFace = 'CoretoOutfitMedium';
        this.contents.fontSize = 22;
        this.contents.textColor = '#30261f';
        this.contents.outlineWidth = 0;
        lines.forEach((value, i) => this.contents.drawText(value, 12, 4 + i * 30, this.innerWidth - 24, 30));
      }
      this.y = kind === 'approaches' ? 550 - this.height : kind === 'sacrifice' ? 82 : Graphics.boxHeight - this.height - 12;
      this.show();
    }
  }

  const createWindows = Scene_Map.prototype.createAllWindows;
  Scene_Map.prototype.createAllWindows = function() {
    createWindows.apply(this, arguments);
    this._illustratedChoicePreview = new Window_IllustratedChoicePreview();
    this.addWindow(this._illustratedChoicePreview);
    this._illustratedPointerInside = true;
    this._trackIllustratedPointer = event => {
      this._illustratedPointerInside = event.type === 'mousemove' && Graphics.isInsideCanvas(
        Graphics.pageToCanvasX(event.pageX), Graphics.pageToCanvasY(event.pageY));
    };
    document.addEventListener('mousemove', this._trackIllustratedPointer);
    document.addEventListener('mouseleave', this._trackIllustratedPointer);
  };

  const terminateScene = Scene_Map.prototype.terminate;
  Scene_Map.prototype.terminate = function() {
    document.removeEventListener('mousemove', this._trackIllustratedPointer);
    document.removeEventListener('mouseleave', this._trackIllustratedPointer);
    return terminateScene.apply(this, arguments);
  };

  const updateScene = Scene_Map.prototype.update;
  Scene_Map.prototype.update = function() {
    const result = updateScene.apply(this, arguments);
    const preview = this._illustratedChoicePreview, choices = this._choiceListWindow;
    if (!preview) return result;
    preview.hide();
    const kind = $gameMessage._drylandChoiceFocus?.key;
    if (kind === 'formation' || kind === 'hero' || kind === 'destinations' || kind === 'camp') return result;
    if (!choices?.isOpenAndActive() || this._messageWindow?.scale.x === 0 || SceneManager.isSceneTitleMap?.()) return result;
    const item = choices._list[choices.index()];
    const raw = item && $gameMessage.choices()[item.ext];
    if (!raw || !/<Bind Picture:/i.test(raw)) return result;
    if (TouchInput.isHovered() || TouchInput.isMoved()) this._illustratedPreviewMouse = true;
    if (['up','down','left','right'].some(key => Input.isRepeated(key))) this._illustratedPreviewMouse = false;
    const ids = [...raw.matchAll(/<Bind Picture: (\d+)>/gi)].map(match => Number(match[1]));
    const pictures = this._spriteset._pictureContainer.children.filter(sprite => ids.includes(sprite._pictureId));
    if (this._illustratedPreviewMouse && (!this._illustratedPointerInside ||
      !pictures.some(sprite => sprite.worldVisible && sprite.isBeingTouched()))) return result;
    const text = choices.convertEscapeCharacters(raw).replace(/\x1b[A-Za-z]+(?:\[[^\]]*\]|<[^>]*>)/g, '').replace(/<[^>]*>/g, '').trim();
    preview.setPreview(text, kind);
    return result;
  };
})();
