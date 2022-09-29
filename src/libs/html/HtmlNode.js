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

    appendChild(child) {
        if (arguments.length > 1) {
            return Node.repeatFunction(arguments, this.appendChild.bind(this));
        }
        if (!child) {
            throw new NodeError(this, `Cannot appendChild ${child}`);
        }
        if (!child.constructor.name === HtmlNode) {
            throw new NodeError(this, `${child.constructor.name} is not a HtmlNode.`);
        }
        const result = super.appendChild(child);
        if (result) {
            this.element.appendChild(child.element);
        }
        return result;
    }

    removeChild(child) {
        if (arguments.length > 1) {
            return Node.repeatFunction(arguments, this.removeChild.bind(this));
        }
        if (!child) {
            throw new NodeError(this, `Cannot removeChild ${child}`);
        }
        if (!child.constructor.name === HtmlNode) {
            throw new NodeError(this, `${child.constructor.name} is not a HtmlNode.`);
        }
        const result = super.removeChild(child);
        if (result) {
            child.element.remove();
        }
        return result;
    }

    remove() {
        return this.parent.removeChild(this);
    }

    appendToHtmlElement(htmlElement) {
        htmlElement.appendChild(this.element);
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
}