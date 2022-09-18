import { HtmlElement } from "./HtmlElement";

export class Div extends HtmlElement {
    static elementTag = 'div';

    constructor(parent, options) {
        super(parent, Div.elementTag, options);
    }
}