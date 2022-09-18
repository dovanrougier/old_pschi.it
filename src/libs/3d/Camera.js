import { Matrix4 } from "../Math/Matrix4";
import { Vector3 } from "../Math/Vector3";
import { LookAtMatrix } from "./LookAtMatrix";

export class Camera {
    constructor(eye = Vector3.fromValues(0, 0, -5), center = Vector3.fromValues(0, 0, 0), up = Vector3.fromValues(0, 1, 0), fovY = 45, aspect = 16 / 9, near = 0.1, far = 1000) {
        this.lookAtMatrix = Matrix4.identityMatrix();

        this.setPerspective(fovY, aspect, near, far);
        this.setLookAt(eye, center, up);
        this.setMatrix();
    }

    setPerspective(fovY, aspect, near, far) {
        this.fovY = fovY;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.perspectiveMatrix = Matrix4.perspectiveMatrix(this.fovY, this.aspect, this.near, this.far);
    }

    setLookAt() {
        this.lookAtMatrix = new LookAtMatrix(eye, center, up);
        this.setMatrix();

        return this;
    }

    setMatrix() {
        if (this.perspectiveMatrix && this.lookAtMatrix) {
            this.matrix = new Matrix4(this.perspectiveMatrix).multiply(this.lookAtMatrix);
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
        this.lookAtMatrix.translate(distance);
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