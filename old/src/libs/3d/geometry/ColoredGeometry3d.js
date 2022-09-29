import { Geometry3d } from "./Geometry3d";

export class ColoredGeometry3d extends Geometry3d {
    static colorVectorLength = 4;
    static dataLength = Geometry3d.geometryVectorLength + ColoredGeometry3d.colorVectorLength + Geometry3d.normalVectorLength;

    constructor(x, y, z, width, height, depth, color) {
        super(x, y, z, width, height, depth);
        if (this.constructor === ColoredGeometry3d) {
            throw new Error(`Cannot instanciate ${this.constructor.name}`);
        }
        this.color = color;
    }

    getColorData() {
        return new Float32Array(this.getColorDataFromValue(this.color));
    }

    addInstance(x, y, z, width, height, depth, color) {
        const roundedColor = new Uint8Array(color.map(c => Math.round(c * 255)));
        return this.instances.push([x, y, z, width, height, depth, color, roundedColor]);
    }

    getInstancesColorData() {
        var result = new Float32Array(this.instances.length * this.drawCount * ColoredGeometry3d.colorVectorLength);
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            this.mapInstanceColor(result, i * this.drawCount * ColoredGeometry3d.colorVectorLength, instance);
        }
        return result;
    }

    mapInstanceColor(result, offset, instance) {
        const color = this.getColorDataFromValue(instance[6]);
        for (let i = 0; i < color.length; i++) {
            result[offset + i] = color[i];
        }
    }

    getColorDataFromValue(color) {
        throw new Error(`${this.constructor.name} is missing ${this.getColorDataFromValue.name} implementation.`);
    }

    getData() {
        return new Float32Array(this.getDataFromValue(
            this.position[0], this.position[1], this.position[2],
            this.dimensions[0], this.dimensions[1], this.dimensions[2],
            this.color));
    }

    getInstancesData() {
        var result = new Float32Array(this.instances.length * this.drawCount * ColoredGeometry3d.dataLength);
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            this.mapInstanceData(result, i * this.drawCount * ColoredGeometry3d.dataLength, instance);
        }
        return result;
    }

    mapInstanceData(result, offset, instance) {
        const data = this.getDataFromValue(instance[0], instance[1], instance[2], instance[3], instance[4], instance[5], instance[6]);
        for (let i = 0; i < data.length; i++) {
            result[offset + i] = data[i];
        }
    }

    getDataFromValue(x, y, z, width, height, depth, color) {
        throw new Error(`${this.constructor.name} is missing ${this.getDataFromValue.name} implementation.`);
    }
}
