import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { NodeEvent } from "./event/node/NodeEvent";
import { Node } from "./Node";

export class Buffer extends Node {
    constructor(usage) {
        super();
        this.data = [];
        this.setUsage(usage);
        this.index = [];
    }

    get length() {
        return this.data.length;
    }

    get BYTES_PER_ELEMENT() {
        return this.data.BYTES_PER_ELEMENT;
    }

    getNodePosition(node) {
        let i = 0;
        let result = 0;
        while (i < this.index.length) {
            const tuple = this.index[i++];
            if (tuple[0] == node.id) {
                if (tuple[1] != node.geometry.bufferLength) {
                    this.extend(index, tuple[1], node.geometry.bufferLength);
                    node.geometry.bufferPosition = result;
                    tuple[1] = node.geometry.bufferLength;
                }
                node.geometry.bufferPosition = result;
                return result;
            }
            result += tuple[1];
        }
        this.index.push([node.id, node.geometry.bufferLength]);
        this.extend(result, 0, node.geometry.bufferLength);
        node.geometry.bufferPosition = result;
        return result;
    }

    getNodeData(node) {
        const index = this.getNodePosition(node);
        return this.slice(index, index + node.geometry.bufferLength);
    }

    updateNodeData(node) {
        let index = -1;
        let result = false;
        if (node.geometry) {
            if (node.geometry.updated.vertexPosition) {
                if (index == -1) {
                    index = this.getNodePosition(node);
                }
                this.update(node.geometry.vertexPosition, index, node.geometry.vertexPositionLength, node.geometry.stride, node.geometry.vertexPositionOffset);
                result = true;
            }
            if (node.geometry.updated.vertexNormal) {
                if (index == -1) {
                    index = this.getNodePosition(node);
                }
                this.update(node.geometry.vertexNormal, index, node.geometry.vertexNormalLength, node.geometry.stride, node.geometry.vertexNormalOffset);
                result = true;
            }
            if (node.geometry.updated.vertexColor) {
                if (index == -1) {
                    index = this.getNodePosition(node);
                }
                this.update(node.geometry.vertexColor, index, node.geometry.vertexColorLength, node.geometry.stride, node.geometry.vertexColorOffset);
                result = true;
            }
        }
        return result;
    }

    setUsage(usage = Buffer.usage.staticDraw) {
        this.usage = usage;
    }

    slice(start, end) {
        this.data.slice(start, end);
    }

    set(array, offset) {
        this.data.set(array, offset);
    }

    update(data, index, vectorLength = 1, stride = 1, offset = 0) {
        let i = 0;
        for (let j = index + offset; j < this.length; j += stride) {
            for (let k = 0; k < vectorLength; k++) {
                this.data[j + k] = data[i++];
                if (i > data.length) {
                    return;
                }
            }
        }
        this.dispatchEvent(new NodeEvent(Buffer.event.bufferUpdated));
    }

    transform(matrix, index, vectorLength, stride, offset = 0) {
        let vector = vectorLength == 4 ? new Vector4()
            : vectorLength == 3 ? new Vector3() :
                new Vector2();
        for (let i = index + offset; i < this.length; i += stride) {
            for (let j = 0; j < vectorLength; j++) {
                vector[j] = this.data[i + j];
            }
            this.updated(vector.transform(matrix), i, vectorLength, stride);
            for (let j = 0; j < vectorLength; j++) {
                this.data[i + j] = vector[j];
            }
        }
        this.dispatchEvent(new NodeEvent(Buffer.event.bufferUpdated));
    }

    extend(index, oldLength, newLength) {
        var newData = new this.data.constructor(this.data.length + newLength - oldLength);
        if (this.data.length > 0) {
            newData.set(this.data.slice(0, index + oldLength));
            newData.set(this.data.slice(index + oldLength, this.data.length), index + newLength);
        }
        this.data = newData;
    }

    concat(data) {
        const result = new this.constructor(this.length + data.length, this.usage);

        result.set(this.data);
        result.set(data, this.data.length);

        return result;
    }

    static event = {
        bufferUpdated: 'buffer-updated',
    }

    static usage = {
        staticDraw: 'STATIC_DRAW',
        dynamicDraw: 'DYNAMIC_DRAW',
        streamDraw: 'STREAM_DRAW',
    }

    static colorDefinition = {
        vertices: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 10,
            offset: 0,
        },
        normal: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 10,
            offset: 3,
        },
        color: {
            size: 4,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 10,
            offset: 6,
        },
    }

    static textureDefinition = {
        vertices: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 8,
            offset: 0,
        },
        normal: {
            size: 3,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 8,
            offset: 3,
        },
        uv: {
            size: 2,
            type: 'FLOAT',
            normalized: false,
            stride: Float32Array.BYTES_PER_ELEMENT * 8,
            offset: 6,
        }
    }
}

export class Int8Buffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Int8Array(length);
    }
}

export class UInt8Buffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Uint8Array(length);
    }
}

export class Uint8ClampedBuffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Uint8ClampedArray(length);
    }
}

export class Int16Buffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Int16Array(length);
    }
}

export class UInt16Buffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Uint16Array(length);
    }
}

export class Uint32Buffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Uint32Array(length);
    }
}

export class Float16Buffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Float16Array(length);
    }
}

export class Float32Buffer extends Buffer {
    constructor(length, usage) {
        super(usage)
        this.data = new Float32Array(length);
    }
}

export class Float64Buffer extends Buffer {
    constructor(length, usage) {
        super(usage);
        this.data = new Float64Array(length);
    }
}