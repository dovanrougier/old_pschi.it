import { WebGLCanvas } from "../../libs/html/WebGLCanvas";
import { WebGLProgram } from "./WebGLProgram";
import { Buffer } from '../../libs/webgl/Buffer';
import { Texture } from "../../libs/webgl/Texture";

export class WebGLContext extends WebGLCanvas {
    constructor(parent, canvasOptions, webglOptions) {
        super(parent, canvasOptions, webglOptions);
        this.element.style = "touch-action:none";

        this.buffer = new Buffer(this.gl, this.gl.ARRAY_BUFFER);

        this.texture = new Texture(this.gl, this.gl.TEXTURE_2D);
        this.texture.setParameter(this.gl, this.gl.TEXTURE_MIN_FILTER, this.gl.NEAREST);

        this.program = new WebGLProgram(this.gl);
        this.program.setBuffer(this.buffer);
        this.program.setTexture(this.texture);

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
            this.updateTexture(this.cache.tileMap.texture);
            this.program.draw(this.drawMode, 0, this.cache.tileMap.drawCount);
        }

        if (this.cache.cat.drawCount) {
            this.program.updateVertexMatrix(this.cache.cat.vertexMatrix);
            this.updateTexture(this.cache.cat.texture);
            this.program.draw(this.drawMode, this.cache.tileMap.drawCount, this.cache.cat.drawCount);
        }

        return this;
    }

    updateCache(data) {
        let cat, tileMap;
        if (data.viewMatrix) {
            this.cache.viewMatrix = data.viewMatrix
            this.program.updateViewMatrix(this.cache.viewMatrix);
        }

        if (data.cat) {
            if (data.cat.buffer) {
                this.cache.cat.buffer = data.cat.buffer;
                this.cache.cat.drawCount = this.cache.cat.buffer.length / 4;
                cat = data.cat.buffer;
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
                tileMap = data.tileMap.buffer;
            }
            if (data.tileMap.vertexMatrix) {
                this.cache.tileMap.vertexMatrix = data.tileMap.vertexMatrix;
            }
            if (data.tileMap.texture) {
                this.cache.tileMap.texture = data.tileMap.texture;
            }
        }
        this.updateBuffer(tileMap, cat);
    }

    updateBuffer(tileMap, cat) {
        if (tileMap) {
            if (cat) {
                const data = new Float32Array(tileMap.concat(cat))
                this.buffer.setData(this.gl, data, this.gl.STREAM_DRAW);
            } else {
                const data = new Float32Array(tileMap)
                this.buffer.setSubData(this.gl, 0, data);
            }
        } else if (cat) {
            const data = new Float32Array(cat)
            this.buffer.setSubData(this.gl, Float32Array.BYTES_PER_ELEMENT * this.cache.tileMap.buffer.length, data);
        }
    }

    updateTexture(image) {
        this.texture.setTexture(this.gl, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
    }
}