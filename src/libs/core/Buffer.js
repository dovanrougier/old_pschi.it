import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";

export class Buffer extends Node {
    constructor(length, stride, usage) {
        super(length);
        this.init(stride, usage);
    }

    init(stride, usage) {
        this.stride = stride;
        this.setUsage(usage);
    }

    setUsage(usage) {
        this.usage = usage;
    }

    updateValues(values, offset){
        let j = 0;
        for (let i = offset; i < this.length; i + this.stride) {
            this[i] = values[j++];
        }
    }

    updateVector2(index, vector) {
        this[index] = vector[0];
        this[index + 1] = vector[1];
    }

    updateVector2Array(vectors, offset) {
        let j = 0;
        for (let i = offset; i < this.length; i + this.stride) {
            this.updateVector2(i, vectors[j++]);
        }
    }

    applyMatrixOnVector2(matrix, offset) {
        for (let i = offset; i < this.length; i + this.stride) {
            const vector = new Vector2(this[i], this[i + 1]).transform(matrix);
            this.updateVector2(i, vector);
        }
    }

    updateVector3(index, vector) {
        this[index] = vector[0];
        this[index + 1] = vector[1];
        this[index + 2] = vector[2];
    }

    updateVector3Array(vectors, offset) {
        let j = 0;
        for (let i = offset; i < this.length; i + this.stride) {
            this.updateVector3(i, vectors[j++]);
        }
    }

    applyMatrixOnVector3(matrix, offset) {
        for (let i = offset; i < this.length; i + this.stride) {
            const vector = new Vector3(this[i], this[i + 1], this[i + 2]).transform(matrix);
            this.updateVector3(i, vector);
        }
    }

    updateVector4(index, vector) {
        this[index] = vector[0];
        this[index + 1] = vector[1];
        this[index + 2] = vector[2];
        this[index + 3] = vector[3];
    }

    updateVector4Array(vectors, offset) {
        let j = 0;
        for (let i = offset; i < this.length; i + this.stride) {
            this.updateVector4(i, vectors[j++]);
        }
    }

    applyMatrixOnVector4(matrix, offset) {
        for (let i = offset; i < this.length; i + this.stride) {
            const vector = new Vector4(this[i], this[i + 1], this[i + 2], this[i + 3]).transform(matrix);
            this.updateVector4(i, vector);
        }
    }

    concat(data, index = 0) {
        const old = this.slice(index);
        const result = new Buffer(this.length + data.length, this.stride, this.usage);

        result.set(old);
        result.set(data, old.length);

        return result;
    }

    static colorDefinition = {
        vertices: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 10,
            offset: 0,
        },
        normal: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 10,
            offset: 3,
        },
        color: {
            size: 4,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 10,
            offset: 6,
        },
    }

    static textureDefinition = {
        vertices: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 8,
            offset: 0,
        },
        normal: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 8,
            offset: 3,
        },
        uv: {
            size: 2,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 8,
            offset: 6,
        }
    }
}