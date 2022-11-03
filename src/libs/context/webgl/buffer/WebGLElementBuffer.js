import { WebGLBuffer } from './WebGLBuffer';

export class WebGLElementBuffer extends WebGLBuffer {
    constructor(/** @type {WebGLRenderingContext} */gl) {
        super(gl, gl.ARRAY_BUFFER)
        this.index = new WebGLBuffer(gl, gl.ELEMENT_ARRAY_BUFFER);
    }

    bindIndex(/** @type {WebGLRenderingContext} */gl) {
        this.index.bind(gl);
    }

    setIndex(/** @type {WebGLRenderingContext} */gl, bufferIndex, usage) {
        this.bindIndex(gl);
        console.log(bufferIndex);
        gl.bufferData(this.index.type, bufferIndex, gl[usage]);
    }

    setSubIndex(/** @type {WebGLRenderingContext} */gl, offset, bufferIndex) {
        this.bindIndex(gl);
        gl.bufferSubData(this.index.type, offset, bufferIndex);
    }
}