import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { LookAtMatrix } from "./LookAtMatrix";

export class Camera {
    constructor(eye, center, up, fovY, aspect, near, far) {
        this.setPerspective(fovY, aspect, near, far);
        this.setLookAt(eye, center, up);
    }

    setPerspective(fovY, aspect, near, far) {
        this.fovY = fovY;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.perspectiveMatrix = Matrix4.perspectiveMatrix(this.fovY, this.aspect, this.near, this.far);
    }

    setLookAt(eye, center, up) {
        this.lookAtMatrix = new LookAtMatrix(eye, center, up);
        this.setMatrix();

        return this;
    }

    setMatrix() {
        if (this.perspectiveMatrix && this.lookAtMatrix) {
            this.matrix = new Matrix4(this.perspectiveMatrix).multiply(this.lookAtMatrix).values;
        }
    }

    tilt(radians) {
        this.lookAtMatrix.tilt(radians);
        this.setMatrix();

    }

    pan(radians) {
        this.lookAtMatrix.pan(radians);
        this.setMatrix();
    }


    cant(radians) {
        this.lookAtMatrix.cant(radians);
        this.setMatrix();
    }

    truck(distance) {
        this.lookAtMatrix.truck(distance);
        this.setMatrix();
    }

    dolly(distance) {
        this.lookAtMatrix.dolly(distance);
        this.setMatrix();
    }

    pedestal(distance) {
        this.lookAtMatrix.pedestal(distance);
        this.setMatrix();
    }
}