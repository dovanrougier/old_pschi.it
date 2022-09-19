export class Matrix4 {
    constructor(values) {
        this.values = new Float32Array(16);
        if (values) {
            this.setTo(values);
        }
    }

    setTo(matrix) {
        const values = matrix.constructor === Matrix4 ? matrix.values : matrix;
        this.values[0] = values[0];
        this.values[1] = values[1];
        this.values[2] = values[2];
        this.values[3] = values[3];
        this.values[4] = values[4];
        this.values[5] = values[5];
        this.values[6] = values[6];
        this.values[7] = values[7];
        this.values[8] = values[8];
        this.values[9] = values[9];
        this.values[10] = values[10];
        this.values[11] = values[11];
        this.values[12] = values[12];
        this.values[13] = values[13];
        this.values[14] = values[14];
        this.values[15] = values[15];

        return this;
    }

    scale(x, y, z) {
        this.values[0] = this.values[0] * x;
        this.values[1] = this.values[1] * x;
        this.values[2] = this.values[2] * x;
        this.values[3] = this.values[3] * x;
        this.values[4] = this.values[4] * y;
        this.values[5] = this.values[5] * y;
        this.values[6] = this.values[6] * y;
        this.values[7] = this.values[7] * y;
        this.values[8] = this.values[8] * z;
        this.values[9] = this.values[9] * z;
        this.values[10] = this.values[10] * z;
        this.values[11] = this.values[11] * z;

        return this;
    }

    translate(x, y, z) {
        this.values[12] = this.values[0] * x + this.values[4] * y + this.values[8] * z + this.values[12];
        this.values[13] = this.values[1] * x + this.values[5] * y + this.values[9] * z + this.values[13];
        this.values[14] = this.values[2] * x + this.values[6] * y + this.values[10] * z + this.values[14];
        this.values[15] = this.values[3] * x + this.values[7] * y + this.values[11] * z + this.values[15];

        return this;
    }

    rotate(radians, x, y, z) {
        let len = Math.hypot(x, y, z);

        if (len == 0) {
            console.log(radians,x,y,z);
            alert(len)
            throw new Error(`Can't rotate matrix from [${x},${y},${z}].`);
        }

        len = 1 / len;
        x *= len;
        y *= len;
        z *= len;
        const s = Math.sin(radians);
        const c = Math.cos(radians);
        const t = 1 - c;
        const a00 = this.values[0];
        const a01 = this.values[1];
        const a02 = this.values[2];
        const a03 = this.values[3];
        const a10 = this.values[4];
        const a11 = this.values[5];
        const a12 = this.values[6];
        const a13 = this.values[7];
        const a20 = this.values[8];
        const a21 = this.values[9];
        const a22 = this.values[10];
        const a23 = this.values[11];

        const b00 = x * x * t + c;
        const b01 = y * x * t + z * s;
        const b02 = z * x * t - y * s;
        const b10 = x * y * t - z * s;
        const b11 = y * y * t + c;
        const b12 = z * y * t + x * s;
        const b20 = x * z * t + y * s;
        const b21 = y * z * t - x * s;
        const b22 = z * z * t + c;

        this.values[0] = a00 * b00 + a10 * b01 + a20 * b02;
        this.values[1] = a01 * b00 + a11 * b01 + a21 * b02;
        this.values[2] = a02 * b00 + a12 * b01 + a22 * b02;
        this.values[3] = a03 * b00 + a13 * b01 + a23 * b02;
        this.values[4] = a00 * b10 + a10 * b11 + a20 * b12;
        this.values[5] = a01 * b10 + a11 * b11 + a21 * b12;
        this.values[6] = a02 * b10 + a12 * b11 + a22 * b12;
        this.values[7] = a03 * b10 + a13 * b11 + a23 * b12;
        this.values[8] = a00 * b20 + a10 * b21 + a20 * b22;
        this.values[9] = a01 * b20 + a11 * b21 + a21 * b22;
        this.values[10] = a02 * b20 + a12 * b21 + a22 * b22;
        this.values[11] = a03 * b20 + a13 * b21 + a23 * b22;

        return this;
    }

    multiply(matrix) {
        const a00 = this.values[0],
            a01 = this.values[1],
            a02 = this.values[2],
            a03 = this.values[3];
        const a10 = this.values[4],
            a11 = this.values[5],
            a12 = this.values[6],
            a13 = this.values[7];
        const a20 = this.values[8],
            a21 = this.values[9],
            a22 = this.values[10],
            a23 = this.values[11];
        const a30 = this.values[12],
            a31 = this.values[13],
            a32 = this.values[14],
            a33 = this.values[15];
        let b0 = matrix.values[0],
            b1 = matrix.values[1],
            b2 = matrix.values[2],
            b3 = matrix.values[3];
        this.values[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = matrix.values[4];
        b1 = matrix.values[5];
        b2 = matrix.values[6];
        b3 = matrix.values[7];
        this.values[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = matrix.values[8];
        b1 = matrix.values[9];
        b2 = matrix.values[10];
        b3 = matrix.values[11];
        this.values[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
        b0 = matrix.values[12];
        b1 = matrix.values[13];
        b2 = matrix.values[14];
        b3 = matrix.values[15];
        this.values[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
        this.values[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
        this.values[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
        this.values[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

        return this;
    }

    transpose() {
        var a01 = this.values[1],
            a02 = this.values[2],
            a03 = this.values[3];
        var a12 = this.values[6],
            a13 = this.values[7];
        var a23 = this.values[11];
        this.values[1] = this.values[4];
        this.values[2] = this.values[8];
        this.values[3] = this.values[12];
        this.values[4] = a01;
        this.values[6] = this.values[9];
        this.values[7] = this.values[13];
        this.values[8] = a02;
        this.values[9] = a12;
        this.values[11] = this.values[14];
        this.values[12] = a03;
        this.values[13] = a13;
        this.values[14] = a23;

        return this;
    }

    invertMatrix() {
        const a00 = this.values[0],
            a01 = this.values[1],
            a02 = this.values[2],
            a03 = this.values[3];
        const a10 = this.values[4],
            a11 = this.values[5],
            a12 = this.values[6],
            a13 = this.values[7];
        const a20 = this.values[8],
            a21 = this.values[9],
            a22 = this.values[10],
            a23 = this.values[11];
        const a30 = this.values[12],
            a31 = this.values[13],
            a32 = this.values[14],
            a33 = this.values[15];
        const b00 = a00 * a11 - a01 * a10;
        const b01 = a00 * a12 - a02 * a10;
        const b02 = a00 * a13 - a03 * a10;
        const b03 = a01 * a12 - a02 * a11;
        const b04 = a01 * a13 - a03 * a11;
        const b05 = a02 * a13 - a03 * a12;
        const b06 = a20 * a31 - a21 * a30;
        const b07 = a20 * a32 - a22 * a30;
        const b08 = a20 * a33 - a23 * a30;
        const b09 = a21 * a32 - a22 * a31;
        const b10 = a21 * a33 - a23 * a31;
        const b11 = a22 * a33 - a23 * a32; // Calculate the determinant

        let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

        if (!det) {
            return null;
        }

        det = 1.0 / det;
        this.values[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
        this.values[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
        this.values[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
        this.values[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
        this.values[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
        this.values[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
        this.values[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
        this.values[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
        this.values[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
        this.values[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
        this.values[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
        this.values[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
        this.values[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
        this.values[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
        this.values[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
        this.values[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

        return this;
    }

    transposeMatrix(matrix) {
        this.values[0] = matrix.values[0];
        this.values[1] = matrix.values[4];
        this.values[2] = matrix.values[8];
        this.values[3] = matrix.values[12];
        this.values[4] = matrix.values[1];
        this.values[5] = matrix.values[5];
        this.values[6] = matrix.values[9];
        this.values[7] = matrix.values[13];
        this.values[8] = matrix.values[2];
        this.values[9] = matrix.values[6];
        this.values[10] = matrix.values[10];
        this.values[11] = matrix.values[14];
        this.values[12] = matrix.values[3];
        this.values[13] = matrix.values[7];
        this.values[14] = matrix.values[11];
        this.values[15] = matrix.values[15];

        return this;
    }

    static identityMatrix() {
        const result = new Matrix4();

        result.values[0] = 1;
        result.values[5] = 1;
        result.values[10] = 1;
        result.values[15] = 1;

        return result;
    }

    static lookAtMatrix(eye, center, up) {
        const result = new Matrix4();

        let x0, x1, x2, y0, y1, y2, z0, z1, z2, len;
        const eyex = eye.values[0];
        const eyey = eye.values[1];
        const eyez = eye.values[2];
        const upx = up.values[0];
        const upy = up.values[1];
        const upz = up.values[2];
        const centerx = center.values[0];
        const centery = center.values[1];
        const centerz = center.values[2];

        if (Math.abs(eyex - centerx) == 0 && Math.abs(eyey - centery) == 0 && Math.abs(eyez - centerz) == 0) {
            return Matrix4.identityMatrix();
        }

        z0 = eyex - centerx;
        z1 = eyey - centery;
        z2 = eyez - centerz;
        len = 1 / Math.hypot(z0, z1, z2);
        z0 *= len;
        z1 *= len;
        z2 *= len;
        x0 = upy * z2 - upz * z1;
        x1 = upz * z0 - upx * z2;
        x2 = upx * z1 - upy * z0;
        len = Math.hypot(x0, x1, x2);

        if (!len) {
            x0 = 0;
            x1 = 0;
            x2 = 0;
        } else {
            len = 1 / len;
            x0 *= len;
            x1 *= len;
            x2 *= len;
        }

        y0 = z1 * x2 - z2 * x1;
        y1 = z2 * x0 - z0 * x2;
        y2 = z0 * x1 - z1 * x0;
        len = Math.hypot(y0, y1, y2);

        if (!len) {
            y0 = 0;
            y1 = 0;
            y2 = 0;
        } else {
            len = 1 / len;
            y0 *= len;
            y1 *= len;
            y2 *= len;
        }

        result.values[0] = x0;
        result.values[1] = y0;
        result.values[2] = z0;
        result.values[4] = x1;
        result.values[5] = y1;
        result.values[6] = z1;
        result.values[8] = x2;
        result.values[9] = y2;
        result.values[10] = z2;
        result.values[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
        result.values[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
        result.values[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
        result.values[15] = 1;
        return result;
    }

    static orthographicMatrix(left, right, bottom, top, near, far) {
        const result = new Matrix4();

        const lr = 1 / (left - right);
        const bt = 1 / (bottom - top);
        const nf = 1 / (near - far);

        result.values[0] = -2 * lr;
        result.values[5] = -2 * bt;
        result.values[10] = 2 * nf;
        result.values[12] = (left + right) * lr;
        result.values[13] = (top + bottom) * bt;
        result.values[14] = (far + near) * nf;
        result.values[15] = 1;

        return result;
    }

    static perspectiveMatrix(fovy, aspect, near, far) {
        const result = new Matrix4();
        const f = 1.0 / Math.tan(fovy / 2);
        let nf;
        result.values[0] = f / aspect;
        result.values[5] = f;
        result.values[11] = -1;

        nf = 1 / (near - far);
        result.values[10] = (far + near) * nf;
        result.values[14] = 2 * far * near * nf;

        return result;
    }
}