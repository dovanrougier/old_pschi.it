import { Geometry3D } from "./Geometry3D";

export class Plane extends Geometry3D {
    constructor(width, height, widthSegment, heightSegment, vertexMode = 'TRIANGLES') {
        super();
        this.width = width || 1;
        this.height = height || 1;
        this.widthSegment = widthSegment || this.width;
        this.heightSegment = heightSegment || this.height;
        this.instanceCount = (this.width / this.widthSegment) * (this.height / this.heightSegment);

        this.updated.vertexPosition = true;
        this.updated.vertexNormal = true;
        this.updated.vertexColor = true;

        this.vertexMode = vertexMode;
    }

    get vertexCount() {
        switch (this.vertexMode) {
            case 'TRIANGLES':
            default:
                return this.instanceCount * 6;
        }
    }

    get vertexPosition() {
        //center the origin
        const result = new Float32Array(this.vertexPositionLength * this.vertexCount);
        const z = 0;
        let i = 0,
            x = -this.width / 2,
            y = -this.height / 2;
        do {
            const xw = x + this.widthSegment,
                yh = y + this.heightSegment;
            result[i++] = x;
            result[i++] = y;
            result[i++] = z;

            result[i++] = x;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = yh;
            result[i++] = z;

            result[i++] = xw;
            result[i++] = y;
            result[i++] = z;

            result[i++] = x;
            result[i++] = y;
            result[i++] = z;

            x += this.widthSegment;
            if (x >= this.width / 2) {
                x = -this.width / 2;
                y += this.heightSegment;
            }

        } while (i < result.length);

        this.updated.vertexPosition = false;
        return result;
    }

    get vertexNormal() {
        const result = new Float32Array(this.vertexNormalLength * this.vertexCount);
        let i = 0;
        do {
            result[i++] = 0;
            result[i++] = 0;
            result[i++] = -1;
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
}