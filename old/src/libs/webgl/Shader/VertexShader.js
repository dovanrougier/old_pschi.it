import { Shader } from "./Shader";

export class VertexShader extends Shader {
    constructor(parameters, main,) {
        super(parameters, main);
    }

    getType(/** @type {WebGLRenderingContext} */ gl) {
        return gl.VERTEX_SHADER;
    }

    getSource() {
        const result = [];
        this.parameters.forEach(p => {
            result.push(p.getDeclaration());
        });

        result.push('void main(){');
        result.push(this.main);
        result.push('}')

        return result.join('');
    }
}