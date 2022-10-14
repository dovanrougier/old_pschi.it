import { Color } from "../../core/Color";
import { Node } from "../../core/Node";
import { ColorMaterial } from "../material/ColorMaterial";

export class Geometry3D extends Node {
    static vertexPositionLength = 3;
    static vertexNormalLength = 3;
    static vertexColorLength = 4;
    static vertexUVLength = 2;

    constructor(material) {
        super();

        this.vertexPositionLength = Geometry3D.vertexPositionLength;
        this.vertexNormalLength = Geometry3D.vertexNormalLength;
        this.vertexColorLength = Geometry3D.vertexColorLength;
        this.vertexUVLength = Geometry3D.vertexUVLength;

        this.vertexPositionOffset = 0;
        this.vertexNormalOffset = Geometry3D.vertexPositionLength;
        this.vertexColorOffset = Geometry3D.vertexPositionLength + Geometry3D.vertexNormalLength;
        //this.vertexUVOffset = Geometry3D.vertexPositionLength + Geometry3D.vertexNormalLength + Geometry3D.vertexColorLength;
        this.stride = 10;
        this.bufferPosition = -1;
        this.vertexMode = null;

        this.material = material || new ColorMaterial(new Color(1, 1, 1, 1));
    }

    get bufferLength() {
        return this.vertexCount * this.stride;
    }

    get vertexIndex() {
        return this.bufferPosition / this.stride;
    }
}