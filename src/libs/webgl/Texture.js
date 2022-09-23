export class Texture {
    static binded = null;
    static index = 0;
    static flipY = 0;
    static preMultiplyAlpha = 0;
    constructor(gl, type) {
        this.type = type;
        this.create(gl);
    }

    create(/** @type {WebGLRenderingContext} */gl) {
        this.texture = gl.createTexture();
        this.index = Texture.index++;
        gl.activeTexture(this.getTextureIndex(gl));
        this.bind(gl);
    }

    delete(/** @type {WebGLRenderingContext} */gl) {
        gl.deleteTexture(this.texture);
        this.texture = null;
    }

    bind(/** @type {WebGLRenderingContext} */gl) {
        if (Texture.binded?.index != this.index) {
            gl.bindTexture(this.type, this.texture);
            Texture.binded = this;
        }
    }

    getTextureIndex(/** @type {WebGLRenderingContext} */gl) {
        return gl['TEXTURE'+ this.index]
    }

    setParameter(/** @type {WebGLRenderingContext} */gl, pname, param) {
        this.bind(gl);
        gl.texParameteri(this.type, pname, param);
    }

    setTexture(/** @type {WebGLRenderingContext} */gl, level, internalFormat, format, type, source) {
        this.bind(gl);
        gl.texImage2D(this.type, level, internalFormat, format, type, source);
    }

    generateMipmap(/** @type {WebGLRenderingContext} */gl) {
        gl.generateMipmap(this.type);
    }

    static setFlipY(/** @type {WebGLRenderingContext} */gl, value) {
        if(Texture.flipY != value){
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, value);
            Texture.flipY = value;
        }
    }

    static setPreMultiplyAlpha(/** @type {WebGLRenderingContext} */gl, value) {
        gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, value);
        if(Texture.preMultiplyAlpha != value){
            gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL, value);
            Texture.preMultiplyAlpha = value;
        }
    }

    static getActiveTexture(/** @type {WebGLRenderingContext} */gl){
        return gl.getParameter(gl.ACTIVE_TEXTURE);
    }
}