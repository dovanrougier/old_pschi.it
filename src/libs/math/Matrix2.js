import { Matrix3 } from "./Matrix3";
import { Matrix4 } from "./Matrix4";

export class Matrix2 {
    constructor(values) {
        this.values = new Float32Array(4);
        if (values) {
            this.setTo(values);
        }
    }

    setTo(matrix) {
        const values = matrix.constructor === Matrix2 ? matrix.values : matrix;
        this.values[0] = values[0];
        this.values[1] = values[1];
        this.values[2] = values[2];
        this.values[3] = values[3];

        return this;
    }

    add(matrix) {
        this.values[0] += matrix.values[0];
        this.values[1] += matrix.values[1];
        this.values[2] += matrix.values[2];
        this.values[3] += matrix.values[3];

        return this;
    }

    substract(matrix) {
        this.values[0] -= matrix.values[0];
        this.values[1] -= matrix.values[1];
        this.values[2] -= matrix.values[2];
        this.values[3] -= matrix.values[3];

        return this;
    }

    multiply(matrix) {
        const a0 = this.values[0],
            a1 = this.values[1],
            a2 = this.values[2],
            a3 = this.values[3],
            b0 = matrix.values[0],
            b1 = matrix.values[1],
            b2 = matrix.values[2],
            b3 = matrix.values[3];

        this.values[0] = a0 * b0 + a2 * b1;
        this.values[1] = a1 * b0 + a3 * b1;
        this.values[2] = a0 * b2 + a2 * b3;
        this.values[3] = a1 * b2 + a3 * b3;

        return this;
    }

    scale(vector) {
        this.values[0] *= vector.values[0];
        this.values[1] *= vector.values[0];
        this.values[2] *= vector.values[1];
        this.values[3] *= vector.values[1];

        return this;
    }

    rotate(radians) {
        const a0 = this.values[0],
            a1 = this.values[1],
            a2 = this.values[2],
            a3 = this.values[3],
            s = Math.sin(radians),
            c = Math.cos(radians);

        this.values[0] = a0 * c + a2 * s;
        this.values[1] = a1 * c + a3 * s;
        this.values[2] = a0 * -s + a2 * c;
        this.values[3] = a1 * -s + a3 * c;

        return this;
    }

    transpose() {
        const a1 = this.values[1];
        
        this.values[1] = this.values[2];
        this.values[2] = a1;

        return this;
    }

    determinant() {
        return this.values[0] * this.values[1] - this.values[2] * this.values[3];
    }

    invertMatrix() {
        let det = this.determinant();
        if (!det) {
            return null;
        }
        det = 1.0 / det;

        this.values[0] = this.values[0] * det;
        this.values[1] = -this.values[1] * det;
        this.values[2] = -this.values[2] * det;
        this.values[3] = this.values[3] * det;

        return this;
    }

    toMatrix3() {
        const result = new Matrix3();

        this.values[0] = this.values[0];
        this.values[1] = this.values[1];
        this.values[3] = this.values[2];
        this.values[4] = this.values[3];
        this.values[8] = 1;

        return result;
    }

    toMatrix4() {
        const result = new Matrix4();

        this.values[0] = this.values[0];
        this.values[1] = this.values[1];
        this.values[4] = this.values[2];
        this.values[5] = this.values[3];
        this.values[10] = 1;
        this.values[15] = 1;

        return result
    }

    static identityMatrix() {
        const result = new Matrix2();

        result.values[0] = 1;
        result.values[3] = 1;

        return result;
    }
}