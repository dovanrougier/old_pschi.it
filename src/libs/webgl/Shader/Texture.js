export class Texture {
    constructor(gl, type) {
        this.create(gl);
        this.type = type;
    }

    create(/** @type {WebGLRenderingContext} */gl) {
        this.texture = gl.createTexture();
    }

    delete(/** @type {WebGLRenderingContext} */gl) {
        gl.deleteTexture(this.texture);
        this.texture = null;
    }

    bind(/** @type {WebGLRenderingContext} */gl) {
        gl.bindTexture(this.type, this.texture);
    }

    setParameter(/** @type {WebGLRenderingContext} */gl, pname, param) {
        gl.texParameteri(this.type, pname, param);
    }

    setTexture(/** @type {WebGLRenderingContext} */gl, level, internalFormat, format, type, source) {
        gl.texImage2D(this.type, level, internalFormat, format, type, source);
    }

    generateMipmap(/** @type {WebGLRenderingContext} */gl) {
        gl.generateMipmap(this.type);
    }

    static activateTexture(/** @type {WebGLRenderingContext} */gl, texture) {
        gl.activeTexture(texture);
    }

    static pixelStorei(/** @type {WebGLRenderingContext} */gl, pname, param) {
        gl.pixelStorei(pname, param);
    }
}