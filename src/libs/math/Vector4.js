import { Vector2 } from "./Vector2";
import { Vector3 } from "./Vector3";

export class Vector4 {
    constructor(values, y, z, w) {
        this.values = new Float32Array(4);
        if (typeof values !== 'undefined') {
            if (Number.isFinite(y) && Number.isFinite(z) && Number.isFinite(w)) {
                values = [values, y, z]
            }
            this.setTo(values);
        }
    }

    setTo(vector) {
        const values = vector.constructor === Vector4 ? vector.values : vector;

        this.values[0] = values[0];
        this.values[1] = values[1];
        this.values[2] = values[2];
        this.values[3] = values[3];

        return this;
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

    transform(matrix4) {
        const x = this.values[0],
            y = this.values[1],
            z = this.values[2],
            w = this.values[3];
        this.values[0] = matrix4.values[0] * x + matrix4.values[4] * y + matrix4.values[8] * z + matrix4.values[12] * w;
        this.values[1] = matrix4.values[1] * x + matrix4.values[5] * y + matrix4.values[9] * z + matrix4.values[13] * w;
        this.values[2] = matrix4.values[2] * x + matrix4.values[6] * y + matrix4.values[10] * z + matrix4.values[14] * w;
        this.values[3] = matrix4.values[3] * x + matrix4.values[7] * y + matrix4.values[11] * z + matrix4.values[15] * w;

        return this;
    }

    toVector2() {
        return new Vector2(this.values[0], this.values[1]);
    }

    toVector3() {
        return new Vector3(this.values[0], this.values[1], this.values[2]);
    }
}