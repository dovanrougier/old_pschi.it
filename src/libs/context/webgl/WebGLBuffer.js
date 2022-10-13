export class WebGLBuffer {
    static binded = null;
    constructor(gl, type){
        this.type = type;
        this.create(gl);
    }

    create(/** @type {WebGLRenderingContext} */gl){
        this.buffer = gl.createBuffer();
    }

    delete(/** @type {WebGLRenderingContext} */gl){
        gl.deleteBuffer(this.buffer);
        this.buffer = null;
    }

    bind(/** @type {WebGLRenderingContext} */gl){
        if(WebGLBuffer.binded != this){
            gl.bindBuffer(this.type, this.buffer);
            WebGLBuffer.binded = this;
        }
    }

    setData(/** @type {WebGLRenderingContext} */gl, bufferData, usage) {
        this.bind(gl);
        console.log(bufferData);
        gl.bufferData(this.type, bufferData, gl[usage]);
    }

    setSubData(/** @type {WebGLRenderingContext} */gl, offset, bufferData) {
        this.bind(gl);
        gl.bufferSubData(this.type, offset, bufferData);
    }
}