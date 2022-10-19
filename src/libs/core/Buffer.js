import { Vector2 } from "../math/Vector2";
import { Vector3 } from "../math/Vector3";
import { Vector4 } from "../math/Vector4";
import { NodeEvent } from "./event/node/NodeEvent";
import { Node } from "./Node";

export class Buffer extends Node {
    constructor(index, usage) {
        super();
        this.data = [];
        this.setUsage(usage);
        this.nodes = [];
        this.index = index;
    }

    get index() {
        return this._index;
    }

    set index(value) {
        this._index = value;
        if (this._index) {
            this.index.isIndex = true;
        }
    }

    get length() {
        return this.data.length;
    }

    get BYTES_PER_ELEMENT() {
        return this.data.BYTES_PER_ELEMENT;
    }

    getNodeIndexPosition(node) {
        let i = 0;
        let result = 0;
        const indexLength = node.indexLength;
        while (i < this.index.nodes.length) {
            const tuple = this.index.nodes[i++];
            if (tuple[0] == node.id) {
                if (tuple[1] != indexLength) {
                    this.index.extend(index, tuple[1], indexLength);
                    tuple[1] = indexLength;
                }
                node.indexBufferPosition = result;
                return result;
            }
            result += tuple[1];
        }
        this.index.nodes.push([node.id, indexLength]);
        this.index.extend(result, 0, indexLength);
        node.indexBufferPosition = result;
        return result;
    }

    getNodePosition(node) {
        let i = 0;
        let result = 0;
        while (i < this.nodes.length) {
            const tuple = this.nodes[i++];
            if (tuple[0] == node.id) {
                if (tuple[1] != node.bufferLength) {
                    this.extend(index, tuple[1], node.bufferLength);
                    tuple[1] = node.bufferLength;
                }
                node.bufferPosition = result;
                return result;
            }
            result += tuple[1];
        }
        this.nodes.push([node.id, node.bufferLength]);
        this.extend(result, 0, node.bufferLength);
        node.bufferPosition = result;
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
        if (index instanceof Node) {
            index = this.getNodePosition(index);
        }
        let i = 0;
        for (let j = index + offset; j < this.length; j += stride) {
            for (let k = 0; k < vectorLength; k++) {
                this.data[j + k] = data[i++];
            }
        }
        this.dispatchEvent(new NodeEvent(Buffer.event.bufferUpdated));
    }

    updateIndex(index, offset) {
        if (offset instanceof Node) {
            offset = this.getNodeIndexPosition(offset);
        }
        let j = offset;
        for (let i = 0; i < index.length; i++) {
            this.index.data[j++] = index[i] + offset;
        }
        this.dispatchEvent(new NodeEvent(Buffer.event.indexBufferUpdated));
    }

    transform(matrix, index, count, vectorLength, stride, offset = 0) {
        let vector = vectorLength == 4 ? new Vector4()
            : vectorLength == 3 ? new Vector3() :
                new Vector2();
        for (let i = index + offset; i < count; i += stride) {
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
        indexBufferUpdated: 'index-buffer-updated',
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
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Int8Array(length);
    }
}

export class UInt8Buffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Uint8Array(length);
    }
}

export class Uint8ClampedBuffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Uint8ClampedArray(length);
    }
}

export class Int16Buffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Int16Array(length);
    }
}

export class UInt16Buffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Uint16Array(length);
    }
}

export class Uint32Buffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Uint32Array(length);
    }
}

export class Float16Buffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Float16Array(length);
    }
}

export class Float32Buffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage)
        this.data = new Float32Array(length);
    }
}

export class Float64Buffer extends Buffer {
    constructor(length, index, usage) {
        super(index, usage);
        this.data = new Float64Array(length);
    }
}