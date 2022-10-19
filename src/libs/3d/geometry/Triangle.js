import { Vector3 } from "../../math/Vector3";
import { Geometry3D } from "./Geometry3D";

export class Triangle extends Geometry3D {
    constructor(a, b, c) {
        super();
        this.a = a || new Vector3(-0.5, -0.5, -0.5);
        this.b = b || new Vector3(-0.5, 0.5, -0.5);
        this.c = c || new Vector3(0.5, -0.5, -0.5);

        this.indexLength  = 3;
        this.vertexCount = 3;
        this.normal = new Vector3(0, 0, -1);
    }
    
    get vertexMode() {
        if (this.material.wireframe) {
            return 'LINE_LOOP';
        }
        return 'TRIANGLES';
    }


    get index() {
        return [0, 1, 2];

    }

    get vertexColor() {
        if (this.material.rainbow) {
            return [
                1, 0, 0, 1,
                0, 1, 0, 1,
                0, 0, 1, 1
            ];
        }
        const color = this.material.color;
        return [
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
        ];
    }

    get vertices() {
        const result = new Float32Array(this.bufferLength);
        Triangle.updateBuffer(result, 0, this.a, this.b, this.c, this.normal, this.vertexColor);
        return result;
    }

    static updateBuffer(array, index, a, b, c, normal, color) {
        Geometry3D.updateVertex(array, index, a[0], a[1], a[2], normal[0], normal[1], normal[2], color[0], color[1], color[2], color[3]);
        Geometry3D.updateVertex(array, index += 10, b[0], b[1], b[2], normal[0], normal[1], normal[2], color[4], color[5], color[6], color[7]);
        Geometry3D.updateVertex(array, index += 10, c[0], c[1], c[2], normal[0], normal[1], normal[2], color[8], color[9], color[10], color[11]);
    }
}