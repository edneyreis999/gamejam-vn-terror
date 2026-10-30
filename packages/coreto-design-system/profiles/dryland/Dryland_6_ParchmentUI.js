/*:
 * @target MZ
 * @plugindesc [Dryland] Semantic integration for Coreto DesignSystem 1.4.
 * @base Coreto_5_DesignSystem
 * @orderAfter Dryland_Presentation
 * @help
 * Only game context and labels. Rendering belongs to CoretoDesignSystem.
 */
(() => {
  'use strict';
  if (!globalThis.CoretoDesignSystem) return;
  CoretoDesignSystem.registerAdapter({
    choiceFeedback(window, index, name) {
      const auxiliary = !SceneManager.isSceneTitleMap?.() && /\$\[(?:[^\]]*\.)?(?:back|close|cancel|reread|retreat|continue|depart|options|hide)\]/.test(name);
      return auxiliary ? 'secondary' : 'choice';
    },
    choiceBadge: () => TextManager.getLocalizedText('ui.social.new'),
    interfaceHidden: () => !!$gameTemp?._drylandInterfaceHidden,
    consumeInput: () => PluginManager.callCommand(null,'Dryland_Presentation','ConsumeInput',{})
  });
})();
