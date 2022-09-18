export class Buffer {
    static binded = null;
    constructor(gl, type){
        this.create(gl);
        this.type = type;
    }

    create(/** @type {WebGLRenderingContext} */gl){
        this.buffer = gl.createBuffer();
    }

    delete(/** @type {WebGLRenderingContext} */gl){
        gl.deleteBuffer(this.buffer);
        this.buffer = null;
    }

    bind(/** @type {WebGLRenderingContext} */gl){
        if(Buffer.binded != this){
            gl.bindBuffer(this.type, this.buffer);
            Buffer.binded = this;
        }
    }

    setData(/** @type {WebGLRenderingContext} */gl, bufferData, usage) {
        this.bind(gl);
        gl.bufferData(this.type, bufferData, usage);
    }

    setSubData(/** @type {WebGLRenderingContext} */gl, offset, bufferData) {
        this.bind(gl);
        gl.bufferSubData(this.type, offset, bufferData);
    }

    static unbind(/** @type {WebGLRenderingContext} */gl){
        gl.bindBuffer(gl.ARRAY_BUFFER, null);
        Buffer.binded = null;
    }
}