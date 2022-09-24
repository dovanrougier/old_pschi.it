import { Matrix4 } from "../math/Matrix4";

export class Rectangle {
    constructor(x, y, width, height, color, u, v) {
        this.setPosition(x, y);
        this.setDimensions(width, height);
        this.setColor(color);
        this.setUV(u, v);
        this.matrix = Matrix4.identityMatrix();
    }

    setColor(color) {
        this.color = color;
    }

    setPosition(x, y) {
        this.x = x;
        this.y = y;
    }

    setDimensions(width, height) {
        this.width = width;
        this.height = height;
    }

    setUV(u, v) {
        this.u = u;
        this.v = v;
    }

    getVertex() {
        return Rectangle.getVertex(this.x, this.y, this.width, this.height);
    }
    getTextureCoordinate() {
        return Rectangle.getTextureCoordinate(this.u, this.v, this.width, this.height);
    }

    static getVertex(x, y, width, height) {
        const xw = x + width,
            yh = y + height;

        return [
            x, y,
            x, yh,
            xw, yh,

            xw, yh,
            xw, y,
            x, y];
    }

    static getTextureCoordinate(u, v, width, height) {
        const uw = u + width,
            vh = v + height;

        return [
            u, v,
            u, vh,
            uw, vh,

            uw, vh,
            uw, v,
            u, v,
        ];
    }

    translate(x, y) {
        this.matrix.translate(x, y, 0);
    }

    scale(x, y) {
        this.matrix.scale(x, y, 0);
    }

    rotate(radians) {
        this.matrix.rotate(radians, 0, 0, 1);
    }

    getMatrix() {
        return this.matrix.values;
    }
}