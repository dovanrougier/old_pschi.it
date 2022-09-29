import { Div } from "./Div";
import { Input } from "./Input";

export class Slider extends Input{
    constructor(parent, options, containerOptions){
        super(null, options);
        this.element.type = 'range';
        this.container = new Div(parent, containerOptions);
        if(!this.container.element.innerText){
            this.container.element.innerText = this.element.name;
        }
        this.appendToParent(this.container);
    }
}