import { Matrix2 } from './Matrix2';
import { Matrix4 } from './Matrix4';

export class Matrix3 extends Float32Array{
    constructor(values) {
        super(9);
        if (values) {
            this.set(values);
        }
    }

    add(matrix) {
        this[0] += matrix[0];
        this[1] += matrix[1];
        this[2] += matrix[2];
        this[3] += matrix[3];
        this[4] += matrix[4];
        this[5] += matrix[5];
        this[6] += matrix[6];
        this[7] += matrix[7];
        this[8] += matrix[8];

        return this;
    }

    substract(matrix) {
        this[0] -= matrix[0];
        this[1] -= matrix[1];
        this[2] -= matrix[2];
        this[3] -= matrix[3];
        this[4] -= matrix[4];
        this[5] -= matrix[5];
        this[6] -= matrix[6];
        this[7] -= matrix[7];
        this[8] -= matrix[8];

        return this;
    }

    multiply(matrix) {
        const a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a10 = this[3],
            a11 = this[4],
            a12 = this[5],
            a20 = this[6],
            a21 = this[7],
            a22 = this[8],
            b00 = matrix[0],
            b01 = matrix[1],
            b02 = matrix[2],
            b10 = matrix[3],
            b11 = matrix[4],
            b12 = matrix[5],
            b20 = matrix[6],
            b21 = matrix[7],
            b22 = matrix[8];

        this[0] = b00 * a00 + b01 * a10 + b02 * a20;
        this[1] = b00 * a01 + b01 * a11 + b02 * a21;
        this[2] = b00 * a02 + b01 * a12 + b02 * a22;
        this[3] = b10 * a00 + b11 * a10 + b12 * a20;
        this[4] = b10 * a01 + b11 * a11 + b12 * a21;
        this[5] = b10 * a02 + b11 * a12 + b12 * a22;
        this[6] = b20 * a00 + b21 * a10 + b22 * a20;
        this[7] = b20 * a01 + b21 * a11 + b22 * a21;
        this[8] = b20 * a02 + b21 * a12 + b22 * a22;

        return this;
    }

    scale(vector) {
        this[0] *= vector[0];
        this[1] *= vector[0];
        this[2] *= vector[0];
        this[3] *= vector[1];
        this[4] *= vector[1];
        this[5] *= vector[1];

        return this;
    }

    rotate(radians) {
        const a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a10 = this[3],
            a11 = this[4],
            a12 = this[5],
            s = Math.sin(radians),
            c = Math.cos(radians);

        this[0] = c * a00 + s * a10;
        this[1] = c * a01 + s * a11;
        this[2] = c * a02 + s * a12;
        this[3] = c * a10 - s * a00;
        this[4] = c * a11 - s * a01;
        this[5] = c * a12 - s * a02;

        return this;
    }

    translate(vector) {
        this[6] = vector[0] * this[0] + vector[1] * this[3] + this[6];
        this[7] = vector[0] * this[1] + vector[1] * this[4] + this[7];
        this[8] = vector[0] * this[2] + vector[1] * this[5] + this[8];

        return this;
    }

    transpose() {
        const a01 = this[1],
            a02 = this[2],
            a12 = this[5];

        this[1] = this[3];
        this[2] = this[6];
        this[3] = a01;
        this[5] = this[7];
        this[6] = a02;
        this[7] = a12;

        return this;
    }

    determinant(){
        const a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a10 = this[3],
            a11 = this[4],
            a12 = this[5],
            a20 = this[6],
            a21 = this[7],
            a22 = this[8];
        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        return a00 * b01 + a01 * b11 + a02 * b21;
    }

    invertMatrix() {
        const a00 = this[0],
            a01 = this[1],
            a02 = this[2],
            a10 = this[3],
            a11 = this[4],
            a12 = this[5],
            a20 = this[6],
            a21 = this[7],
            a22 = this[8];
        const b01 = a22 * a11 - a12 * a21;
        const b11 = -a22 * a10 + a12 * a20;
        const b21 = a21 * a10 - a11 * a20;

        let det =  a00 * b01 + a01 * b11 + a02 * b21;
        if (!det) {
            return null;
        }

        det = 1.0 / det;

        this[0] = b01 * det;
        this[1] = (-a22 * a01 + a02 * a21) * det;
        this[2] = (a12 * a01 - a02 * a11) * det;
        this[3] = b11 * det;
        this[4] = (a22 * a00 - a02 * a20) * det;
        this[5] = (-a12 * a00 + a02 * a10) * det;
        this[6] = b21 * det;
        this[7] = (-a21 * a00 + a01 * a20) * det;
        this[8] = (a11 * a00 - a01 * a10) * det;

        return this;
    }

    toMatrix2(){
        const result = new Matrix2();

        result[0] = this[0];
        result[1] = this[1];
        result[2] = this[3];
        result[3] = this[4];

        return result;
    }

    toMatrix4(){
        const result = new Matrix4();

        result[0] = this[0];
        result[1] = this[1];
        result[2] = this[2];
        result[4] = this[3];
        result[5] = this[4];
        result[6] = this[5];
        result[8] = this[6];
        result[9] = this[7];
        result[10] = this[8];
        result[15] = 1;

        return result
    }

    static identityMatrix() {
        const result = new Matrix3();

        result[0] = 1;
        result[4] = 1;
        result[8] = 1;

        return result;
    }

    static projectionMatrix(width, height) {
        const result = new Matrix3();

        result[0] = 2 / width;
        result[4] = -2 / height;
        result[6] = -1;
        result[7] = 1;
        result[8] = 1;

        return result;
    }
}