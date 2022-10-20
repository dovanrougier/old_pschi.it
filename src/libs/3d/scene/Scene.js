import { Node3D } from '../Node3D';

export class Scene extends Node3D{
    constructor(){
        super();
        this.background = null;
        this.fog = null;
    }
}