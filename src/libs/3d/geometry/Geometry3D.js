import { Color } from "../../core/Color";
import { Node } from "../../core/Node";
import { ColorMaterial } from "../material/ColorMaterial";

export class Geometry3D extends Node {
    static vertexPositionLength = 3;
    static vertexNormalLength = 3;
    static vertexColorLength = 4;
    static vertexUVLength = 2;

    constructor(material) {
        super();

        this.vertexPositionLength = Geometry3D.vertexPositionLength;
        this.vertexNormalLength = Geometry3D.vertexNormalLength;
        this.vertexColorLength = Geometry3D.vertexColorLength;
        this.vertexUVLength = Geometry3D.vertexUVLength;
        this.vertexPositionOffset = 0;
        this.vertexNormalOffset = Geometry3D.vertexPositionLength;
        this.vertexColorOffset = Geometry3D.vertexPositionLength + Geometry3D.vertexNormalLength;

        this.stride = 10;
        this.bufferPosition = -1;

        this.updated.index = true;
        this.updated.vertices = true;

        this.material = material || new ColorMaterial(new Color(1, 1, 1, 1));
    }

    get indexLength() {
        return this.index.length;
    }

    get bufferLength() {
        return this.vertexCount * this.stride;
    }

    get vertexIndex() {
        if (this.indexLength) {
            return this.indexBufferPosition;
        }
        return this.bufferPosition / this.stride;
    }

    updateIndexes(buffer) {
        buffer.updateIndex(this.index, this);
    }

    updateVertices(buffer) {
        buffer.update(this.vertices, this);
    }

    updateIndexBuffer(buffer) {
        if (buffer.index && this.updated.index) {
            this.updateIndexes(buffer);
            this.updated.index = false;
            return true;
        }
        return false;
    }

    updateBuffer(buffer) {
        let result = false;
        if (this.updated.vertices) {
            this.updateVertices(buffer);
            this.updated.vertices = false;
            result = true;
        }

        return result;
    }

    static updateVertex(array, vertexIndex, x, y, z, normalX, normalY, normalZ, r, g, b, a) {
        array[vertexIndex++] = x;
        array[vertexIndex++] = y;
        array[vertexIndex++] = z;

        array[vertexIndex++] = normalX;
        array[vertexIndex++] = normalY;
        array[vertexIndex++] = normalZ;

        array[vertexIndex++] = r;
        array[vertexIndex++] = g;
        array[vertexIndex++] = b;
        array[vertexIndex++] = a;

        return vertexIndex;
    }

    static updateVertexPosition(array, vertexIndex, x, y, z) {
        array[vertexIndex++] = x;
        array[vertexIndex++] = y;
        array[vertexIndex++] = z;

        return vertexIndex;
    }

    static updateVertexNormal(array, vertexIndex, normalX, normalY, normalZ) {
        vertexIndex += Geometry3D.vertexPositionLength;
        array[vertexIndex++] = normalX;
        array[vertexIndex++] = normalY;
        array[vertexIndex++] = normalZ;

        return vertexIndex;
    }

    static updateVertexColor(array, vertexIndex, r, g, b, a) {
        vertexIndex += Geometry3D.vertexPositionLength + Geometry3D.vertexNormalLength;
        array[vertexIndex++] = r;
        array[vertexIndex++] = g;
        array[vertexIndex++] = b;
        array[vertexIndex++] = a;

        return vertexIndex;
    }
}