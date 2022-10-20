import { Light } from './Light';

export class DirectionalLight extends Light {
    constructor(color, intensisty, position) {
        super(color,intensisty);
        this.position = position;
    }
}