import { WebGLCanvas } from "../../libs/html/WebGLCanvas";
import { WebGLProgram } from "./WebGLProgram";

export class WebGLContext extends WebGLCanvas {
    constructor(parent, canvasOptions, webglOptions) {
        super(parent, canvasOptions, webglOptions);
        this.program = new WebGLProgram(this.gl);
        this.element.style = "touch-action:none";
    }

    updateCanvas(data) {
        this.program.updateBuffer(data);

        requestAnimationFrame(this.run.bind(this));
    }

    run() {
        console.log('context.run');
        this.program.draw();

        return this;
    }
}