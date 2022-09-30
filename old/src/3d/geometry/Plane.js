import { Vector3 } from "../../math/Vector3";
import { Geometry } from "./Geometry";

export class Plane extends Geometry {
    constructor(width, height) {
        super();
        this.width = width;
        this.height = height;
    }

    getTrianglesVertices() {
        return Plane.getTrianglesVertices(this.width, this.height);
    }

    static getTrianglesVertices(width, height) {
        const x = width / 2,
            y = height / 2;

        return [
            new Vector3(-x, -y, 0),
            new Vector3(-x, y, 0),
            new Vector3(x, y, 0),

            new Vector3(x, y, 0),
            new Vector3(x, -y, 0),
            new Vector3(-x, -y, 0),
        ];
    }

    static getTrianglesNormal() {
        return [
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),

            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
        ];
    }

    static TrianglesIndexes() {
        return [0, 1, 2, 2, 3, 0];
    }

    static vertices(width, height) {
        const x = width / 2,
            y = height / 2;

        return [
            new Vector3(-x, -y, 0),
            new Vector3(-x, y, 0),
            new Vector3(x, y, 0),
            new Vector3(x, -y, 0),
        ];
    }

    static normal() {
        return [
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
        ];
    }
}