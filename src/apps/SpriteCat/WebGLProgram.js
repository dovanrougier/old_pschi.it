import { Program } from '../../libs/webgl/Program';
import { Attribute } from '../../libs/webgl/Shader/parameter/Attribute';
import { Uniform } from '../../libs/webgl/Shader/parameter/Uniform';
import { Varying } from '../../libs/webgl/Shader/parameter/Varying';
import { VertexShader } from '../../libs/webgl/Shader/VertexShader';
import { FragmentShader } from '../../libs/webgl/Shader/FragmentShader';

export class WebGLProgram extends Program {
    constructor(/** @type {WebGLRenderingContext} */gl, buffer, texture) {
        super(gl);
        this.data = [];
    }

    createShader() {
        this.aVertexPosition = new Attribute('vec4', 'a_VertexPosition');
        this.aTexCoord = new Attribute('vec2', 'a_texCoord');

        this.uVertexMatrix = new Uniform('mat4', 'u_VertexMatrix');
        this.uViewMatrix = new Uniform('mat4', 'u_ViewMatrix');
        this.uTexture = new Uniform('sampler2D', 'u_texture');

        this.vTexCoord = new Varying('vec2', 'v_texCoord');

        this.vertexShader = new VertexShader(
            [this.aVertexPosition, this.aTexCoord, this.uVertexMatrix, this.uViewMatrix, this.vTexCoord],
            [
                `${this.vTexCoord} = ${this.aTexCoord};`,
                `gl_Position = ${this.uViewMatrix} * ${this.uVertexMatrix} * ${this.aVertexPosition};`,
            ].join('')
        );

        this.fragmentShader = new FragmentShader(
            'mediump',
            [this.vTexCoord, this.uTexture],
            [
                `gl_FragColor = texture2D(${this.uTexture}, ${this.vTexCoord});`,
            ].join('')
        );

        return this;
    }

    init() {
        this.createShader();
        this.create(this.vertexShader, this.fragmentShader);
        this.use();
        this.saveLocation();

        return this;
    }

    setBuffer(buffer) {
        this.aVertexPosition.enableBuffer(this.gl, buffer, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, 0);
        this.aTexCoord.enableBuffer(this.gl, buffer, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, Float32Array.BYTES_PER_ELEMENT * 2);
    }

    setTexture(texture) {
        this.uTexture.setValue(this.gl, texture.index);
    }

    updateVertexMatrix(matrix) {
        this.uVertexMatrix.setValue(this.gl, matrix);
    }

    updateViewMatrix(matrix) {
        this.uViewMatrix.setValue(this.gl, matrix)
    }
}