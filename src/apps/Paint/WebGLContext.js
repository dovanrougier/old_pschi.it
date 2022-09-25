import { WebGLCanvas } from "../../libs/html/WebGLCanvas";
import { WebGLProgram } from "./WebGLProgram";

export class WebGLContext extends WebGLCanvas {
    constructor(parent, canvasOptions, webglOptions) {
        super(parent, canvasOptions, webglOptions);
        this.program = new WebGLProgram(this.gl);
        this.element.style = "touch-action:none";

        this.clearColor(0, 0, 0, 1);
        this.drawMode = this.gl.POINTS;
        this.first = 0;
    }

    updateCanvas(data) {
        if(data){
            this.program.updateBuffer(new Float32Array(data));
            this.drawCount = data.length / 8;
        }
        this.clear();
        this.program.draw(this.drawMode, this.first, this.drawCount);
    }
}