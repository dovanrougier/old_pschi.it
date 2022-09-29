import { Node3D } from "../Node3D";

export class Mesh extends Node3D {
    constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
    }
}