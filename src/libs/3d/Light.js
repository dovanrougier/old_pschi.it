export class Light{
    constructor(position, color, ambientColor){
        this.position = position.values;
        this.color = color.values;
        this.ambientColor = ambientColor.values;
    }
}