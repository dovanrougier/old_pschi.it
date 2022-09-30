export class Shader {
    constructor(parameters, main) {
        this.updateShader(parameters, main);
    }

    getCompiledShader(/** @type {WebGLRenderingContext} */ gl) {
        if (!this.isCompiled || !this.shader) {
            this.shader = gl.createShader(this.getType(gl));
            gl.shaderSource(this.shader, this.getSource());
            gl.compileShader(this.shader);
            const success = gl.getShaderParameter(this.shader, gl.COMPILE_STATUS);
            if (success) {
                this.isCompiled = true;
            }
            else{
                const error = new Error(`Failed to create ${this.constructor.name} : ${gl.getShaderInfoLog(this.shader)}`,);
                this.deleteShader(gl);
                this.shader = null;
                throw error;
            }
        }
        return this.shader;
    }

    saveLocation(/** @type {WebGLRenderingContext} */ gl, program){
        this.parameters.forEach(p => {
            p.saveLocation(gl, program);
        });
    }

    updateShader(parameters, main) {
        this.parameters = parameters || [];
        this.main = main || '';
        this.isCompiled = false;
    }

    deleteShader(/** @type {WebGLRenderingContext} */ gl) {
        gl.deleteShader(this.shader);
        this.shader = null;
        this.isCompiled = false;
    }

    getType(/** @type {WebGLRenderingContext} */ gl) {
        throw new Error(`${this.constructor.name} is missing ${this.getType.name} implementation.`);
    }

    getSource() {
        throw new Error(`${this.constructor.name} is missing ${this.getSource.name} implementation.`);
    }
}