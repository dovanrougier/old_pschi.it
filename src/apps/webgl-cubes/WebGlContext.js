import { WebGLCanvas } from "../../libs/html/WebGLCanvas";
import { WebGLProgram } from "./WebGLProgram";

export class WebGLContext extends WebGLCanvas {
    constructor(parent, canvasOptions, webglOptions) {
        super(parent, canvasOptions, webglOptions);
        this.program = new WebGLProgram(this.gl);
        this.element.style = "touch-action:none";
    }

    updateCanvas(data) {
        if (data.drawCount) {
            this.program.updateDrawCount(data.drawCount);
        }
        if (data.buffer) {
            this.program.updateBuffer(data.buffer);
        }
        if (data.click) {
            this.program.updatedClick(data.click);
        }
        if (data.fog) {
            this.program.updateFog(data.fog);
        }
        if (data.light) {
            this.program.updateLight(data.light);
        }
        if (data.viewMatrix) {
            this.program.updateViewMatrix(data.viewMatrix);
        }
        if (data.vertexMatrix) {
            this.program.updateVertexMatrix(data.vertexMatrix);
        }
    }

    draw() {
        this.program.draw();

        return this;
    }

}