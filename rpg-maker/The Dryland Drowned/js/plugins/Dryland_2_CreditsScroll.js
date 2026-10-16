/*:
 * @target MZ
 * @plugindesc Native credits scroll inside Reed's parchment.
 * @author Coreto
 * @base Coreto_1_MessageCore
 * @orderAfter Coreto_1_MessageCore
 * @orderAfter Dryland_Presentation
 * @help
 * Maps with <drylandCreditsScroll> use a parchment-sized native scroll window.
 * The rectangle follows the 1280x720 artwork composition. Other maps retain
 * the original scroll placement and background.
 * Text fades across 40 pixels at the top and bottom of the viewport.
 */
(() => {
    'use strict';
    const isCredits = () => $dataMap && /<drylandCreditsScroll>/.test($dataMap.note);
    const scrollRect = Scene_Message.prototype.scrollTextWindowRect;
    Scene_Message.prototype.scrollTextWindowRect = function() {
        if (this instanceof Scene_Map && isCredits()) {
            const sx = Graphics.boxWidth / 1280;
            const sy = Graphics.boxHeight / 720;
            return new Rectangle(416 * sx, 168 * sy, 264 * sx, 408 * sy);
        }
        return scrollRect.apply(this, arguments);
    };
    const fadeShader = `
        varying vec2 vTextureCoord;
        uniform sampler2D uSampler;
        uniform highp vec4 inputSize;
        uniform highp vec4 outputFrame;
        uniform float fadeHeight;
        void main(void) {
            float y = vTextureCoord.y * inputSize.y;
            float alpha = smoothstep(0.0, fadeHeight, y)
                * smoothstep(0.0, fadeHeight, outputFrame.w - y);
            gl_FragColor = texture2D(uSampler, vTextureCoord) * alpha;
        }
    `;
    const placement = Window_ScrollText.prototype.updatePlacement;
    Window_ScrollText.prototype.updatePlacement = function() {
        placement.apply(this, arguments);
        if (isCredits()) {
            if (!this._drylandCreditsFade) {
                this._drylandCreditsFade = new PIXI.Filter(null, fadeShader, { fadeHeight: 40 });
                this._drylandCreditsFade.padding = 0;
                this._clientArea.filters = this._clientArea.filters.concat(this._drylandCreditsFade);
            }
            this._drylandCreditsFade.uniforms.fadeHeight = 40 * Graphics.boxHeight / 720;
        } else if (this._drylandCreditsFade) {
            this._clientArea.filters = this._clientArea.filters.filter(filter => filter !== this._drylandCreditsFade);
            this._drylandCreditsFade.destroy();
            this._drylandCreditsFade = null;
        }
    };
})();
