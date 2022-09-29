import { Program } from '../../libs/webgl/Program';
import { Buffer } from '../../libs/webgl/Buffer';
import { Attribute } from '../../libs/webgl/Shader/parameter/Attribute';
import { Varying } from '../../libs/webgl/Shader/parameter/Varying';
import { VertexShader } from '../../libs/webgl/Shader/VertexShader';
import { FragmentShader } from '../../libs/webgl/Shader/FragmentShader';

export class WebGLProgram extends Program{
    constructor(/** @type {WebGLRenderingContext} */gl){
        super(gl);
        this.data = [];
    }

    createShader(){
        this.aPosition = new Attribute('vec4', 'a_Position');
        this.aPointSize = new Attribute('float', 'a_PointSize');
        this.aColor = new Attribute('vec4', 'a_Color');
        this.aPointLimit = new Attribute('float', 'a_PointLimit');
        
        this.vColor = new Varying('vec4', 'v_Color');
        this.vPointLimit = new Varying('float', 'v_PointLimit');
        
        this.vertexShader = new VertexShader(
            [this.aPosition, this.aPointSize, this.aPointLimit, this.aColor, this.vColor,this.vPointLimit],
            [
                `${this.vColor} = ${this.aColor};`,
                `${this.vPointLimit} = ${this.aPointLimit};`,
                `gl_Position = ${this.aPosition};`,
                `gl_PointSize = ${this.aPointSize};`,
            ].join(''));
        
        this.fragmentShader = new FragmentShader(
            'mediump',
            [this.vColor, this.vPointLimit],
            [
                `if(distance(gl_PointCoord, vec2(0.5, 0.5)) > ${this.vPointLimit}){`,
                `discard;`,
                `}`,
                `gl_FragColor = ${this.vColor};`,
            ].join(''));
    }

    init(){
        this.createShader();
        this.create(this.vertexShader, this.fragmentShader);

        this.use();
        this.saveLocation();
        
        this.buffer = new Buffer(this.gl, this.gl.ARRAY_BUFFER);

        this.aPosition.enableBuffer(this.gl, this.buffer, 2, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 8, 0);
        this.aPointSize.enableBuffer(this.gl, this.buffer, 1, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 8, Float32Array.BYTES_PER_ELEMENT * 2);
        this.aPointLimit.enableBuffer(this.gl, this.buffer, 1, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 8, Float32Array.BYTES_PER_ELEMENT * 3);
        this.aColor.enableBuffer(this.gl, this.buffer, 4, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * 8, Float32Array.BYTES_PER_ELEMENT * 4);
        
        return this;
    }

    updateBuffer(data){
        this.data = data;
        this.buffer.setData(this.gl, this.data, this.gl.STATIC_DRAW);
        
        return this;
    }
}