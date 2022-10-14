import { Color } from "../../core/Color";
import { Material } from "./Material";

export class ColorMaterial extends Material {
    constructor(color) {
        super();
        this.color = color;
    }
}