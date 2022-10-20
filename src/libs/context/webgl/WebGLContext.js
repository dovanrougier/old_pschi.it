export class WebGLContext {
    constructor(/** @type {WebGLRenderingContext} */ gl) {
        this.gl = gl;
        this.polyfillExtension();
    }
    viewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    clearColor(color) {
        if (color) {
            this.gl.clearColor(color[0], color[1], color[2], color[3]);
        } else {
            this.gl.clearColor(0, 0, 0, 1);
        }
    }

    enableBlend() {
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    enableDepthTest() {
        this.gl.enable(this.gl.DEPTH_TEST);
    }

    disableDepthTest() {
        this.gl.disable(this.gl.DEPTH_TEST);
    }

    clear(color = true, depth = true, stencil = true) {
        let bits = 0;

        if (color) bits |= this.gl.COLOR_BUFFER_BIT;
        if (depth) bits |= this.gl.DEPTH_BUFFER_BIT;
        if (stencil) bits |= this.gl.STENCIL_BUFFER_BIT;

        this.gl.clear(bits);
    }

    drawElements(mode, count, type, offset) {
        //console.log(count,offset);
        this.gl.drawElements(mode, count, type, offset);

        return this;
    }

    drawArrays(drawMode, first, drawCount) {
        this.gl.drawArrays(drawMode, first, drawCount);

        return this;
    }

    polyfillExtension() {
        this.extensions = {};
        //this.gl.getSupportedExtensions().forEach(e => this.extensions[e] = this.gl.getExtension(e))
        const instancedArrays = this.extensions['ANGLE_instanced_arrays'];
        if (instancedArrays) {
            this.gl.drawArraysInstanced = instancedArrays.drawArraysInstancedANGLE;
            this.gl.drawElementsInstanced = instancedArrays.drawElementsInstancedANGLE;
            this.gl.vertexAttribDivisor = instancedArrays.vertexAttribDivisorANGLE;
        }
    }
}