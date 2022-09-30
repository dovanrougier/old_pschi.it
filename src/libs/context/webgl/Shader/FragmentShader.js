import { Shader } from './Shader';

export class FragmentShader extends Shader {
    constructor(precision, parameters, main) {
        super(parameters, main);
        this.precision = precision;
    }

    getType(/** @type {WebGLRenderingContext} */ gl) {
        return gl.FRAGMENT_SHADER;
    }

    getSource() {
        const result = [];
        if(this.precision){
            result.push(`precision ${this.precision} float;`);
        }
        this.parameters.forEach(p => {
            result.push(p.getDeclaration());
        });

        result.push('void main(){');
        result.push(this.main);
        result.push('}')

        return result.join('');
    }
}