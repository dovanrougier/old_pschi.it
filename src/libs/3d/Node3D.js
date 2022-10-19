import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { Node } from "../core/Node";

export class Node3D extends Node {
    constructor() {
        super();
        this.up = Node3D.defaultUp();

        this.position = new Vector3();
        this.scale = new Vector3(1, 1, 1);

        this.matrix = Matrix4.identityMatrix();
        //this.matrixWorld = Matrix4.identityMatrix();

        this.geometry = null;
    }

    get matrixWorld(){
        return this.parent.matrix || Matrix4.identityMatrix();
    }

    translate(x, y, z) {
        if (Array.isArray(x)) {
            z = x[2];
            y = x[1];
            x = x[0];
        }
        this.matrix.translate(x, y, z);
    }

    scale(x, y, z) {
        if (Array.isArray(x)) {
            z = x[2];
            y = x[1];
            x = x[0];
        }
        this.matrix.scale(x, y, z);
    }

    rotate(radians, x, y, z) {
        if (Array.isArray(x)) {
            z = x[2];
            y = x[1];
            x = x[0];
        }
        this.matrix.rotate(radians, x, y, z);
    }

    lookAt(x, y, z) {
        if (Array.isArray(x)) {
            z = x[2];
            y = x[1];
            x = x[0];
        }
        this.center = new Vector3(x, y, z);
        this.matrix = Matrix4.lookAtMatrix(this.position, this.center, this.up);
    }

    applyMatrix(matrix) {
        this.matrix.multiply(matrix);
    }

    static defaultUp() {
        return Vector3._yAxis;
    }
}