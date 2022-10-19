import { Parameter } from './Parameter';

export class Uniform extends Parameter {
    constructor(type, name) {
        super(type, name);
        this.value = null;
    }

    saveLocation(/** @type {WebGLRenderingContext} */gl, program) {
        if (this.location) {
            return this.location;
        }
        this.location = gl.getUniformLocation(program, this.name);
    }

    setValue(/** @type {WebGLRenderingContext} */gl, value) {
        this.value = value;
        switch (this.type) {
            case 'sampler2D':
            case 'bool':
                gl.uniform1i(this.location, this.value);
                return;
            case 'mat2':
                gl.uniformMatrix2fv(this.location, false, this.value);
                return;
            case 'mat3':
                gl.uniformMatrix3fv(this.location, false, this.value);
                return;
            case 'mat4':
                gl.uniformMatrix4fv(this.location, false, this.value);
                return;
            case 'float':
                if (Array.isArray(this.value)) {
                    gl.uniform1fv(this.location, this.value);
                } else {
                    gl.uniform1f(this.location, this.value);
                }
                return;
            case 'vec2':
                gl.uniform2fv(this.location, this.value);
                return;
            case 'vec3':
                gl.uniform3fv(this.location, this.value);
                return;
            case 'vec4':
                gl.uniform4fv(this.location, this.value);
                return;
            case 'samplerCube':
            default:
                throw new Error(`${this.type} is missing ${this.setValue.name} implementation.`);
        }
    }

    getDeclaration() {
        return `uniform ${this.type} ${this.name};`
    }
}