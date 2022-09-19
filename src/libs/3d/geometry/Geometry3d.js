import { Matrix4 } from "../../math/Matrix4";

export class Geometry3d {
    static geometryVectorLength = 3;
    static normalVectorLength = 3;

    constructor(x = 0, y = 0, z = 0, width = 1, height = 1, depth = 1) {
        if (this.constructor === Geometry3d) {
            throw new Error(`Cannot instanciate ${this.constructor.name}`);
        }
        this.setPosition(x, y, z);
        this.setDimensions(width, height, depth);
        this.translation = [0, 0, 0];
        this.scale = [1, 1, 1];
        this.rotation = [0, 0, 0];

        this.matrix = Matrix4.identityMatrix();
        this.drawCount = 0;
        this.instances = []
    }

    setPosition(x, y, z) {
        this.position = [x, y, z];
    }

    setDimensions(width, height, depth) {
        this.dimensions = [width, height, depth];
    }

    translate(x, y, z) {
        this.translation = [x || this.translation[0], y || this.translation[1], z || this.translation[2]];
        this.setMatrix();
    }

    rotate(x, y, z) {
        this.rotation = [x || this.rotation[0], y || this.rotation[1], z || this.rotation[2]];
        quat.fromEuler(this.rotationQuat, this.rotation[0], this.rotation[1], this.rotation[2]);
        this.setMatrix();
    }

    rescale(x, y, z) {
        this.scale = [x || this.scale[0], y || this.scale[1], z || this.scale[2]];
        this.setMatrix();
    }

    setMatrix() {
        mat4.fromRotationTranslationScaleOrigin(this.matrix, this.rotationQuat, this.translation, this.scale, this.position);
    }

    addInstance(x, y, z, width, height, depth) {
        return this.instances.push([x, y, z, width, height, depth]);
    }

    sortInstances(compareFn){
        this.instances = this.instances.sort(compareFn);
    }

    getInstancesGeometryData() {
        var result = new Float32Array(this.instances.length * this.drawCount * Geometry3d.geometryVectorLength);
        for (let i = 0; i < this.instances.length; i++) {
            const instance = this.instances[i];
            this.mapInstanceGeometry(result, i * this.drawCount * Geometry3d.geometryVectorLength, instance);
        }
        return result;
    }

    mapInstanceGeometry(result, offset, instance) {
        const geometry = this.getGeometryDataFromValue(instance[0], instance[1], instance[2], instance[3], instance[4], instance[5]);
        for (let i = 0; i < geometry.length; i++) {
            result[offset + i] = geometry[i];
        }
    }

    getGeometryData() {
        return new Float32Array(this.getGeometryDataFromValue(
            this.position[0], this.position[1], this.position[2],
            this.dimensions[0], this.dimensions[1], this.dimensions[2]));
    }

    getGeometryDataFromValue(x, y, z, width, height, depth) {
        throw new Error(`${this.constructor.name} is missing ${this.getGeometryDataFromValue.name} implementation.`);
    }

    getNormalData() {
        throw new Error(`${this.constructor.name} is missing ${this.getNormalData.name} implementation.`);
    }
}