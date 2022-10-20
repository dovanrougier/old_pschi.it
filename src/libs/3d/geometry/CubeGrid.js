import { Geometry3D } from './Geometry3D';

export class CubeGrid extends Geometry3D {
    constructor(width, height, depth, widthSegment, heightSegment, depthSegment) {
        super();
        this.width = width || 1;
        this.height = height || 1;
        this.depth = depth || 1;
        this.widthSegment = widthSegment || 1;
        this.heightSegment = heightSegment || 1;
        this.depthSegment = depthSegment || 1;

        this.vertexCount = (this.width / this.widthSegment + 1) * (this.height / this.heightSegment + 1) * (this.depth / this.depthSegment + 1);
    }

    get indexLength() {
        return this._indexLength;
    }

    set indexLength(value) {
        this._indexLength = value;
    }

    get vertexMode() {
        if (this.material.points) {
            return 'POINTS';
        }
        return 'LINES';
    }

    get index() {
        const maxX = (this.width / this.widthSegment);
        const maxY = (this.height / this.heightSegment);
        const maxZ = (this.depth / this.depthSegment);
        if (this.material.points) {
            let i = 0;
            this.indexLength = this.vertexCount;
            const result = new Int32Array(this.indexLength);
            for (let z = 0; z <= maxZ; z++) {
                for (let y = 0; y <= maxY; y++) {
                    for (let x = 0; x <= maxX; x++) {
                        result[i] = i++;
                    }
                }
            }
            return result;
        }
        else {
            const result = [];
            for (let z = 0; z <= maxZ; z++) {
                for (let y = 0; y <= maxY; y++) {
                    for (let x = 0; x <= maxX; x++) {
                        const position = x + y * (maxX + 1) + z * ((maxX + 1) * (maxY + 1));
                        if (x < maxX) {
                            result.push(position);
                            result.push(position + 1);
                        }
                        if (y < maxY) {
                            result.push(position);
                            result.push(position + maxX + 1);
                        }
                        if (z < maxZ) {
                            result.push(position);
                            result.push(position + ((maxX + 1) * (maxY + 1)));
                        }
                    }
                }
            }
            this.indexLength = result.length;
            return result;
        }
    }

    get VertexPosition() {
        const result = new Float32Array(this.vertexCount * Geometry3D.vertexNormalLength);

        const maxX = (this.width / this.widthSegment);
        const maxY = (this.height / this.heightSegment);
        const maxZ = (this.depth / this.depthSegment);

        let i = 0;
        for (let z = 0; z <= maxZ; z++) {
            for (let y = 0; y <= maxY; y++) {
                for (let x = 0; x <= maxX; x++) {
                    result[i++] = x;
                    result[i++] = y;
                    result[i++] = z;
                }
            }
        }
        return result;
    }

    get vertexNormal() {
        const result = new Float32Array(this.vertexCount * Geometry3D.vertexNormalLength);

        const maxX = (this.width / this.widthSegment);
        const maxY = (this.height / this.heightSegment);
        const maxZ = (this.depth / this.depthSegment);

        let i = 0;
        for (let z = 0; z <= maxZ; z++) {
            for (let y = 0; y <= maxY; y++) {
                for (let x = 0; x <= maxX; x++) {
                    result[i++] = 1;
                    result[i++] = 1;
                    result[i++] = 1;
                }
            }
        }
        return result;
    }

    get vertexColor() {
        const result = new Float32Array(this.vertexCount * Geometry3D.vertexColorLength);

        const maxX = (this.width / this.widthSegment);
        const maxY = (this.height / this.heightSegment);
        const maxZ = (this.depth / this.depthSegment);
        const color = this.material.color;

        let i = 0;
        if (this.material.rainbow) {
            for (let z = 0; z <= maxZ; z++) {
                for (let y = 0; y <= maxY; y++) {
                    for (let x = 0; x <= maxX; x++) {
                        result[i++] = x * this.widthSegment / this.width;
                        result[i++] = y * this.heightSegment / this.height;
                        result[i++] = z * this.depthSegment / this.depth;
                        result[i++] = 1;
                    }
                }
            }
        }
        for (let z = 0; z <= maxZ; z++) {
            for (let y = 0; y <= maxY; y++) {
                for (let x = 0; x <= maxX; x++) {
                    result[i++] = color[0];
                    result[i++] = color[1];
                    result[i++] = color[2];
                    result[i++] = color[3];
                }
            }
        }
        return result;
    }

    updateVertices(buffer) {
        let index = buffer.getNodePosition(this);
        CubeGrid.updateVertices(buffer.data, index, 0, 0, 0, this.width, this.height, this.depth, this.widthSegment, this.heightSegment, this.depthSegment, this.vertexColor);
    }

    static updateVertices(array, index, x, y, z, width, height, depth, widthSegment, heightSegment, depthSegment, color) {
        x = -width / 2;
        y = -height / 2;
        z = -depth / 2;
        let i = 0;
        do {
            index = Geometry3D.updateVertex(array, index, x, y, z, 1, 1, 1, color[i++], color[i++], color[i++], color[i++]);

            x += widthSegment;
            if (x > width / 2) {
                x = -width / 2;
                y += heightSegment;
                if (y > height / 2) {
                    y = -height / 2;
                    z += depthSegment;
                }
            }
        } while (z <= depth / 2);

        return index;
    }
}