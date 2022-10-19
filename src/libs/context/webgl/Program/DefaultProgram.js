import { FragmentShader } from "../shader/FragmentShader";
import { Attribute } from "../shader/parameter/Attribute";
import { Uniform } from "../shader/parameter/Uniform";
import { Varying } from "../shader/parameter/Varying";
import { VertexShader } from "../shader/VertexShader";
import { WebGLProgram } from "../WebGLProgram";

export class DefaultProgram extends WebGLProgram {
    constructor(/** @type {WebGLRenderingContext} */gl) {
        super(gl);
        this.createShader();
    }

    createShader() {
        this.aVertexPosition = new Attribute('vec4', 'a_VertexPosition');
        this.aVertexColor = new Attribute('vec4', 'a_VertexColor');
        this.aVertexNormal = new Attribute('vec4', 'a_VertexNormal');

        this.uViewMatrix = new Uniform('mat4', 'u_ViewMatrix');
        this.uVertexMatrix = new Uniform('mat4', 'u_VertexMatrix');
        this.uNormalMatrix = new Uniform('mat4', 'u_NormalMatrix');
        this.uPointSize = new Uniform('float', 'u_PointSize');
        this.uClicked = new Uniform('bool', 'u_Clicked');

        this.vVertexColor = new Varying('vec4', 'v_VertexColor');
        this.vVertexNormal = new Varying('vec3', 'v_VertexNormal');
        this.vVertexPosition = new Varying('vec3', 'v_VertexPosition');
        this.vDistance = new Varying('float', 'v_Distance');

        this.vertexShader = new VertexShader(
            [
                this.aVertexPosition, this.aVertexColor, this.aVertexNormal,
                this.uViewMatrix, , this.uVertexMatrix, this.uNormalMatrix, this.uPointSize, this.uClicked,
                this.vVertexColor, this.vVertexNormal, this.vVertexPosition, this.vDistance,
            ],
            [
                `gl_PointSize = ${this.uPointSize};`,
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
}