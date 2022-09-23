import { Program } from '../../libs/webgl/Program';
import { Buffer } from '../../libs/webgl/Buffer';
import { Texture } from '../../libs/webgl/Texture';
import { Attribute } from '../../libs/webgl/Shader/parameter/Attribute';
import { Uniform } from '../../libs/webgl/Shader/parameter/Uniform';
import { Varying } from '../../libs/webgl/Shader/parameter/Varying';
import { VertexShader } from '../../libs/webgl/Shader/VertexShader';
import { FragmentShader } from '../../libs/webgl/Shader/FragmentShader';

export class WebGLProgram extends Program {
    constructor(/** @type {WebGLRenderingContext} */gl) {
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
                `gl_FragColor = texture2D(${this.uTexture}, ${this.vTexCoord});`
            ].join('')
        );

        return this;
    }

    init() {
        this.createShader();
        this.create(this.vertexShader, this.fragmentShader);
        this.use();
        this.saveLocation();

        this.buffer = new Buffer(this.gl, this.gl.ARRAY_BUFFER);
        this.texture = new Texture(this.gl, this.gl.TEXTURE_2D);
        //Texture.setFlipY(this.gl, 1);

        this.aVertexPosition.enableBuffer(this.gl, this.buffer, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, 0);
        this.aTexCoord.enableBuffer(this.gl, this.buffer, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 4, Float32Array.BYTES_PER_ELEMENT * 2);

        return this;
    }

    updateBuffer(data) {
        this.data = data;
        this.buffer.setData(this.gl, this.data, this.gl.STREAM_DRAW);
        return this;
    }

    updateVertexMatrix(matrix) {
        this.uVertexMatrix.setValue(this.gl, matrix);
    }

    updateViewMatrix(matrix) {
        this.uViewMatrix.setValue(this.gl, matrix)
    }


    updateTexture(image) {
        this.texture.setParameter(this.gl, this.gl.TEXTURE_MIN_FILTER, this.gl.LINEAR);
        this.texture.setTexture(this.gl, 0, this.gl.RGBA, this.gl.RGBA, this.gl.UNSIGNED_BYTE, image);
        this.uTexture.setValue(this.gl, this.texture.index);
    }
}