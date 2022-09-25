import { WebGLCanvas } from "../../libs/html/WebGLCanvas";
import { WebGLProgram } from "./WebGLProgram";

export class WebGLContext extends WebGLCanvas {
    constructor(parent, canvasOptions, webglOptions) {
        super(parent, canvasOptions, webglOptions);
        this.program = new WebGLProgram(this.gl);
        this.element.style = "touch-action:none";

        this.clearColor(0, 0, 0, 1);
        this.enableBlend();
        this.drawMode = this.gl.TRIANGLES;
        this.first = 0;

        this.cache = WebGLContext.contract;
    }

    static contract = {
        cat: {
            buffer: [],
            vertexMatrix: null,
            texture: null,
            drawCount: null,
        },
        tileMap: {
            buffer: [],
            vertexMatrix: null,
            texture: null,
            drawCount: null,
        },
        viewMatrix: null,
    };

    updateCanvas(data) {
        this.clear();
        this.updateCache(data);
        if (this.cache.tileMap.drawCount) {
            this.program.updateVertexMatrix(this.cache.tileMap.vertexMatrix);
            this.program.updateTexture(this.cache.tileMap.texture);
            this.program.draw(this.drawMode, 0, this.cache.tileMap.drawCount);
        }

        if (this.cache.cat.drawCount) {
            this.program.updateVertexMatrix(this.cache.cat.vertexMatrix);
            this.program.updateTexture(this.cache.cat.texture);
            this.program.draw(this.drawMode, this.cache.tileMap.drawCount, this.cache.cat.drawCount);
        }

        return this;
    }

    updateCache(data) {
        let buffer = false;
        if (data.viewMatrix) {
            this.cache.viewMatrix = data.viewMatrix
            this.program.updateViewMatrix(this.cache.viewMatrix);
        }

        if (data.cat) {
            if (data.cat.buffer) {
                this.cache.cat.buffer = data.cat.buffer;
                this.cache.cat.drawCount = this.cache.cat.buffer.length / 4;
                buffer = true;
            }
            if (data.cat.vertexMatrix) {
                this.cache.cat.vertexMatrix = data.cat.vertexMatrix;
            }
            if (data.cat.texture) {
                this.cache.cat.texture = data.cat.texture;
            }
        }

        if (data.tileMap) {
            if (data.tileMap.buffer) {
                this.cache.tileMap.buffer = data.tileMap.buffer;
                this.cache.tileMap.drawCount = this.cache.tileMap.buffer.length / 4;
                buffer = true;
            }
            if (data.tileMap.vertexMatrix) {
                this.cache.tileMap.vertexMatrix = data.tileMap.vertexMatrix;
            }
            if (data.tileMap.texture) {
                this.cache.tileMap.texture = data.tileMap.texture;
            }
        }
        if (buffer) {
            this.program.updateBuffer(new Float32Array(this.cache.tileMap.buffer.concat(this.cache.cat.buffer)));
        }
    }
}