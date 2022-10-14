import { Geometry3D } from "./Geometry3D";

export class Cube extends Geometry3D {
    constructor(width, height, depth, widthSegment, heightSegment, depthSegment, vertexMode = 'TRIANGLES') {
        super();
        this.width = width || 1;
        this.height = height || 1;
        this.depth = depth || 1;
        this.widthSegment = widthSegment || this.width;
        this.heightSegment = heightSegment || this.height;
        this.depthSegment = depthSegment || this.depth;
        this.instanceCount = (this.width / this.widthSegment) * (this.height / this.heightSegment) * (this.depth / this.depthSegment);

        this.updated.vertexPosition = true;
        this.updated.vertexNormal = true;
        this.updated.vertexColor = true;

        this.vertexMode = vertexMode;
    }

    get vertexCount() {
        switch (this.vertexMode) {
            case 'TRIANGLES':
            default:
                return this.instanceCount * 36;
        }
    }

    get vertexPosition() {
        //center the origin
        const result = new Float32Array(this.vertexPositionLength * this.vertexCount);
        let i = 0,
            x = -this.width / 2,
            y = -this.height / 2,
            z = -this.depth / 2;
        do {
            const xw = x + this.widthSegment,
                yh = y + this.heightSegment,
                zd = z + this.depthSegment;
            //front
            result[i++] = x;
            result[i++] = y;
            result[i++] = z;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = z;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = z;

            //right
            result[i++] = xw;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = zd;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = zd;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = zd;

            //top
            result[i++] = x;
            result[i++] = yh;
            result[i++] = zd;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = zd;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = zd;

            //back
            result[i++] = xw;
            result[i++] = y;
            result[i++] = zd;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = zd;

            result[i++] = x;
            result[i++] = y;
            result[i++] = zd;

            result[i++] = x;
            result[i++] = y;
            result[i++] = zd;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = zd;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = zd;

            //left
            result[i++] = x;
            result[i++] = yh;
            result[i++] = zd;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = x;
            result[i++] = y;
            result[i++] = zd;

            result[i++] = x;
            result[i++] = y;
            result[i++] = zd;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = x;
            result[i++] = y;
            result[i++] = z;

            //bottom
            result[i++] = x;
            result[i++] = y;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = z;

            result[i++] = x;
            result[i++] = y;
            result[i++] = zd;

            result[i++] = x;
            result[i++] = y;
            result[i++] = zd;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = zd;

            x += this.widthSegment;
            if (x >= this.width / 2) {
                x = -this.width / 2;
                y += this.heightSegment;
                if (y >= this.height / 2) {
                    y = -this.height / 2;
                    z += this.depthSegment;
                }
            }

        } while (i < result.length);

        this.updated.vertexPosition = false;
        return result;
    }

    get vertexNormal() {
        const result = new Float32Array(this.vertexNormalLength * this.vertexCount);
        let i = 0;
        do {
            //front
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;

            //right
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;

            //top
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            //back
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            //left
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            //bottom
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
            result[i++] = 0;

        } while (i < result.length)


        this.updated.vertexNormal = false;
        return result;
    }

    get vertexColor() {
        const color = this.material.color;
        const result = new Float32Array(this.vertexColorLength * this.vertexCount);
        let i = 0;
        do {
            for (let j = 0; j < this.vertexColorLength; j++) {
                result[i++] = color[j];
            }
        } while (i < result.length);

        this.updated.vertexColor = false;
        return result;
    }

    get vertexSpectrumColor() {
        //center the origin
        const result = new Float32Array(this.vertexColorLength * this.vertexCount);
        let i = 0;
        do {
            //front
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            //right
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            //top
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            //back
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            //left
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            //bottom
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = 1;

            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;
            result[i++] = 1;
        } while (i < result.length);

        this.updated.vertexColor = false;
        return result;
    }
}