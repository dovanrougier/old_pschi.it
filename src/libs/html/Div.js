import { HtmlNode } from './HtmlNode';

export class Div extends HtmlNode {
    static elementTag = 'div';
    constructor(options) {
        super(Div.elementTag, options);
    }
}