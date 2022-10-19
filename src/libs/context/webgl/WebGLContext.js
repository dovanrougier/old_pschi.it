import { DefaultProgram } from "./Program/DefaultProgram";
import { Node } from "../../core/Node";
import { PerspectiveCamera } from "../../3d/camera/PerspectiveCamera";
import { AmbientLight } from "../../3d/light/AmbientLight";
import { DirectionalLight } from "../../3d/light/DirectionalLight";
import { Matrix4 } from "../../math/Matrix4";
import { Geometry3D } from "../../3d/geometry/Geometry3D";
import { Color } from "../../core/Color";
import { Float32Buffer, UInt16Buffer, Uint32Buffer } from "../../core/Buffer";
import { WebGLElementBuffer } from "./WebGLElementBuffer";

export class WebGLContext {
    constructor(/** @type {WebGLRenderingContext} */ gl) {
        this.gl = gl;
        this.polyfillExtension();
    }

    init(scene) {
        this.clearColor(scene.background);
        this.enableDepthTest();

        if (!this.program) {
            this.program = new DefaultProgram(this.gl);
        }
        this.program.use();

        this.webGLBuffer = new WebGLElementBuffer(this.gl);

        this.buffer = new Float32Buffer(0, new UInt16Buffer(0));

        this.webGLBuffer.bind(this.gl);
        this.enableVertexAttribArray();

        this.program.uFogColor.setValue(this.gl, scene.fog.color.rgb);
        this.program.uFogDistance.setValue(this.gl, scene.fog.distance);

        scene.children.forEach(this.initNode3D.bind(this));

        scene.addEventListener(Node.event.nodeInserted, e => {
            this.initNode3D(e.child);
        });
        scene.addEventListener(Node.event.nodeRemoved, e => {
            //removeNode3D(e.child);
        });
    }

    enableVertexAttribArray() {
        const stride = Geometry3D.vertexPositionLength + Geometry3D.vertexNormalLength + Color.length;
        this.program.aVertexPosition.enableVertexAttribArray(this.gl, Geometry3D.vertexPositionLength, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, 0);
        this.program.aVertexNormal.enableVertexAttribArray(this.gl, Geometry3D.vertexNormalLength, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * Geometry3D.vertexPositionLength);
        this.program.aVertexColor.enableVertexAttribArray(this.gl, Color.length, this.gl.FLOAT, false, Float32Array.BYTES_PER_ELEMENT * stride, Float32Array.BYTES_PER_ELEMENT * (Geometry3D.vertexPositionLength + Geometry3D.vertexNormalLength));
    }

    initNode3D(node) {
        if (node.constructor === PerspectiveCamera) {
            this.program.uViewMatrix.setValue(this.gl, node.projectionMatrix);
        } else if (node.constructor === AmbientLight) {
            this.program.uAmbientLight.setValue(this.gl, node.color.rgb);
        } else if (node.constructor === DirectionalLight) {
            this.program.uLightColor.setValue(this.gl, node.color.rgb);
            this.program.uLightPosition.setValue(this.gl, node.position);
        }
        node.children.forEach(this.initNode3D.bind(this));
    }

    draw(scene) {
        this.clear();

        scene.children.forEach(this.drawNode.bind(this));
    }

    drawNode(node) {
        if (node.geometry) {
            if (node.geometry.updateBuffer(this.buffer)) {
                this.webGLBuffer.setData(this.gl, this.buffer.data, this.buffer.usage);
            }
            if (node.geometry.updateIndexBuffer(this.buffer)) {
                this.webGLBuffer.setIndex(this.gl, this.buffer.index.data, this.buffer.usage);
            }

            this.program.uVertexMatrix.setValue(this.gl, node.matrix);

            const normalMatrix = new Matrix4(node.matrix).invertMatrix().transpose();
            this.program.uNormalMatrix.setValue(this.gl, normalMatrix);

            if (node.debug && this.program.uClicked.value != 1) {
                this.program.uClicked.setValue(this.gl, 1);
            } else if (!node.debug && this.program.uClicked.value != 0) {
                this.program.uClicked.setValue(this.gl, 0);
            }

            const pointSize = node.geometry.material.pointSize;
            if (this.program.uPointSize.value != pointSize) {
                this.program.uPointSize.setValue(this.gl, pointSize);
            }
            this.drawElements(this.gl[node.geometry.vertexMode], node.geometry.indexLength, this.gl.UNSIGNED_SHORT, node.geometry.vertexIndex * this.buffer.index.BYTES_PER_ELEMENT);
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

    drawElements(mode, count, type, offset) {
        //console.log(count,offset);
        this.gl.drawElements(mode, count, type, offset);

        return this;
    }

    drawArrays(drawMode, first, drawCount) {
        this.gl.drawArrays(drawMode, first, drawCount);

        return this;
    }

    polyfillExtension() {
        this.extensions = this.gl.getSupportedExtensions().map(e => this.gl.getExtension(e));
        console.log(this.extensions);
    }
}