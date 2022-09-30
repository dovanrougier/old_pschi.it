import { Vector3 } from "../../math/Vector3";

export class Box {
    constructor(width, height, depth) {
        super();
        this.width = width;
        this.height = height;
        this.depth = depth;
    }

    get vertices() {
        const x = this.width / 2,
            y = this.height / 2,
            z = this.depth / 2;
        return [
            new Vector3(-x, -y, 0),
            new Vector3(-x, y, 0),
            new Vector3(x, y, 0),
            new Vector3(x, -y, 0),
        ]
    }

    get normal() {
        return [
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
            new Vector3(0, 0, 1),
        ]
    }
}