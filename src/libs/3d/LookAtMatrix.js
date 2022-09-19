import { Matrix4 } from "../math/Matrix4";
import { Vector3 } from "../math/Vector3";

export class LookAtMatrix extends Matrix4 {
    constructor(eye, center, up){
        super();
        this.lookAt(eye, center, up);
    }
    
    lookAt(eye, center, up) {
        this.eye = eye;
        this.center = center;
        this.up = up;

        if (this.eye && this.center) {
            this.n = new Vector3(this.eye).substract(this.center).normalize();
            if (this.up) {
                this.u = new Vector3(this.up).cross(this.n);
                
                this.values[0] = this.u.values[0];
                this.values[1] = this.up.values[0];
                this.values[2] = this.n.values[0];
                this.values[4] = this.u.values[1];
                this.values[5] = this.up.values[1];
                this.values[6] = this.n.values[1];
                this.values[8] = this.u.values[2];
                this.values[9] = this.up.values[2];
                this.values[10] = this.n.values[2];
                this.values[12] = -new Vector3(this.u).dot(this.eye);
                this.values[13] = -new Vector3(this.up).dot(this.eye);
                this.values[14] = -new Vector3(this.n).dot(this.eye);
                this.values[15] = 1;
            }
        }

        return this;
    }

    tilt(radians) {
        const matrixRotation = Matrix4.identityMatrix().rotate(radians, this.u.values[0], this.u.values[1], this.u.values[2]);
        this.up.transform(matrixRotation);
        this.n.transform(matrixRotation);


        this.values[1] = this.up.values[0]; 
        this.values[2] = this.n.values[0]; 
        this.values[5] = this.up.values[1];
        this.values[6] = this.n.values[1];
        this.values[9] = this.up.values[2];
        this.values[10] = this.n.values[2];
        this.values[13] = -new Vector3(this.up).dot(this.eye);
        this.values[14] = -new Vector3(this.n).dot(this.eye);
        
        return this;
    }


    pan(radians) {
        const matrixRotation = Matrix4.identityMatrix().rotate(radians, this.up.values[0], this.up.values[1], this.up.values[2]);
        this.u.transform(matrixRotation);
        this.n.transform(matrixRotation);

        this.values[0] = this.u.values[0];
        this.values[2] = this.n.values[0];
        this.values[4] = this.u.values[1];
        this.values[6] = this.n.values[1];
        this.values[8] = this.u.values[2];
        this.values[10] = this.n.values[2];
        this.values[12] = -new Vector3(this.u).dot(this.eye);
        this.values[14] = -new Vector3(this.n).dot(this.eye);
        
        return this;
    }


    cant(radians) {
        const matrixRotation = Matrix4.identityMatrix().rotate(radians, this.n.values[0], this.n.values[1], this.n.values[2]);
        this.u.transform(matrixRotation);
        this.up.transform(matrixRotation);


        this.values[0] = this.u.values[0];
        this.values[1] = this.up.values[0];
        this.values[4] = this.u.values[1];
        this.values[5] = this.up.values[1];
        this.values[8] = this.u.values[2];
        this.values[9] = this.up.values[2];
        this.values[12] = -new Vector3(this.u).dot(this.eye);
        this.values[13] = -new Vector3(this.up).dot(this.eye);
        
        return this;
    }

    truck(distance) {
        const u = new Vector3(this.u).scale(distance);
        this.eye.add(u);
        this.center.add(u);

        this.values[12] = -new Vector3(this.u).dot(this.eye);
        this.values[13] = -new Vector3(this.up).dot(this.eye);
        this.values[14] = -new Vector3(this.n).dot(this.eye);
        
        return this;
    }

    dolly(distance) {
        const n = new Vector3(this.n).scale(distance);
        this.eye.substract(n);
        this.center.substract(n);

        this.values[12] = -new Vector3(this.u).dot(this.eye);
        this.values[13] = -new Vector3(this.up).dot(this.eye);
        this.values[14] = -new Vector3(this.n).dot(this.eye);
        
        return this;
    }

    pedestal(distance) {
        const v = new Vector3(this.up).scale(distance);
        this.eye.add(v);
        this.center.add(v);

        this.values[12] = -new Vector3(this.u).dot(this.eye);
        this.values[13] = -new Vector3(this.up).dot(this.eye);
        this.values[14] = -new Vector3(this.n).dot(this.eye);

        return this;
    }
}