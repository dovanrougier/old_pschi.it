import { Geometry3D } from './Geometry3D';
import { Plane } from './Plane';

export class Grid extends Plane {
    constructor(width, height, widthSegment, heightSegment) {
        super(width, height);
        this.widthSegment = widthSegment || 1;
        this.heightSegment = heightSegment || 1;
        this.instanceCount = (this.width / this.widthSegment) * (this.height / this.heightSegment);
    }

    get indexLength() {
        return this.instanceCount * 6;
    }

    get vertexCount() {
        return this.instanceCount * this._vertexCount;
    }

    set vertexCount(value) {
        this._vertexCount = value;
    }

    get vertexMode() {
        if (this.material.wireframe) {
            return 'LINE_LOOP';
        }
        return 'TRIANGLES';
    }

    get index() {
        const index = [0, 1, 2, 2, 1, 0];
        let length = this.indexLength;
        const result = new Int32Array(length);

        const maxX = (this.width / this.widthSegment);
        const maxY = (this.height / this.heightSegment);
        let i = 0;

        index[2] += maxX;
        index[3] += maxX;
        index[4] += maxX;
        for (let y = 0; y < maxY; y++) {
            for (let x = 0; x < maxX; x++) {
                result[i++] = index[0]++;
                result[i++] = index[1]++;
                result[i++] = index[2]++;
                result[i++] = index[3]++;
                result[i++] = index[4]++;
                result[i++] = index[5]++;
            }
            index[0] += 1;
            index[1] += 1;
            index[2] += 1;
            index[3] += 1;
            index[4] += 1;
            index[5] += 1;
        }
        return result;
    }

    updateVertices(buffer) {
        let z = 0,
            r = this.material.color[0],
            g = this.material.color[1],
            b = this.material.color[2],
            a = this.material.color[3],
            index = buffer.getNodePosition(this),
            x = -this.width / 2,
            y = -this.height / 2;
        do {
            index = Geometry3D.updateVertex(buffer.data, index, x, y, z, this.normal[0], this.normal[1], this.normal[2], r, g, b, a);
            x += this.widthSegment;
            if (x > this.width / 2) {
                x = -this.width / 2;
                y += this.heightSegment;
            }
        } while (y <= this.height / 2);
    }
}