import { HtmlElement } from "./HtmlElement";

export class Button extends HtmlElement {
    static elementTag = 'button';

    constructor(parent, options) {
        super(parent, Button.elementTag, options);
        if(options.onclick){
            this.element.onclick = options.onclick;
        }
        this.element.innerHTML = options.innerHTML ?? options.id;
        this.element.type = options.type ?? 'button';
    }
}