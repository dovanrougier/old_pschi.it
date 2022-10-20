import { Matrix4 } from '../../math/Matrix4';
import { Node3D } from '../Node3D';

export class Camera extends Node3D {
    constructor() {
        super();
        this.projectionMatrix = Matrix4.identityMatrix();
    }
}