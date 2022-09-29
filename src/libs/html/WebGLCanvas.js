import { Vector4 } from "../math/Vector4";
import { Canvas } from "./Canvas";

export class WebGLCanvas extends Canvas {
    constructor(canvasOptions, contextOptions) {
        super(canvasOptions);

        this.gl = this.element.getContext('webgl', contextOptions) || this.element.getContext('experimental-webgl', contextOptions);
        if (!this.gl) {
            this.element.innerText = 'WebGL is not supported.'
        }
    }

    render(scene) {
        this.clearColor(scene.background);

        requestAnimationFrame(this.draw.bind(this));
    }

    draw() {
        this.clear();
    }

    resize(width, height) {
        super.resize(width, height);
        this.viewport(0, 0, width, height);
    }

    viewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    clearColor(color) {
        if (color) {
            this.gl.clear(color.r, color.g, color.b, color.a);
        }
        this.gl.clearColor(0, 0, 0, 1);
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

    clear() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
    }
}