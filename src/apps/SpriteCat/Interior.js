import { Matrix4 } from '../../libs/math/Matrix4';
import textureSrc from './interior.png';

export class Interior{
    constructor(){
        this.width = 16 / 256;
        this.height = 16 / 256;
        this.size = 100;
        this.matrix = Matrix4.identityMatrix();
    }

    static frame = {
        floor: {
            wood: [[0,0],[1,0],[2,0]],
            tile:[[0,1],[1,1],[2,1]]
        }
    }
    
    getData(frame) {
        const u = frame[0] * this.width + this.offset,
            v = frame[1] * this.height;

        return new Float32Array([
            -this.size, this.size, u, v,
            -this.size, -this.size, u, v + this.height,
            this.size, this.size, u + this.width, v,

            -this.size, -this.size, u, v + this.height,
            this.size, this.size, u + this.width, v,
            this.size, -this.size, u + this.width, v + this.height,
        ]);
    }

    getMatrix() {
        return this.matrix.values;
    }

    static texture = textureSrc;
}