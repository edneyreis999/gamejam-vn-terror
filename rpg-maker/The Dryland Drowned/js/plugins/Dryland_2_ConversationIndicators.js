/*:
 * @target MZ
 * @plugindesc Available unread conversation indicators and choice labels.
 * @author Coreto
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter Dryland_Presentation
 * @orderAfter Dryland_EventBridge
 * @command Menu
 * @text Configure conversation choices
 * @arg topics
 * @type string[]
 * @default []
 * @desc Topic IDs in native choice order; talk:<unit> for existing Talk, empty for controls.
 * @command Portrait
 * @text Bind nameplate conversation indicator
 * @arg picture
 * @type number
 * @arg hero
 * @type string
 * @help
 * Bind Portrait to the native nameplate picture. Commands configure presentation only. Campaign rules determine availability
 * and completion. Indicators never mark text as read.
 */
(() => {
  'use strict';
  const plugin = 'Dryland_2_ConversationIndicators';
  const hidden = () => Boolean($gameTemp._drylandInterfaceHidden || SceneManager._scene?._messageWindow?.scale.x === 0);
  const label = () => TextManager.getLocalizedText('ui.social.new');
  function unread(topic) {
    if (!topic) return false;
    if (topic.startsWith('talk:')) return !$gameSystem._drylandReadUnits.includes(Number(topic.slice(5)));
    return DrylandEventBridge.socialTopicUnread(topic);
  }
  PluginManager.registerCommand(plugin, 'Menu', function(args) {
    this._drylandSocialChoices = JSON.parse(args.topics).map(topic => topic === null ? $gameVariables.value(217) : topic);
  });
  PluginManager.registerCommand(plugin, 'Portrait', function(args) {
    const picture = $gameScreen.picture(Number(args.picture));
    if (picture) picture._drylandConversationHero = args.hero;
  });
  const setup = Game_Interpreter.prototype.setupChoices;
  Game_Interpreter.prototype.setupChoices = function(...args) {
    setup.apply(this, args);
    $gameMessage._drylandSocialChoices = this._drylandSocialChoices;
    delete this._drylandSocialChoices;
  };
  const clear = Game_Message.prototype.clear;
  Game_Message.prototype.clear = function() {
    clear.call(this);
    delete this._drylandSocialChoices;
  };
  function choiceTopic(window, index) {
    return $gameMessage._drylandSocialChoices?.[window._list[index]?.ext];
  }
  const width = Window_ChoiceList.prototype.maxChoiceWidth;
  Window_ChoiceList.prototype.maxChoiceWidth = function() {
    return width.call(this) + ($gameMessage._drylandSocialChoices ? this.textWidth(label()) + this.itemPadding() * 3 : 0);
  };
  const itemRect = Window_ChoiceList.prototype.itemRectWithPadding;
  Window_ChoiceList.prototype.itemRectWithPadding = function(index) {
    const rect = itemRect.call(this, index);
    if ($gameMessage._drylandSocialChoices) rect.width -= this.textWidth(label()) + this.itemPadding() * 3;
    return rect;
  };
  const draw = Window_ChoiceList.prototype.drawItemContents;
  Window_ChoiceList.prototype.drawItemContents = function(index) {
    draw.call(this, index);
    if (!unread(choiceTopic(this, index))) return;
    const rect = itemRect.call(this, index);
    this.changeTextColor(ColorManager.systemColor());
    this.drawText(label(), rect.x, rect.y, rect.width, 'right');
    this.resetTextColor();
  };
  const updateChoices = Window_ChoiceList.prototype.update;
  Window_ChoiceList.prototype.update = function() {
    updateChoices.call(this);
    if (!this.active || !$gameMessage._drylandSocialChoices) return;
    const signature = [ConfigManager.textLocale, ...$gameMessage._drylandSocialChoices.map(unread)].join('|');
    if (signature !== this._drylandSocialSignature) {
      this._drylandSocialSignature = signature;
      this.refresh();
    }
  };
  const updatePicture = Sprite_Picture.prototype.update;
  Sprite_Picture.prototype.update = function() {
    updatePicture.call(this);
    const picture = this.picture();
    const hero = picture?.name() === 'Dryland_Tag' ? picture._drylandConversationHero : null;
    if (hero && !this._drylandConversationBubble) {
      const bubble = new Sprite(ImageManager.loadSystem('IconSet'));
      bubble.setFrame(4 * ImageManager.iconWidth, 0, ImageManager.iconWidth, ImageManager.iconHeight);
      bubble.anchor.set(0.5, 1);
      this._drylandConversationBubble = bubble;
      this.addChild(bubble);
    }
    const bubble = this._drylandConversationBubble;
    if (!bubble) return;
    bubble.visible = Boolean(hero && !hidden() && DrylandEventBridge.heroUnread(hero));
    if (bubble.visible && this.bitmap) {
      bubble.x = this.bitmap.width * (0.5 - this.anchor.x);
      bubble.y = -this.bitmap.height * this.anchor.y - 4;
    }
  };
})();
