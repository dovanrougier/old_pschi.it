import { Geometry3D } from "./Geometry3D";

export class Cube extends Geometry3D {
    static vertexCount(drawMode) {
        switch (drawMode) {
            case 'TRIANGLES':
            default:
                return 36;
        }
    }

    static updateVertexArray(array, index, offset, stride, x, y, z, width, height, depth, drawMode) {
        x -= width / 2;
        y -= height / 2;
        z -= depth / 2;
        const xw = x + width,
            yh = y + height,
            zd = z + depth;

        index += offset;

        switch (drawMode) {
            case 'TRIANGLES':
            default:
                //front
                array[index++] = x;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = x;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = x;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                //right
                array[index++] = xw;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                //top
                array[index++] = x;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = x;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = x;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                //back
                array[index++] = xw;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                array[index++] = x;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                array[index++] = x;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                array[index++] = x;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;
                //left
                array[index++] = x;
                array[index++] = yh;
                array[index] = zd;
                index += stride - 2;

                array[index++] = x;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = x;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                array[index++] = x;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                array[index++] = x;
                array[index++] = yh;
                array[index] = z;
                index += stride - 2;

                array[index++] = x;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;
                //bottom
                array[index++] = x;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = x;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                array[index++] = x;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = z;
                index += stride - 2;

                array[index++] = xw;
                array[index++] = y;
                array[index] = zd;
                index += stride - 2;
        }
    }

    static updateNormalArray(array, index, offset, stride, drawMode) {
        index += offset;

        switch (drawMode) {
            case 'TRIANGLES':
            default:
                //front
                let x = 0,
                    y = 0,
                    z = -1;
                for (let i = 0; i < 6; i++) {
                    array[index++] = x;
                    array[index++] = y;
                    array[index] = z;
                    index += stride - 2;
                }

                //right
                x = 1,
                    y = 0,
                    z = 0;
                for (let i = 0; i < 6; i++) {
                    array[index++] = x;
                    array[index++] = y;
                    array[index] = z;
                    index += stride - 2;
                }

                //top
                x = 0,
                    y = 1,
                    z = 0;
                for (let i = 0; i < 6; i++) {
                    array[index++] = x;
                    array[index++] = y;
                    array[index] = z;
                    index += stride - 2;
                }

                //back
                x = 0,
                    y = 0,
                    z = 1;
                for (let i = 0; i < 6; i++) {
                    array[index++] = x;
                    array[index++] = y;
                    array[index] = z;
                    index += stride - 2;
                }

                //left
                x = -1,
                    y = 0,
                    z = 0;
                for (let i = 0; i < 6; i++) {
                    array[index++] = x;
                    array[index++] = y;
                    array[index] = z;
                    index += stride - 2;
                }

                //bottom
                x = 0,
                    y = -1,
                    z = 0;
                for (let i = 0; i < 6; i++) {
                    array[index++] = x;
                    array[index++] = y;
                    array[index] = z;
                    index += stride - 2;
                }
        }
    }

    static updateColorArray(array, index, offset, stride, color, drawMode) {
        index += offset;

        switch (drawMode) {
            case 'TRIANGLES':
            default:
                for (let i = 0; i < 36; i++) {
                    array[index++] = color[0];
                    array[index++] = color[1];
                    array[index++] = color[2];
                    array[index] = color[3];
                    index += stride - 3;
                }
        }
    }

    static updateColorSpectrumArray(array, index, offset, stride, drawMode) {
        index += offset;

        switch (drawMode) {
            case 'TRIANGLES':
            default:
                //front
                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                //right
                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 0
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                //top
                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                //back
                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                //left
                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 1;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;
                //bottom
                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 0;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 0;
                array[index] = 1;
                index += stride - 3;

                array[index++] = 1;
                array[index++] = 0;
                array[index++] = 1;
                array[index] = 1;
                index += stride - 3;
        }
    }
}