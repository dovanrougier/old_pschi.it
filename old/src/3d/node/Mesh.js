import { Float32Buffer } from "../../core/Buffer";
import { Node3D } from "../Node3D";

export class Mesh extends Node3D {
    constructor(geometry, material) {
        super();
        this.geometry = geometry;
        this.material = material;
    }

    createBuffer(){
        this.stride = this.geometry.bufferLength + this.material.bufferLength;
        this.buffer = new Float32Buffer(length,stride);
    }
}