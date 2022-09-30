import { Node } from '../core/Node';
import { NodeError } from '../core/error/node/NodeError';

export class HtmlNode extends Node {
    constructor(type, options) {
        super();

        this.element = document.createElement(type);
        this.element.id = this.id;

        if (options) {
            if (options.title) {
                this.element.title = options.title;
            }
            if (options.name) {
                this.element.name = options.name;
            }
            if (options.innerHTML) {
                this.element.innerHTML = options.innerHTML;
            }
            if (options.innerText) {
                this.element.innerText = options.innerText;
            }
            if (options.width) {
                this.element.width = options.width;
            }
            if (options.height) {
                this.element.height = options.height;
            }
            if (options.onclick) {
                this.element.onclick = options.onclick;
            }
            if (options.onmousemove) {
                this.element.onmousemove = options.onmousemove;
            }
            if (options.onmouseenter) {
                this.element.onmouseenter = options.onmouseenter;
            }
            if (options.onmouseleave) {
                this.element.onmouseleave = options.onmouseleave;
            }
            if (options.onmouseup) {
                this.element.onmouseup = options.onmouseup;
            }
            if (options.onmousedown) {
                this.element.onmousedown = options.onmousedown;
            }
        }

        this.addEventListener(Node.event.nodeInserted, (e) => {
            if (e.child.element) {
                this.element.appendChild(e.child.element);
            }
        });
        this.addEventListener(Node.event.nodeRemoved, (e) => {
            if (e.child.element) {
                e.child.element.remove();
            }
        });
    }

    getAspectRatio() {
        return this.element.width / this.element.height;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    fitParent() {
        if (this.parent.element) {
            this.resize(this.parent.element.clientWidth, this.parent.element.clientHeight);
        }
    }

    get width() {
        return this.element.width;
    }

    set width(value) {
        this.element.width = value;
    }

    get height() {
        return this.element.height;
    }

    set height(value) {
        this.element.height = value;
    }

    validateType(child) {
        if (!child.constructor.name === HtmlNode) {
            return new NodeError(this, `${child.constructor.name} can't be child of ${this.constructor.name}.`);
        }
        return null;
    }

    remove() {
        return this.parent.removeChild(this);
    }

    appendToBody() {
        if (this.parent) {
            if (this.parent.constructor.name === HtmlNode) {
                return this.parent.appendToBody();
            }
            this.parent.removeChild(this);
        }
        this.parent = { element: document.body }
        document.body.appendChild(this.element);
    }

    setPointerCapture(pointerId) {
        this.element.setPointerCapture(pointerId);
    };

    releasePointerCapture(pointerId) {
        this.element.releasePointerCapture(pointerId);
    };

    requestPointerLock() {
        this.element.requestPointerLock = this.element.requestPointerLock ||
            this.element.mozRequestPointerLock;
        if (this.element.requestPointerLock) {
            this.element.requestPointerLock();
        }
    }

    static setDocument(){
        document.documentElement.style.height = '100%';
        document.documentElement.style.width = '100%';
        document.documentElement.style.margin = '0';

        document.body.style.height = '100%';
        document.body.style.width = '100%';
        document.body.style.margin = '0';
    }
}