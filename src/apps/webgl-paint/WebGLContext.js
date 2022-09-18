import { WebGLCanvas } from "../../libs/html/WebGLCanvas";
import { WebGLProgram } from "./WebGLProgram";

export class WebGLContext extends WebGLCanvas {
    constructor(parent, canvasOptions, webglOptions) {
        super(parent, canvasOptions, webglOptions);
        this.program = new WebGLProgram(this.gl);
        this.program.init();
        this.element.style = "touch-action:none";
    }


    updateCanvas(data) {
        this.program.update(data);

        requestAnimationFrame(this.run.bind(this));
    }

    run() {
        this.program.run();

        return this;
    }

    stop() {
        this.program.delete();
        this.program = null;
        this.container.remove();

        return this;
    }
}