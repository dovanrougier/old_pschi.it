import { Scene } from "../3d/scene/Scene";
import { NodeError } from "../core/error/node/NodeError";
import { WebGLContext } from "../context/webgl/WebGLContext";
import { Canvas } from "./Canvas";
import { Node } from "../core/Node";

export class WebGLCanvas extends Canvas {
    constructor(canvasOptions, contextOptions) {
        super(canvasOptions);

        this.context = new WebGLContext(this.element.getContext('webgl', contextOptions) || this.element.getContext('experimental-webgl', contextOptions));
        if (!this.context) {
            this.element.innerText = 'WebGL is not supported.'
        }

        this.addEventListener(Node.event.nodeInserted, (e) => {
            this.context.init(e.child);
        });
    }

    validateType(child) {
        if (!child.constructor.name === Scene) {
            return new NodeError(this, `${child.constructor.name} can't be child of ${this.constructor.name}.`);
        }
        return null;
    }

    draw() {
        this.children.forEach(this.context.draw.bind(this.context));
    }

    resize(width, height) {
        super.resize(width, height);
        this.context.viewport(0, 0, width, height);
    }
}