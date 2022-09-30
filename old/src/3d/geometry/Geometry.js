import { Node } from "../../core/Node";

export class Geometry extends Node {
    static vertexVectorLength = 3;
    static normalVectorLength = 3;

    constructor() {
        super();
        this.bufferLenght = Geometry.vertexVectorLength + Geometry.normalVectorLength;
    }
    
    get vertices() {
        throw new Error(`${this.constructor.name} is missing get vertices.`);
    }

    get normals() {
        throw new Error(`${this.constructor.name} is missing get normals.`);
    }
}