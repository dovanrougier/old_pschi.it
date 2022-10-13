import { Vector4 } from "../math/Vector4";

export class Color extends Vector4 {
    static length = 4;
    constructor(r = 0, g = 0, b = 0, a = 1) {
        super(r, g, b, a);
    }

    get r() {
        return this[0];
    }

    set r(value) {
        this[0] = value;
    }

    get b() {
        return this[1];
    }

    set b(value) {
        this[1] = value;
    }

    get g() {
        return this[2];
    }

    set g(value) {
        this[2] = value;
    }

    get a() {
        return this[3];
    }

    set a(value) {
        this[3] = value;
    }
}