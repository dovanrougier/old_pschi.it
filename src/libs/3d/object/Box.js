import { Color } from "../../core/Color";
import { Geometry3D } from "../geometry/Geometry3D";
import { Cube } from "../geometry/Cube";
import { Node3D } from "../Node3D";

export class Box extends Node3D {
    constructor(width = 1, height = 1, depth = 1, widthSegment = 1, heightSegment = 1, depthSegment = 1, color = new Color(1, 0, 0), drawMode = 'TRIANGLES') {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
        this.widthSegment = widthSegment;
        this.heightSegment = heightSegment;
        this.depthSegment = depthSegment;
        this.drawMode = drawMode;
        this.color = color;

        this.geometry = Cube;
        this.stride = Geometry3D.vertexLength + Geometry3D.normalLength + this.color.length;
        this.instanceCount = (this.width / this.widthSegment) * (this.height / this.heightSegment) * (this.depth / this.depthSegment);
        this.drawCount = this.geometry.vertexCount(this.drawMode) * this.instanceCount;
        this.bufferLength = this.drawCount * this.stride;

        this.updated.bufferLength = true;

    }

    updateVertex(buffer) {
        if (this.updated.vertex) {
            let bufferIndex = this.bufferIndex;
            const step = this.bufferLength / this.instanceCount;
            let x = this.position[0] - this.width / 2,
                y = this.position[1] - this.height / 2,
                z = this.position[2] - this.depth / 2;
            for (let i = 0; i < this.instanceCount; i++) {
                this.geometry.updateVertexArray(buffer.data, bufferIndex, 0, this.stride, x, y, z, this.widthSegment, this.heightSegment, this.depthSegment, this.drawMode);
                bufferIndex += step;
                x += this.widthSegment;
                if (x >= this.width - this.width / 2) {
                    x = this.position[0] - this.width / 2;
                    y += this.heightSegment;
                    if (y >= this.height - this.height / 2) {
                        y = this.position[1] - this.height / 2;
                        z += this.depthSegment;
                    }
                }
            }
            this.updated.vertex = false;
            return true;
        }
        return false;
    }

    updateNormal(buffer) {
        if (this.updated.normal) {
            let bufferIndex = this.bufferIndex;
            const step = this.bufferLength / this.instanceCount;
            for (let i = 0; i < this.instanceCount; i++) {
                this.geometry.updateNormalArray(buffer.data, bufferIndex, Geometry3D.vertexLength, this.stride, this.drawMode);
                bufferIndex += step;
            }
            this.updated.normal = false;
            return true;
        }
        return false;
    }

    updateColor(buffer) {
        if (this.updated.color) {
            let bufferIndex = this.bufferIndex;
            const step = this.bufferLength / this.instanceCount;
            for (let i = 0; i < this.instanceCount; i++) {
                this.color = [Math.random(), Math.random(), Math.random(), 1];
                this.geometry.updateColorArray(buffer.data, bufferIndex, Geometry3D.vertexLength + Geometry3D.normalLength, this.stride, this.color, this.drawMode);
                bufferIndex += step;
            }
            this.updated.color = false;
            return true;
        }
        return false;
    }
}