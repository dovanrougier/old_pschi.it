import { Parameter } from './Parameter';

export class Uniform extends Parameter {
    constructor(type, name) {
        super(type, name);
    }

    saveLocation(/** @type {WebGLRenderingContext} */gl, program) {
        if(this.location){
            return this.location;
        }
        this.location = gl.getUniformLocation(program, this.name);
    }

    setValue(/** @type {WebGLRenderingContext} */gl, value) {
        switch (this.type) {
            case 'sampler2D':
            case 'bool':
                gl.uniform1i(this.location, value);
                return;
            case 'mat2':
                gl.uniformMatrix2fv(this.location, false, value);
                return;
            case 'mat3':
                gl.uniformMatrix3fv(this.location, false, value);
                return;
            case 'mat4':
                gl.uniformMatrix4fv(this.location, false, value);
                return;
            case 'float':
                gl.uniform1f(this.location, value);
                return;
            case 'vec2':
                gl.uniform2fv(this.location, value);
                return;
            case 'vec3':
                gl.uniform3fv(this.location, value);
                return;
            case 'vec4':
                gl.uniform4fv(this.location, value);
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