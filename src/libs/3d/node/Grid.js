import { Vector4 } from "../../math/Vector4";
import { Plane } from "../geometry/Plane";
import { Node3D } from "../Node3D";

export class Grid extends Node3D {
    constructor(width, height, widthSegment = 1, heightSegment = 1) {
        super();
        this.width = width;
        this.height = height;
        this.widthSegment = widthSegment;
        this.heightSegment = heightSegment;
        
        this.geometry = new Plane(width,height);
        this.color = new Vector4(0,0,0,1);
    }
}