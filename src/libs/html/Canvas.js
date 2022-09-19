import { HtmlElement } from "./HtmlElement";

export class Canvas extends HtmlElement {
    static elementTag = 'canvas';

    constructor(parent, options) {
        super(parent, Canvas.elementTag, options);
    }

    aspect(){
        return this.element.width / this.element.height;
    }
    
    static setAspect(canvas, aspect) {
        canvas.width = document.body.clientWidth;
        if (aspect) {
            canvas.height = document.body.clientWidth / aspect;
        } else {
            canvas.height = document.body.clientHeight;
        }
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