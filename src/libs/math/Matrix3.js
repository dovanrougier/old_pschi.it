import { Matrix2 } from "./Matrix2";
import { Matrix4 } from "./Matrix4";

export class Matrix3 {
    constructor(values) {
        this.values = new Float32Array(9);
        if (values) {
            this.setTo(values);
        }
    }

    setTo(matrix) {
        const values = matrix.constructor === Matrix3 ? matrix.values : matrix;
        this.values[0] = values[0];
        this.values[1] = values[1];
        this.values[2] = values[2];
        this.values[3] = values[3];
        this.values[4] = values[4];
        this.values[5] = values[5];
        this.values[6] = values[6];
        this.values[7] = values[7];
        this.values[8] = values[8];

        return this;
    }

    add(matrix) {
        this.values[0] += matrix.values[0];
        this.values[1] += matrix.values[1];
        this.values[2] += matrix.values[2];
        this.values[3] += matrix.values[3];
        this.values[4] += matrix.values[4];
        this.values[5] += matrix.values[5];
        this.values[6] += matrix.values[6];
        this.values[7] += matrix.values[7];
        this.values[8] += matrix.values[8];

        return this;
    }

    substract(matrix) {
        this.values[0] -= matrix.values[0];
        this.values[1] -= matrix.values[1];
        this.values[2] -= matrix.values[2];
        this.values[3] -= matrix.values[3];
        this.values[4] -= matrix.values[4];
        this.values[5] -= matrix.values[5];
        this.values[6] -= matrix.values[6];
        this.values[7] -= matrix.values[7];
        this.values[8] -= matrix.values[8];

        return this;
    }

    multiply(matrix) {
        const a00 = this.values[0],
            a01 = this.values[1],
            a02 = this.values[2],
            a10 = this.values[3],
            a11 = this.values[4],
            a12 = this.values[5],
            a20 = this.values[6],
            a21 = this.values[7],
            a22 = this.values[8],
            b00 = matrix.values[0],
            b01 = matrix.values[1],
            b02 = matrix.values[2],
            b10 = matrix.values[3],
            b11 = matrix.values[4],
            b12 = matrix.values[5],
            b20 = matrix.values[6],
            b21 = matrix.values[7],
            b22 = matrix.values[8];

        this.values[0] = b00 * a00 + b01 * a10 + b02 * a20;
        this.values[1] = b00 * a01 + b01 * a11 + b02 * a21;
        this.values[2] = b00 * a02 + b01 * a12 + b02 * a22;
        this.values[3] = b10 * a00 + b11 * a10 + b12 * a20;
        this.values[4] = b10 * a01 + b11 * a11 + b12 * a21;
        this.values[5] = b10 * a02 + b11 * a12 + b12 * a22;
        this.values[6] = b20 * a00 + b21 * a10 + b22 * a20;
        this.values[7] = b20 * a01 + b21 * a11 + b22 * a21;
        this.values[8] = b20 * a02 + b21 * a12 + b22 * a22;

        return this;
    }

    scale(vector) {
        this.values[0] *= vector.values[0];
        this.values[1] *= vector.values[0];
        this.values[2] *= vector.values[0];
        this.values[3] *= vector.values[1];
        this.values[4] *= vector.values[1];
        this.values[5] *= vector.values[1];

        return this;
    }

    rotate(radians) {
        const a00 = this.values[0],
            a01 = this.values[1],
            a02 = this.values[2],
            a10 = this.values[3],
            a11 = this.values[4],
            a12 = this.values[5],
            s = Math.sin(radians),
            c = Math.cos(radians);

        this.values[0] = c * a00 + s * a10;
        this.values[1] = c * a01 + s * a11;
        this.values[2] = c * a02 + s * a12;
        this.values[3] = c * a10 - s * a00;
        this.values[4] = c * a11 - s * a01;
        this.values[5] = c * a12 - s * a02;

        return this;
    }

    translate(vector) {
        this.values[6] = vector.values[0] * this.values[0] + vector.values[1] * this.values[3] + this.values[6];
        this.values[7] = vector.values[0] * this.values[1] + vector.values[1] * this.values[4] + this.values[7];
        this.values[8] = vector.values[0] * this.values[2] + vector.values[1] * this.values[5] + this.values[8];

        return this;
    }

    transpose() {
        const a01 = this.values[1],
            a02 = this.values[2],
            a12 = this.values[5];

        this.values[1] = this.values[3];
        this.values[2] = this.values[6];
        this.values[3] = a01;
        this.values[5] = this.values[7];
        this.values[6] = a02;
        this.values[7] = a12;

        return this;
    }

    determinant(){
        const a00 = this.values[0],
            a01 = this.values[1],
            a02 = this.values[2],
            a10 = this.values[3],
            a11 = this.values[4],
            a12 = this.values[5],
            a20 = this.values[6],
            a21 = this.values[7],
            a22 = this.values[8];
        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        return a00 * b01 + a01 * b11 + a02 * b21;
    }

    invertMatrix() {
        const a00 = this.values[0],
            a01 = this.values[1],
            a02 = this.values[2],
            a10 = this.values[3],
            a11 = this.values[4],
            a12 = this.values[5],
            a20 = this.values[6],
            a21 = this.values[7],
            a22 = this.values[8];
        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        let det =  a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
            return null;
        }

        det = 1.0 / det;

        this.values[0] = b01 * det;
        this.values[1] = (-a22 * a01 + a02 * a21) * det;
        this.values[2] = (a12 * a01 - a02 * a11) * det;
        this.values[3] = b11 * det;
        this.values[4] = (a22 * a00 - a02 * a20) * det;
        this.values[5] = (-a12 * a00 + a02 * a10) * det;
        this.values[6] = b21 * det;
        this.values[7] = (-a21 * a00 + a01 * a20) * det;
        this.values[8] = (a11 * a00 - a01 * a10) * det;

        return this;
    }

    toMatrix2(){
        const result = new Matrix2();

        result.values[0] = this.values[0];
        result.values[1] = this.values[1];
        result.values[2] = this.values[3];
        result.values[3] = this.values[4];

        return result;
    }

    toMatrix4(){
        const result = new Matrix4();

        result.values[0] = this.values[0];
        result.values[1] = this.values[1];
        result.values[2] = this.values[2];
        result.values[4] = this.values[3];
        result.values[5] = this.values[4];
        result.values[6] = this.values[5];
        result.values[8] = this.values[6];
        result.values[9] = this.values[7];
        result.values[10] = this.values[8];
        result.values[15] = 1;

        return result
    }

    static identityMatrix() {
        const result = new Matrix3();

        result.values[0] = 1;
        result.values[4] = 1;
        result.values[8] = 1;

        return result;
    }

    static projectionMatrix(width, height) {
        const result = new Matrix3();

        result.values[0] = 2 / width;
        result.values[4] = -2 / height;
        result.values[6] = -1;
        result.values[7] = 1;
        result.values[8] = 1;

        return result;
    }
}