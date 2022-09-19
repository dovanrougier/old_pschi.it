import { Vector2 } from "./Vector2";
import { Vector4 } from "./Vector4";

export class Vector3 {
    constructor(values, y, z) {
        this.values = new Float32Array(3);
        if (typeof values !== 'undefined') {
            if (Number.isFinite(y) && Number.isFinite(z)) {
                values = [values, y, z]
            }
            this.setTo(values);
        }
    }

    setTo(vector) {
        const values = vector.constructor === Vector3 ? vector.values : vector;

        this.values[0] = values[0];
        this.values[1] = values[1];
        this.values[2] = values[2];

        return this;
    }

    add(vector) {
        this.values[0] += vector.values[0];
        this.values[1] += vector.values[1];
        this.values[2] += vector.values[2];

        return this;
    }

    substract(vector) {
        this.values[0] -= vector.values[0];
        this.values[1] -= vector.values[1];
        this.values[2] -= vector.values[2];

        return this;
    }

    multiply(vector) {
        this.values[0] *= vector.values[0];
        this.values[1] *= vector.values[1];
        this.values[2] *= vector.values[2];

        return this;
    }

    divide(vector) {
        this.values[0] /= vector.values[0];
        this.values[1] /= vector.values[1];
        this.values[2] /= vector.values[2];

        return this;
    }

    transform(matrix) {
        const x = this.values[0],
            y = this.values[1],
            z = this.values[2];

        let w = matrix.values[3] * x + matrix.values[7] * y + matrix.values[11] * z + matrix.values[15];
        w = w || 1.0;
        this.values[0] = (matrix.values[0] * x + matrix.values[4] * y + matrix.values[8] * z + matrix.values[12]) / w;
        this.values[1] = (matrix.values[1] * x + matrix.values[5] * y + matrix.values[9] * z + matrix.values[13]) / w;
        this.values[2] = (matrix.values[2] * x + matrix.values[6] * y + matrix.values[10] * z + matrix.values[14]) / w;

        return this;
    }

    normalize() {
        const x = this.values[0];
        const y = this.values[1];
        const z = this.values[2];
        let len = x * x + y * y + z * z;

        if (len > 0) {
            len = 1 / Math.sqrt(len);
        }

        this.values[0] = x * len;
        this.values[1] = y * len;
        this.values[2] = z * len;

        return this;
    }

    cross(vector) {
        const ax = this.values[0],
            ay = this.values[1],
            az = this.values[2],
            bx = vector.values[0],
            by = vector.values[1],
            bz = vector.values[2];
        this.values[0] = ay * bz - az * by;
        this.values[1] = az * bx - ax * bz;
        this.values[2] = ax * by - ay * bx;

        return this;
    }

    dot(vector) {
        return this.values[0] * vector.values[0] + this.values[1] * vector.values[1] + this.values[2] * vector.values[2];
    }

    scale(value) {
        this.values[0] = this.values[0] * value;
        this.values[1] = this.values[1] * value;
        this.values[2] = this.values[2] * value;

        return this;
    }

    toVector2() {
        return new Vector2(this.values[0], this.values[1]);
    }

    toVector4(w) {
        return new Vector4(this.values[0], this.values[1], this.values[2], w);
    }
}