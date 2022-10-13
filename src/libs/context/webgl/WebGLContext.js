import { WebGLBuffer } from "./WebGLBuffer";
import { DefaultProgram } from "./Program/DefaultProgram";
import { Node } from "../../core/Node";
import { PerspectiveCamera } from "../../3d/camera/PerspectiveCamera";
import { AmbientLight } from "../../3d/light/AmbientLight";
import { DirectionalLight } from "../../3d/light/DirectionalLight";
import { Matrix4 } from "../../math/Matrix4";
import { Geometry3D } from "../../3d/geometry/Geometry3D";
import { Color } from "../../core/Color";
import { Float32Buffer, Buffer } from "../../core/Buffer";

export class WebGLContext {
    constructor(/** @type {WebGLRenderingContext} */ gl) {
        this.gl = gl;
    }

    init(scene) {
        this.clearColor(scene.background);
        this.enableDepthTest();

        if (!this.program) {
            this.program = new DefaultProgram(this.gl);
        }
        this.program.use();

        this.webGLBuffer = new WebGLBuffer(this.gl, this.gl.ARRAY_BUFFER);
        this.buffer = new Float32Buffer(0);

        this.webGLBuffer.bind(this.gl);
        this.enableVertexAttribArray();

        this.program.uFogColor.setValue(this.gl, scene.fog.color);
        this.program.uFogDistance.setValue(this.gl, scene.fog.distance);
        this.program.uClicked.setValue(this.gl, 0);

        scene.children.forEach(this.initNode3D.bind(this));

        scene.addEventListener(Node.event.nodeInserted, e => {
            this.initNode3D(e.child);
        });
        scene.addEventListener(Node.event.nodeRemoved, e => {
            //removeNode3D(e.child);
        });
    }

    enableVertexAttribArray() {
        const stride = Geometry3D.vertexLength + Geometry3D.normalLength + Color.length;
        this.program.aVertexPosition.enableVertexAttribArray(this.gl, Geometry3D.vertexLength, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, 0);
        this.program.aVertexNormal.enableVertexAttribArray(this.gl, Geometry3D.normalLength, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * Geometry3D.vertexLength);
        this.program.aVertexColor.enableVertexAttribArray(this.gl, Color.length, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * (Geometry3D.vertexLength + Geometry3D.normalLength));
    }

    initNode3D(node) {
        if (node.constructor === PerspectiveCamera) {
            this.program.uViewMatrix.setValue(this.gl, node.projectionMatrix);
        } else if (node.constructor === AmbientLight) {
            this.program.uAmbientLight.setValue(this.gl, node.color);
        } else if (node.constructor === DirectionalLight) {
            this.program.uLightColor.setValue(this.gl, node.color);
            this.program.uLightPosition.setValue(this.gl, node.position);
        }
        node.children.forEach(this.initNode3D.bind(this));
    }

    draw(scene) {
        this.clear();

        scene.children.forEach(this.drawNode.bind(this));
    }

    drawNode(node) {
        if (node.drawMode) {
            if (node.updateBuffer(this.buffer)) {
                this.webGLBuffer.setData(this.gl, this.buffer.data, this.buffer.usage);
            }

            this.program.uVertexMatrix.setValue(this.gl, node.matrix);

            const normalMatrix = new Matrix4(node.matrix).invertMatrix().transpose();
            this.program.uNormalMatrix.setValue(this.gl, normalMatrix);
            this.drawArrays(this.gl[node.drawMode], node.drawIndex, node.drawCount);
        }
        node.children.forEach(this.drawNode.bind(this));
    }

    viewport(x, y, width, height) {
        this.gl.viewport(x, y, width, height);
    }

    clearColor(color) {
        if (color) {
            this.gl.clearColor(color[0], color[1], color[2], color[3]);
        } else {
            this.gl.clearColor(0, 0, 0, 1);
        }
    }

    enableBlend() {
        this.gl.enable(this.gl.BLEND);
        this.gl.blendFunc(this.gl.SRC_ALPHA, this.gl.ONE_MINUS_SRC_ALPHA);
    }

    enableDepthTest() {
        this.gl.enable(this.gl.DEPTH_TEST);
    }

    disableDepthTest() {
        this.gl.disable(this.gl.DEPTH_TEST);
    }

    clear(color = true, depth = true, stencil = true) {
        let bits = 0;

        if (color) bits |= this.gl.COLOR_BUFFER_BIT;
        if (depth) bits |= this.gl.DEPTH_BUFFER_BIT;
        if (stencil) bits |= this.gl.STENCIL_BUFFER_BIT;

        this.gl.clear(bits);
    }

    drawArrays(drawMode, first, drawCount) {
        this.gl.drawArrays(drawMode, first, drawCount);

        return this;
    }
}