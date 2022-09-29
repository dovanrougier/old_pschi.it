import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";

export class Fog{
    constructor(color, distance){
        this.color = new Vector3(color).values;
        this.distance = new Vector2(distance).values;
    }
}