import { Matrix4 } from "../math/Matrix4";

export class Rectangle {
    constructor(x, y, width, height, color) {
        this.setDimensions(width, height);
        this.setPosition(x, y);
        this.setColor(color);
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

    getVertex() {
        return Rectangle.getVertex(this.x, this.y, this.width, this.height);
    }
    static getVertex(x, y, width, height) {
        //center the origin
        x = x - width / 2;
        y = y - height / 2;
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