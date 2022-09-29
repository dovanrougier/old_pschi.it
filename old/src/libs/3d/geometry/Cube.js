import { ColoredGeometry3d } from "./ColoredGeometry3d";

export class Cube extends ColoredGeometry3d {
    constructor(x, y, z, width, height, depth, color) {
        super(x, y, z, width, height, depth, color);
        this.drawCount = 6 * 6;
    }

    setColor(r, g, b, a) {
        this.color = [r, g, b, a];
    }

    getDataFromValue(x, y, z, width, height, depth, color) {
        //center the origin
        x = x - width / 2;
        y = y - height / 2;
        z = z - depth / 2;
        const xw = x + width;
        const yh = y + height;
        const zd = z + depth;


        return [
            //front side oO
            x, y, z, color[0], color[1], color[2], color[3], 0, 0, -1,
            x, yh, z, color[0], color[1], color[2], color[3], 0, 0, -1,
            xw, y, z, color[0], color[1], color[2], color[3], 0, 0, -1,
            xw, y, z, color[0], color[1], color[2], color[3], 0, 0, -1,
            x, yh, z, color[0], color[1], color[2], color[3], 0, 0, -1,
            xw, yh, z, color[0], color[1], color[2], color[3], 0, 0, -1,

            //right side
            xw, yh, z, color[0], color[1], color[2], color[3], 1, 0, 0,
            xw, yh, zd, color[0], color[1], color[2], color[3], 1, 0, 0,
            xw, y, z, color[0], color[1], color[2], color[3], 1, 0, 0,
            xw, y, z, color[0], color[1], color[2], color[3], 1, 0, 0,
            xw, yh, zd, color[0], color[1], color[2], color[3], 1, 0, 0,
            xw, y, zd, color[0], color[1], color[2], color[3], 1, 0, 0,

            //top side
            x, yh, zd, color[0], color[1], color[2], color[3], 0, 1, 0,
            xw, yh, zd, color[0], color[1], color[2], color[3], 0, 1, 0,
            xw, yh, z, color[0], color[1], color[2], color[3], 0, 1, 0,
            xw, yh, z, color[0], color[1], color[2], color[3], 0, 1, 0,
            x, yh, z, color[0], color[1], color[2], color[3], 0, 1, 0,
            x, yh, zd, color[0], color[1], color[2], color[3], 0, 1, 0,

            //back side
            xw, y, zd, color[0], color[1], color[2], color[3], 0, 0, 1,
            xw, yh, zd, color[0], color[1], color[2], color[3], 0, 0, 1,
            x, y, zd, color[0], color[1], color[2], color[3], 0, 0, 1,
            x, y, zd, color[0], color[1], color[2], color[3], 0, 0, 1,
            xw, yh, zd, color[0], color[1], color[2], color[3], 0, 0, 1,
            x, yh, zd, color[0], color[1], color[2], color[3], 0, 0, 1,

            //left side
            x, yh, zd, color[0], color[1], color[2], color[3], -1, 0, 0,
            x, yh, z, color[0], color[1], color[2], color[3], -1, 0, 0,
            x, y, zd, color[0], color[1], color[2], color[3], -1, 0, 0,
            x, y, zd, color[0], color[1], color[2], color[3], -1, 0, 0,
            x, yh, z, color[0], color[1], color[2], color[3], -1, 0, 0,
            x, y, z, color[0], color[1], color[2], color[3], -1, 0, 0,

            //bottom side
            x, y, z, color[0], color[1], color[2], color[3], 0, -1, 0,
            xw, y, z, color[0], color[1], color[2], color[3], 0, -1, 0,
            x, y, zd, color[0], color[1], color[2], color[3], 0, -1, 0,
            x, y, zd, color[0], color[1], color[2], color[3], 0, -1, 0,
            xw, y, z, color[0], color[1], color[2], color[3], 0, -1, 0,
            xw, y, zd, color[0], color[1], color[2], color[3], 0, -1, 0,
        ];
    }

    getColorDataFromValue(color) {
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

    getGeometryDataFromValue(x, y, z, width, height, depth) {
        //center the origin
        x = x - width / 2;
        y = y - height / 2;
        z = z - depth / 2;
        const xw = x + width;
        const yh = y + height;
        const zd = z + depth;


        return [
            //front side oO
            x, y, z,
            x, yh, z,
            xw, y, z,
            xw, y, z,
            x, yh, z,
            xw, yh, z,

            //right side
            xw, yh, z,
            xw, yh, zd,
            xw, y, z,
            xw, y, z,
            xw, yh, zd,
            xw, y, zd,

            //top side
            x, yh, zd,
            xw, yh, zd,
            xw, yh, z,
            xw, yh, z,
            x, yh, z,
            x, yh, zd,

            //back side
            xw, y, zd,
            xw, yh, zd,
            x, y, zd,
            x, y, zd,
            xw, yh, zd,
            x, yh, zd,

            //left side
            x, yh, zd,
            x, yh, z,
            x, y, zd,
            x, y, zd,
            x, yh, z,
            x, y, z,

            //bottom side
            x, y, z,
            xw, y, z,
            x, y, zd,
            x, y, zd,
            xw, y, z,
            xw, y, zd
        ];
    }

    getNormalData() {
        const value = 1;
        return [
            //front side oO
            0, 0, -value,
            0, 0, -value,
            0, 0, -value,
            0, 0, -value,
            0, 0, -value,
            0, 0, -value,

            //right side
            value, 0, 0,
            value, 0, 0,
            value, 0, 0,
            value, 0, 0,
            value, 0, 0,
            value, 0, 0,

            //top side
            0, value, 0,
            0, value, 0,
            0, value, 0,
            0, value, 0,
            0, value, 0,
            0, value, 0,

            //back side
            0, 0, value,
            0, 0, value,
            0, 0, value,
            0, 0, value,
            0, 0, value,
            0, 0, value,

            //left side
            -value, 0, 0,
            -value, 0, 0,
            -value, 0, 0,
            -value, 0, 0,
            -value, 0, 0,
            -value, 0, 0,

            //bottom side
            0, -value, 0,
            0, -value, 0,
            0, -value, 0,
            0, -value, 0,
            0, -value, 0,
            0, -value, 0,
        ];
    }
}