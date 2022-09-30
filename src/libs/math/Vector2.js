import { Matrix2 } from "./Matrix2";
import { Matrix3 } from "./Matrix3";
import { Matrix4 } from "./Matrix4";
import { Vector3 } from "./Vector3";
import { Vector4 } from "./Vector4";

export class Vector2 extends Float32Array{
    constructor(x, y) {
        super(2);
        if (typeof x !== 'undefined') {
            if (Number.isFinite(y)) {
                x = [x, y]
            }
            this.set(x);
        }
    }

    add(vector) {
        this.values[0] += vector.values[0];
        this.values[1] += vector.values[1];

        return this;
    }

    substract(vector) {
        this.values[0] -= vector.values[0];
        this.values[1] -= vector.values[1];

        return this;
    }

    multiply(vector) {
        this.values[0] *= vector.values[0];
        this.values[1] *= vector.values[1];

        return this;
    }

    divide(vector) {
        this.values[0] /= vector.values[0];
        this.values[1] /= vector.values[1];

        return this;
    }

    scale(value) {
        this.values[0] = this.values[0] * value;
        this.values[1] = this.values[1] * value;

        return this;
    }

    normalize() {
        const x = this.values[0];
        const y = this.values[1];
        let len = x * x + y * y;

        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }

        this.values[0] = x * len;
        this.values[1] = y * len;

        return this;
    }

    transform(matrix) {
        if (matrix.constructor === Matrix2) {
            const x = a[0],
                y = a[1];
            this.values[0] = matrix.values[0] * x + matrix.values[2] * y + matrix.values[4];
            this.values[1] = matrix.values[1] * x + matrix.values[3] * y + matrix.values[5];
        } else if (matrix.constructor === Matrix3) {
            const x = a[0],
                y = a[1];
            this.values[0] = matrix.values[0] * x + matrix.values[3] * y + matrix.values[6];
            this.values[1] = matrix.values[1] * x + matrix.values[4] * y + matrix.values[7];
        } else if (matrix.constructor === Matrix4) {
            const x = a[0],
                y = a[1];
            this.values[0] = matrix.values[0] * x + matrix.values[4] * y + matrix.values[12];
            this.values[1] = matrix.values[1] * x + matrix.values[5] * y + matrix.values[13];
        }
        else {
            throw new Error(`Cannot transform ${this} with ${matrix}`);
        }
        return this;
    }

    cross(vector) {
        const z = this.values[0] * vector.values[1] - this.values[1] * vector.values[0];

        this.values[0] = this.values[1] = 0;
        this.values[2] = z;

        return this;
    }

    dot(vector) {
        return this.values[0] * vector.values[0] + this.values[1] * vector.values[1];
    }

    toVector3(z) {
        return new Vector3(this.values[0], this.values[1], z);
    }

    toVector4(z, w) {
        return new Vector4(this.values[0], this.values[1], z, w);
    }
}