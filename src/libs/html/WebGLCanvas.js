import { Canvas } from "./Canvas";

export class WebGLCanvas extends Canvas {
    constructor(parent, canvasOptions, contextOptions) {
        super(parent, canvasOptions);

        this.gl = this.element.getContext('webgl', contextOptions) || this.element.getContext('experimental-webgl', contextOptions);

        WebGLCanvas.setAspect(this.gl, canvasOptions?.aspect);
    }

    static setAspect(gl, aspect) {
        Canvas.setAspect(gl.canvas, aspect);
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
    }

    viewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    clearColor(r, g, b, a) {
        this.gl.clearColor(r, g, b, a);
    }

    enableDepthTest() {
        this.gl.enable(this.gl.DEPTH_TEST);
    }

    disableDepthTest() {
        this.gl.disable(this.gl.DEPTH_TEST);
    }

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }

    stop() {
        this.program.delete();
        this.program = null;

        return this;
    }
}