import { Div } from "./Div";
import { Input } from "./Input";

export class Slider extends Div{
    constructor(parent, options){
        super(parent, options);
        options.type = 'range';
        this.element.innerText = options.innerText ?? options.id;
        this.element.id = `${options.id}-div`;

        options.name = options.name ?? options.id;
        options.title = options.title ?? options.id;
        this.input = new Input(this, options);
    }
}