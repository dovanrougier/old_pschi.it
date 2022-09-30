import { Float32Buffer } from "../../core/Buffer";
import { Vector4 } from "../../math/Vector4";
import { Node3D } from "../Node3D";

export class Box extends Node3D {
    static drawMode = 'TRIANGLES';
    static drawCount = 36;
    static vertexLength = 3;
    static normalLength = 3;
    static colorLength = 4;
    static stride = 10;

    constructor(width = 1, height = 1, depth = 1, r = 1, g = 0, b = 0, a = 1) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
        this._color = new Vector4(r, g, b, a);

        this.initBuffer();
    }

    get color() {
        return this._color;
    }

    set color(color) {
        this._color = color;
        this.updateColor();
    }

    initBuffer() {
        this.buffer = new Float32Buffer(Box.drawCount * Box.stride);


        this.updateVertices();
        this.updateNormals();
        this.updateColor();
    }

    updateVertices() {
        this.buffer.update(Box.getVertexArray(this.width, this.height, this.depth), 0, Box.vertexLength, Box.stride);
    }

    updateNormals() {
        this.buffer.update(Box.getNormalArray(), 0, Box.normalLength, Box.stride, Box.vertexLength);
    }

    updateColor() {
        this.buffer.update(Box.getColorArray(this._color), 0, Box.colorLength, Box.stride, Box.vertexLength + Box.normalLength);
    }

    static getVertexArray(width, height, depth) {
        const x = width / 2,
            y = height / 2,
            z = depth / 2;

        return [
            //front side oO
            -x, -y, -z,
            -x, y, -z,
            x, -y, -z,
            x, -y, -z,
            -x, y, -z,
            x, y, -z,

            //right side
            x, y, -z,
            x, y, z,
            x, -y, -z,
            x, -y, -z,
            x, y, z,
            x, -y, z,

            //top side
            -x, y, z,
            x, y, z,
            x, y, -z,
            x, y, -z,
            -x, y, -z,
            -x, y, z,

            //back side
            x, -y, z,
            x, y, z,
            -x, -y, z,
            -x, -y, z,
            x, y, z,
            -x, y, z,

            //left side
            -x, y, z,
            -x, y, -z,
            -x, -y, z,
            -x, -y, z,
            -x, y, -z,
            -x, -y, -z,

            //bottom side
            -x, -y, -z,
            x, -y, -z,
            -x, -y, z,
            -x, -y, z,
            x, -y, -z,
            x, -y, z
        ];
    }

    static getNormalArray() {
        return [
            //front side oO
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,

            //right side
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,

            //top side
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            //back side
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            //left side
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            //bottom side
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ];
    }

    static getColorArray(color) {
        return [
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],

            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],

            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],

            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],

            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],

            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
            color[0], color[1], color[2], color[3],
        ];
    }
}