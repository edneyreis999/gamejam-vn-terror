function installWindowLayer(settings) {
    Scene_Base.prototype.isWindowMaskingEnabled = function() { return settings.Window.EnableMasking; };
    WindowLayer.prototype.isMaskingEnabled = function() {
        return SceneManager._scene ? SceneManager._scene.isWindowMaskingEnabled() : true;
    };
    const render = WindowLayer.prototype.render;
    WindowLayer.prototype.render = function(renderer) {
        if (this.isMaskingEnabled()) return render.call(this, renderer);
        return this.renderNoMask(renderer);
    };
    WindowLayer.prototype.renderNoMask = function(renderer) {
        if (!this.visible) return;
        const gl = renderer.gl;
        renderer.framebuffer.forceStencil();
        renderer.batch.flush();
        gl.enable(gl.STENCIL_TEST);
        for (const child of [...this.children]) {
            if (child._isWindow && child.visible && child.openness > 0) {
                gl.stencilFunc(gl.EQUAL, 0, ~0);
                gl.stencilOp(gl.KEEP, gl.KEEP, gl.KEEP);
                child.render(renderer);
                renderer.batch.flush();
            }
        }
        // No shape is written to the stencil: overlapping windows remain visible.
        gl.disable(gl.STENCIL_TEST);
        gl.clear(gl.STENCIL_BUFFER_BIT);
        gl.clearStencil(0);
        renderer.batch.flush();
        for (const child of this.children) {
            if (!child._isWindow && child.visible) child.render(renderer);
        }
        renderer.batch.flush();
    };
}
