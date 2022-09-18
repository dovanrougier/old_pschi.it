import { HtmlElement } from "./HtmlElement";

export class Input extends HtmlElement {
    static elementTag = 'input';

    constructor(parent, options) {
        super(parent, Input.elementTag, options);
        if(options.type){
            this.element.type = options.type;
        }
        if(options.min){
            this.element.min = options.min;
        }
        if(options.max){
            this.element.max = options.max;
        }
        if(options.step){
            this.element.step = options.step;
        }
        if(options.oninput){
            this.element.oninput = options.oninput;
        }
        if(options.onchange){
            this.element.onchange = options.onchange;
        }
        if(options.value){
            this.element.value = options.value;
        }
    }
}