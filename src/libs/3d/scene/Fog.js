import { Vector2 } from "../../math/Vector2";

export class Fog {
    constructor(near, far, color) {
        this.distance = new Vector2(near, far);
        this.color = color;
    }
}