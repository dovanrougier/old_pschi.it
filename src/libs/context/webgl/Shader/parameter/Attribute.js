import { Parameter } from './Parameter';

export class Attribute extends Parameter {
    constructor(type, name) {
        super(type, name);
    }

    saveLocation(/** @type {WebGLRenderingContext} */gl, program) {
        if (this.location) {
            return this.location;
        }
        return this.location = gl.getAttribLocation(program, this.name);
    }

    setValue(/** @type {WebGLRenderingContext} */gl, value) {
        if (!Array.isArray(value)) {
            return gl.vertexAttrib1f(this.location, value);
        }
        switch (value.length) {
            case 1:
                return gl.vertexAttrib1fv(this.location, value);
            case 2:
                return gl.vertexAttrib2fv(this.location, value);
            case 3:
                return gl.vertexAttrib3fv(this.location, value);
            case 4:
                return gl.vertexAttrib4fv(this.location, value);
            default:
                throw new Error(`${this.type} ${this.name} cannot be set to ${value} (${value.length}).`);
        }
    }

    enableVertexAttribArray(/** @type {WebGLRenderingContext} */gl, size, type, normalized, stride, offset) {
        gl.vertexAttribPointer(this.location, size, type, normalized, stride, offset);
        gl.enableVertexAttribArray(this.location);
        return this;
    }

    disableVertexAttribArray(/** @type {WebGLRenderingContext} */gl) {
        gl.disableVertexAttribArray(this.location);
        return this;
    }

    getDeclaration() {
        return `attribute ${this.type} ${this.name};`
    }
}