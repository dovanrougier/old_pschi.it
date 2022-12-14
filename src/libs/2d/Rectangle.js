import { Matrix4 } from "../math/Matrix4";

export class Rectangle {
    constructor(x, y, width, height, color) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.vertexBuffer = Rectangle.getVertexBuffer(this.x, this.y, this.width, this.height);
        this.matrix = Matrix4.identityMatrix();
        this.instances = [];
    }

    setColor(color) {
        this.color = color;
    }

    setPosition(x, y) {
        if (x != this.x || y != this.y) {
            this.x = x;
            this.y = y;
            this.vertexBuffer = Rectangle.getVertexBuffer(this.x, this.y, this.width, this.height);

            return true;
        }
        return false;
    }

    setDimensions(width, height) {
        if (width != this.width || height != this.height) {
            this.width = width;
            this.height = height;
            this.vertexBuffer = Rectangle.getVertexBuffer(this.x, this.y, this.width, this.height);

            return true;
        }
        return false;
    }

    getVertexBuffer() {
        return this.vertexBuffer;
    }

    pushInstance(x, y, width, height, color) {
        this.instances.push([x, y, width, height, color]);
    }

    popInstance(x, y, width, height, color) {
        this.instances.pop([x, y, width, height, color]);
    }

    getInstanceVertexBuffer() {
        const result = new Float32Array(this.instances.length * 12);
        let i = 0;
        this.instances.forEach(instance => {
            const x = instance[0] / 2,
                y = instance[1] / 2,
                xw = x + instance[2],
                yh = y + instance[3];

            result[i++] = x;
            result[i++] = y;
            result[i++] = x;
            result[i++] = yh;
            result[i++] = xw;
            result[i++] = yh;
            result[i++] = xw;
            result[i++] = yh;
            result[i++] = xw;
            result[i++] = y;
            result[i++] = x;
            result[i++] = y;
        });
        return result;
    }

    static getVertexBuffer(x, y, width, height) {
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