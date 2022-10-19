import { Vector3 } from "../../math/Vector3";
import { Geometry3D } from "./Geometry3D";

export class Plane extends Geometry3D {
    constructor(width, height) {
        super();
        this.width = width || 1;
        this.height = height || 1;
        this.normal = new Vector3(0, 0, -1);

        this.vertexCount = 4;
    }

    get indexLength() {
        return 4;
    }

    get vertexMode() {
        if (this.material.wireframe) {
            return 'LINE_LOOP';
        }
        return 'TRIANGLE_STRIP';
    }

    get index() {
        if (this.material.wireframe) {
            return [0, 1, 2, 3];
        }
        return [3, 0, 2, 1];
    }

    get vertexColor() {
        if (this.material.rainbow) {
            return [
                1, 0, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1,
                1, 1, 1, 1
            ];
        }
        const color = this.material.color;
        return [
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
        ];
    }

    get vertices() {
        const result = new Float32Array(this.bufferLength);
        Plane.updateVertices(result, 0, 0, 0, 0, this.width, this.height, 0, this.normal, this.vertexColor);
        return result;
    }

    updateVertices(buffer) {
        const index = buffer.getNodePosition(this);
        Plane.updateVertices(buffer.data, index, 0, 0, 0, this.width, this.height, 0, this.normal, this.vertexColor);
    }

    static updateVertices(array, index, x, y, z, width, height, depth, normal, color) {
        let i = index;
        const xw = x + width / 2,
            yh = y + height / 2;
        x -= width / 2;
        y -= height / 2;
        Geometry3D.updateVertex(array, index, x, y, z, normal[0], normal[1], normal[2], color[0], color[1], color[2], color[3]);
        Geometry3D.updateVertex(array, index += 10, x, yh, z, normal[0], normal[1], normal[2], color[4], color[5], color[6], color[7]);
        Geometry3D.updateVertex(array, index += 10, xw, yh, z, normal[0], normal[1], normal[2], color[8], color[9], color[10], color[11]);
        Geometry3D.updateVertex(array, index += 10, xw, y, z, normal[0], normal[1], normal[2], color[12], color[13], color[14], color[15]);

        return index;
    }
}