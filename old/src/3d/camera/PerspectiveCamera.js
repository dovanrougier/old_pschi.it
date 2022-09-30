import { Matrix4 } from "../../math/Matrix4";
import { Camera } from "./Camera";

export class PerspectiveCamera extends Camera {
    constructor(fovY, aspect, near, far) {
        this.fovY = fovY;
        this.aspect = aspect;
        this.near = near;
        this.far = far;

        this.updateProjectionMatrix(fovY, aspect, near, far);
    }

    updateProjectionMatrix(fovY, aspect, near, far) {
        this.fovY = fovY;
        this.aspect = aspect;
        this.near = near;
        this.far = far;

        this.projectionMatrix = Matrix4.perspectiveMatrix(this.fovY, this.aspect, this.near, this.far).multiply(this.matrix);
    }
}