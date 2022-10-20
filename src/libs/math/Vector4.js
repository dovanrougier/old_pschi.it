import { Vector2 } from './Vector2';
import { Vector3 } from './Vector3';

export class Vector4  extends Float32Array{
    constructor(x, y, z, w) {
        super(4);
        if (typeof x !== 'undefined') {
            if (Number.isFinite(y) && Number.isFinite(z) && Number.isFinite(w)) {
                x = [x, y, z, w]
            }
            this.set(x);
        }
    }

    add(vector) {
        this.values[0] += vector.values[0];
        this.values[1] += vector.values[1];
        this.values[2] += vector.values[2];
        this.values[3] += vector.values[3];

        return this;
    }

    substract(vector) {
        this.values[0] -= vector.values[0];
        this.values[1] -= vector.values[1];
        this.values[2] -= vector.values[2];
        this.values[3] -= vector.values[3];

        return this;
    }

    multiply(vector) {
        this.values[0] *= vector.values[0];
        this.values[1] *= vector.values[1];
        this.values[2] *= vector.values[2];
        this.values[3] *= vector.values[3];

        return this;
    }

    divide(vector) {
        this.values[0] /= vector.values[0];
        this.values[1] /= vector.values[1];
        this.values[2] /= vector.values[2];
        this.values[3] /= vector.values[3];

        return this;
    }

    scale(value) {
        this.values[0] = this.values[0] * value;
        this.values[1] = this.values[1] * value;
        this.values[2] = this.values[2] * value;
        this.values[3] = this.values[3] * value;

        return this;
    }

    normalize() {
        const x = this.values[0];
        const y = this.values[1];
        const z = this.values[2];
        const w = this.values[3];
        let len = x * x + y * y + z * z + w * w;

        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }

        this.values[0] = x * len;
        this.values[1] = y * len;
        this.values[2] = z * len;
        this.values[3] = w * len;

        return this;
    }

    transform(matrix) {
        const x = this.values[0],
            y = this.values[1],
            z = this.values[2],
            w = this.values[3];
        this.values[0] = matrix.values[0] * x + matrix.values[4] * y + matrix.values[8] * z + matrix.values[12] * w;
        this.values[1] = matrix.values[1] * x + matrix.values[5] * y + matrix.values[9] * z + matrix.values[13] * w;
        this.values[2] = matrix.values[2] * x + matrix.values[6] * y + matrix.values[10] * z + matrix.values[14] * w;
        this.values[3] = matrix.values[3] * x + matrix.values[7] * y + matrix.values[11] * z + matrix.values[15] * w;

        return this;
    }

    dot(vector) {
        return this.values[0] * vector.values[0] + this.values[1] * vector.values[1] + this.values[2] * vector.values[2] + this.values[3] * vector.values[3];
    }

    toVector2() {
        return new Vector2(this.values[0], this.values[1]);
    }

    toVector3() {
        return new Vector3(this.values[0], this.values[1], this.values[2]);
    }
}