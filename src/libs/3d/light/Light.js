import { Vector3 } from "../../math/Vector3";
import { Node3D } from "../Node3D";

export class Light extends Node3D {
    constructor(color, intensisty = 1) {
        super();
        this.color = new Vector3(color);
        this.intensisty = intensisty;
    }
}