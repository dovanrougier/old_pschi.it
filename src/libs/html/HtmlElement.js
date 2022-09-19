export class HtmlElement {
    constructor(parent, type, options) {
        this.element = document.createElement(type, options);

        if (options) {
            if (options.id) {
                this.element.id = options.id;
            }
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
                this.element.name = options.innerText;
            }
            if (options.width) {
                this.element.width = options.width;
            }
            if (options.height) {
                this.element.height = options.height;
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

        this.appendToParent(parent);
    }

    appendToParent(parent) {
        this.parent = parent;
        if (this.parent instanceof HtmlElement) {
            this.parent.element.appendChild(this.element);
        } else if (this.parent) {
            this.parent.appendChild(this.element);
        }
    }

    remove() {
        this.element.remove();
    }

    requestPointerLock() {
        this.element.requestPointerLock = this.element.requestPointerLock ||
            this.element.mozRequestPointerLock;
        this.element.requestPointerLock();
    }
}