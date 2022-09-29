import { HtmlNode } from "./HtmlNode";

export class Canvas extends HtmlNode {
    static elementTag = 'canvas';

    constructor(options) {
        super(Canvas.elementTag, options);
    }

    getAspect() {
        return this.element.width / this.element.height;
    }

    resize(width, height) {
        this.width = width;
        this.height = height;
    }

    fitBody() {
        this.resize(document.body.clientWidth, document.body.clientHeight);
    }

    // assumes canvas doesn't have padding or border
    static getMouseRelativePositon(event, canvas) {
        const rect = canvas.getBoundingClientRect();
        return [
            ((event.clientX - rect.left) * canvas.width / canvas.clientWidth) / canvas.width * 2 - 1,
            ((event.clientY - rect.top) * canvas.height / canvas.clientHeight) / canvas.height * -2 + 1
        ];
    }

    // assumes canvas doesn't have padding or border
    static getMousePixelPosition(event, canvas) {
        const rect = canvas.getBoundingClientRect();
        return [
            ((event.clientX - rect.left) * canvas.width / canvas.clientWidth),
            ((rect.bottom - event.clientY) * canvas.height / canvas.clientHeight)
        ];
    }
}