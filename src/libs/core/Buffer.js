import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { NodeEvent } from "./event/NodeEvent";
import { Node } from "./Node";

export class Buffer extends Node {
    constructor(usage) {
        super();
        this.data = [];
        this.setUsage(usage);
    }

    [Symbol.iterator]() {
        return this.data;
    }

    next() {
        return this.data.next();
    }

    get length() {
        return this.data.length;
    }

    get BYTES_PER_ELEMENT() {
        return this.data.BYTES_PER_ELEMENT;
    }

    setUsage(usage = Buffer.usage.staticDraw) {
        this.usage = usage;
    }

    set(array, offset) {
        this.data.set(array, offset);
    }

    update(data, index, vectorLength = 1, stride = 0, offset = 0) {
        let i = 0;
        for (let j = index + offset; j < this.length; j += stride) {
            for (let k = 0; k < vectorLength; k++) {
                this.data[j + k] = data[i++];
                if (i > data.length) {
                    return;
                }
            }
        }
        this.dispatchEvent(new NodeEvent(Buffer.event.bufferUpdate));
    }

    transform(matrix, index, vectorLength, stride, offset = 0) {
        let vector = vectorLength == 4 ? new Vector4()
            : vectorLength == 3 ? new Vector3() :
                new Vector2();
        for (let i = index + offset; i < this.length; i += stride) {
            for (let j = 0; j < vectorLength; j++) {
                vector[j] = this.data[i + j];
            }
            this.update(vector.transform(matrix), i, vectorLength, stride);
            for (let j = 0; j < vectorLength; j++) {
                this.data[i + j] = vector[j];
            }
        }
        this.dispatchEvent(new NodeEvent(Buffer.event.bufferUpdate));
    }

    concat(data) {
        const result = this.constructor(this.length + data.length, this.usage);

        result.set(this.data);
        result.set(data, old.length);

        return result;
    }

    static event = {
        bufferUpdate: 'buffer-update',
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