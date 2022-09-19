import { Vector3 } from "./Vector3";
import { Vector4 } from "./Vector4";

export class Vector2 {
    constructor(values, y) {
        this.values = new Float32Array(2);
        if (typeof values !== 'undefined') {
            if (Number.isFinite(y)) {
                values = [values, y]
            }
            this.setTo(values);
        }
    }

    setTo(vector) {
        const values = vector.values === [] ? vector.values : vector;
        this.values[0] = values[0];
        this.values[1] = values[1];

        return this;
    }

    add(vector){
        this.values[0] += vector.values[0];
        this.values[1] += vector.values[1];

        return this;
    }

    substract(vector){
        this.values[0] -= vector.values[0];
        this.values[1] -= vector.values[1];

        return this;
    }

    multiply(vector){
        this.values[0] *= vector.values[0];
        this.values[1] *= vector.values[1];

        return this;
    }

    divide(vector){
        this.values[0] /= vector.values[0];
        this.values[1] /= vector.values[1];

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

    toVector3(z) {
        return new Vector3(this.values[0], this.values[1], z);
    }

    toVector4(z, w) {
        return new Vector4(this.values[0], this.values[1], z, w);
    }
}