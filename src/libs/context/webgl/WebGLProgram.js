export class WebGLProgram {
    constructor(/** @type {WebGLRenderingContext} */gl) {
        this.gl = gl;
        this.vertexShader = null;
        this.fragmentShader = null;
        this.created = false;
    }

    attachShader(shader) {
        const compiledShader = shader.getCompiledShader ? shader.getCompiledShader(this.gl) : shader;
        this.gl.attachShader(this.program, compiledShader);

        return this;
    }

    link() {
        this.gl.linkProgram(this.program);

        return this;
    }

    create() {
        if (!this.created) {
            this.program = this.gl.createProgram();
            this.attachShader(this.vertexShader);
            this.attachShader(this.fragmentShader);
            this.link();

            if (this.getLinkStatus) {
                this.created = true;
                return true;
            }
            const error = new Error(`Failed to create program : ${this.gl.getProgramInfoLog(this.program)}`,);
            this.delete();
            throw error;
        }
    }

    getLinkStatus() {
        return this.gl.getProgramParameter(this.program, this.gl.LINK_STATUS);
    }

    delete() {
        this.gl.deleteProgram(this.program);
        this.program = null;
        this.created = false;

        return this;
    }

    use() {
        this.create();
        this.gl.useProgram(this.program);
        this.saveLocation();

        return this;
    }

    saveLocation() {
        this.vertexShader.saveLocation(this.gl, this.program);
        this.fragmentShader.saveLocation(this.gl, this.program);

        return this;
    }
}