import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";
import { LookAtMatrix } from "./LookAtMatrix";

export class Camera {
    constructor(eye, center, up, fovY, aspect, near, far) {
        this.setPerspective(fovY, aspect, near, far);
        this.lookAt(eye, center, up);
    }

    setPerspective(fovY, aspect, near, far) {
        this.fovY = fovY;
        this.aspect = aspect;
        this.near = near;
        this.far = far;
        this.perspectiveMatrix = Matrix4.perspectiveMatrix(this.fovY, this.aspect, this.near, this.far);
        if(this.lookAtMatrix){
            this.setMatrix();
        }

        return this;
    }

    lookAt(eye, center, up) {
        this.lookAtMatrix = new LookAtMatrix(new Vector3(eye), new Vector3(center), new Vector3(up));
        return this.setMatrix();
    }

    setMatrix() {
        if (this.perspectiveMatrix && this.lookAtMatrix) {
            this.matrix = new Matrix4(this.perspectiveMatrix).multiply(this.lookAtMatrix);
            this.hasMoved = true;
        }
        return this;
    }

    getMatrix(){
        this.hasMoved = false;
        return this.matrix.values;
    }

    tilt(radians) {
        this.lookAtMatrix.tilt(radians);
        this.setMatrix();

    }

    pan(radians) {
        this.lookAtMatrix.pan(radians);
        return this.setMatrix();
    }


    cant(radians) {
        this.lookAtMatrix.cant(radians);
        return this.setMatrix();
    }

    truck(distance) {
        this.lookAtMatrix.truck(distance);
        return this.setMatrix();
    }

    dolly(distance) {
        this.lookAtMatrix.dolly(distance);
        return this.setMatrix();
    }

    pedestal(distance) {
        this.lookAtMatrix.pedestal(distance);
        return this.setMatrix();
    }
}