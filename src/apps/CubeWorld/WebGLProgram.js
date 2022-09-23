import { Program } from '../../libs/webgl/Program';
import { Buffer } from '../../libs/webgl/Buffer';
import { Attribute } from '../../libs/webgl/Shader/parameter/Attribute';
import { Uniform } from '../../libs/webgl/Shader/parameter/Uniform';
import { Varying } from '../../libs/webgl/Shader/parameter/Varying';
import { VertexShader } from '../../libs/webgl/Shader/VertexShader';
import { FragmentShader } from '../../libs/webgl/Shader/FragmentShader';
import { ColoredGeometry3d } from '../../libs/3d/geometry/ColoredGeometry3d';
import { Geometry3d } from '../../libs/3d/geometry/Geometry3d';
import { Matrix4 } from '../../libs/math/Matrix4';

export class WebGLProgram extends Program {
    constructor(/** @type {WebGLRenderingContext} */gl) {
        super(gl);
        this.data = [];
    }

    createShader() {
        this.aVertexPosition = new Attribute('vec4', 'a_VertexPosition');
        this.aVertexColor = new Attribute('vec4', 'a_VertexColor');
        this.aVertexNormal = new Attribute('vec4', 'a_VertexNormal');

        this.uViewMatrix = new Uniform('mat4', 'u_ViewMatrix');
        this.uVertexMatrix = new Uniform('mat4', 'u_VertexMatrix');
        this.uNormalMatrix = new Uniform('mat4', 'u_NormalMatrix');
        this.uClicked = new Uniform('bool', 'u_Clicked');

        this.vVertexColor = new Varying('vec4', 'v_VertexColor');
        this.vVertexNormal = new Varying('vec3', 'v_VertexNormal');
        this.vVertexPosition = new Varying('vec3', 'v_VertexPosition');
        this.vDistance = new Varying('float', 'v_Distance');

        this.vertexShader = new VertexShader(
            [
                this.aVertexPosition, this.aVertexColor, this.aVertexNormal,
                this.uViewMatrix, , this.uVertexMatrix, this.uNormalMatrix, this.uClicked,
                this.vVertexColor, this.vVertexNormal, this.vVertexPosition, this.vDistance,
            ],
            [
                `gl_Position = ${this.uViewMatrix} * ${this.uVertexMatrix} * ${this.aVertexPosition};`,
                `${this.vVertexColor} = ${this.aVertexColor};`,
                `if(${this.uClicked}) {`,
                `return;`,
                `}`,
                `${this.vVertexNormal} = normalize(vec3(${this.uNormalMatrix} * ${this.aVertexNormal}));`,
                `${this.vVertexPosition} = vec3(${this.uVertexMatrix} * ${this.aVertexPosition});`,
                `${this.vDistance} = gl_Position.w;`,
            ].join('')
        );

        this.uLightColor = new Uniform('vec3', 'u_LightColor');
        this.uLightPosition = new Uniform('vec3', 'u_LightPosition');
        this.uAmbientLight = new Uniform('vec3', 'u_AmbientLight');
        this.uFogColor = new Uniform('vec3', 'u_FogColor');
        this.uFogDistance = new Uniform('vec2', 'u_FogDist');

        this.fragmentShader = new FragmentShader(
            'highp',
            [
                this.uLightColor, this.uLightPosition, this.uAmbientLight, this.uClicked, this.uFogColor, this.uFogDistance,
                this.vVertexColor, this.vVertexNormal, this.vVertexPosition, this.vDistance,
            ],
            [
                `if(${this.uClicked}) {`,
                `gl_FragColor = ${this.vVertexColor};`,
                `return;`,
                `}`,
                `vec3 lightDirection = normalize(${this.uLightPosition} - ${this.vVertexPosition});`,
                `float nDotL = max(dot(lightDirection, ${this.vVertexNormal}), 0.0);`,
                `vec3 diffuse = ${this.uLightColor} * ${this.vVertexColor}.rgb * nDotL;`,
                `vec3 ambient = ${this.uAmbientLight} * ${this.vVertexColor}.rgb;`,
                `float fogFactor = clamp((${this.uFogDistance}.y - ${this.vDistance}) / (${this.uFogDistance}.y - ${this.uFogDistance}.x), 0.0, 1.0);`,
                `vec3 color = mix(${this.uFogColor}, vec3(diffuse + ambient), fogFactor);`,
                `gl_FragColor = vec4(color, ${this.vVertexColor}.a);`,
            ].join('')
        );
    }

    init() {
        this.createShader();
        this.create(this.vertexShader, this.fragmentShader);

        this.use();
        this.saveLocation();

        this.buffer = new Buffer(this.gl, this.gl.ARRAY_BUFFER);

        this.aVertexPosition.enableBuffer(this.gl, this.buffer, Geometry3d.geometryVectorLength, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * ColoredGeometry3d.dataLength, 0);
        this.aVertexColor.enableBuffer(this.gl, this.buffer, ColoredGeometry3d.colorVectorLength, this.gl.FLOAT, true, Float32Array.BYTES_PER_ELEMENT * ColoredGeometry3d.dataLength, Float32Array.BYTES_PER_ELEMENT * Geometry3d.geometryVectorLength);
        this.aVertexNormal.enableBuffer(this.gl, this.buffer, Geometry3d.normalVectorLength, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * ColoredGeometry3d.dataLength, Float32Array.BYTES_PER_ELEMENT * (Geometry3d.geometryVectorLength + ColoredGeometry3d.colorVectorLength));

        return this;
    }

    updateBuffer(data) {
        this.data = data;
        this.buffer.setData(this.gl, this.data, this.gl.STATIC_DRAW);

        return this;
    }

    updatedClick(value) {
        this.uClicked.setValue(this.gl, value);
    }

    updateFog(fog) {
        if (fog.color) {
            this.uFogColor.setValue(this.gl, fog.color);
        }
        if (fog.distance) {
            this.uFogDistance.setValue(this.gl, fog.distance);
        }
    }

    updateLight(light) {
        if (light.color) {
            this.uLightColor.setValue(this.gl, light.color);
        }
        if (light.position) {
            this.uLightPosition.setValue(this.gl, light.position);
        }
        if (light.ambientColor) {
            this.uAmbientLight.setValue(this.gl, light.ambientColor);
        }
    }

    updateViewMatrix(matrix) {
        this.uViewMatrix.setValue(this.gl, matrix)
    }

    updateVertexMatrix(matrix) {
        this.uVertexMatrix.setValue(this.gl, matrix);

        const normalMatrix = new Matrix4(matrix).invertMatrix().transpose().values;
        this.uNormalMatrix.setValue(this.gl, normalMatrix);
    }
}