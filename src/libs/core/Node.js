import { NodeError } from "./error/node/NodeError";
import { NodeEvent } from "./event/NodeEvent";
import { Uuid } from "./Uuid";

export class Node extends EventTarget {
    constructor() {
        super();

        this.id = Uuid.generate();
        this.parent = null;
        this.children = [];
        this.visible = true;
    }

    appendChild(child) {
        if (arguments.length > 1) {
            return Node.repeatFunction(arguments, this.appendChild.bind(this));
        }
        if (!child) {
            throw new NodeError(this, `Cannot appendChild ${child}`);
        }
        if (!child.constructor.name === Node) {
            throw new NodeError(this, `${child.constructor.name} is not a Node.`);
        }
        if (this === child) {
            throw new NodeError(this, `Node ${child.id} can not be his own child.`);
        }
        if (child.parent) {
            child.parent.removeChild(child);
        }

        child.parent = this;
        this.children.push(child);
        this.dispatchEvent(new NodeEvent(child, Node.event.nodeInserted));

        return child;
    }

    removeChild(child) {
        if (arguments.length > 1) {
            return Node.repeatFunction(arguments, this.removeChild.bind(this));
        }
        if (!child) {
            throw new NodeError(this, `Cannot removeChild ${child}`);
        }
        if (!child.constructor.name === Node) {
            throw new NodeError(this, `${child.constructor.name} is not a Node.`);
        }
        if (this === child) {
            throw new NodeError(this, `Node ${child.id} can not be his own child.`);
        }
        const index = this.indexOf(child);
        if (index === -1) {
            throw new NodeError(this, `Node ${child.id} not found.`);
        }

        child.parent = null;
        this.children.splice(index, 1);
        this.dispatchEvent(new NodeEvent(child, Node.event.nodeRemoved));

        return child;
    }

    indexOf(node) {
        return this.children.findIndex(c =>  c.id === node.id);
    }

    clone(deep) {
        return new this.constructor().copy(this, deep);
    }

    copy(source, deep) {
        const id = this.id;
        for (const property in source) {
                this[property] = source[property];
        }
        this.id = id;
    }

    contains(node) {
        if (arguments.length > 1) {
            return Node.repeatFunction(arguments, this.removeChild.bind(this)).every(r => r == true);
        }
        return this.indexOf(node) === -1;
    }

    static repeatFunction(args, fn) {
        const result = new Array(args.length);
        for (let i = 0; i < args.length; i++) {
            result[i] = fn(args[i]);
        }
        return result;
    }

    static event = {
        nodeRemoved: 'node-removed',
        nodeInserted: 'node-inserted',
    }
}