import { Geometry3D } from "./Geometry3D";

export class Cube extends Geometry3D {
    constructor(width, height, depth) {
        super();
        this.width = width || 1;
        this.height = height || 1;
        this.depth = depth || 1;

        this.vertexCount = 24;
    }

    get vertexMode() {
        if(this.material.points){
            return 'POINTS';
        }
        if (this.material.wireframe) {
            return 'LINES';
        }
        return 'TRIANGLES';
    }

    get index() {
        if (this.material.points) {
            return [
                0, 1, 2, 3, 8, 9, 10, 11
            ]
        }
        if (this.material.wireframe) {
            return [
                0, 1, 1, 2, 2, 3, 3, 0,
                4, 5, 5, 6, 6, 7, 7, 4,
                8, 9, 9, 10, 10, 11, 11, 8,
                12, 13, 13, 14, 14, 15, 15, 12,
                16, 17, 17, 18, 18, 19, 19, 16,
                20, 21, 21, 22, 22, 23, 23, 20
            ];
        }
        return [
            0, 1, 2, 2, 3, 0,
            4, 5, 6, 6, 7, 4,
            8, 9, 10, 10, 11, 8,
            12, 13, 14, 14, 15, 12,
            16, 17, 18, 18, 19, 16,
            20, 21, 22, 22, 23, 20];
    }

    get vertexNormal() {
        return [
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,
            0, 0, -1,

            1, 0, 0,
            1, 0, 0,
            1, 0, 0,
            1, 0, 0,

            0, 0, 1,
            0, 0, 1,
            0, 0, 1,
            0, 0, 1,

            0, 1, 0,
            0, 1, 0,
            0, 1, 0,
            0, 1, 0,

            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,
            -1, 0, 0,

            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
            0, -1, 0,
        ];
    }

    get vertexColor() {
        if (this.material.rainbow) {
            return [
                0, 0, 0, 1,
                0, 1, 0, 1,
                1, 1, 0, 1,
                1, 0, 0, 1,

                1, 0, 0, 1,
                1, 1, 0, 1,
                1, 1, 1, 1,
                1, 0, 1, 1,

                1, 0, 1, 1,
                1, 1, 1, 1,
                0, 1, 1, 1,
                0, 0, 1, 1,

                1, 1, 1, 1,
                1, 1, 0, 1,
                0, 1, 0, 1,
                0, 1, 1, 1,

                0, 0, 1, 1,
                0, 1, 1, 1,
                0, 1, 0, 1,
                0, 0, 0, 1,

                0, 0, 1, 1,
                0, 0, 0, 1,
                1, 0, 0, 1,
                1, 0, 1, 1,
            ];
        }
        const color = this.material.color;
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
        ];
    }

    updateVertices(buffer) {
        const index = buffer.getNodePosition(this);
        Cube.updateVertices(buffer.data, index, 0, 0, 0, this.width, this.height, this.depth, this.vertexColor);
    }

    static updateVertices(array, index, x, y, z, width, height, depth, color) {
        let i = 0;
        const xw = x + width / 2,
            yh = y + height / 2,
            zd = z + depth / 2;
        x -= width / 2;
        y -= height / 2;
        z -= depth / 2;

        //front
        index = Geometry3D.updateVertex(array, index, x, y, z, 0, 0, -1, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, yh, z, 0, 0, -1, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, yh, z, 0, 0, -1, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, y, z, 0, 0, -1, color[i++], color[i++], color[i++], color[i++]);
        //right
        index = Geometry3D.updateVertex(array, index, xw, y, z, 1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, yh, z, 1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, yh, zd, 1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, y, zd, 1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        //back
        index = Geometry3D.updateVertex(array, index, xw, y, zd, 0, 0, 1, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, yh, zd, 0, 0, 1, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, yh, zd, 0, 0, 1, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, y, zd, 0, 0, 1, color[i++], color[i++], color[i++], color[i++]);
        //top
        index = Geometry3D.updateVertex(array, index, xw, yh, zd, 0, 1, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, yh, z, 0, 1, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, yh, z, 0, 1, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, yh, zd, 0, 1, 0, color[i++], color[i++], color[i++], color[i++]);
        //left
        index = Geometry3D.updateVertex(array, index, x, y, zd, -1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, yh, zd, -1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, yh, z, -1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, y, z, -1, 0, 0, color[i++], color[i++], color[i++], color[i++]);
        //bottom
        index = Geometry3D.updateVertex(array, index, x, y, zd, 0, -1, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, x, y, z, 0, -1, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, y, z, 0, -1, 0, color[i++], color[i++], color[i++], color[i++]);
        index = Geometry3D.updateVertex(array, index, xw, y, zd, 0, -1, 0, color[i++], color[i++], color[i++], color[i++]);

        return index;
    }
}