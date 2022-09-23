import { WebGLCanvas } from "../../libs/html/WebGLCanvas";
import { WebGLProgram } from "./WebGLProgram";

export class WebGLContext extends WebGLCanvas {
    constructor(parent, canvasOptions, webglOptions) {
        super(parent, canvasOptions, webglOptions);
        this.program = new WebGLProgram(this.gl);
        this.element.style = "touch-action:none";
        
        this.clearColor(0, 0, 0, 1);
        this.drawMode = this.gl.TRIANGLES;
        this.first = 0;
    }

    updateCanvas(data) {
        if (data.drawCount) {
        }
        if(data.buffer){
            this.program.updateBuffer(data.buffer);
            this.drawCount = data.buffer.length / 4;
        }
        if (data.viewMatrix) {
            this.program.updateViewMatrix(data.viewMatrix);
        }
        if (data.vertexMatrix) {
            this.program.updateVertexMatrix(data.vertexMatrix);
        }
        if (data.texture) {
            this.program.updateTexture(data.texture);
        }
    }

    draw() {
        this.clear();
        this.program.draw(this.drawMode, this.first, this.drawCount);

        return this;
    }
}