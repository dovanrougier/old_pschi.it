import { Node } from '../../core/Node';

export class Material extends Node {
    constructor() {
        super();
        this.wireframe = false;
        this.points = false; 
        this.pointSize = 5;
    }
}