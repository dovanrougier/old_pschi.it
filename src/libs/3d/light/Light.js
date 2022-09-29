import { Vector3 } from "../math/Vector3";

export class Light{
    constructor(position, color, ambientColor){
        this.position = new Vector3(position).values;
        this.color = new Vector3(color).values;
        this.ambientColor = new Vector3(ambientColor).values;
    }
}